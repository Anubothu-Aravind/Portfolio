
import React from 'react';
import { Award, MapPin, Mail, Phone, Globe } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const About = () => {
  const { personal, about } = portfolioData;

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              About Me
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-base text-gray-600 leading-relaxed mb-6">
                  {about.summary}
                </p>
              </div>

              {/* Achievement Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">9.6</div>
                  <div className="text-sm text-gray-600">GPA</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">10+</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">1+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
            
            {/* Contact Card */}
            <div className="md:col-span-1">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white sticky top-24">
                <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-200" />
                    <span className="text-sm">{personal.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-200" />
                    <span className="text-sm break-all">{personal.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-200" />
                    <span className="text-sm">{personal.phone}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
