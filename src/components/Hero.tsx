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

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
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
      
      {/* Content matching the screenshot design */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-white container mx-auto px-4">
        <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Main heading matching screenshot */}
          <h1 className="text-center mb-4 md:mb-6">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
              Welcome to
            </div>
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-accent">
              Sri Pavan Computers
            </div>
          </h1>
          
          {/* Simple subheading as shown in screenshot */}
          <div className="mb-8">
            <p className="text-xl sm:text-2xl font-medium">
              Expert Computer & Laptop Repair 🔧
            </p>
          </div>
          
          {/* Button layout matching screenshot */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 sm:mt-8 w-full max-w-md mx-auto">
            <Button 
              asChild 
              size="lg" 
              className="gap-2 bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-accent/20 transition-all w-full sm:w-auto text-lg font-medium py-7"
            >
              <Link to="/pc-builder">
                Build Your Dream PC
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-white border-2 gap-2 hover:bg-white/10 transition-all w-full sm:w-auto text-lg py-7 font-medium"
            >
              <a href="tel:+919848075759">
                <Phone className="h-5 w-5 mr-1" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Slide indicators matching screenshot */}
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
        `}
      </style>
    </div>
  );
};

export default Hero;
