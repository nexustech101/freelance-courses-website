from fastapi import FastAPI, APIRouter, HTTPException, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from models import *
from database import Database
from seed_data import seed_database
import asyncio

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
database = Database(client, os.environ['DB_NAME'])

# Create the main app without a prefix
app = FastAPI(title="TechLearn API", description="Course Management Platform API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "TechLearn API is running!"}

# Course endpoints
@api_router.get("/courses", response_model=List[CourseWithDetails])
async def get_courses(
    category_id: Optional[str] = None,
    level: Optional[str] = None,
    featured_only: bool = False,
    limit: Optional[int] = None
):
    """Get all courses with optional filtering"""
    try:
        courses = await database.get_courses(
            category_id=category_id,
            level=level,
            featured_only=featured_only,
            limit=limit
        )
        return courses
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/courses/featured", response_model=List[CourseWithDetails])
async def get_featured_courses():
    """Get featured courses for homepage"""
    try:
        courses = await database.get_featured_courses()
        return courses
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/courses/{course_id}", response_model=CourseWithDetails)
async def get_course(course_id: str):
    """Get single course details"""
    try:
        course = await database.get_course_by_id(course_id)
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        return course
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Category endpoints
@api_router.get("/categories", response_model=List[Category])
async def get_categories():
    """Get all course categories"""
    try:
        categories = await database.get_categories()
        return categories
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/categories", response_model=Category)
async def create_category(category: CategoryCreate):
    """Create a new category"""
    try:
        return await database.create_category(category)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Instructor endpoints
@api_router.get("/instructors", response_model=List[Instructor])
async def get_instructors():
    """Get all instructors"""
    try:
        instructors = await database.get_instructors()
        return instructors
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/instructors/{instructor_id}", response_model=Instructor)
async def get_instructor(instructor_id: str):
    """Get instructor profile"""
    try:
        instructor = await database.get_instructor_by_id(instructor_id)
        if not instructor:
            raise HTTPException(status_code=404, detail="Instructor not found")
        return instructor
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/instructors", response_model=Instructor)
async def create_instructor(instructor: InstructorCreate):
    """Create a new instructor"""
    try:
        return await database.create_instructor(instructor)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Stats endpoint
@api_router.get("/stats", response_model=Stats)
async def get_platform_stats():
    """Get platform statistics"""
    try:
        stats = await database.get_platform_stats()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Testimonials endpoint
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(limit: Optional[int] = 10):
    """Get approved testimonials"""
    try:
        testimonials = await database.get_approved_testimonials(limit=limit)
        return testimonials
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# User endpoints (will be expanded with Firebase auth)
@api_router.post("/users", response_model=User)
async def create_user(user: UserCreate):
    """Create a new user"""
    try:
        return await database.create_user(user)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Enrollment endpoints (will be expanded with auth)
@api_router.post("/enrollments", response_model=Enrollment)
async def create_enrollment(enrollment: EnrollmentCreate):
    """Create a new enrollment"""
    try:
        return await database.create_enrollment(enrollment)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
