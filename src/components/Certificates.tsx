
import React, { useState } from 'react';
import { Award, Calendar } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import portfolioData from '../data/portfolio.json';

const Certificates = () => {
  const { certificates } = portfolioData;
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
    <section id="certificates" className="py-12 sm:py-16 lg:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 text-white">
            Certificates
          </h2>
          <p className="text-gray-400 text-center mb-12 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-base">
            I have got this skills, and I have got this certificates to prove it !
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {certificates?.map((cert, index) => {
              const isExpanded = expandedCards.includes(index);
              const needsTruncation = cert.description && shouldTruncate(cert.description);
              
              const CertificateCard = (
                <div 
                  key={index} 
                  className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-6 hover:border-purple-500 transition-all duration-300 cursor-pointer"
                  onClick={() => needsTruncation && toggleCardExpansion(index)}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="bg-gray-700 p-2 sm:p-3 rounded-lg flex-shrink-0">
                      <Award className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{cert.name}</h3>
                      <h4 className="text-sm sm:text-lg text-purple-400 mb-2">{cert.issuer}</h4>
                      <div className="flex items-center text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                        <span>{cert.date}</span>
                      </div>
                      
                      {cert.description && (
                        <p className="text-gray-400 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">
                          {needsTruncation && !isExpanded 
                            ? truncateText(cert.description)
                            : cert.description
                          }
                        </p>
                      )}
                      
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-xs sm:text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          View Certificate
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );

              // If certificate has an image, wrap with hover card
              if (cert.certificateImage) {
                return (
                  <HoverCard key={index}>
                    <HoverCardTrigger asChild>
                      {CertificateCard}
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 p-2 bg-gray-800 border-gray-700">
                      <img 
                        src={cert.certificateImage} 
                        alt={`${cert.name} Certificate`} 
                        className="w-full h-auto rounded-lg object-contain" 
                      />
                    </HoverCardContent>
                  </HoverCard>
                );
              }

              // If no image, return the card directly
              return CertificateCard;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
