import React from 'react';
import { Code, Smartphone, Brain, Cloud } from 'lucide-react';
import { courseCategories } from '../data/mock';

const iconMap = {
  'Code': Code,
  'Smartphone': Smartphone,
  'Brain': Brain,
  'Cloud': Cloud
};

const Categories = () => {
  return (
    <section className="pad-2xl bg-[var(--bg-section)]">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Course Categories</h2>
          <p className="body-large text-[var(--text-secondary)] max-w-2xl mx-auto">
            Explore our comprehensive range of programming and technology courses 
            designed to take you from beginner to professional.
          </p>
        </div>

        <div className="ai-grid">
          {courseCategories.map(category => {
            const IconComponent = iconMap[category.icon];
            return (
              <div 
                key={category.id} 
                className="course-card cursor-pointer group"
              >
                <div className="course-card-content text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-[var(--accent-wash)] rounded-full group-hover:bg-[var(--accent-primary)] transition-colors">
                      <IconComponent className="w-8 h-8 text-[var(--accent-text)] group-hover:text-white" />
                    </div>
                  </div>
                  
                  <h3 className="course-card-title text-center mb-2">
                    {category.name}
                  </h3>
                  
                  <p className="course-card-description text-center mb-4">
                    {category.description}
                  </p>
                  
                  <div className="body-small text-[var(--accent-text)] font-medium">
                    {category.courses.length} Course{category.courses.length !== 1 ? 's' : ''} Available
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;