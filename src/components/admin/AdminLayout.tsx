import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Bell, 
  User, 
  LogOut, 
  Home, 
  Search,
  MessageSquare,
  Settings
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';

const AdminLayout: React.FC = () => {
  const { user, logOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count
  const [searchVisible, setSearchVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close sidebar when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  // Initialize sidebar state based on screen size
  useEffect(() => {
    // On desktop, ensure sidebar appears on initial load
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
    
    // Close sidebar when window resizes to desktop
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  const handleLogout = async () => {
    await logOut();
    navigate('/admin/login');
  };
  
  // Get the current page title from the pathname
  const getPageTitle = () => {
    if (location.pathname === '/admin') return 'Dashboard';
    const path = location.pathname.split('/').pop();
    if (!path) return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <AdminSidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        closeSidebar={closeSidebar}
      />
      
      <div className={`transition-all duration-300 min-h-screen flex flex-col ${isSidebarOpen ? 'lg:ml-[320px]' : ''}`}>
        {/* Top Bar with Premium Effects */}
        <header 
          className={`sticky top-0 z-30 transition-all duration-300 ${
            scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white'
          }`}
        >
          <div className="px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
            {/* Left Side - Page Title/Breadcrumb */}
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                {getPageTitle()}
              </h1>
            </div>
            
            {/* Right Side - Actions and Profile */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Search Toggle for Mobile */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSearchVisible(!searchVisible)}
                className="sm:hidden"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {/* Search Bar for Desktop */}
              <div className="hidden sm:flex relative w-40 md:w-64 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search..." 
                  className="pl-9 bg-gray-50 border-gray-200 focus:bg-white" 
                />
              </div>
              
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center font-medium">
                        {notifications}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* Example notifications */}
                  <DropdownMenuItem className="flex flex-col items-start py-2">
                    <div className="font-medium">New order received</div>
                    <div className="text-xs text-gray-500">10 minutes ago</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start py-2">
                    <div className="font-medium">New message from customer</div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-center text-primary font-medium">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Messages */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden sm:flex"
                onClick={() => navigate('/admin/messages')}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 h-9 px-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || "Admin"} />
                      <AvatarFallback className="bg-primary text-white">
                        {user?.displayName?.charAt(0) || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden sm:inline-block max-w-[100px] truncate">
                      {user?.displayName || 'Admin'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2" onSelect={() => navigate('/')}>
                    <Home className="h-4 w-4 text-gray-500" />
                    <span>Back to Website</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2" onSelect={() => navigate('/admin/settings')}>
                    <Settings className="h-4 w-4 text-gray-500" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex items-center gap-2 text-red-600" 
                    onSelect={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Mobile Search - Collapsible */}
          <div 
            className={`
              sm:hidden px-4 pb-3 overflow-hidden transition-all duration-300 ease-in-out
              ${searchVisible ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search..." 
                className="pl-9 bg-gray-50 border-gray-200 focus:bg-white" 
              />
            </div>
          </div>
        </header>
        
        {/* Main Content with Animation */}
        <motion.main 
          className="flex-1 p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;
