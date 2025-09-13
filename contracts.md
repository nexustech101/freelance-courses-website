# Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for converting the TechLearn course platform from mock data to a full-stack application with MongoDB backend, Firebase authentication, and payment processing.

## Current Mock Data Structure (from mock.js)

### 1. Course Categories
```javascript
courseCategories = [
  {
    id: number,
    name: string,
    description: string,
    icon: string,
    courses: Course[]
  }
]
```

### 2. Courses
```javascript
Course = {
  id: number,
  title: string,
  description: string,
  price: number,
  originalPrice: number,
  duration: string,
  level: string,
  students: number,
  rating: number,
  instructor: string,
  image: string,
  topics: string[]
}
```

### 3. Instructors
```javascript
Instructor = {
  id: number,
  name: string,
  title: string,
  experience: string,
  students: number,
  courses: number,
  rating: number,
  bio: string,
  image: string
}
```

### 4. Other Data
- `featuredCourses`: Array of 3 courses
- `testimonials`: User success stories
- `stats`: Platform statistics

## Backend API Contracts

### Base URL: `${REACT_APP_BACKEND_URL}/api`

### 1. Course Management APIs

#### GET /api/courses
- **Purpose**: Get all courses with optional filtering
- **Query Params**: `category`, `level`, `page`, `limit`
- **Response**: `{ courses: Course[], total: number, page: number }`

#### GET /api/courses/featured
- **Purpose**: Get featured courses for homepage
- **Response**: `{ courses: Course[] }`

#### GET /api/courses/:id
- **Purpose**: Get single course details
- **Response**: `{ course: Course }`

#### GET /api/categories
- **Purpose**: Get all course categories with course counts
- **Response**: `{ categories: Category[] }`

### 2. Instructor APIs

#### GET /api/instructors
- **Purpose**: Get all instructors
- **Response**: `{ instructors: Instructor[] }`

#### GET /api/instructors/:id
- **Purpose**: Get instructor profile with their courses
- **Response**: `{ instructor: Instructor, courses: Course[] }`

### 3. User Management APIs (Firebase Integration)

#### POST /api/users/profile
- **Purpose**: Create/update user profile after Firebase auth
- **Headers**: `Authorization: Bearer <firebase-token>`
- **Body**: `{ name, email, avatar }`
- **Response**: `{ user: User }`

#### GET /api/users/profile
- **Purpose**: Get current user profile
- **Headers**: `Authorization: Bearer <firebase-token>`
- **Response**: `{ user: User, enrolledCourses: Course[] }`

### 4. Enrollment APIs

#### POST /api/enrollments
- **Purpose**: Enroll user in a course (after payment)
- **Headers**: `Authorization: Bearer <firebase-token>`
- **Body**: `{ courseId, paymentId }`
- **Response**: `{ enrollment: Enrollment }`

#### GET /api/enrollments
- **Purpose**: Get user's enrolled courses
- **Headers**: `Authorization: Bearer <firebase-token>`
- **Response**: `{ enrollments: Enrollment[] }`

### 5. Payment APIs (Stripe Integration)

#### POST /api/payments/create-payment-intent
- **Purpose**: Create Stripe payment intent for course purchase
- **Headers**: `Authorization: Bearer <firebase-token>`
- **Body**: `{ courseId }`
- **Response**: `{ clientSecret, paymentIntentId }`

#### POST /api/payments/confirm
- **Purpose**: Confirm payment and enroll user
- **Headers**: `Authorization: Bearer <firebase-token>`
- **Body**: `{ paymentIntentId, courseId }`
- **Response**: `{ success: boolean, enrollment: Enrollment }`

### 6. Analytics/Stats APIs

#### GET /api/stats
- **Purpose**: Get platform statistics for homepage
- **Response**: `{ totalStudents, totalCourses, satisfactionRate, avgRating }`

## MongoDB Schema Design

### 1. Categories Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  icon: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Courses Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  price: Number,
  originalPrice: Number,
  duration: String,
  level: String,
  rating: Number,
  image: String,
  topics: [String],
  categoryId: ObjectId,
  instructorId: ObjectId,
  isActive: Boolean,
  isFeatured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Instructors Collection
```javascript
{
  _id: ObjectId,
  name: String,
  title: String,
  experience: String,
  bio: String,
  image: String,
  rating: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Users Collection
```javascript
{
  _id: ObjectId,
  firebaseUid: String,
  email: String,
  name: String,
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Enrollments Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  courseId: ObjectId,
  paymentId: String,
  enrolledAt: Date,
  progress: Number,
  completed: Boolean
}
```

### 6. Testimonials Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  courseId: ObjectId,
  content: String,
  rating: Number,
  isApproved: Boolean,
  createdAt: Date
}
```

## Frontend Integration Plan

### 1. Replace Mock Data Imports
- Remove `import { courseCategories, featuredCourses, instructors, testimonials, stats } from '../data/mock'`
- Replace with API calls using axios

### 2. Create API Service Layer
- Create `/frontend/src/services/api.js` with all API functions
- Include error handling and loading states

### 3. Add State Management
- Use React hooks (useState, useEffect) for data fetching
- Add loading and error states to components

### 4. Authentication Integration
- Install Firebase SDK
- Create auth context for user management
- Add protected routes for user dashboard

### 5. Payment Integration
- Install Stripe SDK
- Create payment flow components
- Handle payment success/failure states

## Implementation Priority

### Phase 1: Core Backend
1. Set up MongoDB models
2. Implement course and category APIs
3. Seed database with mock data
4. Update frontend to use APIs

### Phase 2: Authentication
1. Firebase authentication setup
2. User management APIs
3. Protected routes in frontend

### Phase 3: Payment & Enrollment
1. Stripe payment integration
2. Enrollment system
3. User dashboard for enrolled courses

### Phase 4: Advanced Features
1. Course progress tracking
2. Testimonials system
3. Admin panel for course management

## Error Handling Strategy

### Backend
- Use try-catch blocks for all async operations
- Return consistent error format: `{ error: string, message: string }`
- Implement proper HTTP status codes

### Frontend
- Add loading states for all API calls
- Display user-friendly error messages
- Implement retry mechanisms for failed requests

## Security Considerations

1. **Authentication**: Firebase token verification for protected routes
2. **Authorization**: User role-based access control
3. **Payment Security**: Server-side payment validation
4. **Data Validation**: Input sanitization and validation on both frontend and backend
5. **Rate Limiting**: Protect APIs from abuse

This contract ensures seamless integration between frontend mock data and backend implementation.