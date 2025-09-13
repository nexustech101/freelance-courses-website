import React from 'react';
import { Button } from './ui/button';
import { Play, Star, Users, BookOpen } from 'lucide-react';
import { useStats } from '../hooks/useStats';

const Hero = () => {
  const { stats, loading, error } = useStats();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Master Tech Skills That
          <br />
          <span className="text-[var(--accent-text)]">Launch Careers</span>
        </h1>
        
        <p className="hero-subtitle">
          Join thousands of developers who've transformed their careers with our expert-led programming courses. 
          From beginner to professional, we'll guide your journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button className="btn-primary text-lg px-8 py-4">
            <BookOpen className="w-5 h-5 mr-2" />
            Explore Courses
          </Button>
          <Button className="btn-secondary text-lg px-8 py-4">
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="heading-3 text-[var(--accent-text)]">
              {loading ? "..." : `${stats.total_students.toLocaleString()}+`}
            </div>
            <div className="body-small">Students</div>
          </div>
          <div className="text-center">
            <div className="heading-3 text-[var(--accent-text)]">
              {loading ? "..." : `${stats.total_courses}+`}
            </div>
            <div className="body-small">Courses</div>
          </div>
          <div className="text-center">
            <div className="heading-3 text-[var(--accent-text)]">
              {loading ? "..." : `${stats.satisfaction_rate}%`}
            </div>
            <div className="body-small">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="heading-3 text-[var(--accent-text)] flex items-center justify-center gap-1">
              {loading ? "..." : stats.avg_rating}
              <Star className="w-4 h-4 fill-current" />
            </div>
            <div className="body-small">Average Rating</div>
          </div>
        </div>

        {error && (
          <div className="mt-4 text-center text-red-500 body-small">
            {error}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;