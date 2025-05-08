import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useCart, CartItem } from '@/hooks/use-cart';
import { ShoppingCart as CartIcon, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ShoppingCartProps {
  className?: string;
}

const CartItemComponent: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-100">
      <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
        <p className="text-xs text-gray-500 mt-1">₹{item.price.toLocaleString()} × {item.quantity}</p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-gray-200 rounded-md">
            <button 
              className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-50"
              onClick={() => handleQuantityChange(-1)}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-2 text-xs font-medium">{item.quantity}</span>
            <button 
              className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-50"
              onClick={() => handleQuantityChange(1)}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="font-medium text-sm">₹{item.totalPrice.toLocaleString()}</span>
            <button 
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              onClick={() => removeFromCart(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({ className }) => {
  const { cart, cartTotal, cartCount, isCartOpen, setIsCartOpen, clearCart, updateQuantity, removeFromCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Add the missing handleQuantityChange function
  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };
  
  return (
    <div className={className}>
      <div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <CartIcon className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </div>
      
      {/* Cart Drawer - Fixed for mobile devices with proper text colors */}
      <div className={`
        fixed inset-y-0 right-0 z-[100] bg-white shadow-xl transform transition-transform duration-300
        w-full sm:w-96 max-w-full flex flex-col
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
            <h3 className="text-lg font-medium flex items-center text-gray-900">
              <CartIcon className="h-5 w-5 mr-2 text-primary" />
              <span className="text-gray-900">Shopping Cart</span>
              {cartCount > 0 && <span className="ml-2 text-sm text-gray-500">({cartCount} items)</span>}
            </h3>
            <button 
              className="p-2 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 bg-white">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <CartIcon className="h-16 w-16 text-gray-300 mb-4" />
                <h4 className="text-lg font-medium text-gray-900">Your cart is empty</h4>
                <p className="text-gray-600 mt-2">Looks like you haven't added any products to your cart yet.</p>
                <Button
                  asChild
                  className="mt-6"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Link to="/products" className="text-white">
                    Browse Products
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start border-b border-gray-100 pb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-700 mt-0.5">₹{item.price.toLocaleString()} × {item.quantity}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border-2 border-gray-400 rounded-md bg-white">
                          <button 
                            className="px-2 py-1.5 bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 transition-colors"
                            onClick={() => handleQuantityChange(item, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 text-sm font-medium text-gray-900">{item.quantity}</span>
                          <button 
                            className="px-2 py-1.5 bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 transition-colors"
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button 
                          className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="ml-2 text-right">
                      <span className="font-medium text-gray-900">₹{item.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-white sticky bottom-0">
              {/* Order Summary */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Shipping</span>
                  <span className="text-gray-900">Free</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-primary">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  asChild 
                  variant="outline" 
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-gray-900"
                >
                  <Link to="/cart">
                    View Cart
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  className="w-full text-white"
                >
                  <Link to="/checkout">
                    Checkout
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay for mobile - helps with closing the cart when clicking outside */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[99]" 
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default ShoppingCart;
