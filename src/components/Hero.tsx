import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Phone } from 'lucide-react';

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

// Subheadings for typewriter effect
const typewriterSubheadings = [
  "Premium IT Products Delivered Fast ⚡",
  "Expert Computer & Laptop Repair 🔧",
  "Robust Networking Solutions 🌐",
  "Secure Data Recovery Services 🔒",
  "Comprehensive Cloud & Security ☁️"
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSubheading, setCurrentSubheading] = useState(0);
  const [typingStatus, setTypingStatus] = useState<'typing' | 'pausing' | 'deleting'>('typing');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Animation effect on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced typewriter effect controller
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    let timer: ReturnType<typeof setTimeout>;
    const currentText = typewriterSubheadings[currentSubheading];
    
    switch (typingStatus) {
      case 'typing':
        // Typing speed: ~30 chars per second
        timer = setTimeout(() => {
          setTypingStatus('pausing');
        }, (currentText.length * 33) + 300);
        break;
        
      case 'pausing':
        // Pause duration after typing
        timer = setTimeout(() => {
          setTypingStatus('deleting');
        }, 2000);
        break;
        
      case 'deleting':
        // Deletion speed: ~45 chars per second (faster than typing)
        timer = setTimeout(() => {
          setCurrentSubheading((prev) => (prev + 1) % typewriterSubheadings.length);
          setTypingStatus('typing');
        }, (currentText.length * 22) + 300);
        break;
    }
    
    return () => clearTimeout(timer);
  }, [typingStatus, currentSubheading, prefersReducedMotion]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Slides with improved transitions */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 z-10"></div>
          <img 
            src={slide.imageUrl} 
            alt={slide.alt}
            className="w-full h-full object-cover object-center scale-110"
            style={{
              animation: currentSlide === index ? 'zoomEffect 6s ease-in-out' : 'none'
            }}
          />
        </div>
      ))}
      
      {/* Decorative elements */}
      <div className="absolute inset-0 z-10 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-accent/20 blur-3xl animate-pulse-subtle"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-primary/20 blur-3xl animate-float"></div>
      </div>
      
      {/* Content with enhanced animations */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-white container mx-auto px-4 md:px-6 lg:px-8">
        <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Main heading with improved typewriter animation and responsive sizing */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-4 md:mb-6 leading-tight tracking-tight drop-shadow-lg px-2 sm:px-0">
            <span className={`inline-flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 ${prefersReducedMotion ? '' : 'main-typewriter'}`}>
              <span className="whitespace-nowrap">Welcome to</span>{' '}
              <span className="text-accent font-bold relative whitespace-nowrap">
                Sri Pavan Computers
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-accent/60 rounded-full transform scale-x-0 animate-expand-line"></span>
              </span>
            </span>
          </h1>
          
          {/* Enhanced subheading typewriter container - removed background blur and shadow */}
          <div className="h-16 sm:h-20 mb-8 flex items-center justify-center overflow-hidden">
            <div className="relative px-4 py-2 rounded-lg">
              {!prefersReducedMotion ? (
                <p 
                  className={`text-lg sm:text-xl md:text-2xl font-normal leading-snug subheading-typewriter ${typingStatus}`}
                  data-text={typewriterSubheadings[currentSubheading]}
                  style={{
                    '--char-count': typewriterSubheadings[currentSubheading].length,
                  } as React.CSSProperties}
                >
                  {typewriterSubheadings[currentSubheading]}
                </p>
              ) : (
                <p className="text-lg sm:text-xl md:text-2xl font-normal">
                  {typewriterSubheadings[currentSubheading]}
                </p>
              )}
            </div>
          </div>

          {/* Enhanced button section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 sm:mt-8 w-full max-w-md mx-auto">
            <Button 
              asChild 
              size="lg" 
              className="gap-2 bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-accent/20 hover:shadow-xl transition-all w-full sm:w-auto text-lg font-bold py-7 animate-bounce-subtle"
            >
              <Link to="/pc-builder">
                Build Your Dream PC
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="bg-white/10 backdrop-blur-sm border-white/40 gap-2 hover:bg-white/20 transition-all w-full sm:w-auto text-lg py-7 font-bold"
            >
              <a href="tel:+919848075759">
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-accent scale-125 shadow-md shadow-accent/50' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <style>
        {`
          @keyframes zoomEffect {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.1);
            }
          }
          
          @keyframes bounce-subtle {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }
          
          @keyframes pulse-subtle {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
          }
          
          .animate-bounce-subtle {
            animation: bounce-subtle 2s ease-in-out infinite;
          }
          
          .animate-pulse-subtle {
            animation: pulse-subtle 3s ease-in-out infinite;
          }
          
          /* Typewriter animation for main heading */
          @keyframes typeMain {
            from { width: 0; }
            to { width: 100%; }
          }
          
          @keyframes blink {
            from, to { border-color: transparent; }
            50% { border-color: white; }
          }
          
          .typewriter-main {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            border-right: 3px solid white;
            animation: 
              typeMain 3s steps(30, end) 1 forwards,
              blink 0.8s step-end infinite;
            width: 0;
          }
          
          /* Typewriter animation for subheadings */
          @keyframes typeSub {
            from { width: 0; }
            to { width: 100%; }
          }
          
          @keyframes deleteSub {
            from { width: 100%; }
            to { width: 0; }
          }
          
          .typewriter-subheading {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            border-right: 3px solid white;
            width: 0;
          }
          
          .typewriter-subheading.typing {
            width: 0;
            animation: 
              typeSub var(--typing-duration) steps(var(--steps), end) 1 forwards,
              blink 0.8s step-end infinite;
          }
          
          .typewriter-subheading.pausing {
            width: 100%;
            animation: 
              blink 0.8s step-end infinite;
          }
          
          .typewriter-subheading.deleting {
            width: 100%;
            animation: 
              deleteSub var(--deleting-duration) steps(var(--steps), end) 1 forwards,
              blink 0.8s step-end infinite;
          }

          /* Enhanced typewriter animations */
          .main-typewriter {
            position: relative;
            width: 0;
            overflow: hidden;
            white-space: nowrap;
            animation: typeMain 2s steps(40, end) forwards;
          }

          .subheading-typewriter {
            display: inline-block;
            position: relative;
            white-space: nowrap;
            overflow: hidden;
          }

          .subheading-typewriter::after {
            content: '';
            position: absolute;
            right: -4px;
            top: 50%;
            transform: translateY(-50%);
            height: 80%;
            width: 3px;
            background: currentColor;
            animation: blink 0.8s step-end infinite;
          }

          .subheading-typewriter.typing {
            width: 0;
            animation: type calc(var(--char-count) * 33ms) steps(var(--char-count)) forwards;
          }

          .subheading-typewriter.pausing {
            width: 100%;
          }

          .subheading-typewriter.deleting {
            width: 100%;
            animation: delete calc(var(--char-count) * 22ms) steps(var(--char-count)) forwards;
          }

          @keyframes typeMain {
            to { width: 100%; }
          }

          @keyframes type {
            to { width: 100%; }
          }

          @keyframes delete {
            to { width: 0; }
          }

          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }

          @keyframes expand-line {
            to { transform: scaleX(1); }
          }

          /* Media query optimization */
          @media (max-width: 640px) {
            .subheading-typewriter.typing,
            .subheading-typewriter.deleting {
              animation-duration: calc(var(--char-count) * 25ms);
            }
          }

          /* Responsive text adjustments */
          @media (max-width: 360px) {
            .main-typewriter {
              font-size: 1.875rem; /* text-3xl */
              line-height: 1.2;
            }
          }

          @media (min-width: 361px) and (max-width: 480px) {
            .main-typewriter {
              font-size: 2.25rem; /* text-4xl */
              line-height: 1.2;
            }
          }

          /* Add line break for smaller screens */
          @media (max-width: 640px) {
            .main-typewriter {
              display: inline-flex;
              flex-direction: column;
              gap: 0.25rem;
            }
          }

          /* Fix for main title visibility */
          .main-title {
            white-space: normal;
            width: 100%;
            display: inline-block;
          }

          /* Only apply typewriter effects on smaller screens where it fits */
          @media (max-width: 1024px) {
            .main-title {
              position: relative;
              width: 0;
              overflow: hidden;
              white-space: nowrap;
              animation: typeMain 2s steps(40, end) forwards;
            }
          }

          /* Ensure maximum visibility on large screens */
          @media (min-width: 1025px) {
            h1 {
              font-size: clamp(2.5rem, 5vw, 4.5rem);
              width: 100%;
              white-space: normal;
              word-wrap: break-word;
            }
          }

          /* Fix for main title visibility */
          .main-title {
            white-space: normal;
            width: 100%;
            display: block;
          }

          /* Responsively sized text */
          h1 {
            width: 100%;
            white-space: normal;
            word-wrap: break-word;
            overflow-wrap: break-word;
            display: block;
            padding: 0 0.5rem;
          }

          /* Fix subheading container */
          .subheading-typewriter {
            display: inline-block;
            position: relative;
            white-space: pre-wrap;
            word-break: break-word;
            overflow: hidden;
            max-width: 100%;
          }

          /* Only apply typewriter animation on larger screens */
          @media (min-width: 640px) {
            .subheading-typewriter {
              white-space: nowrap;
            }
          }

          /* Make sure subheadings are visible on small screens */
          @media (max-width: 639px) {
            .subheading-typewriter.typing,
            .subheading-typewriter.pausing,
            .subheading-typewriter.deleting {
              width: 100% !important;
              animation: none !important;
            }
            
            .subheading-typewriter::after {
              display: none;
            }
          }

          /* Override typewriter animations on very small screens to ensure visibility */
          @media (max-width: 480px) {
            .h-20 {
              height: auto !important;
              min-height: 5rem;
              padding: 0.5rem 0;
            }
          }

          /* Improved typewriter animation for main heading */
          .main-typewriter {
            display: inline-flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.5rem;
            overflow: visible;
            white-space: normal;
          }

          /* Fix typewriter spacing */
          .main-typewriter span {
            display: inline-block;
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
