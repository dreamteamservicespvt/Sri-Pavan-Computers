import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin: boolean;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserData>;
  logOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: {displayName?: string, photoURL?: string}) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Convert Firebase user to our UserData
  const formatUserData = async (firebaseUser: User): Promise<UserData> => {
    try {
      // Check if user is an admin by looking at Firestore
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);
      let isAdmin = false;
      
      if (userSnap.exists()) {
        isAdmin = userSnap.data().isAdmin || false;
      } else {
        // Create user document if it doesn't exist
        await setDoc(userRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          isAdmin: false,
          createdAt: new Date().toISOString(),
        });
      }
      
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        isAdmin
      };
    } catch (error) {
      console.error("Error formatting user data:", error);
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        isAdmin: false
      };
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await formatUserData(firebaseUser);
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign up with email and password
  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Set display name
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name
        });
      }
      
      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        displayName: name,
        photoURL: null,
        isAdmin: false,
        createdAt: new Date().toISOString(),
      });
      
      toast({
        title: "Account created successfully",
        description: "Welcome to Sri Pavan Computers!",
        duration: 5000,
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
        duration: 5000,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // DEVELOPMENT FALLBACK: Hardcoded admin credentials for testing/development
      // This allows admin access without requiring Firebase to be fully configured
      // IMPORTANT: Remove or secure this in production!
      if (email === 'admin@sripavancomputers.com' && password === 'admin123') {
        const mockAdminUser: UserData = {
          uid: 'admin-user-id',
          email: email,
          displayName: 'Admin User',
          photoURL: null,
          isAdmin: true
        };
        
        setUser(mockAdminUser);
        
        toast({
          title: "Signed in successfully",
          description: "Welcome to the admin dashboard! (Development mode)",
          duration: 3000,
        });
        
        return mockAdminUser;
      }
      
      // Standard Firebase authentication
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userData = await formatUserData(userCredential.user);
        
        toast({
          title: "Signed in successfully",
          description: userData.isAdmin ? "Welcome to the admin dashboard!" : "Welcome back!",
          duration: 3000,
        });
        
        return userData;
      } catch (firebaseError: any) {
        // Handle specific Firebase error codes with more user-friendly messages
        let errorMessage = "Invalid email or password";
        
        if (firebaseError.code === 'auth/invalid-credential') {
          errorMessage = "Invalid email or password. Please check your credentials and try again.";
        } else if (firebaseError.code === 'auth/user-not-found') {
          errorMessage = "No account exists with this email. Please check your email or sign up.";
        } else if (firebaseError.code === 'auth/wrong-password') {
          errorMessage = "Incorrect password. Please try again.";
        } else if (firebaseError.code === 'auth/too-many-requests') {
          errorMessage = "Too many failed login attempts. Please try again later or reset your password.";
        } else if (firebaseError.code === 'auth/user-disabled') {
          errorMessage = "This account has been disabled. Please contact support.";
        } else if (firebaseError.code) {
          errorMessage = `Error: ${firebaseError.code.replace('auth/', '')}`;
        }
        
        toast({
          title: "Sign in failed",
          description: errorMessage,
          variant: "destructive",
          duration: 5000,
        });
        
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const logOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed out successfully",
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  // Send password reset email
  const forgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Password reset email sent",
        description: "Check your email for password reset instructions",
        duration: 5000,
      });
    } catch (error: any) {
      toast({
        title: "Failed to send reset email",
        description: error.message,
        variant: "destructive",
        duration: 5000,
      });
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (data: {displayName?: string, photoURL?: string}) => {
    try {
      if (!auth.currentUser) throw new Error("Not authenticated");
      
      await updateProfile(auth.currentUser, data);
      
      // Update in Firestore as well
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          ...data,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "Profile update failed",
        description: error.message,
        variant: "destructive",
        duration: 5000,
      });
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    logOut,
    forgotPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
