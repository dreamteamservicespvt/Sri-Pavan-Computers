import React from 'react';
import { Star, User } from 'lucide-react';

interface TestimonialData {
  id?: number;
  name: string;
  role: string;
  message?: string;
  content?: string; // Support both "message" and "content" properties
  image?: string;
  avatarUrl?: string; // Support both "image" and "avatarUrl" properties
  rating?: number;
}

export interface TestimonialCardProps {
  name?: string;
  role?: string;
  content?: string;
  image?: string;
  rating?: number;
  testimonial?: TestimonialData; // Add support for passing entire testimonial object
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial,
  name: propName, 
  role: propRole, 
  content: propContent, 
  image: propImage,
  rating: propRating = 5 
}) => {
  // Use properties from testimonial object if provided, otherwise use props
  const name = testimonial?.name || propName || '';
  const role = testimonial?.role || propRole || '';
  const content = testimonial?.message || testimonial?.content || propContent || '';
  const image = testimonial?.avatarUrl || testimonial?.image || propImage;
  const rating = testimonial?.rating ?? propRating;

  // Enhanced alt text for testimonial
  const altText = `${name} - ${role} - Customer Testimonial for Sri Pavan Computers`;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 hover-card group h-full">
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
      
      <blockquote className="text-gray-700 mb-6 relative">
        <span className="absolute -top-2 -left-2 text-5xl text-primary/10 font-serif">"</span>
        <p className="relative z-10">{content}</p>
      </blockquote>
      
      <div className="flex items-center mt-auto">
        <div className="w-12 h-12 flex-shrink-0 mr-3 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
          {image ? (
            <img src={image} alt={altText} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary text-white">
              <User className="h-6 w-6" />
            </div>
          )}
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
