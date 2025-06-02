import React from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from 'react-router-dom';

interface EnquireButtonProps {
  productName: string;
  productId: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
}

const EnquireButton: React.FC<EnquireButtonProps> = ({ 
  productName, 
  productId,
  variant = "default", 
  size = "default"
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEnquire = () => {
    // Store the product info in sessionStorage to pre-fill the contact form
    sessionStorage.setItem('enquiryProduct', JSON.stringify({
      productId,
      productName
    }));
    
    // Navigate to contact page
    navigate('/contact?enquiry=product');
    
    // Show toast
    toast({
      title: "Product Enquiry",
      description: `Redirecting you to our contact form for ${productName}.`,
      duration: 3000,
    });
  };

  return (
    <Button 
      variant={variant}
      size={size}
      onClick={handleEnquire}
      className="gap-2"
    >
      <MessageSquare className="h-4 w-4" />
      Enquire Now
    </Button>
  );
};

export default EnquireButton;
