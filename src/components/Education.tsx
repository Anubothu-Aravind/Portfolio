
import React, { useState } from 'react';
import { Book, Calendar } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Education = () => {
  const { education } = portfolioData;
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCardExpansion = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const truncateText = (text: string, wordLimit: number = 30) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const shouldTruncate = (text: string) => {
    return text.length > 200 || text.split(' ').length > 30;
  };

  return (
    <section id="education" className="py-12 sm:py-16 lg:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 text-white">
            Education
          </h2>
          <p className="text-gray-400 text-center mb-12 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-base">
            My education has been a journey of self-discovery and growth. My educational details are as follows.
          </p>
          
          <div className="relative">
            {/* Timeline line - Hidden on mobile */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-purple-500 hidden sm:block"></div>
            
            <div className="space-y-8 sm:space-y-12">
              {education.map((edu, index) => {
                const isExpanded = expandedCards.includes(index);
                const needsTruncation = shouldTruncate(edu.description);
                
                return (
                  <div key={index} className="relative">
                    {/* Timeline dot - Hidden on mobile */}
                    <div className="absolute left-4 w-4 h-4 bg-purple-500 rounded-full border-4 border-gray-900 hidden sm:block"></div>
                    
                    {/* Content */}
                    <div className="sm:ml-16">
                      <div 
                        className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-6 hover:border-purple-500 transition-all duration-300 cursor-pointer"
                        onClick={() => needsTruncation && toggleCardExpansion(index)}
                      >
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="bg-gray-700 p-2 sm:p-3 rounded-lg flex-shrink-0 relative">
                            <img 
                              src={edu.logo || `/assets/images/education/${edu.institution.toLowerCase().replace(/\s+/g, '_')}.png`} 
                              alt={`${edu.institution} logo`} 
                              className="w-6 h-6 sm:w-8 sm:h-8 rounded object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const nextElement = target.nextElementSibling as HTMLElement;
                                if (nextElement) {
                                  nextElement.style.display = 'block';
                                }
                              }}
                            />
                            <Book className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 hidden" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                              {edu.institution}, {edu.location}
                            </h3>
                            <h4 className="text-sm sm:text-lg text-purple-400 mb-2">
                              {edu.degree}
                            </h4>
                            <div className="flex items-center text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                              <span>{edu.duration}</span>
                            </div>
                            
                            {edu.gpa && (
                              <div className="mb-3 sm:mb-4">
                                <p className="text-gray-300 text-xs sm:text-sm">
                                  <span className="font-semibold">Grade:</span> {edu.gpa}
                                </p>
                              </div>
                            )}
                            
                            {edu.description && (
                              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                                {needsTruncation && !isExpanded 
                                  ? truncateText(edu.description)
                                  : edu.description
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
