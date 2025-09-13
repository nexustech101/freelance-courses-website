// Mock data for online course platform

export const courseCategories = [
  {
    id: 1,
    name: "Web Development",
    description: "Master modern web technologies",
    icon: "Code",
    courses: [
      {
        id: 1,
        title: "React Mastery: Complete Modern React Course",
        description: "Learn React from basics to advanced concepts including hooks, context, routing, and state management with Redux Toolkit.",
        price: 99,
        originalPrice: 149,
        duration: "32 hours",
        level: "Intermediate",
        students: 2847,
        rating: 4.8,
        instructor: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
        topics: ["React Hooks", "Redux Toolkit", "React Router", "Testing"]
      },
      {
        id: 2,
        title: "Full Stack JavaScript: MERN Stack Complete",
        description: "Build complete web applications using MongoDB, Express, React, and Node.js. From beginner to deployment.",
        price: 129,
        originalPrice: 199,
        duration: "45 hours",
        level: "Beginner",
        students: 1923,
        rating: 4.9,
        instructor: "Michael Chen",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
        topics: ["MongoDB", "Express.js", "React", "Node.js", "Authentication"]
      }
    ]
  },
  {
    id: 2,
    name: "Mobile Development",
    description: "Build amazing mobile applications",
    icon: "Smartphone",
    courses: [
      {
        id: 3,
        title: "React Native: Build iOS & Android Apps",
        description: "Create native mobile apps for both iOS and Android using React Native. Includes navigation, animations, and app store publishing.",
        price: 119,
        originalPrice: 179,
        duration: "28 hours",
        level: "Intermediate",
        students: 1456,
        rating: 4.7,
        instructor: "David Rodriguez",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
        topics: ["React Native", "Navigation", "Animations", "App Store"]
      }
    ]
  },
  {
    id: 3,
    name: "Data Science & AI",
    description: "Dive into data science and machine learning",
    icon: "Brain",
    courses: [
      {
        id: 4,
        title: "Python for Data Science Complete Bootcamp",
        description: "Master Python programming for data analysis, visualization, and machine learning. Includes pandas, numpy, matplotlib, and scikit-learn.",
        price: 89,
        originalPrice: 139,
        duration: "38 hours",
        level: "Beginner",
        students: 3421,
        rating: 4.9,
        instructor: "Dr. Emily Watson",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        topics: ["Python", "Pandas", "NumPy", "Machine Learning", "Data Visualization"]
      }
    ]
  },
  {
    id: 4,
    name: "DevOps & Cloud",
    description: "Learn modern deployment and infrastructure",
    icon: "Cloud",
    courses: [
      {
        id: 5,
        title: "AWS DevOps Engineer Professional Path",
        description: "Complete AWS DevOps certification preparation. Learn CI/CD, Infrastructure as Code, monitoring, and automation.",
        price: 149,
        originalPrice: 229,
        duration: "52 hours",
        level: "Advanced",
        students: 987,
        rating: 4.8,
        instructor: "John Martinez",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
        topics: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"]
      }
    ]
  }
];

export const featuredCourses = [
  courseCategories[0].courses[0],
  courseCategories[2].courses[0],
  courseCategories[0].courses[1]
];

export const instructors = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior React Developer",
    experience: "8+ years",
    students: 12000,
    courses: 15,
    rating: 4.9,
    bio: "Former Tech Lead at Google with expertise in React and modern web development.",
    image: "https://images.unsplash.com/photo-1494790108755-2616c79a4dc1?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Dr. Emily Watson",
    title: "Data Science Expert",
    experience: "12+ years",
    students: 25000,
    courses: 8,
    rating: 4.9,
    bio: "PhD in Computer Science, former ML Engineer at Microsoft with published research.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "Full Stack Architect",
    experience: "10+ years",
    students: 18000,
    courses: 12,
    rating: 4.8,
    bio: "Senior Software Architect with experience building scalable web applications.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Software Developer at Meta",
    content: "The React course completely transformed my career. I went from junior to senior developer in just 8 months!",
    rating: 5,
    course: "React Mastery",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Data Scientist at Netflix",
    content: "Dr. Watson's teaching style is incredible. The Python course gave me the foundation I needed to break into data science.",
    rating: 5,
    course: "Python for Data Science",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "James Wilson",
    role: "DevOps Engineer at Amazon",
    content: "The AWS course is comprehensive and practical. I passed my certification on the first try and got promoted!",
    rating: 5,
    course: "AWS DevOps Engineer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
  }
];

export const stats = {
  totalStudents: 50000,
  totalCourses: 150,
  satisfactionRate: 98,
  avgRating: 4.8
};