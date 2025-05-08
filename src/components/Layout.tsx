import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2 flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/pavan-computers-logo.jpg" 
              alt="Sri Pavan Computers" 
              className="h-10 mr-2"
            />
            <h1 className="text-xl font-bold text-primary">Sri Pavan Computers</h1>
          </Link>
          
          {/* ...existing header content... */}
        </div>
      </header>
      
      <main>
        {children}
      </main>
      
      {/* ...existing footer... */}
    </div>
  );
};

export default Layout;