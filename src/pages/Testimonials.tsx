
import React, { useEffect, useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import TestimonialCard from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';

// Sample testimonial data with avatar images
const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Business Owner",
    message: "Sri Pavan Computers has been our go-to technology partner for over 5 years. Their expertise and dedication to customer service is unmatched in the industry.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Graphic Designer",
    message: "I needed a custom workstation for my design projects, and the team at Sri Pavan Computers built the perfect system for my needs. Exceptional service!",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
  },
  {
    id: 3,
    name: "Akash Reddy",
    role: "IT Manager",
    message: "We've equipped our entire office with systems from Sri Pavan Computers. Their after-sales support and technical assistance have been invaluable to our operations.",
    rating: 4,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 4,
    name: "Ananya Patel",
    role: "Student",
    message: "The staff at Sri Pavan Computers helped me find a laptop that fit my budget and requirements perfectly. They were patient and explained everything clearly.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
  },
  {
    id: 5,
    name: "Venkat Rao",
    role: "Small Business Owner",
    message: "From networking solutions to regular maintenance, Sri Pavan Computers has been our one-stop-shop for all IT needs. Highly recommended for their professional service.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  const [autoScroll, setAutoScroll] = useState(true);
  
  // Auto scroll effect for mobile
  useEffect(() => {
    if (!isMobile || !autoScroll) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isMobile, autoScroll]);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Hero section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">What Our Customers Say</h1>
            <p className="text-xl opacity-90">Read testimonials from our valued customers</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials section - with Auto Scrolling on Mobile */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Customer Testimonials" 
            subtitle="Don't just take our word for it - hear what our customers have to say"
            center={true}
          />
          
          <div className="mt-12">
            {isMobile ? (
              // Mobile carousel with auto-scroll
              <div className="relative">
                <Carousel 
                  className="w-full" 
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  // Remove value and onValueChange props as they don't exist on Carousel
                >
                  <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                      <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <TestimonialCard testimonial={testimonial} />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center mt-4">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full mx-1 ${
                          index === currentIndex ? "bg-primary" : "bg-gray-300"
                        }`}
                        onClick={() => {
                          setCurrentIndex(index);
                          setAutoScroll(false);
                          setTimeout(() => setAutoScroll(true), 10000);
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4 z-10">
                    <CarouselPrevious 
                      onClick={() => setAutoScroll(false)}
                      className="h-8 w-8 opacity-70 hover:opacity-100"
                    />
                    <CarouselNext 
                      onClick={() => setAutoScroll(false)}
                      className="h-8 w-8 opacity-70 hover:opacity-100"
                    />
                  </div>
                </Carousel>
              </div>
            ) : (
              // Desktop grid
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${testimonial.id * 100}ms` }}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-500 mb-6">We're proud to have served hundreds of customers in Kakinada and beyond.</p>
            <Button size="lg" variant="default">
              Share Your Experience
            </Button>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading 
            title="Ready to experience our service?" 
            subtitle="Visit our store or contact us online for personalized technology solutions"
            center={true}
          />
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button asChild size="lg">
              <a href="/contact">Contact Us</a>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <a href="/products">Browse Products</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
