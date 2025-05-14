
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ExternalLink, Plus, Minus, ShoppingCart, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useCart } from '@/hooks/use-cart';

export interface ProductProps {
  id: string;
  name: string;
  category: string;
  price: number; // Ensure this is a number type
  image: string;
  description: string;
  brand: string;
  specifications?: {
    [key: string]: string | number;
  };
}

const ProductCard: React.FC<{ product: ProductProps }> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(product.price);

  // Update total price when quantity changes
  React.useEffect(() => {
    setTotalPrice(product.price * quantity);
  }, [quantity, product.price]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    
    setTimeout(() => {
      addToCart({
        ...product,
        quantity,
        totalPrice: totalPrice
      });
      
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} has been added to your cart.`,
        duration: 3000,
      });
      
      setIsAdding(false);
      setQuantity(1);
    }, 600);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden h-48">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-1">
          {product.brand}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Button variant="secondary" size="sm" className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 font-medium">
            View Details
          </Button>
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{product.category}</div>
        <Link to={`/products/${product.id}`} className="block group-hover:text-primary transition-colors">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="font-bold text-lg text-primary">₹{totalPrice.toLocaleString()}</span>
          
          {/* Quantity selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-200 rounded-md">
              <button 
                className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="px-2 text-sm font-medium">{quantity}</span>
              <button 
                className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            
            <Button 
              size="sm" 
              variant="default"
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`gap-1 ${isAdding ? 'bg-green-600 hover:bg-green-700' : ''}`}
            >
              {isAdding ? (
                <>
                  <span className="animate-spin h-3 w-3 border-2 border-white rounded-full border-r-transparent"></span>
                  <span className="text-xs">Adding...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3.5 w-3.5" />
                  <span className="text-xs">Add</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
