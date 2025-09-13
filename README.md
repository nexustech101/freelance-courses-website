# TechLearn - Professional Course Selling Platform

A modern, full-stack course selling platform built with React, FastAPI, and MongoDB. Features a clean, professional design with comprehensive course management, instructor profiles, and student testimonials.

![TechLearn Platform](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop)

## 🚀 Features

### Frontend Features
- **Modern UI/UX**: Clean, professional design using Green-AI design system
- **Responsive Design**: Mobile-first approach with perfect mobile experience
- **Course Catalog**: Browse courses by categories, levels, and featured content
- **Instructor Profiles**: Detailed instructor information with experience and ratings
- **Student Testimonials**: Success stories and reviews from real students
- **Interactive Components**: Hover effects, animations, and micro-interactions
- **Real-time Stats**: Dynamic platform statistics and course metrics

### Backend Features
- **RESTful API**: Complete API with FastAPI framework
- **MongoDB Integration**: NoSQL database with optimized queries
- **Course Management**: CRUD operations for courses, categories, and instructors
- **Data Seeding**: Automatic database population with realistic data
- **Error Handling**: Comprehensive error handling and validation
- **API Documentation**: Auto-generated OpenAPI/Swagger documentation

## 🛠️ Tech Stack

### Frontend
- **React 19.0.0** - Modern React with latest features
- **React Router DOM 7.5.1** - Client-side routing
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Shadcn/UI Components** - Modern, accessible UI components
- **Axios 1.8.4** - HTTP client for API calls
- **Lucide React 0.507.0** - Beautiful SVG icons

### Backend
- **FastAPI 0.110.1** - Modern Python web framework
- **Motor 3.3.1** - Async MongoDB driver
- **Pydantic 2.6.4+** - Data validation and serialization
- **Python-dotenv 1.0.1+** - Environment variable management
- **Uvicorn 0.25.0** - ASGI server

### Database
- **MongoDB** - NoSQL document database
- **Async Operations** - Non-blocking database operations

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **Yarn** (recommended) or npm
- **Python** (v3.8 or higher)
- **MongoDB** (local installation or cloud instance)
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd techlearn-platform
```

### 2. Backend Setup

#### Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Configure Environment Variables
Create a `.env` file in the `backend/` directory:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=techlearn
```

#### Start Backend Server
```bash
# Development server with auto-reload
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### 3. Frontend Setup

#### Install Node.js Dependencies
```bash
cd frontend
yarn install
# or if using npm: npm install
```

#### Configure Environment Variables
Create a `.env` file in the `frontend/` directory:
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

#### Start Frontend Development Server
```bash
yarn start
# or if using npm: npm start
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **API Documentation**: http://localhost:8001/docs

## 📁 Project Structure

```
techlearn-platform/
├── frontend/                   # React frontend application
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/           # Shadcn/UI components
│   │   │   ├── Header.jsx    # Navigation header
│   │   │   ├── Hero.jsx      # Hero section
│   │   │   ├── CourseCard.jsx # Course display card
│   │   │   └── ...           # Other components
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useCourses.js # Course data hooks
│   │   │   ├── useStats.js   # Statistics hooks
│   │   │   └── ...           # Other hooks
│   │   ├── services/         # API service layer
│   │   │   └── api.js        # Axios API client
│   │   ├── data/             # Mock data (legacy)
│   │   ├── App.js            # Main App component
│   │   ├── App.css           # Green-AI design system styles
│   │   └── index.css         # Tailwind CSS imports
│   ├── package.json          # Frontend dependencies
│   └── tailwind.config.js    # Tailwind configuration
├── backend/                   # FastAPI backend application
│   ├── server.py             # Main FastAPI application
│   ├── models.py             # Pydantic models
│   ├── database.py           # MongoDB operations
│   ├── seed_data.py          # Database seeding
│   ├── requirements.txt      # Python dependencies
│   └── .env                  # Environment variables
├── contracts.md              # API contracts documentation
└── README.md                 # This file
```

## 🗃️ Database Schema

### Collections

#### Categories
```javascript
{
  id: String,
  name: String,
  description: String,
  icon: String,
  created_at: DateTime,
  updated_at: DateTime
}
```

#### Instructors
```javascript
{
  id: String,
  name: String,
  title: String,
  experience: String,
  bio: String,
  image: String,
  rating: Float,
  total_students: Integer,
  total_courses: Integer,
  created_at: DateTime,
  updated_at: DateTime
}
```

