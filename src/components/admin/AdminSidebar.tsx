import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import {
  Home,
  Package,
  Users,
  Image,
  Settings,
  MessageSquare,
  ShoppingBag,
  Star,
  LogOut,
  Menu,
  X,
  BookOpen,
  LayoutDashboard,
  FileText,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  isSidebarOpen, 
  toggleSidebar,
  closeSidebar
}) => {
  const { logOut } = useAuth();
  const location = useLocation();
  
  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  }, [location.pathname, closeSidebar]);

  // Swipe handler for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (window.innerWidth < 1024 && isSidebarOpen) {
        closeSidebar();
      }
    },
    trackMouse: false
  });
  
  // Enhanced navigation items with clear grouping
  const navItems = [
    // Dashboard & Analytics Group
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: <LayoutDashboard className="h-5 w-5" />,
      group: 'main'
    },
    { 
      name: 'Analytics', 
      path: '/admin/analytics', 
      icon: <BarChart3 className="h-5 w-5" />,
      group: 'main'
    },
    
    // Content Management Group
    { 
      name: 'Products', 
      path: '/admin/products', 
      icon: <Package className="h-5 w-5" />,
      group: 'content'
    },
    { 
      name: 'Services', 
      path: '/admin/services', 
      icon: <BookOpen className="h-5 w-5" />,
      group: 'content'
    },
    { 
      name: 'Gallery', 
      path: '/admin/gallery', 
      icon: <Image className="h-5 w-5" />,
      group: 'content' 
    },
    { 
      name: 'Brands', 
      path: '/admin/brands', 
      icon: <Star className="h-5 w-5" />,
      group: 'content'
    },
    
    // Business Operations Group
    { 
      name: 'Orders', 
      path: '/admin/orders', 
      icon: <ShoppingBag className="h-5 w-5" />,
      group: 'operations'
    },
    { 
      name: 'Messages', 
      path: '/admin/messages', 
      icon: <MessageSquare className="h-5 w-5" />,
      group: 'operations'
    },
    { 
      name: 'Team', 
      path: '/admin/team', 
      icon: <Users className="h-5 w-5" />,
      group: 'operations'
    },
    
    // Administration Group
    { 
      name: 'Settings', 
      path: '/admin/settings', 
      icon: <Settings className="h-5 w-5" />,
      group: 'admin'
    },
  ];
  
  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };
  
  // Sidebar animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      boxShadow: "10px 0px 50px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };
  
  // Item animation variants
  const itemVariants = {
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    }),
    closed: {
      opacity: 0,
      y: 20
    }
  };

  // Group the navigation items
  const mainItems = navItems.filter(item => item.group === 'main');
  const contentItems = navItems.filter(item => item.group === 'content');
  const operationItems = navItems.filter(item => item.group === 'operations');
  const adminItems = navItems.filter(item => item.group === 'admin');
  
  return (
    <>
      {/* Mobile Sidebar Toggle - Floating Button with Premium Effect */}
      <motion.div
        className="lg:hidden fixed bottom-6 left-6 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          onClick={toggleSidebar}
          className="h-14 w-14 rounded-full shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-primary/80 text-white border-4 border-white flex items-center justify-center"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </motion.div>
      
      {/* Sidebar Overlay with Backdrop Blur */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden z-40"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar with Premium Animation */}
      <motion.aside
        {...swipeHandlers}
        variants={sidebarVariants}
        initial={window.innerWidth >= 1024 ? "open" : "closed"}
        animate={window.innerWidth >= 1024 ? "open" : (isSidebarOpen ? "open" : "closed")}
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 w-[280px] sm:w-[320px] bg-white border-r border-gray-200",
          "lg:z-30 overflow-hidden transition-all duration-300",
          !isSidebarOpen && "lg:shadow-sm"
        )}
      >
        <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50">
          {/* Logo and Close Button */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-[#001a33] p-2 rounded-md shadow-md border border-blue-900/30 mr-2 logo-container" 
                style={{
                  position: 'relative',
                  overflow: 'visible',
                  boxShadow: '0 0 15px rgba(0, 26, 51, 0.4)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div 
                  style={{
                    content: '',
                    position: 'absolute',
                    inset: '-3px',
                    background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2), transparent 70%)',
                    borderRadius: '8px',
                    zIndex: 0,
                    opacity: 0.6,
                    filter: 'blur(5px)'
                  }}
                />
                <img 
                  src="/logo.png" 
                  alt="Sri Pavan Computers" 
                  className="h-9 w-auto object-contain relative z-10" 
                  style={{
                    filter: 'brightness(1) contrast(1)'
                  }}
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeSidebar}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Nav Items with Staggered Animation */}
          <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
            {/* Main Section */}
            <div>
              <h2 className="mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Main
              </h2>
              <div className="space-y-1">
                {mainItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <NavLink
                      to={item.path}
                      end={item.path === '/admin'}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                        ${isActive ? 
                          'bg-primary text-white shadow-md shadow-primary/20' : 
                          'text-gray-700 hover:bg-gray-100'
                        }
                        transition-all duration-300 ease-in-out
                      `}
                    >
                      {item.icon}
                      <span className="text-base">{item.name}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Content Management */}
            <div>
              <h2 className="mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Content
              </h2>
              <div className="space-y-1">
                {contentItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    custom={i + mainItems.length}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                        ${isActive ? 
                          'bg-primary text-white shadow-md shadow-primary/20' : 
                          'text-gray-700 hover:bg-gray-100'
                        }
                        transition-all duration-300 ease-in-out
                      `}
                    >
                      {item.icon}
                      <span className="text-base">{item.name}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Business Operations */}
            <div>
              <h2 className="mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Operations
              </h2>
              <div className="space-y-1">
                {operationItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    custom={i + mainItems.length + contentItems.length}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                        ${isActive ? 
                          'bg-primary text-white shadow-md shadow-primary/20' : 
                          'text-gray-700 hover:bg-gray-100'
                        }
                        transition-all duration-300 ease-in-out
                      `}
                    >
                      {item.icon}
                      <span className="text-base">{item.name}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Administration */}
            <div>
              <h2 className="mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Administration
              </h2>
              <div className="space-y-1">
                {adminItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    custom={i + mainItems.length + contentItems.length + operationItems.length}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                        ${isActive ? 
                          'bg-primary text-white shadow-md shadow-primary/20' : 
                          'text-gray-700 hover:bg-gray-100'
                        }
                        transition-all duration-300 ease-in-out
                      `}
                    >
                      {item.icon}
                      <span className="text-base">{item.name}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </div>
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t mt-auto">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-3 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300"
              onClick={logOut}
            >
              <LogOut className="h-5 w-5" />
              <span className="text-base font-medium">Sign Out</span>
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

// Add CSS styles with a custom class for hover effect
const logoContainerStyles = `
  .logo-container:hover {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.6) !important;
    transform: translateY(-1px);
  }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = logoContainerStyles;
  document.head.appendChild(styleElement);
}

export default AdminSidebar;
