from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class Category(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    icon: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class CategoryCreate(BaseModel):
    name: str
    description: str
    icon: str

class Instructor(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    experience: str
    bio: str
    image: str
    rating: float = 0.0
    total_students: int = 0
    total_courses: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class InstructorCreate(BaseModel):
    name: str
    title: str
    experience: str
    bio: str
    image: str

class Course(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    price: float
    original_price: float
    duration: str
    level: str
    rating: float = 0.0
    image: str
    topics: List[str]
    category_id: str
    instructor_id: str
    total_students: int = 0
    is_active: bool = True
    is_featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class CourseCreate(BaseModel):
    title: str
    description: str
    price: float
    original_price: float
    duration: str
    level: str
    image: str
    topics: List[str]
    category_id: str
    instructor_id: str
    is_featured: bool = False

class CourseWithDetails(Course):
    instructor: Optional[Instructor] = None
    category: Optional[Category] = None

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    firebase_uid: str
    email: str
    name: str
    avatar: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class UserCreate(BaseModel):
    firebase_uid: str
    email: str
    name: str
    avatar: Optional[str] = None

class Enrollment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    course_id: str
    payment_id: Optional[str] = None
    enrolled_at: datetime = Field(default_factory=datetime.utcnow)
    progress: float = 0.0
    completed: bool = False

class EnrollmentCreate(BaseModel):
    user_id: str
    course_id: str
    payment_id: Optional[str] = None

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    course_id: str
    content: str
    rating: int
    is_approved: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TestimonialCreate(BaseModel):
    user_id: str
    course_id: str
    content: str
    rating: int

class Stats(BaseModel):
    total_students: int
    total_courses: int
    satisfaction_rate: int
    avg_rating: float

class PaymentIntent(BaseModel):
    course_id: str
    amount: float
    currency: str = "usd"

class PaymentConfirmation(BaseModel):
    payment_intent_id: str
    course_id: str