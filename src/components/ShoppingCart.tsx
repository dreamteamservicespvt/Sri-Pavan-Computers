
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useCart, CartItem } from '@/hooks/use-cart';
import { ShoppingCart as CartIcon, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

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

const ShoppingCart: React.FC = () => {
  const { cart, cartTotal, cartCount, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  return (
    <>
      {/* Cart Button */}
      <div className="relative">
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
      
      {/* Cart Drawer */}
      <div className={`
        fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-medium flex items-center">
              <CartIcon className="h-5 w-5 mr-2" />
              <span>Shopping Cart</span>
              {cartCount > 0 && <span className="ml-2 text-sm text-gray-500">({cartCount} items)</span>}
            </h3>
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsCartOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <CartIcon className="h-16 w-16 text-gray-300 mb-4" />
                <h4 className="text-lg font-medium">Your cart is empty</h4>
                <p className="text-gray-500 mt-2">Looks like you haven't added any products to your cart yet.</p>
                <Button
                  asChild
                  className="mt-6"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Link to="/products">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-1">
                {cart.map((item) => (
                  <CartItemComponent key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
          
          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
              
              {/* Checkout Button */}
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </Button>
                <Button asChild onClick={() => setIsCartOpen(false)}>
                  <Link to="/cart">
                    View Cart
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}
    </>
  );
};

export default ShoppingCart;
