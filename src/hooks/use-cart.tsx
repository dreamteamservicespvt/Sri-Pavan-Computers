
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/use-auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  totalPrice: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  // Load cart from localStorage or Firebase on mount or when user changes
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        // If user is logged in, try to load cart from Firebase
        try {
          const userCartRef = doc(db, 'userCarts', user.uid);
          const cartSnap = await getDoc(userCartRef);
          
          if (cartSnap.exists() && cartSnap.data().items) {
            setCart(cartSnap.data().items);
          } else {
            // If no cart in Firebase but exists in localStorage, sync localStorage to Firebase
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
              const parsedCart = JSON.parse(savedCart);
              setCart(parsedCart);
              await setDoc(userCartRef, { 
                items: parsedCart,
                updatedAt: new Date().toISOString()
              });
            } else {
              setCart([]);
            }
          }
        } catch (error) {
          console.error('Error loading cart from Firebase:', error);
          // Fallback to localStorage
          loadFromLocalStorage();
        }
      } else {
        // If not logged in, load from localStorage
        loadFromLocalStorage();
      }
    };

    const loadFromLocalStorage = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error('Failed to parse cart data from localStorage:', error);
          setCart([]);
          localStorage.removeItem('cart');
        }
      }
    };

    loadCart();
  }, [user]);

  // Update localStorage and Firebase when cart changes
  useEffect(() => {
    if (cart.length > 0) {
      // Always update localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update Firebase if user is logged in
      if (user) {
        const updateFirebaseCart = async () => {
          try {
            const userCartRef = doc(db, 'userCarts', user.uid);
            await setDoc(userCartRef, { 
              items: cart,
              updatedAt: new Date().toISOString()
            });
          } catch (error) {
            console.error('Error updating cart in Firebase:', error);
          }
        };
        
        updateFirebaseCart();
      }
    } else {
      localStorage.removeItem('cart');
      
      // Clear Firebase cart if user is logged in
      if (user) {
        const clearFirebaseCart = async () => {
          try {
            const userCartRef = doc(db, 'userCarts', user.uid);
            await setDoc(userCartRef, { 
              items: [],
              updatedAt: new Date().toISOString()
            });
          } catch (error) {
            console.error('Error clearing cart in Firebase:', error);
          }
        };
        
        clearFirebaseCart();
      }
    }

    // Calculate totals
    const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    setCartTotal(total);
    setCartCount(count);
  }, [cart, user]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      
      if (existingItem) {
        // Update existing item
        return prevCart.map((cartItem) => 
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity,
                totalPrice: (cartItem.quantity + item.quantity) * cartItem.price
              }
            : cartItem
        );
      } else {
        // Add new item
        return [...prevCart, item];
      }
    });
    
    // Auto open cart when adding items
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart((prevCart) =>
      prevCart.map((item) => 
        item.id === id
          ? { ...item, quantity, totalPrice: quantity * item.price }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
