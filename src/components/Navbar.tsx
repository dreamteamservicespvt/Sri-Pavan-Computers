import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, User, LogIn, LogOut, ChevronRight, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/use-auth';
import ShoppingCart from './ShoppingCart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

// Separate component for premium navigation links with luxury styling
const NavLinks = ({ 
  isActive, 
  isMobile, 
  closeMenu,
  scrollToSection
}: { 
  isActive: (path: string) => boolean; 
  isMobile: boolean;
  closeMenu: () => void;
  scrollToSection: (sectionId: string) => void;
}) => {
  // Premium link styles with luxury animations and effects
  const linkClass = isMobile 
    ? "text-base font-medium block py-4 px-4 transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-blue-700 relative border-b border-gray-100" 
    : "luxury-nav-link px-3 py-1.5 font-medium text-white/90 hover:text-white transition-all duration-300 relative overflow-hidden";
  
  const activeLinkClass = isMobile
    ? "text-base font-medium block py-4 px-4 text-blue-700 bg-gradient-to-r from-blue-50 to-transparent relative border-b border-gray-100"
    : "luxury-nav-link active px-3 py-1.5 font-medium text-white relative overflow-hidden";
  
  return (
    <>
      <Link to="/" className={isActive('/') ? activeLinkClass : linkClass} onClick={closeMenu}>Home</Link>
      <Link to="/about" className={isActive('/about') ? activeLinkClass : linkClass} onClick={closeMenu}>About</Link>
      <Link to="/products" className={isActive('/products') ? activeLinkClass : linkClass} onClick={closeMenu}>Products</Link>
      <Link to="/services" className={isActive('/services') ? activeLinkClass : linkClass} onClick={closeMenu}>Services</Link>
      <Link to="/brands" className={isActive('/brands') ? activeLinkClass : linkClass} onClick={closeMenu}>Brands</Link>
      <Link to="/gallery" className={isActive('/gallery') ? activeLinkClass : linkClass} onClick={closeMenu}>Gallery</Link>
      <Link to="/contact" className={isActive('/contact') ? activeLinkClass : linkClass} onClick={closeMenu}>Contact</Link>
    </>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, logOut } = useAuth();
  
  // Determine if we're on the home page
  const isHomePage = location.pathname === '/';
  
  // Handle scroll event for navbar luxury transformation
  useEffect(() => {
    // Set initial state based on both scroll position and current route
    const handleScroll = () => {
      // If not on home page, always show solid background
      if (!isHomePage) {
        setScrolled(true);
      } else {
        // On home page, use scroll position to determine background
        if (window.scrollY > 20) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Call immediately to set initial state
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]); // Add isHomePage as dependency to re-run on route changes

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navbar = document.getElementById('mobile-navbar');
      const menuButton = document.getElementById('menu-button');
      
      if (isMenuOpen && navbar && !navbar.contains(event.target as Node) && 
          menuButton && !menuButton.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Check if the path matches the current location
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Luxury navbar background style
  const navbarBgClass = scrolled 
    ? "bg-gradient-to-r from-[#001a33] via-[#02315b] to-[#001a33] backdrop-blur-lg shadow-lg shadow-[#02315b]/20" 
    : "bg-transparent";

  // Function to handle smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    closeMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      // Add slight delay to ensure proper scrolling after navigation/state changes
      setTimeout(() => {
        const yOffset = -80; // Decreased navbar height offset
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navbarBgClass} ${isMenuOpen ? 'h-screen md:h-auto' : ''}`}
    >
      {/* Main navbar with luxury design */}
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between h-16 md:h-20 transition-all duration-300`}>
          {/* Premium Logo Design with Glow Effect */}
          <Link to="/" className="flex items-center luxury-logo-container group">
            <div className="relative h-16 md:h-20 flex items-center pr-6 pl-4 md:pl-6 overflow-hidden">
              {/* Glow effects instead of background */}
              <div className="absolute inset-0 logo-glow-effect opacity-60"></div>
              
              {/* Logo with premium animation */}
              <div className="relative flex items-center justify-center luxury-logo-inner">
                <img 
                  src="/logo.png" 
                  alt="Sri Pavan Computers" 
                  className="h-12 md:h-16 w-auto drop-shadow-xl transition-transform duration-500 group-hover:scale-105 z-10"
                />
              </div>
            </div>
          </Link>
          
          {/* Desktop luxury navigation with premium animations */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLinks 
              isActive={isActive} 
              isMobile={false} 
              closeMenu={closeMenu} 
              scrollToSection={scrollToSection}
            />
          </div>
          
          {/* Premium Action Buttons Area */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Authentication Links with premium styling */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Button 
                  asChild 
                  variant="ghost" 
                  size="sm" 
                  className="luxury-btn-ghost"
                >
                  <Link to="/profile" className="flex items-center gap-2 group">
                    <span className="flex items-center justify-center">
                      <Avatar className="h-7 w-7 ring-2 ring-blue-500/20 ring-offset-1 ring-offset-blue-900/10 group-hover:ring-blue-400/30 transition-all">
                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                        <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                          {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="h-3 w-3" />}
                        </AvatarFallback>
                      </Avatar>
                    </span>
                    <span className="hidden lg:inline text-white/90 group-hover:text-white transition-colors">Profile</span>
                  </Link>
                </Button>
                
                {user.isAdmin && (
                  <Button asChild variant="ghost" size="sm" className="luxury-btn-ghost">
                    <Link to="/admin">Admin</Link>
                  </Button>
                )}
              </div>
            ) : (
              <Button asChild variant="ghost" size="sm" className="luxury-btn-ghost group">
                <Link to="/login" className="flex items-center gap-1.5">
                  <LogIn className="h-4 w-4 group-hover:scale-110 transition-all" />
                  <span className="group-hover:translate-x-0.5 transition-transform">Login</span>
                </Link>
              </Button>
            )}
            
            {/* Premium "Build PC" Button */}
            <Button 
              asChild 
              size="sm" 
              className="luxury-btn-primary group relative overflow-hidden"
            >
              <Link to="/pc-builder" className="flex items-center gap-1.5">
                <span className="relative z-10">Build PC</span>
                <ChevronRight className="h-4 w-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
            
            {/* Premium Shopping Cart Button - Enhanced visibility */}
            <div className={`luxury-cart-btn ${scrolled ? 'cart-scrolled' : 'cart-transparent'}`}>
              <ShoppingCart />
            </div>
          </div>
          
          {/* Mobile buttons with premium styling */}
          <div className="md:hidden flex items-center space-x-3">
            {!isMenuOpen && (
              <div className={`luxury-cart-mobile ${scrolled ? 'cart-scrolled' : 'cart-transparent'}`}>
                <ShoppingCart />
              </div>
            )}
            
            {/* Premium mobile toggle button */}
            <button 
              id="menu-button"
              className={`p-1.5 rounded-full ${
                isMenuOpen 
                  ? 'bg-gray-100 text-[#02315b] hover:bg-gray-200' 
                  : 'bg-blue-500/10 text-white hover:bg-blue-500/20 backdrop-blur-sm'
              } transition-all focus:outline-none luxury-btn-toggle`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Premium Mobile Menu with Luxury Animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            id="mobile-navbar" 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 top-16 bg-white z-40 overflow-auto luxury-mobile-menu"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
            <div className="container mx-auto px-4 py-6 relative">
              {/* User Info if logged in - with premium styling */}
              {user && (
                <div className="mb-6 flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-100/50">
                  <Avatar className="h-10 w-10 ring-2 ring-blue-500/20">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-blue-900">{user.displayName || 'User'}</p>
                    <p className="text-xs text-blue-600/70">{user.email}</p>
                  </div>
                </div>
              )}
              
              {/* Navigation Links - with luxury styling */}
              <nav className="flex flex-col mb-6">
                <NavLinks 
                  isActive={isActive} 
                  isMobile={true} 
                  closeMenu={closeMenu} 
                  scrollToSection={scrollToSection}
                />
              </nav>
              
              {/* Authentication Links for Mobile - with premium design */}
              <div className="mt-6 space-y-3">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <User size={16} className="text-primary" />
                      <span className="font-medium text-sm">My Profile</span>
                    </Link>
                    
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        onClick={closeMenu}
                        className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <User size={16} className="text-primary" />
                        <span className="font-medium text-sm">Admin Dashboard</span>
                      </Link>
                    )}
                    
                    <Button
                      variant="ghost"
                      onClick={() => {
                        logOut();
                        closeMenu();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4"
                    >
                      <LogOut size={18} className="text-red-500" />
                      <span className="font-medium">Sign Out</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full rounded-lg py-2 text-sm">
                      <Link to="/login" onClick={closeMenu}>
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </Link>
                    </Button>
                    
                    <Button asChild className="w-full rounded-lg py-2 text-sm">
                      <Link to="/signup" onClick={closeMenu}>
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}
                
                <a href="tel:+919848075759" className="flex items-center justify-center py-2 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm">
                  <Phone size={16} className="mr-2 text-primary" />
                  <span className="font-medium">+91 98480 75759</span>
                </a>
                
                <Button asChild variant="secondary" className="w-full rounded-lg py-2 text-sm shadow-md">
                  <Link to="/pc-builder" onClick={closeMenu}>
                    Build Your Dream PC
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Premium Styling */}
      <style>
        {`
        /* Luxury Navigation Link Effects */
        .luxury-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent);
          transition: all 0.3s ease-out;
          transform: translateX(-50%);
        }
        
        .luxury-nav-link:hover::after,
        .luxury-nav-link.active::after {
          width: 70%;
        }
        
        .luxury-nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 0;
          background: rgba(255,255,255,0.05);
          transition: all 0.3s ease;
          z-index: -1;
        }
        
        .luxury-nav-link:hover::before {
          height: 100%;
        }
        
        .luxury-nav-link.active::before {
          height: 100%;
          background: rgba(255,255,255,0.1);
        }
        
        /* Premium Logo Effects */
        .luxury-logo-container {
          position: relative;
          overflow: hidden;
        }
        
        .luxury-logo-inner::before {
          content: '';
          position: absolute;
          top: -30px;
          left: -50px;
          right: -50px;
          bottom: -30px;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1;
        }
        
        .luxury-logo-container:hover .luxury-logo-inner::before {
          opacity: 1;
        }
        
        /* Premium Button Styles */
        .luxury-btn-ghost {
          background: rgba(255,255,255,0.05);
          border: none;
          color: rgba(255,255,255,0.9);
          backdrop-filter: blur(5px);
          transition: all 0.3s ease;
        }
        
        .luxury-btn-ghost:hover {
          background: rgba(255,255,255,0.1);
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        
        .luxury-btn-primary {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
          border: none;
          box-shadow: 0 4px 10px rgba(231,76,60,0.3);
          transition: all 0.3s ease;
        }
        
        .luxury-btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: all 0.6s ease;
          z-index: 5;
        }
        
        .luxury-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(231,76,60,0.4);
        }
        
        .luxury-btn-primary:hover::before {
          left: 100%;
        }
        
        /* Premium Cart Button Styling */
        .luxury-cart-btn [role="button"],
        .luxury-cart-mobile [role="button"] {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(5px);
          color: white;
          transition: all 0.3s ease;
          border: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .luxury-cart-btn [role="button"]:hover,
        .luxury-cart-mobile [role="button"]:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        /* Premium Mobile Menu Animation */
        .luxury-mobile-menu {
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .luxury-btn-toggle {
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        /* Premium Logo Glow Effects */
        .logo-glow-effect {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, rgba(30, 64, 175, 0.1) 40%, transparent 70%);
          filter: blur(8px);
          z-index: 0;
        }
        
        .luxury-logo-container {
          position: relative;
          overflow: visible;
        }
        
        .luxury-logo-inner {
          position: relative;
          z-index: 2;
        }
        
        .luxury-logo-inner img {
          filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.5));
        }
        
        .luxury-logo-container:hover .luxury-logo-inner img {
          filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.7));
        }

        /* Enhanced Premium Cart Button Styling */
        .luxury-cart-btn [role="button"],
        .luxury-cart-mobile [role="button"] {
          background: rgba(255, 255, 255, 0.25) !important; /* Increased opacity for better visibility */
          backdrop-filter: blur(5px);
          color: white;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.3) !important; /* Added light border */
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2) !important; /* Enhanced shadow */
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: visible;
          z-index: 5; /* Ensure proper stacking */
        }
        
        .cart-scrolled [role="button"] {
          background: rgba(255, 255, 255, 0.3) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
        }
        
        .cart-transparent [role="button"] {
          background: rgba(255, 255, 255, 0.25) !important;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2) !important;
        }
        
        .luxury-cart-btn [role="button"]:hover,
        .luxury-cart-mobile [role="button"]:hover {
          background: rgba(255, 255, 255, 0.4) !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25) !important;
          border: 1px solid rgba(255, 255, 255, 0.5) !important;
        }
        
        /* Cart Icon Styling */
        .luxury-cart-btn svg,
        .luxury-cart-mobile svg {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4)) !important;
          stroke-width: 2.5 !important;
          color: white !important; /* Force icon color to white */
          opacity: 1 !important; /* Ensure full opacity */
          height: 20px !important; /* Slightly larger icon */
          width: 20px !important;
        }
        
        /* Cart Badge Styling */
        .luxury-cart-btn [data-count],
        .luxury-cart-mobile [data-count] {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #e74c3c;
          color: white;
          border-radius: 100%;
          font-size: 10px;
          font-weight: bold;
          height: 16px;
          width: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          border: 1.5px solid white;
        }
        `}
      </style>
    </header>
  );
};

export default Navbar;