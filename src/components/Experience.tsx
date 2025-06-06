import React, { useState } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Experience = () => {
  const { experience } = portfolioData;
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [imageErrors, setImageErrors] = useState<number[]>([]);

  const toggleCardExpansion = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => [...prev, index]);
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
    <section id="experience" className="py-12 sm:py-16 lg:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 text-white">
            Experience
          </h2>
          <p className="text-gray-400 text-center mb-12 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-base">
            My work experience as a software engineer and working on different companies and projects.
          </p>
          
          <div className="relative">
            {/* Timeline line - Hidden on mobile */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-purple-500 hidden sm:block"></div>
            
            <div className="space-y-8 sm:space-y-12">
              {experience.map((job, index) => {
                const isExpanded = expandedCards.includes(index);
                const needsTruncation = shouldTruncate(job.description);
                const hasImageError = imageErrors.includes(index);
                
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
                          {/* Company Logo or Briefcase Icon */}
                          <div className="bg-gray-700 p-2 sm:p-3 rounded-lg flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                            {job.logo && !hasImageError ? (
                              <img 
                                src={job.logo}
                                alt={`${job.company} logo`}
                                className="w-full h-full object-contain rounded"
                                onError={() => handleImageError(index)}
                                onLoad={() => console.log(`Image loaded successfully: ${job.logo}`)}
                                crossOrigin="anonymous"
                              />
                            ) : (
                              <Briefcase className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{job.position}</h3>
                            <h4 className="text-sm sm:text-lg text-purple-400 mb-2">{job.company} | {job.type}</h4>
                            <div className="flex items-center text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                              <span>{job.duration}</span>
                            </div>
                            
                            {job.description && (
                              <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                                {needsTruncation && !isExpanded 
                                  ? truncateText(job.description)
                                  : job.description
                                }
                              </p>
                            )}
                            
                            <div className="mb-3 sm:mb-4">
                              <p className="text-gray-300 text-xs sm:text-sm">
                                <span className="font-semibold">Skills:</span> {job.technologies?.join(' • ')}
                              </p>
                            </div>
                            
                            {/* Debug info - remove in production
                            {process.env.NODE_ENV === 'development' && job.logo && (
                              <div className="text-xs text-gray-500 mt-2">
                                Logo URL: {job.logo}
                                {hasImageError && <span className="text-red-400 ml-2">(Failed to load)</span>}
                              </div>
                            )} */}
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

export default Experience;