import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/contexts/SEOContext';
import StructuredData from '@/components/SEO/StructuredData';
import { Button } from "@/components/ui/button";
import { 
  Wifi, Router, Shield, Server, 
  Home, Building, CheckCircle, Phone,
  Network, Cable, Settings, Lock
} from 'lucide-react';

const NetworkingSolutions = () => {
  const { updateSEO } = useSEO();
  
  useEffect(() => {
    updateSEO({
      title: 'Home & Business Networking Solutions in Kakinada | Wi-Fi & LAN Setup',
      description: 'Reliable networking solutions in Kakinada. We offer Wi-Fi setup for homes and complete network installation and troubleshooting for businesses. Call for a consultation.',
      keywords: 'networking solutions kakinada, wifi setup, lan installation, router configuration, network troubleshooting, business networking, home network setup, internet connectivity',
      canonicalUrl: 'https://sripavancomputers.com/services/networking-solutions',
      ogImage: 'https://sripavancomputers.com/images/networking-og.jpg'
    });
  }, [updateSEO]);

  const homeServices = [
    {
      icon: Router,
      title: 'New Wi-Fi Router Setup and Configuration',
      description: 'Professional installation and configuration of wireless routers for optimal coverage and security.'
    },
    {
      icon: Wifi,
      title: 'Extending Wi-Fi Coverage to Eliminate Dead Spots',
      description: 'Strategic placement of range extenders and mesh systems to ensure complete home coverage.'
    },
    {
      icon: Settings,
      title: 'Troubleshooting Slow or Unreliable Internet',
      description: 'Comprehensive analysis and optimization of your home network for maximum speed and reliability.'
    },
    {
      icon: Lock,
      title: 'Securing Your Home Network',
      description: 'Implementation of security protocols to protect your network from unauthorized access and threats.'
    }
  ];

  const businessServices = [
    {
      icon: Network,
      title: 'Office Network Design and Installation (Wired & Wireless)',
      description: 'Complete network infrastructure planning and implementation for optimal business connectivity.'
    },
    {
      icon: Server,
      title: 'Server Setup and Maintenance',
      description: 'Professional server installation, configuration, and ongoing maintenance for business operations.'
    },
    {
      icon: Shield,
      title: 'Network Security and Firewall Configuration',
      description: 'Advanced security implementation to protect your business data and network infrastructure.'
    },
    {
      icon: Cable,
      title: 'Structured Cabling and Infrastructure',
      description: 'Professional cable management and network infrastructure setup for scalable business growth.'
    }
  ];

  const networkingProcess = [
    {
      step: '1',
      title: 'Site Assessment',
      description: 'Comprehensive evaluation of your space and networking requirements.',
      icon: CheckCircle
    },
    {
      step: '2',
      title: 'Custom Design',
      description: 'Tailored network solution designed for your specific needs and budget.',
      icon: Settings
    },
    {
      step: '3',
      title: 'Professional Installation',
      description: 'Expert installation with clean cable management and optimal placement.',
      icon: Network
    },
    {
      step: '4',
      title: 'Testing & Support',
      description: 'Thorough testing and ongoing support to ensure optimal performance.',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <StructuredData 
        type="LocalBusiness" 
        data={{
          name: "Sri Pavan Computers - Networking Solutions",
          description: "Professional networking solutions in Kakinada for homes and businesses including Wi-Fi setup, LAN installation, and network security.",
          serviceType: "Networking Solutions",
          areaServed: "Kakinada, Andhra Pradesh"
        }} 
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-teal-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Network className="h-16 w-16 text-green-300 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Seamless Networking for Your Home and Business
            </h1>
            <p className="text-xl mb-8 text-green-100">
              In today's connected world, a stable and secure network is essential. We provide comprehensive networking solutions that keep you connected, productive, and secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-green-900 hover:bg-gray-100">
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Free Network Assessment
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-900">
                <Link to="/contact">Call +91 98480 75759</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Networking Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From simple home Wi-Fi setup to complex business network infrastructure, we have the expertise to keep you connected.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Home Services */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg">
              <div className="text-center mb-8">
                <Home className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">For Your Home</h3>
                <p className="text-gray-600">Reliable home networking solutions for seamless connectivity</p>
              </div>
              
              <div className="space-y-6">
                {homeServices.map((service, index) => (
                  <div key={index} className="flex items-start">
                    <service.icon className="h-8 w-8 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h4>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Services */}
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-lg">
              <div className="text-center mb-8">
                <Building className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">For Your Business</h3>
                <p className="text-gray-600">Enterprise-grade networking for maximum productivity</p>
              </div>
              
              <div className="space-y-6">
                {businessServices.map((service, index) => (
                  <div key={index} className="flex items-start">
                    <service.icon className="h-8 w-8 text-green-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h4>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Networking Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Professional Networking Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a systematic approach to ensure your network is designed, installed, and optimized for your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Lines */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-green-200 z-0"></div>
            
            {networkingProcess.map((step, index) => (
              <div key={index} className="relative z-10 text-center">
                {/* Step Number Circle */}
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                
                {/* Step Icon */}
                <step.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                
                {/* Step Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Security Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Network Security</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Protect your network and data with our comprehensive security solutions and best practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Firewall Protection</h3>
              <p className="text-gray-600">Advanced firewall configuration for network security</p>
            </div>
            
            <div className="text-center">
              <Lock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Encrypted Connections</h3>
              <p className="text-gray-600">WPA3 encryption and secure protocols</p>
            </div>
            
            <div className="text-center">
              <Settings className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Control</h3>
              <p className="text-gray-600">User-based access control and monitoring</p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Regular Updates</h3>
              <p className="text-gray-600">Ongoing security updates and maintenance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Network Issues */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Network Problems We Solve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From slow internet to connectivity issues, our experts can diagnose and resolve network problems quickly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Wifi className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Weak Wi-Fi Signal</h3>
              <p className="text-gray-600">Dead zones and poor coverage throughout your space</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Router className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Slow Internet Speed</h3>
              <p className="text-gray-600">Network bottlenecks and performance issues</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Network className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequent Disconnections</h3>
              <p className="text-gray-600">Unstable connections and network drops</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Security Vulnerabilities</h3>
              <p className="text-gray-600">Unsecured networks and potential threats</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Cable className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cable Management Issues</h3>
              <p className="text-gray-600">Messy installations and poor organization</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Server className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Server Connectivity</h3>
              <p className="text-gray-600">Business server and resource access problems</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for a Faster, More Reliable Network?</h2>
          <p className="text-xl mb-8 text-green-100">
            Contact us today to discuss your networking needs and get a customized solution that keeps you connected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Link to="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Get Network Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NetworkingSolutions;
