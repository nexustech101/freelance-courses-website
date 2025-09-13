import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[var(--text-primary)] text-white pad-2xl">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="text-xl font-bold mb-4">TechLearn</div>
            <p className="body-medium text-gray-300 mb-4">
              Empowering developers worldwide with cutting-edge programming courses 
              taught by industry experts.
            </p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#courses" className="text-gray-300 hover:text-white transition-colors">All Courses</a></li>
              <li><a href="#instructors" className="text-gray-300 hover:text-white transition-colors">Instructors</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#blog" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#web-dev" className="text-gray-300 hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#mobile-dev" className="text-gray-300 hover:text-white transition-colors">Mobile Development</a></li>
              <li><a href="#data-science" className="text-gray-300 hover:text-white transition-colors">Data Science</a></li>
              <li><a href="#devops" className="text-gray-300 hover:text-white transition-colors">DevOps & Cloud</a></li>
              <li><a href="#ai-ml" className="text-gray-300 hover:text-white transition-colors">AI & Machine Learning</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--accent-primary)]" />
                <span className="text-gray-300">hello@techlearn.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--accent-primary)]" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--accent-primary)]" />
                <span className="text-gray-300">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 body-small">
            © 2024 TechLearn. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#privacy" className="text-gray-400 hover:text-white transition-colors body-small">
              Privacy Policy
            </a>
            <a href="#terms" className="text-gray-400 hover:text-white transition-colors body-small">
              Terms of Service
            </a>
            <a href="#cookies" className="text-gray-400 hover:text-white transition-colors body-small">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;