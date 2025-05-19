import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Phone, ChevronRight } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

// Expanded set of premium images for the slider
const slides = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070',
    alt: 'Modern laptop computer setup'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070',
    alt: 'Computer code on screen'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?q=80&w=2069',
    alt: 'Gaming PC with LED lights'
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070',
    alt: 'Tech workspace with multiple screens'
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2068',
    alt: 'Premium computer hardware components'
  },
  {
    id: 6,
    imageUrl: 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?q=80&w=2070',
    alt: 'RTX Graphics card with RGB lighting'
  },
  {
    id: 7,
    imageUrl: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?q=80&w=2070',
    alt: 'Modern gaming setup with RGB peripherals'
  },
  {
    id: 8,
    imageUrl: 'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?q=80&w=2070',
    alt: 'Premium workstation with ultrawide monitor'
  },
  {
    id: 9,
    imageUrl: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=2070', 
    alt: 'Server rack with blue lighting'
  },
  {
    id: 10,
    imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070',
    alt: 'Minimalist desktop setup with plants'
  }
];

// Premium business quotes for typewriter effect
const quotes = [
  "Empowering your future with cutting‑edge technology.",
  "Your trusted partner in IT solutions & support.",
  "Fast. Secure. Reliable. Always online.",
  "Turning tech challenges into seamless experiences.",
  "Upgrade smarter, not harder.",
  "Maximize performance. Minimize downtime.",
  "Innovation at the speed of light.",
  "From custom builds to killer upgrades.",
  "Where passion for PCs meets professional service.",
  "We speak fluent hardware & software."
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Track mouse movement for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({
        x: (e.clientX - window.innerWidth / 2) / 25,
        y: (e.clientY - window.innerHeight / 2) / 25,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  // Animation effect on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Enhanced animated gradient background to replace particles */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-blue-900/20 to-black">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-20"></div>
        <div className="absolute inset-0 animate-pulse-slow bg-gradient-to-b from-blue-500/5 to-indigo-500/5"></div>
        <div className="star-field"></div>
      </div>
      
      {/* Background Slides with premium effect */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
            currentSlide === index ? 'opacity-70' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 z-10"></div>
          <img 
            src={slide.imageUrl} 
            alt={slide.alt}
            className="w-full h-full object-cover object-center"
            style={{
              animation: currentSlide === index ? 'premium-zoom 10s ease-in-out infinite alternate' : 'none',
              filter: 'brightness(0.7) contrast(1.1) saturate(1.2)',
            }}
          />
        </div>
      ))}
      
      {/* Main content with premium 3D effect */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-white container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mx-auto text-center"
          style={{ 
            perspective: "1000px",
            transform: `rotateX(${cursorPosition.y * 0.1}deg) rotateY(${-cursorPosition.x * 0.1}deg)`
          }}
        >
          {/* 3D Hero Title with premium effect */}
          <motion.div
            className="relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <h1 className="mb-6">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 premium-text-intro">
                Welcome to
              </div>
              <div className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-black premium-text-main relative inline-block">
                Sri Pavan Computers
                <div className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
              </div>
            </h1>
            
            {/* Typewriter with premium style */}
            <div className="mb-10 h-16 overflow-hidden premium-text-container"> 
              <div className="text-xl sm:text-2xl font-medium premium-typewriter">
                <Typewriter
                  options={{
                    strings: quotes,
                    autoStart: true,
                    loop: true,
                    delay: 40,
                    deleteSpeed: 20,
                    wrapperClassName: "typewriter-wrapper",
                    cursorClassName: "typewriter-cursor",
                  }}
                />
              </div>
            </div>
          </motion.div>
          
          {/* Premium buttons with dynamic hover effects - centered text */}
          <motion.div 
            className="flex flex-row items-center justify-center gap-2 sm:gap-3 mt-5 sm:mt-6 w-full"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button 
              asChild 
              size="sm" 
              className="premium-button-primary group relative overflow-hidden text-xs sm:text-sm font-medium py-1.5 px-4 sm:px-5 rounded min-w-0 flex-1 sm:flex-none max-w-[150px] sm:max-w-[170px] h-auto"
            >
              <Link to="/pc-builder" className="flex items-center justify-center">
                <span className="relative z-10 whitespace-nowrap text-center">Build Your Dream PC</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 z-0"></span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500 to-indigo-500 z-0 transition-opacity"></span>
                <span className="absolute -inset-px rounded border border-white/20 z-0"></span>
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="sm" 
              className="premium-button-secondary group relative overflow-hidden text-xs sm:text-sm py-1.5 px-4 sm:px-5 font-medium rounded min-w-0 flex-1 sm:flex-none max-w-[110px] sm:max-w-[130px] h-auto"
            >
              <a href="tel:+919848075759" className="flex items-center justify-center">
                <Phone className="h-3 w-3 mr-1.5" />
                <span className="whitespace-nowrap text-center">Call Now</span>
                <span className="absolute inset-0 border border-white/20 rounded z-0"></span>
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity z-0"></span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Premium slide indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              currentSlide === index 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 w-10 shadow-lg shadow-blue-500/30' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Decorative elements - enhanced for better visual effect without particles */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-[120px] opacity-10 -translate-y-1/2 -translate-x-1/2 animate-float"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-[140px] opacity-10 -translate-y-1/2 translate-x-1/2 animate-float-delayed"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500 rounded-full filter blur-[100px] opacity-10 animate-float-reverse"></div>
      
      <style>
        {`
          @keyframes premium-zoom {
            0% { transform: scale(1); filter: brightness(0.7); }
            100% { transform: scale(1.1); filter: brightness(0.8); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-10px) translateX(5px); }
          }
          
          @keyframes float-delayed {
            0%, 100% { transform: translateY(-50%) translateX(50%); }
            50% { transform: translateY(-50%) translateX(50%) translateY(-15px); }
          }
          
          @keyframes float-reverse {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(10px) translateX(-5px); }
          }
          
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          
          .animate-float-delayed {
            animation: float-delayed 12s ease-in-out infinite;
          }
          
          .animate-float-reverse {
            animation: float-reverse 10s ease-in-out infinite;
          }
          
          .animate-pulse-slow {
            animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          /* Star field animation */
          .star-field {
            position: absolute;
            inset: 0;
            overflow: hidden;
          }
          
          .star-field:before, .star-field:after {
            content: '';
            position: absolute;
            inset: 0;
            background-image: 
              radial-gradient(white 1px, transparent 0),
              radial-gradient(white 1px, transparent 0);
            background-position: 0 0, 25px 25px;
            background-size: 50px 50px;
            opacity: 0.1;
          }
          
          .star-field:after {
            background-position: 25px 0, 50px 25px;
            animation: starMove 100s linear infinite;
          }
          
          @keyframes starMove {
            from { transform: translateY(0); }
            to { transform: translateY(100%); }
          }
          
          /* Existing premium styles */
          .premium-text-intro {
            background: linear-gradient(to right, #ffffff, #e0e0e0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
          }
          
          .premium-text-main {
            background: linear-gradient(to bottom, #ffffff, #f0f0f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
            letter-spacing: -0.03em;
          }
          
          .premium-typewriter {
            color: rgba(255, 255, 255, 0.9);
            text-shadow: 0 0 10px rgba(150, 150, 255, 0.5);
          }
          
          .premium-text-container {
            position: relative;
          }
          
          .premium-text-container:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 10%;
            right: 10%;
            height: 1px;
            background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
          }
          
          .typewriter-cursor {
            color: #3b82f6;
          }
          
          .premium-button-primary {
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
          }
          
          .premium-button-primary:hover {
            box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15) inset;
            transform: translateY(-2px);
          }
          
          .premium-button-secondary {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.05);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
            transition: all 0.3s ease;
          }
          
          .premium-button-secondary:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
            transform: translateY(-2px);
          }

          /* Responsive improvements for premium buttons */
          @media (max-width: 640px) {
            .premium-button-primary, .premium-button-secondary {
              height: auto;
              min-height: 2rem;
              display: flex;
              align-items: center;
              justify-content: center;
              padding-top: 0.375rem;
              padding-bottom: 0.375rem;
              font-size: 0.75rem;
            }
            
            .premium-text-main {
              font-size: clamp(2rem, 8vw, 3.5rem);
            }
            
            .premium-text-intro {
              font-size: clamp(1.5rem, 5vw, 2.5rem);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
