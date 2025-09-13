import React from 'react';
import { Button } from './ui/button';
import { Clock, Users, Star, BookOpen } from 'lucide-react';

const CourseCard = ({ course }) => {
  const discountPercentage = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <div className="course-card">
      <img 
        src={course.image} 
        alt={course.title}
        className="course-card-image"
      />
      
      <div className="course-card-content">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-[var(--accent-wash)] text-[var(--accent-text)] text-xs rounded-full font-medium">
            {course.level}
          </span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs text-[var(--text-secondary)]">{course.rating}</span>
          </div>
        </div>

        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-description">{course.description}</p>

        <div className="flex items-center gap-4 mb-4 text-[var(--text-secondary)] text-sm">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.students.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-[var(--text-muted)] line-through">
            ${course.originalPrice}
          </span>
          <span className="heading-3 text-[var(--accent-text)]">
            ${course.price}
          </span>
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
            {discountPercentage}% OFF
          </span>
        </div>

        <div className="mb-4">
          <div className="body-small mb-2">What you'll learn:</div>
          <div className="flex flex-wrap gap-1">
            {course.topics.slice(0, 3).map((topic, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-[var(--bg-section)] text-[var(--text-secondary)] text-xs rounded"
              >
                {topic}
              </span>
            ))}
            {course.topics.length > 3 && (
              <span className="px-2 py-1 bg-[var(--bg-section)] text-[var(--text-secondary)] text-xs rounded">
                +{course.topics.length - 3} more
              </span>
            )}
          </div>
        </div>

        <Button className="btn-primary w-full">
          <BookOpen className="w-4 h-4 mr-2" />
          Enroll Now
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;