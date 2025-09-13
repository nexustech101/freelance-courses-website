import React from 'react';
import { Star, Users, BookOpen } from 'lucide-react';
import { useInstructors } from '../hooks/useInstructors';

const Instructors = () => {
  const { instructors, loading, error } = useInstructors();

  return (
    <section className="pad-2xl bg-[var(--bg-page)]" id="instructors">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Meet Your Instructors</h2>
          <p className="body-large text-[var(--text-secondary)] max-w-2xl mx-auto">
            Learn from industry veterans with years of real-world experience at top tech companies. 
            Our instructors are passionate about sharing their knowledge and helping you succeed.
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="body-large text-[var(--text-secondary)]">Loading instructors...</div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="body-large text-red-500">Error: {error}</div>
          </div>
        )}

        {!loading && !error && (
          <div className="ai-grid">
            {instructors.map(instructor => (
              <div key={instructor.id} className="course-card">
                <div className="course-card-content text-center">
                  <img 
                    src={instructor.image} 
                    alt={instructor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  
                  <h3 className="course-card-title text-center mb-1">
                    {instructor.name}
                  </h3>
                  
                  <div className="body-small text-[var(--accent-text)] font-medium mb-2">
                    {instructor.title}
                  </div>
                  
                  <p className="course-card-description text-center mb-4">
                    {instructor.bio}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="font-semibold text-[var(--text-primary)]">
                        {instructor.total_students.toLocaleString()}
                      </div>
                      <div className="body-small">Students</div>
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--text-primary)]">
                        {instructor.total_courses}
                      </div>
                      <div className="body-small">Courses</div>
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--text-primary)] flex items-center justify-center gap-1">
                        {instructor.rating}
                        <Star className="w-3 h-3 fill-current text-yellow-500" />
                      </div>
                      <div className="body-small">Rating</div>
                    </div>
                  </div>
                  
                  <div className="body-small text-[var(--text-secondary)]">
                    {instructor.experience} Experience
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Instructors;