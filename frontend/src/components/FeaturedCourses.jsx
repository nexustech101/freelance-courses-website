import React from 'react';
import CourseCard from './CourseCard';
import { useFeaturedCourses } from '../hooks/useCourses';

const FeaturedCourses = () => {
  const { courses, loading, error } = useFeaturedCourses();

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

        {loading && (
          <div className="text-center py-12">
            <div className="body-large text-[var(--text-secondary)]">Loading featured courses...</div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="body-large text-red-500">Error: {error}</div>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="ai-grid">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="btn-secondary">
                View All Courses
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedCourses;