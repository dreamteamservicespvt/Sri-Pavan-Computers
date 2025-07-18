import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/contexts/SEOContext';
import StructuredData from '@/components/SEO/StructuredData';
import { Button } from "@/components/ui/button";
import { 
  Cpu, Monitor, Gamepad2, Video, Briefcase, 
  CheckCircle, Star, Clock, Phone, Zap, Award
} from 'lucide-react';

const CustomPCBuilding = () => {
  const { updateSEO } = useSEO();
  
  useEffect(() => {
    updateSEO({
      title: 'Custom PC Builder in Kakinada & Vijayawada | Gaming & Professional Rigs',
      description: 'Build your dream PC with Sri Pavan Computers! We are expert custom PC builders specializing in high-performance gaming rigs and professional workstations for clients in Kakinada and Vijayawada.',
      keywords: 'custom pc build vijayawada, gaming pc store kakinada, custom gaming pc, workstation pc builder, high performance pc, nvidia rtx pc, amd ryzen build, custom computer assembly',
      canonicalUrl: 'https://sripavancomputers.com/services/custom-pc-building',
      ogImage: 'https://sripavancomputers.com/images/custom-pc-og.jpg'
    });
  }, [updateSEO]);

  const buildCategories = [
    {
      icon: Gamepad2,
      title: 'Elite Gaming Rigs',
      description: 'Ultimate gaming machines built for maximum frame rates, 4K resolution, and flawless streaming. Perfect for competitive gaming and content creation.',
      features: ['Latest NVIDIA RTX/AMD GPUs', 'Intel/AMD High-Performance CPUs', 'High-Speed DDR5 RAM', 'NVMe SSD Storage', 'Premium Liquid Cooling'],
      targetAudience: 'Serious Gamers & Streamers'
    },
    {
      icon: Video,
      title: 'Content Creator Workstations',
      description: 'Powerful workstations optimized for video editing, 3D rendering, and graphic design with fast processing and rendering capabilities.',
      features: ['Professional Graphics Cards', 'Multi-Core Processors', 'Large RAM Capacity', 'Fast Storage Solutions', 'Color-Accurate Displays'],
      targetAudience: 'Video Editors & Designers'
    },
    {
      icon: Briefcase,
      title: 'Professional & Business PCs',
      description: 'Reliable, powerful desktops built for coding, data analysis, and demanding business applications with enterprise-grade components.',
      features: ['Business-Grade Components', 'Enhanced Security Features', 'Multiple Monitor Support', 'Expandable Storage', 'Professional Warranty'],
      targetAudience: 'Professionals & Businesses'
    }
  ];

  const buildProcess = [
    {
      step: '1',
      title: 'The Consultation',
      description: 'We start by understanding YOU—your goals, your favorite games, your workflow, and your budget. This ensures every component serves your specific needs.',
      icon: CheckCircle
    },
    {
      step: '2',
      title: 'Expert Component Selection',
      description: 'We guide you through choosing the perfect combination of genuine, high-quality components from brands like Intel, AMD, NVIDIA, Corsair, and more. No compromises.',
      icon: Star
    },
    {
      step: '3',
      title: 'Professional Assembly & Cable Management',
      description: 'Our certified technicians meticulously assemble your PC with clean, professional cable management for optimal airflow and aesthetics.',
      icon: Award
    },
    {
      step: '4',
      title: 'Rigorous Testing & Benchmarking',
      description: 'We stress-test every component to ensure rock-solid stability and performance before it ever leaves our store.',
      icon: Zap
    }
  ];

  const brands = [
    { name: 'Intel', logo: 'https://logos-world.net/wp-content/uploads/2020/07/Intel-Logo.png' },
    { name: 'AMD', logo: 'https://logos-world.net/wp-content/uploads/2020/07/AMD-Logo.png' },
    { name: 'NVIDIA', logo: 'https://logos-world.net/wp-content/uploads/2020/11/NVIDIA-Logo.png' },
    { name: 'Corsair', logo: 'https://logos-world.net/wp-content/uploads/2020/12/Corsair-Logo.png' },
    { name: 'ASUS', logo: 'https://logos-world.net/wp-content/uploads/2020/07/Asus-Logo.png' },
    { name: 'MSI', logo: 'https://logos-world.net/wp-content/uploads/2020/09/MSI-Logo.png' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <StructuredData 
        type="LocalBusiness" 
        data={{
          name: "Sri Pavan Computers - Custom PC Building Service",
          description: "Expert custom PC builder specializing in high-performance gaming rigs and professional workstations for clients in Kakinada and Vijayawada.",
          serviceType: "Custom PC Building Service",
          areaServed: "Kakinada, Vijayawada, Andhra Pradesh"
        }} 
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Vision, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Expertly Built</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Experience the difference between an off-the-shelf PC and a professionally custom-built machine. We create high-performance computers tailored perfectly to your needs - whether you're a gamer, creator, or professional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0">
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Start Your Build
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                <Link to="/contact">Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Build For */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Build For</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every custom PC we build is tailored to specific needs and use cases. Here's how we serve different types of users.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {buildCategories.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-blue-600 font-semibold text-sm">{category.targetAudience}</p>
                </div>
                
                <p className="text-gray-600 mb-6">{category.description}</p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Key Features:</h4>
                  <ul className="space-y-2">
                    {category.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Sri Pavan Computers Build Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Sri Pavan Computers Build Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our systematic approach ensures every custom PC meets the highest standards of performance, quality, and reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Lines */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-300 to-blue-200 z-0"></div>
            
            {buildProcess.map((step, index) => (
              <div key={index} className="relative z-10 text-center">
                {/* Step Number Circle */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {step.step}
                </div>
                
                {/* Step Icon */}
                <step.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                
                {/* Step Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Serving Kakinada and Vijayawada */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Serving Kakinada and Vijayawada</h2>
            <p className="text-lg text-gray-600 mb-8">
              While our workshop is located in Kakinada, we are proud to be the go-to custom PC builder for enthusiasts and professionals in Vijayawada. Distance is no barrier to building your dream machine.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">For Kakinada Customers</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Visit our workshop anytime</li>
                  <li>• See builds in progress</li>
                  <li>• Hands-on component selection</li>
                  <li>• Same-day consultation</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">For Vijayawada Customers</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Remote consultation via video call</li>
                  <li>• Detailed build photos & updates</li>
                  <li>• Secure delivery to your location</li>
                  <li>• Full setup and testing support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Component Brands */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Premium Component Partners</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We work exclusively with the world's leading hardware manufacturers to ensure every component meets our exacting standards.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brands.map((brand, index) => (
              <div key={index} className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} premium components`}
                  className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Custom Builds */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Custom Builds?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The advantages of a professionally built custom PC go far beyond just performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Maximum Performance</h3>
              <p className="text-gray-600">Optimized component combinations for peak efficiency</p>
            </div>
            
            <div className="text-center">
              <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only genuine parts from authorized distributors</p>
            </div>
            
            <div className="text-center">
              <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Assembly</h3>
              <p className="text-gray-600">Expert cable management and thermal optimization</p>
            </div>
            
            <div className="text-center">
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Future-Proof Design</h3>
              <p className="text-gray-600">Built for upgradability and long-term performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Dream PC?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Contact our build experts today to start the conversation about your perfect custom PC. From gaming beasts to professional workstations, we bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Link to="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Start Your Build Today
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              <Link to="/products">View Components</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomPCBuilding;
