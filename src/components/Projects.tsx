import React, { useState } from 'react';
import { Github, ExternalLink, Code, Cpu, Globe } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Projects = () => {
  const { projects } = portfolioData;

  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedCards, setExpandedCards] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

  const categories = ['All', 'Web Apps', 'OpenCV'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => {
        const category = project.category?.toLowerCase();
        const filter = activeFilter.toLowerCase();
        
        if (filter === 'web apps') return category === 'webapp';
        if (filter === 'opencv') return category === 'opencv';
        if (filter === 'ai/ml') return category === 'aiml' || category === 'ai';
        return category === filter;
      });

  const toggleCardExpansion = (index) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const truncateText = (text, wordLimit = 25) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const shouldTruncate = (text) => {
    return text.length > 150 || text.split(' ').length > 25;
  };

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const getCategoryIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'webapp': return <Globe className="w-4 h-4" />;
      case 'opencv': return <Cpu className="w-4 h-4" />;
      case 'ai': case 'aiml': return <Code className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const getGradientForCategory = (category) => {
    switch(category?.toLowerCase()) {
      case 'webapp': return 'from-blue-600 to-purple-600';
      case 'opencv': return 'from-green-600 to-teal-600';
      case 'ai': case 'aiml': return 'from-orange-600 to-red-600';
      default: return 'from-indigo-600 to-purple-600';
    }
  };

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
              A showcase of my work spanning web applications, computer vision, and AI-powered tools. 
              Each project demonstrates different aspects of modern software development.
            </p>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-700 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap relative ${
                    activeFilter === category
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {category}
                  {activeFilter === category && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 blur-xl"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const isExpanded = expandedCards.includes(index);
              const needsTruncation = shouldTruncate(project.description);
              const hasImageError = imageErrors[index];
              
              return (
                <div 
                  key={index} 
                  className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    {project.image && !hasImageError ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={() => handleImageError(index)}
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getGradientForCategory(project.category)} relative`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            {getCategoryIcon(project.category)}
                            <div className="text-xs mt-2 font-medium opacity-80">
                              {project.category?.toUpperCase() || 'PROJECT'}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay with tech stack */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies?.slice(0, 3).map((tech, techIndex) => (
                            <span key={techIndex} className="bg-purple-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                              {tech}
                            </span>
                          ))}
                          {project.technologies?.length > 3 && (
                            <span className="bg-gray-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1 text-purple-400 ml-2">
                        {getCategoryIcon(project.category)}
                      </div>
                    </div>
                    
                    <div 
                      className={`text-gray-400 mb-6 leading-relaxed text-sm ${needsTruncation ? 'cursor-pointer' : ''}`}
                      onClick={() => needsTruncation && toggleCardExpansion(index)}
                    >
                      {needsTruncation && !isExpanded 
                        ? truncateText(project.description)
                        : project.description
                      }
                      {needsTruncation && (
                        <span className="text-purple-400 hover:text-purple-300 ml-2 font-medium">
                          {isExpanded ? 'Show less' : 'Read more'}
                        </span>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2.5 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-sm flex items-center justify-center gap-2 group/btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 border border-gray-600 text-gray-300 px-4 py-2.5 rounded-xl font-medium hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 text-sm flex items-center justify-center gap-2 group/btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-8 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-500 mb-4">
                <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p>Try selecting a different category to view more projects.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;