
import React, { useState } from 'react';
import { Github } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Projects = () => {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const categories = ['All', 'WEB APP\'S', 'OpenCV'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => 
        project.category?.toLowerCase() === activeFilter.toLowerCase().replace("'s", "").replace(" ", "")
      );

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
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 text-white">
            Projects
          </h2>
          <p className="text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            I have worked on a wide range of projects. From web apps to openCV apps. Here are some of my projects.
          </p>
          
          {/* Filter Buttons */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="flex bg-gray-800 rounded-full p-1 border border-purple-500 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeFilter === category
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => {
              const isExpanded = expandedCards.includes(index);
              const needsTruncation = shouldTruncate(project.description);
              
              return (
                <div 
                  key={index} 
                  className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 group cursor-pointer"
                  onClick={() => needsTruncation && toggleCardExpansion(index)}
                >
                  <div className="h-32 sm:h-40 md:h-48 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {project.technologies?.slice(0, 4).map((tech, techIndex) => (
                          <span key={techIndex} className="bg-purple-600 text-white px-2 py-1 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed text-xs sm:text-sm">
                      {needsTruncation && !isExpanded 
                        ? truncateText(project.description)
                        : project.description
                      }
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-xs sm:text-sm text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-gray-600 text-gray-300 px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors text-xs sm:text-sm flex items-center justify-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
