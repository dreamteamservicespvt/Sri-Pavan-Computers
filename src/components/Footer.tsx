
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageSquare as WhatsAppIcon, Twitter as X, Youtube, Linkedin, Globe, MessageSquare } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Smooth scroll function for footer links
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    
    // If on same page, smooth scroll to section
    if (element) {
      const yOffset = -100; // Adjust based on navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      // If not on same page, navigate and then scroll (handled in page components)
      // The scroll will be managed by the useEffect in each page component
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* WhatsApp floating button with animation */}
        <a 
          href="https://wa.me/919848075759" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-50 transition-transform hover:scale-110 animate-pulse"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>

        {/* Premium footer design with better spacing and animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div className="animate-fade-in" style={{animationDelay: '100ms'}}>
            <h3 className="text-xl font-bold mb-4 text-white">Sri Pavan Computers</h3>
            <p className="mb-4 text-gray-300">Your trusted partner for IT products and services since 2015.</p>
            <div className="flex items-start space-x-2 mb-3 group">
              <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <p className="text-gray-300 group-hover:text-white transition-colors">No. 21/9/9, Sri Krishna Kanth Plaza, R.R. Road, Near Masjid Center, Kakinada Bazar, Kakinada – 533001</p>
            </div>
            {/* Add decorative element */}
            <div className="mt-6 h-1 w-16 bg-gradient-to-r from-blue-500 to-primary rounded-full"></div>
          </div>
          
          <div className="animate-fade-in" style={{animationDelay: '200ms'}}>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="transform hover:translate-x-1 transition-transform">
                <Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-300 transition-colors inline-flex items-center">
                  <span className="text-blue-400 mr-2">•</span> Home
                </Link>
              </li>
              <li className="transform hover:translate-x-1 transition-transform">
                <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-300 transition-colors inline-flex items-center">
                  <span className="text-blue-400 mr-2">•</span> About Us
                </Link>
              </li>
              <li className="transform hover:translate-x-1 transition-transform">
                <Link to="/products" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-300 transition-colors inline-flex items-center">
                  <span className="text-blue-400 mr-2">•</span> Products
                </Link>
              </li>
              <li className="transform hover:translate-x-1 transition-transform">
                <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-300 transition-colors inline-flex items-center">
                  <span className="text-blue-400 mr-2">•</span> Services
                </Link>
              </li>
              <li className="transform hover:translate-x-1 transition-transform">
                <Link to="/pc-builder" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-300 transition-colors inline-flex items-center">
                  <span className="text-blue-400 mr-2">•</span> PC Builder
                </Link>
              </li>
              <li className="transform hover:translate-x-1 transition-transform">
                <Link to="/brands" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-300 transition-colors inline-flex items-center">
                  <span className="text-blue-400 mr-2">•</span> Brands
                </Link>
              </li>
              <li className="transform hover:translate-x-1 transition-transform">
                <Link to="/gallery" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-300 transition-colors inline-flex items-center">
                  <span className="text-blue-400 mr-2">•</span> Gallery
                </Link>
              </li>
              <li className="transform hover:translate-x-1 transition-transform">
                <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-300 transition-colors inline-flex items-center">
                  <span className="text-blue-400 mr-2">•</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in" style={{animationDelay: '300ms'}}>
            <h3 className="text-xl font-bold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center group transform hover:translate-x-1 transition-transform">
                <Phone className="h-5 w-5 mr-3 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <a href="tel:+919848075759" className="hover:text-blue-300 transition-colors">+91 98480 75759</a>
              </li>
              <li className="flex items-center group transform hover:translate-x-1 transition-transform">
                <Phone className="h-5 w-5 mr-3 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <a href="tel:08842355888" className="hover:text-blue-300 transition-colors">0884 2355888</a>
              </li>
              <li className="flex items-center group transform hover:translate-x-1 transition-transform">
                <Mail className="h-5 w-5 mr-3 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <a href="mailto:pavancomputers_kkd@yahoo.co.in" className="hover:text-blue-300 transition-colors">pavancomputers_kkd@yahoo.co.in</a>
              </li>
              <li className="flex items-center group transform hover:translate-x-1 transition-transform">
                <Clock className="h-5 w-5 mr-3 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span>Mon-Sat: 9:30 AM - 8:30 PM</span>
              </li>
            </ul>
            
            {/* Social Media Links - Updated with all requested platforms */}
            <h4 className="text-lg font-semibold mt-6 mb-3 text-white">Connect With Us</h4>
            <div className="grid grid-cols-4 gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white p-2 rounded-full transition-transform hover:scale-110 transform flex items-center justify-center"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-2 rounded-full transition-transform hover:scale-110 transform flex items-center justify-center"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/919848075759" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 text-white p-2 rounded-full transition-transform hover:scale-110 transform flex items-center justify-center"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black text-white p-2 rounded-full transition-transform hover:scale-110 transform flex items-center justify-center"
                aria-label="Follow us on X (Twitter)"
              >
                <X className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 text-white p-2 rounded-full transition-transform hover:scale-110 transform flex items-center justify-center"
                aria-label="Subscribe on YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-500 text-white p-2 rounded-full transition-transform hover:scale-110 transform flex items-center justify-center"
                aria-label="Join our Telegram channel"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-700 text-white p-2 rounded-full transition-transform hover:scale-110 transform flex items-center justify-center"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://sripavancomputers.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 text-white p-2 rounded-full transition-transform hover:scale-110 transform flex items-center justify-center"
                aria-label="Visit our website"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer bottom with credits */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; {currentYear} Sri Pavan Computers. All rights reserved.</p>
            <div className="mt-3 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-gray-400">
              <Link to="/privacy-policy" className="hover:text-blue-300 transition-colors" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link>
              <Link to="/terms" className="hover:text-blue-300 transition-colors" onClick={() => window.scrollTo(0, 0)}>Terms & Conditions</Link>
            </div>
          </div>
          
          {/* Credits - Updated with requested information */}
          <div className="mt-4 text-center text-gray-500 text-sm">
            <a 
              href="https://www.thedreamteamservices.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-300 transition-colors inline-flex items-center justify-center gap-1"
            >
              <span>Designed and developed by</span>
              <span className="font-medium text-white">Dream Team Services</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Add decorative footer elements for premium feel */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-primary to-blue-400"></div>
    </footer>
  );
};

export default Footer;
