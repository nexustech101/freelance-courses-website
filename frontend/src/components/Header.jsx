import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, User, ShoppingCart } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="nav-header">
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold text-[var(--text-primary)]">
          TechLearn
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        <a href="#courses" className="nav-link">Courses</a>
        <a href="#instructors" className="nav-link">Instructors</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex items-center gap-3">
        <Button variant="ghost" size="sm" className="nav-link">
          <User className="w-4 h-4 mr-2" />
          Sign In
        </Button>
        <Button className="btn-primary">
          Get Started
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-[var(--border-light)] rounded-lg mt-2 p-4 mx-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-4">
            <a href="#courses" className="nav-link">Courses</a>
            <a href="#instructors" className="nav-link">Instructors</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            <div className="flex flex-col gap-2 pt-4 border-t border-[var(--border-light)]">
              <Button variant="ghost" className="nav-link justify-start">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Button className="btn-primary">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;