import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  fullScreen?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ fullScreen = true }) => {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Control animation sequence
  useEffect(() => {
    // Start tagline animation after logo is loaded
    if (isLogoLoaded) {
      setTimeout(() => setShowTagline(true), 300);
    }
  }, [isLogoLoaded]);

  // Add effect to control body scrolling
  useEffect(() => {
    // Prevent body scrolling when loading screen is active
    if (fullScreen) {
      document.body.style.overflow = 'hidden';
    }
    
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [fullScreen]);

  return (
    <div className={`flex flex-col items-center justify-center bg-primary text-white ${
      fullScreen ? 'fixed inset-0 z-[9999]' : 'w-full py-12'
    }`}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999, // Ensure this is higher than nav z-index
    }}>
      <div className="relative flex flex-col items-center">
        {/* Logo with enhanced animation and increased size */}
        <div className="relative mb-6 overflow-hidden animate-float">
          <div className={`transform transition-all duration-1000 ${isLogoLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <img 
              src="https://res.cloudinary.com/dvmrhs2ek/image/upload/v1747489653/lrdbe9o7g7mwfbcb59tw.png" 
              alt="Sri Pavan Computers" 
              className="w-96 md:w-[28rem] h-auto filter drop-shadow-lg"
              onLoad={() => setIsLogoLoaded(true)}
            />
          </div>
          
          {/* Add subtle glow behind logo */}
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full -z-10"></div>
          
          {/* Animated highlight effect */}
          <div className={`absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -skew-x-20 ${
            isLogoLoaded ? 'animate-shine' : 'hidden'
          }`}></div>
        </div>
        
        {/* Taglines with enhanced animations */}
        <div className={`overflow-hidden mb-8 transition-all duration-300 ${showTagline ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-white font-medium text-lg md:text-xl text-center loading-tagline">
            One Stop for All Your Tech Needs.
          </p>
        </div>
        
        {/* Premium loading indicator with gradient animation */}
        <div className="flex flex-col items-center gap-3">
          {/* Progress bar with gradient animation */}
          <div className="w-64 h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-accent to-blue-400 rounded-full transition-all duration-300 ease-out animate-gradient"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          
          {/* Pulsing dots - brightened for visibility */}
          <div className="flex items-center justify-center space-x-3 mt-2">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse-dot delay-0"></div>
              <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-accent animate-pulse-ring"></div>
            </div>
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse-dot delay-300"></div>
              <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-accent animate-pulse-ring delay-300"></div>
            </div>
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse-dot delay-600"></div>
              <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-accent animate-pulse-ring delay-600"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add extra CSS animations */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
        
        .animate-shine {
          animation: shine 2s infinite;
        }
        
        .loading-tagline {
          overflow: hidden;
          border-right: 3px solid #ffffff;
          white-space: nowrap;
          margin: 0 auto;
          animation: 
            typing 2.5s steps(30, end),
            blink-caret 0.75s step-end infinite;
        }
        
        /* Add second tagline animation */
        .second-tagline {
          overflow: hidden;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(10px);
          animation: fadeInUp 1s ease-out 2.8s forwards;
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Add floating animation for logo */
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Enhance progress bar with gradient animation */
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 3s ease infinite;
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.7); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0; }
          100% { transform: scale(0.7); opacity: 0; }
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
        
        .delay-600 {
          animation-delay: 600ms;
        }

        /* Ensure body doesn't scroll during loading */
        body.loading-active {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
