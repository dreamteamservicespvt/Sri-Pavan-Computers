
import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from '@/hooks/use-cart';

interface BuyButtonProps {
  productName: string;
  productId: string;
  price: number | string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  image?: string;
  quantity?: number;
}

const BuyButton: React.FC<BuyButtonProps> = ({ 
  productName, 
  productId,
  price = 0, 
  variant = "default", 
  size = "default",
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070",
  quantity = 1
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();

  // Handle both number and string prices
  const priceValue = typeof price === 'string' 
    ? parseFloat(price.replace(/[₹,]/g, ''))
    : price;

  const handleBuy = () => {
    setIsAdding(true);
    
    // Add to cart with provided quantity
    setTimeout(() => {
      addToCart({
        id: productId,
        name: productName,
        price: priceValue / quantity, // Store unit price
        image: image,
        quantity: quantity,
        totalPrice: priceValue
      });
      
      setIsAdding(false);
      setIsAdded(true);
      
      toast({
        title: "Added to cart",
        description: `${quantity > 1 ? `${quantity} × ` : ''}${productName} has been added to your cart.`,
        duration: 3000,
      });
      
      // Reset button state after showing success
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 800);
  };

  return (
    <Button 
      variant={variant}
      size={size}
      onClick={handleBuy}
      disabled={isAdding || isAdded}
      className={`gap-2 transition-all ${isAdded ? 'bg-green-600 hover:bg-green-700' : ''}`}
    >
      {isAdding ? (
        <>
          <span className="animate-spin h-4 w-4 border-2 border-white rounded-full border-r-transparent"></span>
          Adding...
        </>
      ) : isAdded ? (
        <>
          <Check className="h-5 w-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          {price ? `Buy Now - ₹${priceValue.toLocaleString()}` : 'Buy Now'}
        </>
      )}
    </Button>
  );
};

export default BuyButton;
