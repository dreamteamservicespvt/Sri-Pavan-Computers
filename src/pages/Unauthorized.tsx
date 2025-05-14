import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
      <div className="text-center space-y-6 max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center">
          <ShieldAlert className="h-24 w-24 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold">Access Denied</h1>
        
        <p className="text-muted-foreground">
          You don't have permission to access this page. This area is restricted to authorized administrators only.
        </p>
        
        <div className="pt-4 space-y-2">
          <Button asChild className="w-full">
            <Link to="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
