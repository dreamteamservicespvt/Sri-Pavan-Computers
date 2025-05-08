
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  
  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setIsLoading(true);
      await forgotPassword(data.email);
      setEmailSent(true);
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-muted-foreground">Enter your email to reset your password</p>
      </div>
      
      {emailSent ? (
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-xl font-medium">Email Sent</h2>
          <p className="text-muted-foreground">
            Check your email for a link to reset your password. The link will expire in 1 hour.
          </p>
          <Button asChild className="w-full">
            <Link to="/login">Return to Login</Link>
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    We'll send you a link to reset your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending email...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
            
            <div className="text-center mt-4">
              <Link 
                to="/login" 
                className="text-sm font-medium text-primary hover:underline"
              >
                Back to login
              </Link>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
