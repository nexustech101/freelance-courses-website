from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
import os
from models import *
import logging

logger = logging.getLogger(__name__)

class Database:
    def __init__(self, client: AsyncIOMotorClient, db_name: str):
        self.client = client
        self.db = client[db_name]
        
        # Collections
        self.categories = self.db.categories
        self.instructors = self.db.instructors
        self.courses = self.db.courses
        self.users = self.db.users
        self.enrollments = self.db.enrollments
        self.testimonials = self.db.testimonials

    # Category operations
    async def create_category(self, category: CategoryCreate) -> Category:
        category_obj = Category(**category.dict())
        result = await self.categories.insert_one(category_obj.dict())
        category_obj.id = str(result.inserted_id) if result.inserted_id else category_obj.id
        return category_obj

    async def get_categories(self) -> List[Category]:
        cursor = self.categories.find()
        categories = []
        async for doc in cursor:
            doc['id'] = str(doc.get('_id', doc.get('id')))
            if '_id' in doc:
                del doc['_id']
            categories.append(Category(**doc))
        return categories

    async def get_category_by_id(self, category_id: str) -> Optional[Category]:
        doc = await self.categories.find_one({"id": category_id})
        if doc:
            doc['id'] = str(doc.get('_id', doc.get('id')))
            if '_id' in doc:
                del doc['_id']
            return Category(**doc)
        return None

    # Instructor operations
    async def create_instructor(self, instructor: InstructorCreate) -> Instructor:
        instructor_obj = Instructor(**instructor.dict())
        result = await self.instructors.insert_one(instructor_obj.dict())
        instructor_obj.id = str(result.inserted_id) if result.inserted_id else instructor_obj.id
        return instructor_obj

    async def get_instructors(self) -> List[Instructor]:
        cursor = self.instructors.find()
        instructors = []
        async for doc in cursor:
            doc['id'] = str(doc.get('_id', doc.get('id')))
            if '_id' in doc:
                del doc['_id']
            instructors.append(Instructor(**doc))
        return instructors

    async def get_instructor_by_id(self, instructor_id: str) -> Optional[Instructor]:
        doc = await self.instructors.find_one({"id": instructor_id})
        if doc:
            doc['id'] = str(doc.get('_id', doc.get('id')))
            if '_id' in doc:
                del doc['_id']
            return Instructor(**doc)
        return None

    # Course operations
    async def create_course(self, course: CourseCreate) -> Course:
        course_obj = Course(**course.dict())
        result = await self.courses.insert_one(course_obj.dict())
        course_obj.id = str(result.inserted_id) if result.inserted_id else course_obj.id
        return course_obj

    async def get_courses(self, category_id: Optional[str] = None, level: Optional[str] = None, 
                         featured_only: bool = False, limit: Optional[int] = None) -> List[CourseWithDetails]:
        query = {"is_active": True}
        
        if category_id:
            query["category_id"] = category_id
        if level:
            query["level"] = level
        if featured_only:
            query["is_featured"] = True
            
        cursor = self.courses.find(query)
        if limit:
            cursor = cursor.limit(limit)
            
        courses = []
        async for doc in cursor:
            doc['id'] = str(doc.get('_id', doc.get('id')))
            if '_id' in doc:
                del doc['_id']
            
            course = CourseWithDetails(**doc)
            
            # Get instructor details
            instructor = await self.get_instructor_by_id(course.instructor_id)
            if instructor:
                course.instructor = instructor
                
            # Get category details
            category = await self.get_category_by_id(course.category_id)
            if category:
                course.category = category
                
            courses.append(course)
            
        return courses

    async def get_course_by_id(self, course_id: str) -> Optional[CourseWithDetails]:
        doc = await self.courses.find_one({"id": course_id, "is_active": True})
        if doc:
            doc['id'] = str(doc.get('_id', doc.get('id')))
            if '_id' in doc:
                del doc['_id']
            
            course = CourseWithDetails(**doc)
            
            # Get instructor and category details
            instructor = await self.get_instructor_by_id(course.instructor_id)
            category = await self.get_category_by_id(course.category_id)
            
            course.instructor = instructor
            course.category = category
            
            return course
        return None

    async def get_featured_courses(self) -> List[CourseWithDetails]:
        return await self.get_courses(featured_only=True, limit=3)

    # User operations
    async def create_user(self, user: UserCreate) -> User:
        # Check if user already exists
        existing_user = await self.users.find_one({"firebase_uid": user.firebase_uid})
        if existing_user:
            existing_user['id'] = str(existing_user.get('_id', existing_user.get('id')))
            if '_id' in existing_user:
                del existing_user['_id']
            return User(**existing_user)
        
        user_obj = User(**user.dict())
        result = await self.users.insert_one(user_obj.dict())
        user_obj.id = str(result.inserted_id) if result.inserted_id else user_obj.id
        return user_obj

    async def get_user_by_firebase_uid(self, firebase_uid: str) -> Optional[User]:
        doc = await self.users.find_one({"firebase_uid": firebase_uid})
        if doc:
            doc['id'] = str(doc.get('_id', doc.get('id')))
            if '_id' in doc:
                del doc['_id']
            return User(**doc)
        return None

    # Enrollment operations
    async def create_enrollment(self, enrollment: EnrollmentCreate) -> Enrollment:
        # Check if already enrolled
        existing = await self.enrollments.find_one({
            "user_id": enrollment.user_id,
            "course_id": enrollment.course_id
        })
        
        if existing:
            existing['id'] = str(existing.get('_id', existing.get('id')))
            if '_id' in existing:
                del existing['_id']
            return Enrollment(**existing)
        
        enrollment_obj = Enrollment(**enrollment.dict())
        result = await self.enrollments.insert_one(enrollment_obj.dict())
        enrollment_obj.id = str(result.inserted_id) if result.inserted_id else enrollment_obj.id
        
        # Update course student count
        await self.courses.update_one(
            {"id": enrollment.course_id},
            {"$inc": {"total_students": 1}}
        )
        
        return enrollment_obj

    async def get_user_enrollments(self, user_id: str) -> List[Enrollment]:
        cursor = self.enrollments.find({"user_id": user_id})
        enrollments = []
        async for doc in cursor:
            doc['id'] = str(doc.get('_id', doc.get('id')))
            if '_id' in doc:
                del doc['_id']
            enrollments.append(Enrollment(**doc))
        return enrollments

    # Testimonial operations
    async def get_approved_testimonials(self, limit: Optional[int] = None) -> List[Testimonial]:
        cursor = self.testimonials.find({"is_approved": True})
        if limit:
            cursor = cursor.limit(limit)
            
        testimonials = []
        async for doc in cursor:
            doc['id'] = str(doc.get('_id', doc.get('id')))
            if '_id' in doc:
                del doc['_id']
            testimonials.append(Testimonial(**doc))
        return testimonials

    # Stats operations
    async def get_platform_stats(self) -> Stats:
        total_students = await self.users.count_documents({})
        total_courses = await self.courses.count_documents({"is_active": True})
        
        # Calculate average rating
        pipeline = [
            {"$match": {"is_active": True}},
            {"$group": {"_id": None, "avg_rating": {"$avg": "$rating"}}}
        ]
        
        avg_rating_result = await self.courses.aggregate(pipeline).to_list(1)
        avg_rating = avg_rating_result[0]["avg_rating"] if avg_rating_result else 0.0
        
        return Stats(
            total_students=total_students,
            total_courses=total_courses,
            satisfaction_rate=98,  # Mock value for now
            avg_rating=round(avg_rating, 1) if avg_rating else 4.8
        )