import React, { useRef, useState, useEffect } from 'react';
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
import Autoplay from 'embla-carousel-autoplay';
import EnhancedServiceCard from '@/components/EnhancedServiceCard';

// Feature Card Component
const FeatureCard = ({ title, description, imageUrl, icon: Icon }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 h-80 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Lazy-loaded background image with animation */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      ></div>
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
      
      {/* Content container */}
      <div className="relative h-full z-10 flex flex-col justify-end p-6 text-white">
        <div className="mb-4">
          <Icon className="h-8 w-8 text-primary mb-2" />
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-white/90">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Featured product data with enhanced images and styling
const featuredProducts = [
  {
    id: "1",
    title: "Custom Gaming PCs",
    icon: PcCase,
    description: "Build your dream gaming PC with high-performance components. We offer custom builds with the latest graphics cards and processors.",
    imageUrl: "https://res.cloudinary.com/de3ofvyee/image/upload/v1731163861/Asus%20Gaming%20Version/kv_fffs4a.webp"
  },
  {
    id: "2",
    title: "Business Laptops",
    icon: Laptop,
    description: "Reliable laptops for business from top brands like HP, Dell, and Lenovo with extended warranty options.",
    imageUrl: "https://laptopclinic.co.ke/cdn/shop/articles/laptop_prices_in_kenya.jpg?v=1688384761&width=1200"
  },
  {
    id: "3",
    title: "Smartphone & Tablets",
    icon: Smartphone,
    description: "Latest smartphones and tablets from Apple, Samsung, and other leading brands with excellent after-sales service.",
    imageUrl: "https://www.bizzbuzz.news/h-upload/2025/01/03/1950147-five-mind-blowing-smartphones-coming-in-2025-iphone-17-galaxy-s25-and-more.webp"
  }
];

// Enhanced Product Card Component with background image and animations
const ProductCard = ({ title, description, icon: Icon, imageUrl }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 h-96 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Lazy-loaded background image with animation */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      ></div>
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
      
      {/* Content container */}
      <div className="relative h-full z-10 flex flex-col justify-end p-6 text-white">
        <div className="mb-4">
          <Icon className="h-8 w-8 text-primary mb-2" />
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-white/90 mb-4">{description}</p>
          <Button asChild variant="outline" className="bg-white/10 border-white/30 hover:bg-white/20 transition-all w-full backdrop-blur-sm">
            <Link to="/products" className="inline-flex items-center justify-center">
              Explore Products <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Enhanced services data with background images
const enhancedServices = [
  {
    id: "1",
    title: "Computer Repair",
    icon: Hammer,
    description: "Expert repair services for desktops, laptops, printers, and other hardware with quick turnaround time.",
    backgroundImage: "https://content.jdmagicbox.com/comp/def_content/computer_repair_and_services/default-computer-repair-and-services-9.jpg"
  },
  {
    id: "2",
    title: "Data Recovery",
    icon: HardDrive,
    description: "Recover lost data from crashed hard drives, corrupted storage devices, and formatted media.",
    backgroundImage: "https://www.securedatarecovery.com/Media/blog/2023/data-recovery-possible-after-formatting.webp"
  },
  {
    id: "3",
    title: "Networking Solutions",
    icon: WifiIcon,
    description: "Complete networking solutions including setup, configuration, and troubleshooting for homes and businesses.",
    backgroundImage: "https://www.portmantech.com/wp-content/uploads/2024/06/Networking-Solutions-1400x788.jpg"
  }
];

// Define services for use in the component
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

// Service plans data
const servicePlans = [
  {
    id: 1,
    name: "Basic Plan",
    description: "For individual users",
    price: "₹499",
    period: "/visit",
    popular: false,
    features: [
      "Basic diagnostics",
      "Software installations",
      "Virus removal",
      "Priority support",
      "24/7 assistance"
    ],
    cta: "Get Started",
    link: "/contact",
    backgroundImage: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070"
  },
  {
    id: 2,
    name: "Pro Plan",
    description: "For small businesses",
    price: "₹1,499",
    period: "/month",
    popular: true,
    features: [
      "All Basic features",
      "Priority support",
      "Monthly maintenance",
      "Network support",
      "24/7 assistance"
    ],
    cta: "Get Started",
    link: "/contact",
    backgroundImage: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=2070"
  },
  {
    id: 3,
    name: "Enterprise Plan",
    description: "For large organizations",
    price: "₹4,999",
    period: "/month",
    popular: false,
    features: [
      "All Pro features",
      "24/7 assistance",
      "Dedicated support",
      "Customized solutions",
      "On-site support"
    ],
    cta: "Contact Us",
    link: "/contact",
    backgroundImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070"
  }
];

// Service process steps data
const serviceProcessSteps = [
  {
    id: 1,
    number: "1",
    title: "Diagnosis",
    description: "We thoroughly assess your device or technology issue to identify the root cause.",
    image: "https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?q=80&w=2080"
  },
  {
    id: 2,
    number: "2",
    title: "Solution",
    description: "Our technicians implement the appropriate fix or service with expertise and precision.",
    image: "https://images.unsplash.com/photo-1580795479225-c50ab8c3348d?q=80&w=2071"
  },
  {
    id: 3,
    number: "3",
    title: "Quality Check",
    description: "We thoroughly test everything to ensure the issue is fully resolved before delivery.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070"
  }
];

// Testimonials data with images - fixed format
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
      
      {/* Features section - Redesigned without icons or numbers */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Why Choose Sri Pavan Computers?" 
            subtitle="Trusted by thousands of customers in Kakinada since 2015"
            center={true}
          />
          
          <div className="mt-12 relative">
            {/* Connected line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {/* Fast Service */}
              <div className="flex flex-col items-center transition-all duration-700 hover:-translate-y-2">
                {/* Image - removed circles completely */}
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg shadow-md">
                  <img 
                    src="https://xfusion.io/wp-content/uploads/2024/09/xfusion_00663_A_high-quality_image_of_a_support_agent-an_Asian_6739c57a-9312-4f2b-b42e-a806cb1c24c9-e1727279726398.png" 
                    alt="Fast Service" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                {/* Content */}
                <div className="text-center px-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Service</h3>
                  <p className="text-gray-600">Quick response and rapid resolution for all your IT needs</p>
                </div>
              </div>
              
              {/* Quality Products */}
              <div className="flex flex-col items-center transition-all duration-700 hover:-translate-y-2">
                {/* Image - removed circles completely */}
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg shadow-md">
                  <img 
                    src="https://images.ctfassets.net/pdf29us7flmy/5fRpu9ebMxYKp3NPg0KFAo/99f142ee52ea57425edfccda6789c099/Copy_of_GettyImages-603706529_optimized.jpg?w=1440&q=100&fm=avif" 
                    alt="Quality Products" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                <div className="text-center px-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Products</h3>
                  <p className="text-gray-600">Genuine products from authorized distributors with warranty</p>
                </div>
              </div>
              
              {/* Expert Technicians */}
              <div className="flex flex-col items-center transition-all duration-700 hover:-translate-y-2">
                {/* Image - removed circles completely */}
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg shadow-md">
                  <img 
                    src="https://newhorizons.com.sa/Portals/350/Images/Technical-Training-Courses-at-New-Horizons.jpg" 
                    alt="Expert Technicians" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                <div className="text-center px-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Technicians</h3>
                  <p className="text-gray-600">Certified and experienced technical team for all solutions</p>
                </div>
              </div>
              
              {/* Wide Selection */}
              <div className="flex flex-col items-center transition-all duration-700 hover:-translate-y-2">
                {/* Image - removed circles completely */}
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg shadow-md">
                  <img 
                    src="https://i.rtings.com/assets/pages/ZRskDBBI/best-laptop-brands-20250507-1-medium.jpg?format=auto" 
                    alt="Wide Selection" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                <div className="text-center px-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Wide Selection</h3>
                  <p className="text-gray-600">Extensive range of products from leading brands to choose from</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products section - Updated with connected line animation */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Featured Products" 
            subtitle="Explore our popular products and solutions"
            center={true}
          />
          
          <div className="mt-12 relative">
            {/* Connected line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {featuredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="flex flex-col items-center transition-all duration-700 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="w-full h-64 mb-4 overflow-hidden rounded-lg shadow-md">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="text-center px-4">
                    <div className="flex items-center justify-center mb-2">
                      <product.icon className="h-6 w-6 text-primary mr-2" />
                      <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/products" className="inline-flex items-center justify-center">
                        Explore Products <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="default">
              <Link to="/products" className="inline-flex items-center">
                Browse All Products <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Services section - Enhanced with connected line animation */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Services" 
            subtitle="Professional IT services for all your technology needs"
            center={true}
          />
          
          <div className="mt-12 relative">
            {/* Connected line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {enhancedServices.map((service, index) => (
                <EnhancedServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  backgroundImage={service.backgroundImage}
                  link="/services"
                  animationDelay={index * 100} // Staggered animation
                />
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="default" className="shadow-md hover:shadow-lg transition-all">
              <Link to="/services" className="inline-flex items-center">
                Explore All Services <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Service Process Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Service Process" 
            subtitle="How we work to deliver exceptional service"
            center={true}
          />
          
          <div className="mt-12 relative">
            {/* Connected line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {serviceProcessSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  className="flex flex-col items-center transition-all duration-700 hover:transform hover:-translate-y-2"
                >
                  {/* Number Circle with gradient border */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-blue-600 blur-sm opacity-50"></div>
                    <div className="w-16 h-16 flex items-center justify-center bg-white text-primary text-2xl font-bold rounded-full border-4 border-primary relative z-10 shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Image */}
                  <div className="w-full h-48 mb-4 overflow-hidden rounded-lg shadow-md">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="text-center px-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild variant="default">
              <Link to="/services" className="inline-flex items-center">
                Learn More About Our Process <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Service Plans Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Service Plans" 
            subtitle="Choose the right service plan for your needs"
            center={true}
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicePlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2 group h-full ${
                  plan.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {/* Background image with overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${plan.backgroundImage})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
                
                {/* Popular tag */}
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-white px-4 py-1 font-semibold rounded-bl-lg">
                      Popular
                    </div>
                  </div>
                )}
                
                {/* Content */}
                <div className="relative z-10 p-6 text-white h-full flex flex-col">
                  <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-white/80 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-white/80">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild 
                    variant={plan.popular ? "default" : "outline"} 
                    className={`w-full ${
                      !plan.popular ? "bg-white/10 border-white/30 hover:bg-white/20" : ""
                    }`}
                  >
                    <Link to={plan.link}>
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Need a custom plan? Contact us for a tailored solution.</p>
            <Button asChild variant="default">
              <Link to="/contact" className="inline-flex items-center">
                Request Custom Quote <ArrowRight className="h-4 w-4 ml-2" />
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
              // Auto-advance the slides every 5 seconds
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
            >
              <CarouselContent className="py-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="sm:basis-full md:basis-1/2 lg:basis-1/3 pl-4 pr-4">
                    <div className="h-full bg-white border border-gray-100 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      {/* Quote icon */}
                      <div className="mb-4 text-primary">
                        <svg width="30" height="30" viewBox="0 0 50 50" fill="currentColor">
                          <path d="M25,2.5C12.5,2.5,2.5,12.5,2.5,25S12.5,47.5,25,47.5S47.5,37.5,47.5,25S37.5,2.5,25,2.5z M20.7,35.9h-6.4V34 c0-4.3,0.6-7.6,1.7-9.9c1.2-2.3,3.1-4.5,5.9-6.6l3,3.3c-2.1,1.4-3.4,2.9-4.2,4.5c-0.7,1.6-1.1,3.9-1.2,6.8h1.2V35.9z M32.2,35.9 h-6.4V34c0-4.3,0.6-7.6,1.7-9.9c1.2-2.3,3.1-4.5,5.9-6.6l3,3.3c-2.1,1.4-3.4,2.9-4.2,4.5c-0.7,1.6-1.1,3.9-1.2,6.8h1.2V35.9z"/>
                        </svg>
                      </div>
                      
                      {/* Testimonial content */}
                      <p className="text-gray-700 mb-6 italic">{testimonial.content}</p>
                      
                      {/* Author info */}
                      <div className="flex items-center">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full mr-4 border-2 border-primary"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      {/* Rating stars */}
                      <div className="flex mt-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-500" : "text-gray-300"}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
              
              {/* Carousel indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button 
                    key={index} 
                    onClick={() => {/* Add slide-to-index functionality */}} 
                    className={`w-2 h-2 rounded-full transition-all ${
                      /* Add logic to highlight current indicator */ 
                      index === 0 ? 'bg-primary w-4' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
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
      
      {/* CTA section with background image */}
      <section className="py-16 md:py-20 relative">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: `url(https://www.unido.org/sites/default/files/styles/article_hero_image/public/2023-01/technology%20transfer%20%282%29.jpg?itok=5n0QP18X)` 
          }}
        ></div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-primary/80"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Technology Experience?</h2>
          <p className="text-lg mb-8 text-white/90">Visit our store or contact us today for expert technology solutions tailored to your needs.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="secondary" size="lg" className="font-medium">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="bg-white/10 border-white/30 hover:bg-white/20" size="lg">
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
