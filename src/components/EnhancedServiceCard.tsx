import React, { useRef, useState, useEffect } from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EnhancedServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  backgroundImage: string;
  link?: string;
  animationDelay?: number; // Add delay option for staggered animations
}

const EnhancedServiceCard: React.FC<EnhancedServiceCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  backgroundImage,
  link = "/services",
  animationDelay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Enhanced useEffect with animation delay support
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );

      if (cardRef.current) {
        observer.observe(cardRef.current);
      }

      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current);
        }
      };
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [animationDelay]);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 h-80 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Add accessibility attributes
      role="button"
      tabIndex={0}
      aria-label={`Service: ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          window.location.href = link;
        }
      }}
    >
      {/* Background image with lazy loading and zoom effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      ></div>
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
      
      {/* Hover glow border effect */}
      <div 
        className={`absolute inset-0 rounded-lg border-2 transition-all duration-300 ${
          isHovered ? "border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "border-transparent"
        }`}
      ></div>
      
      {/* Content container - Enhanced with better transitions */}
      <div className="relative h-full z-10 flex flex-col justify-end p-6 text-white">
        <div className={`mb-4 transition-all duration-500 ${isHovered ? 'transform translate-y-0' : 'transform translate-y-2'}`}>
          <div className={`bg-white/10 backdrop-blur-sm rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4 transition-all duration-300 ${
            isHovered ? "bg-white/20 scale-110" : "bg-white/10"
          }`}>
            <Icon className={`h-7 w-7 text-white transition-all duration-300 ${isHovered ? "text-primary-100" : "text-white"}`} />
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-white/90 text-sm mb-4">{description}</p>
          
          <Link 
            to={link} 
            className={`inline-flex items-center text-white font-medium mt-2 group transition-all duration-300 ${
              isHovered ? "text-primary-100" : "text-white"
            }`}
            aria-label={`Learn more about ${title}`}
          >
            Learn more
            <ArrowRight className={`ml-2 h-4 w-4 transform transition-all duration-300 ${
              isHovered ? "translate-x-1" : "translate-x-0"
            }`} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnhancedServiceCard;
