import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

const Unauthorized: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
            <AlertTriangle className="h-10 w-10 text-yellow-600" />
          </div>
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Access Denied</h1>
        <p className="mt-2 text-base text-gray-600">
          {user 
            ? "You don't have permission to access this page." 
            : "Please log in to access this page."}
        </p>
        <div className="mt-8 space-y-4">
          {user ? (
            <>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Return to Homepage</Link>
              </Button>
              {user.isAdmin ? (
                <Button asChild className="w-full">
                  <Link to="/admin">Go to Admin Dashboard</Link>
                </Button>
              ) : (
                <Button asChild className="w-full">
                  <Link to="/profile">Go to Your Profile</Link>
                </Button>
              )}
            </>
          ) : (
            <>
              <Button asChild className="w-full">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Return to Homepage</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
