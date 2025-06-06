
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'AD.' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'education', label: 'Education' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <img
              src="https://res.cloudinary.com/dhsw1nyfx/image/upload/v1749221400/aravind_qtkpsj.png"
              alt="Aravind"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-xl font-bold text-white">Aravind</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* GitHub Profile Button */}
          <div className="hidden md:block">
            <a href="https://github.com/Anubothu-Aravind"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg border border-purple-500 hover:bg-purple-700 transition-colors"
            >
              Github Profile
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 bg-gray-800/95 backdrop-blur-md rounded-lg border border-gray-700 mt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
            <div className="px-4 pt-3">
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg border border-purple-500 hover:bg-purple-700 transition-colors">
                Github Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
