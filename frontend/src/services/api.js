import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens (will be used later with Firebase)
api.interceptors.request.use(
  (config) => {
    // Add auth token when available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle common errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      // Redirect to login if needed
    }
    
    return Promise.reject(error);
  }
);

// Course APIs
export const courseAPI = {
  // Get all courses with optional filtering
  getCourses: async (params = {}) => {
    const response = await api.get('/courses', { params });
    return response.data;
  },

  // Get featured courses
  getFeaturedCourses: async () => {
    const response = await api.get('/courses/featured');
    return response.data;
  },

  // Get single course by ID
  getCourse: async (courseId) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  },
};

// Category APIs
export const categoryAPI = {
  // Get all categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Create new category (admin only)
  createCategory: async (categoryData) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },
};

// Instructor APIs
export const instructorAPI = {
  // Get all instructors
  getInstructors: async () => {
    const response = await api.get('/instructors');
    return response.data;
  },

  // Get instructor by ID
  getInstructor: async (instructorId) => {
    const response = await api.get(`/instructors/${instructorId}`);
    return response.data;
  },
};

// Stats API
export const statsAPI = {
  // Get platform statistics
  getStats: async () => {
    const response = await api.get('/stats');
    return response.data;
  },
};

// Testimonials API
export const testimonialAPI = {
  // Get approved testimonials
  getTestimonials: async (limit = 10) => {
    const response = await api.get('/testimonials', { params: { limit } });
    return response.data;
  },
};

// User APIs (will be expanded with Firebase auth)
export const userAPI = {
  // Create user
  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
};

// Enrollment APIs (will be expanded with auth)
export const enrollmentAPI = {
  // Create enrollment
  createEnrollment: async (enrollmentData) => {
    const response = await api.post('/enrollments', enrollmentData);
    return response.data;
  },
};

// Error handling utilities
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.detail || 'Server error occurred',
      status: error.response.status,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error - please check your connection',
      status: 0,
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: 0,
    };
  }
};

export default api;