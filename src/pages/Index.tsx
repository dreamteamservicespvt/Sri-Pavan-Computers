
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import { Button } from "@/components/ui/button";
import { 
  Monitor, Cpu, HardDrive, Printer, WifiIcon, 
  Clock, ShieldCheck, Hammer, ArrowRight,
  ChevronRight, Laptop, PcCase, Smartphone
} from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Featured product data
const featuredProducts = [
  {
    id: "1",
    title: "Custom Gaming PCs",
    icon: PcCase,
    description: "Build your dream gaming PC with high-performance components. We offer custom builds with the latest graphics cards and processors."
  },
  {
    id: "2",
    title: "Business Laptops",
    icon: Laptop,
    description: "Reliable laptops for business from top brands like HP, Dell, and Lenovo with extended warranty options."
  },
  {
    id: "3",
    title: "Smartphone & Tablets",
    icon: Smartphone,
    description: "Latest smartphones and tablets from Apple, Samsung, and other leading brands with excellent after-sales service."
  }
];

// Services data
const services = [
  {
    id: "1",
    title: "Computer Repair",
    icon: Hammer,
    description: "Expert repair services for desktops, laptops, printers, and other hardware with quick turnaround time."
  },
  {
    id: "2",
    title: "Data Recovery",
    icon: HardDrive,
    description: "Recover lost data from crashed hard drives, corrupted storage devices, and formatted media."
  },
  {
    id: "3",
    title: "Networking Solutions",
    icon: WifiIcon,
    description: "Complete networking solutions including setup, configuration, and troubleshooting for homes and businesses."
  }
];

// Testimonials data with images
const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Business Owner",
    content: "Sri Pavan Computers has been our trusted IT partner for over 5 years. Their service is exceptional and prompt. We rely on them for all our hardware and networking needs.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "College Professor",
    content: "I purchased a laptop from Sri Pavan Computers and the experience was fantastic. The team helped me choose the right configuration for my teaching needs.",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    rating: 5
  },
  {
    name: "Venkat Rao",
    role: "Software Developer",
    content: "The custom PC I got built from Sri Pavan Computers is a beast! Perfect for my coding and gaming needs. Great value for money and excellent component selection advice.",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    rating: 5
  },
  {
    name: "Sunita Reddy",
    role: "Small Business Owner",
    content: "We had a critical server failure threatening our business. The team at Sri Pavan Computers worked overnight to recover our data and get us back online.",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
    rating: 4
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <Hero />
      
      {/* Features section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Why Choose Sri Pavan Computers?" 
            subtitle="Trusted by thousands of customers in Kakinada since 2015"
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-center transform hover:-translate-y-1 duration-300">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center text-primary mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Fast Service</h3>
              <p className="text-gray-600">Quick response and rapid resolution for all your IT needs</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-center transform hover:-translate-y-1 duration-300">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center text-primary mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Quality Products</h3>
              <p className="text-gray-600">Genuine products from authorized distributors with warranty</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-center transform hover:-translate-y-1 duration-300">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center text-primary mb-4">
                <Cpu className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Expert Technicians</h3>
              <p className="text-gray-600">Certified and experienced technical team for all solutions</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-center transform hover:-translate-y-1 duration-300">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center text-primary mb-4">
                <Monitor className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Extensive range of products from leading brands to choose from</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Featured Products" 
            subtitle="Explore our popular products and solutions"
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 transform hover:-translate-y-1 duration-300">
                <div className="rounded-full bg-blue-100 p-3 w-16 h-16 flex items-center justify-center text-primary mb-4">
                  <product.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Link 
                  to="/products" 
                  className="text-primary font-medium inline-flex items-center hover:underline"
                >
                  Browse Products <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/products" className="inline-flex items-center">
                View All Products <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Services section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Services" 
            subtitle="Professional IT services for all your technology needs"
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {services.map(service => (
              <ServiceCard 
                key={service.id}
                title={service.title}
                icon={service.icon}
                description={service.description}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/services" className="inline-flex items-center">
                Explore All Services <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials section with carousel */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="What Our Customers Say" 
            subtitle="Hear from our satisfied clients about their experience"
            center={true}
          />
          
          <div className="mt-12 px-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="py-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="sm:basis-full md:basis-1/2 lg:basis-1/3 pl-4 pr-4">
                    <TestimonialCard
                      name={testimonial.name}
                      role={testimonial.role}
                      content={testimonial.content}
                      image={testimonial.image}
                      rating={testimonial.rating}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="static position-static ml-0 translate-y-0" />
                <CarouselNext className="static position-static ml-0 translate-y-0" />
              </div>
            </Carousel>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link to="/testimonials" className="inline-flex items-center">
                Read More Testimonials <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Technology Experience?</h2>
          <p className="text-lg mb-8 text-white/90">Visit our store or contact us today for expert technology solutions tailored to your needs.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="bg-white/10 border-white/30" size="lg">
              <a href="tel:+919848075759">
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
