import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/mock';

const Testimonials = () => {
  return (
    <section className="pad-2xl bg-[var(--bg-section)]">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Student Success Stories</h2>
          <p className="body-large text-[var(--text-secondary)] max-w-2xl mx-auto">
            Don't just take our word for it. Hear from students who've transformed their careers 
            and landed their dream jobs after completing our courses.
          </p>
        </div>

        <div className="ai-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="course-card">
              <div className="course-card-content">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-[var(--accent-primary)] mb-4" />
                
                <p className="body-medium mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">
                      {testimonial.name}
                    </div>
                    <div className="body-small text-[var(--text-secondary)]">
                      {testimonial.role}
                    </div>
                    <div className="body-small text-[var(--accent-text)]">
                      {testimonial.course} Graduate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;