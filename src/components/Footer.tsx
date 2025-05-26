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
          href="https://wa.me/919848075759?text=Hello%2C%20I%20am%20interested%20in%20Sri%20Pavan%20Computers%20products%20and%20services.%20Could%20you%20please%20assist%20me%3F" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-50 transition-transform hover:scale-110 animate-pulse hover:animate-none"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.88 9.88 0 01-5.032-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.88 9.88 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
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
                <a href="mailto:sales@sripavancomputers.in" className="hover:text-blue-300 transition-colors">sales@sripavancomputers.in</a>
              </li>
              <li className="flex items-center group transform hover:translate-x-1 transition-transform">
                <Clock className="h-5 w-5 mr-3 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span>Mon-Sat: 9:30 AM - 8:30 PM</span>
              </li>
            </ul>
            
            {/* Social Media Links - Premium redesign */}
            <h4 className="text-lg font-semibold mt-6 mb-3 text-white">Connect With Us</h4>
            <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-300 group"
                aria-label="Follow us on Instagram"
              >
                <div className="p-2.5 md:p-2 rounded-full bg-gray-800 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:via-pink-500 group-hover:to-orange-400 transform transition-transform group-hover:scale-110 shadow-sm group-hover:shadow-lg">
                  <Instagram className="h-5 w-5" />
                </div>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-300 group"
                aria-label="Follow us on Facebook"
              >
                <div className="p-2.5 md:p-2 rounded-full bg-gray-800 group-hover:bg-blue-600 transform transition-transform group-hover:scale-110 shadow-sm group-hover:shadow-lg">
                  <Facebook className="h-5 w-5" />
                </div>
              </a>
              <a 
                href="https://wa.me/919848075759?text=Hello%2C%20I%20am%20interested%20in%20Sri%20Pavan%20Computers%20products%20and%20services.%20Could%20you%20please%20assist%20me%3F" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-300 group"
                aria-label="Chat on WhatsApp"
              >
                <div className="p-2.5 md:p-2 rounded-full bg-gray-800 group-hover:bg-green-500 transform transition-transform group-hover:scale-110 shadow-sm group-hover:shadow-lg">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.88 9.88 0 01-5.032-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.88 9.88 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-300 group"
                aria-label="Follow us on X (Twitter)"
              >
                <div className="p-2.5 md:p-2 rounded-full bg-gray-800 group-hover:bg-black transform transition-transform group-hover:scale-110 shadow-sm group-hover:shadow-lg">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M13.92 3.248c.669-.05 1.338.05 1.958.3.659.25 1.248.7 1.657 1.247h3.08L19.38 6.02c.1.05.198.099.297.148v.198c-.99.5-.179.1-.278.15l-1.057 1.048v.149c0 1.097-.1 2.145-.398 3.193a7.649 7.649 0 0 1-1.147 2.494 8.63 8.63 0 0 1-1.856 1.995 9.41 9.41 0 0 1-2.414 1.348 8.687 8.687 0 0 1-2.933.498 9.06 9.06 0 0 1-4.86-1.446.626.626 0 0 1-.2-.15.554.554 0 0 1-.02-.399c.03-.1.08-.198.18-.248.119-.05.218-.1.338-.1 1.177.05 2.265-.298 3.213-.994-.988-.248-1.687-.857-2.066-1.893h.578c.13 0 .24-.05.34-.1.099-.05.148-.149.148-.248 0-.99.05-.149 0-.198-1.028-.597-1.588-1.395-1.687-2.443v-.149c.37.2.738.3 1.128.3-.588-.398-.988-.956-1.247-1.594-.28-.548-.37-1.146-.28-1.745 0-.149.05-.248.15-.348a.66.66 0 0 1 .347-.149c.13 0 .23.05.3.1 1.337 1.553 3.014 2.391 5.011 2.54-.05-.199-.05-.448-.05-.647 0-.747.27-1.395.738-1.943a2.563 2.563 0 0 1 1.906-.846zm.548 2.094c-.249-.249-.548-.349-.897-.349-.349 0-.648.15-.897.399-.25.248-.349.547-.349.896 0 .1.02.199.05.298.13.1.03.15.05.199 0 .05.05.1.1.15.249.346.547.545.896.545.348 0 .647-.15.896-.399.25-.248.35-.547.35-.896 0-.1-.021-.199-.05-.298a.664.664 0 0 0-.15-.398v-.147z"/>
                  </svg>
                </div>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-300 group"
                aria-label="Subscribe on YouTube"
              >
                <div className="p-2.5 md:p-2 rounded-full bg-gray-800 group-hover:bg-red-600 transform transition-transform group-hover:scale-110 shadow-sm group-hover:shadow-lg">
                  <Youtube className="h-5 w-5" />
                </div>
              </a>
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-300 group"
                aria-label="Join our Telegram channel"
              >
                <div className="p-2.5 md:p-2 rounded-full bg-gray-800 group-hover:bg-blue-500 transform transition-transform group-hover:scale-110 shadow-sm group-hover:shadow-lg">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M22.265 2.428a2.048 2.048 0 0 0-2.078-.324L2.266 9.339a2.043 2.043 0 0 0 .104 3.818l3.625 1.261 2.02 6.682a.998.998 0 0 0 .799.668.992.992 0 0 0 .905-.43l2.812-3.705 3.96 3.96a2.043 2.043 0 0 0 3.429-1.217l4.01-16.642a2.04 2.04 0 0 0-.665-2.306zm-4.502 17.163-5.647-5.647a.999.999 0 0 0-1.322-.084l-2.412 1.752-.644-2.127 7.11-4.699a.998.998 0 0 0-.4-1.858.985.985 0 0 0-.653.165l-8.656 5.727-3.179-1.104 16.993-6.803-1.19 14.678z"/>
                  </svg>
                </div>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-300 group"
                aria-label="Connect on LinkedIn"
              >
                <div className="p-2.5 md:p-2 rounded-full bg-gray-800 group-hover:bg-blue-700 transform transition-transform group-hover:scale-110 shadow-sm group-hover:shadow-lg">
                  <Linkedin className="h-5 w-5" />
                </div>
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
          
            {/* Premium Credits Design */}
            <div className="mt-6 md:mt-4 text-center">
              <a 
                href="https://www.thedreamteamservices.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block group relative"
              >
                <div className="relative px-4 py-2 overflow-hidden rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-xl"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-gray-400 text-xs tracking-wide uppercase">Website developed by</span>
                    <div className="flex items-center mt-1">
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 group-hover:from-blue-300 group-hover:to-indigo-400 transition-all duration-300">
                        Dream Team Services
                      </span>
                      <svg className="h-4 w-4 ml-1 text-blue-400 group-hover:text-blue-300 transition-colors" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Subtle ambient animation */}
                  <div className="absolute -bottom-1 left-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -translate-x-1/2 opacity-0 group-hover:opacity-75 group-hover:animate-pulse"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Enhanced decorative footer elements */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-primary to-blue-400 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
      </div>
    </footer>
  );
};

export default Footer;
