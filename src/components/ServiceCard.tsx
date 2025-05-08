
import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, link }) => {
  return (
    <div className="service-card group">
      <div className="p-8 relative z-10 h-full flex flex-col">
        <div className="mb-6">
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 p-4 w-16 h-16 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
            <Icon className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        
        {link && (
          <div className="mt-auto pt-4">
            <Link 
              to={link} 
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              Learn more
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export default ServiceCard;
