
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCart, CartItem } from '@/hooks/use-cart';
import { ArrowLeft, ShoppingCart as CartIcon, Trash2, Plus, Minus, CreditCard, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Scroll to top when page loads
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Payment form state
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  
  // Order info
  const [orderInfo, setOrderInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isCheckingOut) {
      setOrderInfo(prev => ({ ...prev, [name]: value }));
    } else {
      setPaymentInfo(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
  };
  
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Store order in local storage
      const order = {
        id: `ORD-${Date.now()}`,
        items: cart,
        total: cartTotal,
        customer: orderInfo,
        date: new Date().toISOString(),
        status: 'Confirmed'
      };
      
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Clear cart and show success
      clearCart();
      setIsProcessingPayment(false);
      setOrderPlaced(true);
      
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. Your order has been confirmed.",
        duration: 5000,
      });
    }, 2000);
  };
  
  // If cart is empty and no order placed yet
  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="bg-gray-50 min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <CartIcon className="h-10 w-10 text-gray-500" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet. Continue shopping to add products.</p>
              <Button asChild>
                <Link to="/products" className="inline-flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // If order has been placed successfully
  if (orderPlaced) {
    return (
      <div className="bg-gray-50 min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Check className="h-10 w-10 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
              <p className="text-gray-600 mb-6">Thank you for your purchase. Your order confirmation has been sent to your email.</p>
              
              <div className="mb-8 text-left bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">ORD-{Date.now()}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">Confirmed</span>
                  </p>
                  <p className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                    <span className="text-gray-800 font-medium">Total:</span>
                    <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/">
                    Return to Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{isCheckingOut ? 'Checkout' : 'Shopping Cart'}</h1>
          
          {/* Desktop breadcrumb */}
          <div className="hidden sm:flex items-center mb-8">
            <div className={`flex items-center ${isCheckingOut ? 'text-gray-400' : 'text-primary font-medium'}`}>
              <span className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-current mr-2">
                1
              </span>
              Cart
            </div>
            <div className="w-24 h-1 bg-gray-200 mx-3">
              <div className={`h-full bg-primary transition-all ${isCheckingOut ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`flex items-center ${isCheckingOut ? 'text-primary font-medium' : 'text-gray-400'}`}>
              <span className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-current mr-2">
                2
              </span>
              Checkout
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items - Show only if not in checkout */}
            {!isCheckingOut && (
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Cart Items ({cart.length})</h2>
                    
                    {/* Cart Items */}
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center py-4 border-b border-gray-200">
                          <div className="sm:w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="sm:ml-6 flex-1">
                            <h3 className="font-medium text-center sm:text-left">{item.name}</h3>
                            <p className="text-sm text-gray-500 text-center sm:text-left mb-4 sm:mb-0">Unit Price: ₹{item.price.toLocaleString()}</p>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex items-center border border-gray-200 rounded-md">
                              <button 
                                className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                                onClick={() => handleQuantityChange(item, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-3 text-sm font-medium">{item.quantity}</span>
                              <button 
                                className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                                onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            
                            <div className="text-right sm:ml-4">
                              <p className="font-semibold">₹{item.totalPrice.toLocaleString()}</p>
                              <button 
                                className="text-sm text-red-500 mt-1 hover:text-red-700"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button asChild variant="outline">
                    <Link to="/products" className="flex items-center">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                  <Button variant="destructive" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </div>
            )}
            
            {/* Checkout Form - Show only if in checkout */}
            {isCheckingOut && (
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            value={orderInfo.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            value={orderInfo.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                          value={orderInfo.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                          value={orderInfo.address}
                          onChange={handleInputChange}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                
                <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                    
                    <form onSubmit={handlePayment} className="space-y-4">
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                          value={paymentInfo.cardName}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          required
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                          value={paymentInfo.cardNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            id="expiry"
                            name="expiry"
                            required
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            value={paymentInfo.expiry}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            required
                            placeholder="123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            value={paymentInfo.cvv}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCheckingOut(false)}
                    className="flex items-center"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Cart
                  </Button>
                  <Button 
                    type="button"
                    onClick={handlePayment}
                    disabled={isProcessingPayment}
                    className="flex items-center"
                  >
                    {isProcessingPayment ? (
                      <>
                        <span className="animate-spin h-4 w-4 border-2 border-white rounded-full border-r-transparent mr-2"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay Now - ₹{cartTotal.toLocaleString()}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal ({cart.reduce((a, c) => a + c.quantity, 0)} items)</span>
                      <span>₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span>₹0</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>₹{cartTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {!isCheckingOut && (
                    <Button className="w-full mt-6" onClick={handleCheckout}>
                      Proceed to Checkout
                    </Button>
                  )}
                </div>
                
                <div className="bg-gray-50 p-6">
                  <h3 className="text-sm font-medium mb-3">We Accept</h3>
                  <div className="flex gap-2">
                    <div className="bg-white p-1 border border-gray-200 rounded">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                    </div>
                    <div className="bg-white p-1 border border-gray-200 rounded">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
                    </div>
                    <div className="bg-white p-1 border border-gray-200 rounded">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png" alt="PayPal" className="h-6" />
                    </div>
                    <div className="bg-white p-1 border border-gray-200 rounded">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Apple_Pay_logo.svg/200px-Apple_Pay_logo.svg.png" alt="Apple Pay" className="h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