#### Courses
```javascript
{
  id: String,
  title: String,
  description: String,
  price: Float,
  original_price: Float,
  duration: String,
  level: String,
  rating: Float,
  image: String,
  topics: [String],
  category_id: String,
  instructor_id: String,
  total_students: Integer,
  is_active: Boolean,
  is_featured: Boolean,
  created_at: DateTime,
  updated_at: DateTime
}
```

## 🔌 API Endpoints

### Course Endpoints
- `GET /api/courses` - Get all courses with filtering
- `GET /api/courses/featured` - Get featured courses
- `GET /api/courses/{id}` - Get single course details

### Category Endpoints
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

### Instructor Endpoints
- `GET /api/instructors` - Get all instructors
- `GET /api/instructors/{id}` - Get instructor details

### Statistics Endpoints
- `GET /api/stats` - Get platform statistics

### Testimonial Endpoints
- `GET /api/testimonials` - Get approved testimonials

For complete API documentation, visit `/docs` when the backend is running.

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

#### Build for Production
```bash
cd frontend
yarn build
# or npm run build
```

#### Environment Variables for Production
```env
REACT_APP_BACKEND_URL=https://your-api-domain.com
```

### Backend Deployment (Railway/Heroku/DigitalOcean)

#### Using Docker (Recommended)
Create `Dockerfile` in backend directory:
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8001

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

#### Environment Variables for Production
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=techlearn_production
```

### Database Deployment (MongoDB Atlas)

1. **Create MongoDB Atlas Account**: Sign up at https://www.mongodb.com/atlas
2. **Create Cluster**: Set up a free tier cluster
3. **Configure Network Access**: Add your deployment server IPs
4. **Create Database User**: Set up authentication
5. **Get Connection String**: Use in MONGO_URL environment variable

### Environment-Specific Configurations

#### Development
```env
# Frontend (.env)
REACT_APP_BACKEND_URL=http://localhost:8001

# Backend (.env)
MONGO_URL=mongodb://localhost:27017
DB_NAME=techlearn_dev
```

#### Staging
```env
# Frontend (.env)
REACT_APP_BACKEND_URL=https://staging-api.techlearn.com

# Backend (.env)
MONGO_URL=mongodb+srv://user:pass@staging-cluster.mongodb.net/
DB_NAME=techlearn_staging
```

#### Production
```env
# Frontend (.env)
REACT_APP_BACKEND_URL=https://api.techlearn.com

# Backend (.env)
MONGO_URL=mongodb+srv://user:pass@production-cluster.mongodb.net/
DB_NAME=techlearn_production
```

## 🔧 Development Commands

### Frontend Commands
```bash
# Install dependencies
yarn install

# Start development server
yarn start

# Build for production
yarn build

# Run tests
yarn test

# Lint code
yarn lint
```

### Backend Commands
```bash
# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn server:app --reload --host 0.0.0.0 --port 8001

# Format code
black .

# Type checking
mypy .

# Run tests
pytest
```

## 🎨 Design System

The project uses the **Green-AI Design System** with:

- **Clean color palette** with professional green accents
- **System fonts** for optimal performance
- **Responsive typography** with clamp() functions
- **Consistent spacing** using CSS custom properties
- **Micro-animations** for enhanced user experience
- **Mobile-first** responsive design

### Key Colors
```css
--accent-primary: #8FEC78    /* Main green accent */
--accent-strong: #81DD67     /* Stronger green */
--text-primary: rgb(0, 55, 32)  /* Dark green text */
--bg-page: #FFFFFF           /* Clean white background */
```

## 🔮 Future Enhancements

### Phase 1 - Authentication & User Management
- [ ] Firebase Authentication integration
- [ ] User profiles and dashboards
- [ ] Course enrollment tracking
- [ ] Progress tracking system

### Phase 2 - Payment & E-commerce
- [ ] Stripe payment integration
- [ ] Course purchasing workflow
- [ ] Order management system
- [ ] Digital receipts and invoices

### Phase 3 - Advanced Features
- [ ] Course video streaming
- [ ] Interactive assignments
- [ ] Discussion forums
- [ ] Certification system
- [ ] Admin dashboard
- [ ] Analytics and reporting

### Phase 4 - Mobile App
- [ ] React Native mobile application
- [ ] Offline course content
- [ ] Push notifications
- [ ] Mobile-specific features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Built with ❤️ using the Emergent platform

## 🆘 Support

If you encounter any issues:

1. Check the [API documentation](http://localhost:8001/docs) when backend is running
2. Ensure all environment variables are properly configured
3. Verify MongoDB connection and database permissions
4. Check browser console for frontend errors
5. Review backend logs for API issues

## 📞 Contact

For questions or support regarding this project, please refer to the documentation or create an issue in the repository.

---

**Happy Learning! 🚀**
