
import React from 'react';
import { Code, Server, Database, Cloud, Palette, BarChart3 } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Skills = () => {
  const { skills } = portfolioData;

  const skillIcons = {
    'Programming': Code,
    'Web Development': Code,
    'AI/ML & DevOps': Server,
    'Cloud & Databases': Cloud,
    'Backend Development': Database,
    'Data Analytics': BarChart3,
    'UI/UX Design': Palette
  };

  const skillDescriptions = {
    'Programming': 'Proficient in C, Java, Python, R, JavaScript, and other programming languages.',
    'Web Development': 'Building responsive and interactive websites using modern frameworks and technologies.',
    'AI/ML & DevOps': 'Expertise in machine learning algorithms and DevOps practices for efficient deployment.',
    'Cloud & Databases': 'Experience with cloud platforms and database management systems.',
    'Backend Development': 'Creating robust server-side applications and API integrations.',
    'Data Analytics': 'Developing cloud-based data analytics using modern tools and techniques.',
    'UI/UX Design': 'Creating user-friendly interfaces with a focus on user experience.'
  };

  const skillEntries = Object.entries(skillDescriptions);

  return (
    <section id="skills" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              My <span className="text-purple-600">Skills</span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Here are my technical skills and areas of expertise that I've developed through education and projects.
            </p>
            <div className="w-20 h-1 bg-purple-600 mx-auto mt-6"></div>
          </div>
          
          {/* Skills Cards Grid - 3 per row with centered last row */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {skillEntries.map(([category, description], index) => {
                const IconComponent = skillIcons[category as keyof typeof skillIcons] || Code;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1 w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)] flex-shrink-0">
                    <div className="text-center h-full">
                      <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-800">
                        {category}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Skills with Icons */}
          <div className="flex flex-wrap justify-center gap-6">
            {skills.map((skillCategory, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300 w-full md:w-[calc(50%-0.75rem)] max-w-md">
                <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">
                  {skillCategory.category}
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center space-x-2 min-w-[100px]">
                      <div className="w-5 h-5 flex-shrink-0">
                        <img 
                          src={skill.icon} 
                          alt={skill.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            // Fallback to a default icon if image fails to load
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <span className="font-medium text-gray-700 text-xs">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
