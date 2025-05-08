import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import LoginForm from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Check for admin status and redirect if needed
  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/profile', { replace: true });
      }
    }
  }, [user, navigate]);
  
  // If already logged in, don't render the form
  if (user) {
    return null; // Return null as we're handling the redirect in useEffect
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
