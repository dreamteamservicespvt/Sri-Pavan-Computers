import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, User, LogIn, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/use-auth';
import ShoppingCart from './ShoppingCart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Separate component for navigation links with improved styling
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
  // Enhanced link styles for better mobile and desktop experience
  const linkClass = isMobile 
    ? "text-base font-medium text-center block py-3 px-2 transition-colors hover:bg-gray-50 hover:text-primary border-b border-gray-100" 
    : "px-3 py-1.5 rounded-md transition-colors text-white hover:text-white hover:bg-white/10";
  
  const activeLinkClass = isMobile
    ? "text-base font-bold text-center block py-3 px-2 bg-gray-50 text-primary border-b border-gray-100"
    : "px-3 py-1.5 rounded-md font-medium text-white bg-white/20";
  
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
  
  // Handle scroll event for sticky navbar - always show background after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check in case page is loaded scrolled down
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  // Set navbar background - always have a background
  const navbarBgClass = "bg-[#02315b] shadow-md";

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
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBgClass} py-1 md:py-2 ${isMenuOpen ? 'h-screen md:h-auto' : ''}`}>
      <div className="container mx-auto px-3 md:px-4">
        <div className={`flex items-center justify-between h-14 ${isMenuOpen ? 'border-b border-gray-200' : ''}`}>
          {/* Replace text logo with image logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Sri Pavan Computers" 
              className="h-10"
            />
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLinks 
              isActive={isActive} 
              isMobile={false} 
              closeMenu={closeMenu} 
              scrollToSection={scrollToSection}
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <a href="tel:+919848075759" className="flex items-center space-x-1 text-sm text-white hover:text-primary-foreground transition-colors">
              <Phone size={16} />
              <span>+91 98480 75759</span>
            </a>
            
            {/* Authentication Links for Desktop - updated to white */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
                  <Link to="/profile" className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                      <AvatarFallback className="text-xs">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="h-3 w-3" />}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline text-white">Profile</span>
                  </Link>
                </Button>
                
                {user.isAdmin && (
                  <Button asChild variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
                    <Link to="/admin">Admin</Link>
                  </Button>
                )}
              </div>
            ) : (
              <Button asChild variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
                <Link to="/login" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </Button>
            )}
            
            <Button asChild variant="secondary" size="sm" className="flex items-center gap-1 shadow-sm hover:shadow-md transition-all">
              <Link to="/pc-builder">
                Build PC
              </Link>
            </Button>
            
            {/* Shopping Cart Button */}
            <div className="text-white [&_button]:text-white [&_svg]:text-white [&_button]:hover:text-white [&_svg]:hover:text-white">
              <ShoppingCart />
            </div>
          </div>
          
          {/* Mobile menu toggle button - smaller height */}
          <div className="md:hidden flex items-center space-x-2 text-white">
            {!isMenuOpen && (
              <div className="text-white [&_button]:text-white [&_svg]:text-white [&_button]:hover:text-white [&_svg]:hover:text-white">
                <ShoppingCart />
              </div>
            )}
            
            {/* Toggle button */}
            <button 
              id="menu-button"
              className={`p-1 rounded-full ${isMenuOpen ? 'text-gray-700 hover:bg-gray-100' : 'text-white'} transition-colors focus:outline-none`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Mobile menu with better UI/UX */}
      {isMenuOpen && (
        <div id="mobile-navbar" className="md:hidden fixed inset-0 top-14 bg-white z-40 animate-fade-in overflow-auto">
          <div className="container mx-auto px-4 py-4">
            {/* User Info if logged in */}
            {user && (
              <div className="mb-4 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                  <AvatarFallback>
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user.displayName || 'User'}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            )}
            
            {/* Navigation Links - Made more compact */}
            <nav className="flex flex-col">
              <NavLinks 
                isActive={isActive} 
                isMobile={true} 
                closeMenu={closeMenu} 
                scrollToSection={scrollToSection}
              />
            </nav>
            
            {/* Authentication Links for Mobile */}
            <div className="mt-4 space-y-2">
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
        </div>
      )}
    </header>
  );
};

export default Navbar;