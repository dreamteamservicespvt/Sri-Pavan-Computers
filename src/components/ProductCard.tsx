import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ExternalLink, Phone, MessageSquare } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import EnquireButton from '@/components/EnquireButton';

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
  // Enhanced SEO Alt text
  const altText = `${product.name} - ${product.brand} - Available at Sri Pavan Computers Kakinada`;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden h-48">
        <img 
          src={product.image} 
          alt={altText}
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
          {/* Price hidden, replaced with "Contact for pricing" text */}
          <span className="text-sm text-gray-600 italic">Contact for pricing</span>
          
          <EnquireButton 
            productName={product.name}
            productId={product.id}
            variant="default"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
