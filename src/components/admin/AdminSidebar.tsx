import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
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
  BookOpen
} from 'lucide-react';

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { logOut } = useAuth();
  const location = useLocation();
  
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      name: 'Products', 
      path: '/admin/products', 
      icon: <Package className="h-5 w-5" /> 
    },
    { 
      name: 'Services', 
      path: '/admin/services', 
      icon: <BookOpen className="h-5 w-5" /> 
    },
    { 
      name: 'Team', 
      path: '/admin/team', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: 'Gallery', 
      path: '/admin/gallery', 
      icon: <Image className="h-5 w-5" /> 
    },
    { 
      name: 'Brands', 
      path: '/admin/brands', 
      icon: <Star className="h-5 w-5" /> 
    },
    { 
      name: 'Orders', 
      path: '/admin/orders', 
      icon: <ShoppingBag className="h-5 w-5" /> 
    },
    { 
      name: 'Messages', 
      path: '/admin/messages', 
      icon: <MessageSquare className="h-5 w-5" /> 
    },
    { 
      name: 'Settings', 
      path: '/admin/settings', 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];
  
  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50"
      >
        {isSidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>
      
      {/* Sidebar Background */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 bottom-0 z-40 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b flex items-center justify-center">
            <img 
              src="https://scontent.fvga12-1.fna.fbcdn.net/v/t39.30808-6/469358180_1100579355105210_4824390431486366625_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=bnTepRkZqdYQ7kNvwFeIgif&_nc_oc=Adk1ovD9Yb5Mjgv47Meicqch_aHg8xWwUIJ8SnJaKixYYe3zBmL8mZLyW0TaA7j83WW7l8B5EVhUPYbH-AJqJwIg&_nc_zt=23&_nc_ht=scontent.fvga12-1.fna&_nc_gid=AsuzZsn6UHhtcWv7-UOv2Q&oh=00_AfK4eEBw1-RVwsI_318ySKeQCbUlSVBniu_fYrX5PYOX_A&oe=6822659F" 
              alt="Sri Pavan Computers" 
              className="h-10 mr-2 rounded-full" 
            />
            <h1 className="text-lg font-bold text-primary">Admin Dashboard</h1>
          </div>
          
          {/* Nav Items */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                  ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}
                  transition-colors
                `}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    toggleSidebar();
                  }
                }}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
          
          {/* Logout Button */}
          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={logOut}
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
