import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ProductProps {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  brand: string;
  specifications?: { [key: string]: string | number };
}

interface ProductCardProps {
  product: ProductProps;
  onView?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView }) => {
  const { name, price, image, category, description } = product;
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">{name}</h3>
          <Badge variant="outline" className="bg-primary/10">{category}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm text-gray-500 line-clamp-2 mb-2">{description}</p>
        <p className="text-lg font-bold text-primary">₹{price.toLocaleString()}</p>
      </CardContent>
      
      <CardFooter>
        <Button onClick={onView} className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
