import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, Lock, User } from 'lucide-react';

const adminLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

const AdminLogin: React.FC = () => {
  const { user, signIn, adminMode } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  
  // Check if admin account already exists
  useEffect(() => {
    const checkAdminExists = async () => {
      try {
        const adminsRef = collection(db, 'admins');
        const querySnapshot = await getDocs(adminsRef);
        setAdminExists(!querySnapshot.empty);
      } catch (error) {
        console.error("Error checking admin existence:", error);
        // Default to showing the notice if we can't check
        setAdminExists(false);
      }
    };
    
    checkAdminExists();
  }, []);
  
  // If already logged in as admin, redirect to admin dashboard
  if (user && adminMode) {
    return <Navigate to="/admin" replace />;
  }
  
  // If logged in as regular user, they still need to login specifically as admin
  
  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (data: AdminLoginFormValues) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      // The true parameter signals this is an admin login attempt
      await signIn(data.email, data.password, true);
      navigate('/admin');
    } catch (error: any) {
      console.error('Admin login error:', error);
      setErrorMessage(error.message || "Failed to sign in as admin. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-gray-500 mt-1">Enter your credentials to access the admin dashboard</p>
          </div>
          
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-6">
              {errorMessage}
            </div>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="admin@example.com" 
                          type="email" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="••••••••" 
                          type="password" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full py-2.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Access Admin Dashboard"
                )}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Return to <a href="/" className="font-medium text-primary hover:underline">website</a>
            </p>
            
            {/* First-time login notice - only show if admin doesn't exist */}
            {adminExists === false && (
              <div className="mt-6 p-3 bg-blue-50 rounded-md text-xs text-blue-700">
                <p>For first-time admin setup, use the admin credentials provided by the system administrator.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
