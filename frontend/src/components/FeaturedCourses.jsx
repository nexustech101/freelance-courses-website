import React from 'react';
import CourseCard from './CourseCard';
import { featuredCourses } from '../data/mock';

const FeaturedCourses = () => {
  return (
    <section className="pad-2xl bg-[var(--bg-page)]" id="courses">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Featured Courses</h2>
          <p className="body-large text-[var(--text-secondary)] max-w-2xl mx-auto">
            Start your journey with our most popular and highly-rated courses. 
            Designed by industry experts and loved by thousands of students.
          </p>
        </div>

        <div className="ai-grid">
          {featuredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;