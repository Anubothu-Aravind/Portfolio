
import React, { useEffect, useRef } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Hero = () => {
  const { personal } = portfolioData;
  const typedTextRef = useRef<HTMLSpanElement>(null);
  const typedInstance = useRef<any>(null);

  useEffect(() => {
    const loadTyped = async () => {
      const Typed = (await import('typed.js')).default;
      
      if (typedTextRef.current) {
        typedInstance.current = new Typed(typedTextRef.current, {
          strings: ["Student...", "Developer...", "AI Enthusiast..."],
          loop: true,
          typeSpeed: 100,
          backSpeed: 80,
          backDelay: 2000
        });
      }
    };

    loadTyped();

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
    // Create a temporary link to download the resume
    const link = document.createElement('a');
    link.href = '/assets/resume/Anubothu_Aravind_Resume.pdf';
    link.download = 'Anubothu_Aravind_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative overflow-hidden">
      {/* Dynamic Background Animation */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}></div>
        </div>
        
        {/* Floating Dots */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Moving Lines */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"
              style={{
                width: '200px',
                top: `${20 + i * 30}%`,
                left: '-200px',
                animation: `line-move ${8 + i * 2}s linear infinite`,
                animationDelay: `${i * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {personal.name}
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl mb-6 text-purple-300 font-light min-h-[40px]">
            <span ref={typedTextRef}></span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg mb-8 max-w-2xl mx-auto leading-relaxed text-gray-200">
            Passionate about building intelligent systems and innovative solutions through modern web technologies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <button
              onClick={scrollToAbout}
              className="bg-purple-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
            >
              Learn More
            </button>
            <button
              onClick={downloadResume}
              className="border-2 border-purple-500 text-purple-300 px-6 py-2.5 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105 text-sm flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Download Resume
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white px-6 py-2.5 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 text-sm"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
      >
        <ChevronDown size={24} className="text-white/70 hover:text-white transition-colors" />
      </button>
      
      <style>
        {`
          @keyframes grid-move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes line-move {
            0% { left: -200px; }
            100% { left: 100%; }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
