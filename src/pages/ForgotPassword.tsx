
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

const ForgotPassword: React.FC = () => {
  const { user } = useAuth();
  
  // If already logged in, redirect to profile
  if (user) {
    return <Navigate to="/profile" replace />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
