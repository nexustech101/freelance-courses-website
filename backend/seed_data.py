from database import Database
from models import *
import asyncio
import logging

logger = logging.getLogger(__name__)

async def seed_database(db: Database):
    """Seed the database with initial data from mock.js"""
    
    try:
        # Check if data already exists
        existing_categories = await db.get_categories()
        if existing_categories:
            logger.info("Database already seeded, skipping...")
            return
            
        logger.info("Seeding database with initial data...")
        
        # Create Categories
        categories_data = [
            {"name": "Web Development", "description": "Master modern web technologies", "icon": "Code"},
            {"name": "Mobile Development", "description": "Build amazing mobile applications", "icon": "Smartphone"},
            {"name": "Data Science & AI", "description": "Dive into data science and machine learning", "icon": "Brain"},
            {"name": "DevOps & Cloud", "description": "Learn modern deployment and infrastructure", "icon": "Cloud"}
        ]
        
        created_categories = {}
        for cat_data in categories_data:
            category = await db.create_category(CategoryCreate(**cat_data))
            created_categories[cat_data["name"]] = category.id
            logger.info(f"Created category: {category.name}")

        # Create Instructors
        instructors_data = [
            {
                "name": "Sarah Johnson",
                "title": "Senior React Developer",
                "experience": "8+ years",
                "bio": "Former Tech Lead at Google with expertise in React and modern web development.",
                "image": "https://images.unsplash.com/photo-1494790108755-2616c79a4dc1?w=150&h=150&fit=crop&crop=face"
            },
            {
                "name": "Dr. Emily Watson",
                "title": "Data Science Expert",
                "experience": "12+ years",
                "bio": "PhD in Computer Science, former ML Engineer at Microsoft with published research.",
                "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
            },
            {
                "name": "Michael Chen",
                "title": "Full Stack Architect",
                "experience": "10+ years",
                "bio": "Senior Software Architect with experience building scalable web applications.",
                "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            },
            {
                "name": "David Rodriguez",
                "title": "Mobile Development Expert",
                "experience": "9+ years",
                "bio": "Senior Mobile Developer with experience in React Native and native iOS/Android development.",
                "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            },
            {
                "name": "John Martinez",
                "title": "DevOps Engineer",
                "experience": "11+ years",
                "bio": "Senior DevOps Engineer with expertise in AWS, Docker, and Kubernetes.",
                "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
            }
        ]
        
        created_instructors = {}
        for instructor_data in instructors_data:
            instructor = await db.create_instructor(InstructorCreate(**instructor_data))
            created_instructors[instructor_data["name"]] = instructor.id
            logger.info(f"Created instructor: {instructor.name}")

        # Create Courses
        courses_data = [
            {
                "title": "React Mastery: Complete Modern React Course",
                "description": "Learn React from basics to advanced concepts including hooks, context, routing, and state management with Redux Toolkit.",
                "price": 99.0,
                "original_price": 149.0,
                "duration": "32 hours",
                "level": "Intermediate",
                "rating": 4.8,
                "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
                "topics": ["React Hooks", "Redux Toolkit", "React Router", "Testing"],
                "category_id": created_categories["Web Development"],
                "instructor_id": created_instructors["Sarah Johnson"],
                "total_students": 2847,
                "is_featured": True
            },
            {
                "title": "Full Stack JavaScript: MERN Stack Complete",
                "description": "Build complete web applications using MongoDB, Express, React, and Node.js. From beginner to deployment.",
                "price": 129.0,
                "original_price": 199.0,
                "duration": "45 hours",
                "level": "Beginner",
                "rating": 4.9,
                "image": "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
                "topics": ["MongoDB", "Express.js", "React", "Node.js", "Authentication"],
                "category_id": created_categories["Web Development"],
                "instructor_id": created_instructors["Michael Chen"],
                "total_students": 1923,
                "is_featured": True
            },
            {
                "title": "React Native: Build iOS & Android Apps",
                "description": "Create native mobile apps for both iOS and Android using React Native. Includes navigation, animations, and app store publishing.",
                "price": 119.0,
                "original_price": 179.0,
                "duration": "28 hours",
                "level": "Intermediate",
                "rating": 4.7,
                "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
                "topics": ["React Native", "Navigation", "Animations", "App Store"],
                "category_id": created_categories["Mobile Development"],
                "instructor_id": created_instructors["David Rodriguez"],
                "total_students": 1456
            },
            {
                "title": "Python for Data Science Complete Bootcamp",
                "description": "Master Python programming for data analysis, visualization, and machine learning. Includes pandas, numpy, matplotlib, and scikit-learn.",
                "price": 89.0,
                "original_price": 139.0,
                "duration": "38 hours",
                "level": "Beginner",
                "rating": 4.9,
                "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
                "topics": ["Python", "Pandas", "NumPy", "Machine Learning", "Data Visualization"],
                "category_id": created_categories["Data Science & AI"],
                "instructor_id": created_instructors["Dr. Emily Watson"],
                "total_students": 3421,
                "is_featured": True
            },
            {
                "title": "AWS DevOps Engineer Professional Path",
                "description": "Complete AWS DevOps certification preparation. Learn CI/CD, Infrastructure as Code, monitoring, and automation.",
                "price": 149.0,
                "original_price": 229.0,
                "duration": "52 hours",
                "level": "Advanced",
                "rating": 4.8,
                "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
                "topics": ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
                "category_id": created_categories["DevOps & Cloud"],
                "instructor_id": created_instructors["John Martinez"],
                "total_students": 987
            }
        ]
        
        for course_data in courses_data:
            course = await db.create_course(CourseCreate(**course_data))
            logger.info(f"Created course: {course.title}")

        # Create sample testimonials
        testimonials_data = [
            {
                "user_id": "sample_user_1",
                "course_id": "sample_course_1",
                "content": "The React course completely transformed my career. I went from junior to senior developer in just 8 months!",
                "rating": 5,
                "is_approved": True
            },
            {
                "user_id": "sample_user_2", 
                "course_id": "sample_course_2",
                "content": "Dr. Watson's teaching style is incredible. The Python course gave me the foundation I needed to break into data science.",
                "rating": 5,
                "is_approved": True
            },
            {
                "user_id": "sample_user_3",
                "course_id": "sample_course_3",
                "content": "The AWS course is comprehensive and practical. I passed my certification on the first try and got promoted!",
                "rating": 5,
                "is_approved": True
            }
        ]
        
        for testimonial_data in testimonials_data:
            testimonial_obj = Testimonial(**testimonial_data)
            await db.testimonials.insert_one(testimonial_obj.dict())
            logger.info(f"Created testimonial from user: {testimonial_data['user_id']}")

        logger.info("Database seeding completed successfully!")
        
    except Exception as e:
        logger.error(f"Error seeding database: {str(e)}")
        raise