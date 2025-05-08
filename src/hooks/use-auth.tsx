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
    // Check if user is an admin by looking at Firestore
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);
    const isAdmin = userSnap.exists() ? userSnap.data().isAdmin || false : false;
    
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      isAdmin
    };
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
      
      // Check for hardcoded admin credentials - bypass Firebase auth
      if (email === 'Spc@gmail.com' && password === 'Spc@12345') {
        // Create a mock admin user without Firebase authentication
        const mockAdminUser: UserData = {
          uid: 'admin-user-id',
          email: email,
          displayName: 'Admin',
          photoURL: null,
          isAdmin: true
        };
        
        // Update the user state
        setUser(mockAdminUser);
        
        toast({
          title: "Signed in successfully",
          description: "Welcome back, Admin!",
          duration: 3000,
        });
        
        return mockAdminUser;
      }
      
      // If not admin credentials, proceed with normal login
      // (You can uncomment this when Firebase is properly set up)
      /*
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = await formatUserData(userCredential.user);
      
      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
        duration: 3000,
      });
      
      return userData;
      */
      
      // For now, just reject non-admin logins
      throw new Error("Invalid email or password");
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
        duration: 5000,
      });
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
