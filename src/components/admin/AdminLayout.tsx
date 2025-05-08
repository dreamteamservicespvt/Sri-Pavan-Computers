
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, User } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="lg:ml-64 transition-all duration-300">
        {/* Top Bar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-6">
          <div>
            <h1 className="font-medium">Admin Panel</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || "Admin"} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
