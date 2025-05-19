import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile,
  sendPasswordResetEmail,
  getAuth,
  fetchSignInMethodsForEmail,
  browserLocalPersistence,
  setPersistence
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin: boolean;
}

interface AdminCredentials {
  id: string;
  email: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  adminMode: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string, isAdminAttempt?: boolean) => Promise<UserData | null>;
  logOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: {displayName?: string, photoURL?: string}) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials stored in a secure format - will be checked against Firebase
const ADMIN_EMAIL = "sripavan55@gmail.com";
const ADMIN_PASSWORD = "@SriPavan_DT($)";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminMode, setAdminMode] = useState(false);
  const { toast } = useToast();

  // Set persistence on initial load
  useEffect(() => {
    // Set persistence to LOCAL (this ensures auth state persists across refreshes)
    setPersistence(auth, browserLocalPersistence)
      .catch(error => {
        console.error("Error setting auth persistence:", error);
      });
  }, []);

  // Convert Firebase user to our UserData
  const formatUserData = async (firebaseUser: User): Promise<UserData> => {
    try {
      // Check if user exists in Firestore
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
      
      // Also check admin collection for more security
      if (!isAdmin) {
        const adminsRef = collection(db, 'admins');
        const q = query(adminsRef, where("email", "==", firebaseUser.email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          isAdmin = true;
          
          // Update user document to reflect admin status if needed
          if (userSnap.exists() && !userSnap.data().isAdmin) {
            await setDoc(userRef, { isAdmin: true }, { merge: true });
          }
        }
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
        try {
          const userData = await formatUserData(firebaseUser);
          setUser(userData);
          // Restore admin mode if user is admin
          if (userData.isAdmin && firebaseUser.email === ADMIN_EMAIL) {
            setAdminMode(true);
          }
        } catch (error) {
          console.error("Error processing auth state change:", error);
          setUser(null);
        }
      } else {
        setUser(null);
        setAdminMode(false); // Reset admin mode on logout
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign up with email and password - only for regular users
  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      
      // First check if the email is reserved for admin
      if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        throw new Error("This email address is reserved. Please use a different email.");
      }
      
      await setPersistence(auth, browserLocalPersistence);
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
      let errorMessage = error.message;
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already registered. Please login instead.";
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string, isAdminAttempt = false) => {
    try {
      setLoading(true);
      
      // Admin login attempt validation - check if trying to log in as admin
      if (isAdminAttempt) {
        // Validate if the email is the admin email
        if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
          toast({
            title: "Admin login failed",
            description: "Invalid admin credentials.",
            variant: "destructive",
            duration: 5000,
          });
          throw new Error("Invalid admin credentials.");
        }
        
        // First, try to sign in directly since the admin account might already exist
        try {
          await setPersistence(auth, browserLocalPersistence);
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const userData = await formatUserData(userCredential.user);
          
          // If successfully signed in but not admin, check if this should be an admin
          if (!userData.isAdmin && email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && 
              password === ADMIN_PASSWORD) {
            // Grant admin privileges to this user
            await setDoc(doc(db, 'users', userData.uid), {
              isAdmin: true,
              updatedAt: new Date().toISOString()
            }, { merge: true });
            
            // Also add to admins collection for additional security
            await setDoc(doc(collection(db, 'admins'), userData.uid), {
              email,
              uid: userData.uid,
              createdAt: new Date().toISOString()
            });
            
            userData.isAdmin = true;
          }
          
          // If this is an admin login but the user doesn't have admin rights
          if (isAdminAttempt && !userData.isAdmin) {
            await signOut(auth);
            setUser(null);
            
            toast({
              title: "Admin access denied",
              description: "Your account doesn't have admin privileges.",
              variant: "destructive",
              duration: 5000,
            });
            
            throw new Error("Admin access denied. Your account doesn't have admin privileges.");
          }
          
          // Set admin mode and user
          setAdminMode(isAdminAttempt && userData.isAdmin);
          setUser(userData);
          
          toast({
            title: "Signed in successfully",
            description: isAdminAttempt ? "Welcome to the admin dashboard!" : "Welcome back!",
            duration: 3000,
          });
          
          return userData;
        } catch (signInError: any) {
          // If login failed and this is the first admin login attempt with correct credentials
          if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && 
              password === ADMIN_PASSWORD && 
              (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-credential')) {
            
            // This is the first admin login - create the admin account
            try {
              // Create the user in Firebase Authentication
              const userCredential = await createUserWithEmailAndPassword(auth, email, password);
              
              // Set display name for admin
              if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                  displayName: "Admin"
                });
              }
              
              // Create admin in Firestore
              await setDoc(doc(db, 'users', userCredential.user.uid), {
                uid: userCredential.user.uid,
                email,
                displayName: "Admin",
                photoURL: null,
                isAdmin: true,
                createdAt: new Date().toISOString(),
              });
              
              // Add to admins collection
              await setDoc(doc(collection(db, 'admins'), userCredential.user.uid), {
                email,
                uid: userCredential.user.uid,
                createdAt: new Date().toISOString()
              });
              
              toast({
                title: "Admin account created",
                description: "Welcome! Your admin account has been set up successfully.",
                duration: 5000,
              });
              
              // Format and return user data
              const userData = {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: "Admin",
                photoURL: null,
                isAdmin: true
              };
              
              setUser(userData);
              setAdminMode(true);
              return userData;
            } catch (createError: any) {
              // If we get email-already-in-use but couldn't sign in, it suggests password mismatch
              if (createError.code === 'auth/email-already-in-use') {
                toast({
                  title: "Admin login failed",
                  description: "Incorrect password for admin account.",
                  variant: "destructive",
                  duration: 5000,
                });
                throw new Error("Incorrect password for admin account.");
              }
              
              console.error("Error creating admin account:", createError);
              toast({
                title: "Admin setup failed",
                description: "Could not create admin account. Please try again later.",
                variant: "destructive",
                duration: 5000,
              });
              throw createError;
            }
          } else {
            // Pass through the original sign-in error
            throw signInError;
          }
        }
      }
      
      // Regular login process for non-admin login attempts
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = await formatUserData(userCredential.user);
      setUser(userData);
      setAdminMode(false);
      
      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
        duration: 3000,
      });
      
      return userData;
      
    } catch (error: any) {
      // Handle specific Firebase error codes with more user-friendly messages
      let errorMessage = "Invalid email or password";
      
      if (error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password. Please check your credentials and try again.";
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = "No account exists with this email. Please check your email or sign up.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed login attempts. Please try again later or reset your password.";
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = "This account has been disabled. Please contact support.";
      } else if (error.code) {
        errorMessage = `Error: ${error.code.replace('auth/', '')}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: isAdminAttempt ? "Admin sign in failed" : "Sign in failed",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });
      
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setAdminMode(false);
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
      let message = error.message;
      if (error.code === 'auth/user-not-found') {
        message = "No account found with this email address.";
      }
      
      toast({
        title: "Failed to send reset email",
        description: message,
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
      
      // Update local user state
      if (user) {
        setUser({
          ...user,
          displayName: data.displayName || user.displayName,
          photoURL: data.photoURL || user.photoURL
        });
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
    adminMode,
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
