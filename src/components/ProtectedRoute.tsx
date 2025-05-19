import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresAdmin?: boolean;
  adminRoute?: boolean; // Indicates if this is an admin route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requiresAdmin = false,
  adminRoute = false
}) => {
  const { user, loading, adminMode } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to={adminRoute ? "/admin/login" : "/login"} state={{ from: location }} replace />;
  }

  // Requires admin but user is not admin
  if (requiresAdmin && !user.isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Admin route, but not in admin mode (even if user is admin)
  if (adminRoute && !adminMode) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
