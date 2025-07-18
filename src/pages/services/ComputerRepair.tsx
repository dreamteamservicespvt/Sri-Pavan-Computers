import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/contexts/SEOContext';
import StructuredData from '@/components/SEO/StructuredData';
import { Button } from "@/components/ui/button";
import { 
  Monitor, Laptop, Cpu, HardDrive, Zap, 
  CheckCircle, Clock, Shield, Wrench, Phone
} from 'lucide-react';

const ComputerRepair = () => {
  const { updateSEO } = useSEO();
  
  useEffect(() => {
    updateSEO({
      title: 'Expert Laptop & Desktop Repair Service in Kakinada | All Brands',
      description: 'Fast and reliable laptop and desktop repair in Kakinada. Our certified technicians fix all brands like HP, Dell, Lenovo, and Apple. Screen repair, virus removal, and more!',
      keywords: 'laptop repair kakinada, desktop repair service, computer repair near me, hp laptop repair, dell service center, lenovo repair, apple macbook repair, screen replacement, virus removal, motherboard repair',
      canonicalUrl: 'https://sripavancomputers.com/services/computer-repair',
      ogImage: 'https://sripavancomputers.com/images/computer-repair-og.jpg'
    });
  }, [updateSEO]);

  const brands = [
    { name: 'HP', logo: 'https://logos-world.net/wp-content/uploads/2020/07/HP-Logo.png' },
    { name: 'Dell', logo: 'https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo.png' },
    { name: 'Lenovo', logo: 'https://logos-world.net/wp-content/uploads/2020/07/Lenovo-Logo.png' },
    { name: 'Acer', logo: 'https://logos-world.net/wp-content/uploads/2020/07/Acer-Logo.png' },
    { name: 'Asus', logo: 'https://logos-world.net/wp-content/uploads/2020/07/Asus-Logo.png' },
    { name: 'Apple', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png' }
  ];

  const commonProblems = [
    {
      icon: Monitor,
      title: 'Cracked or Broken Laptop Screens',
      description: 'Professional screen replacement for all laptop models with genuine parts and warranty.'
    },
    {
      icon: Wrench,
      title: 'Laptop Keyboard and Touchpad Issues',
      description: 'Expert repair and replacement of faulty keyboards, touchpads, and input devices.'
    },
    {
      icon: Zap,
      title: 'PC Not Turning On or Booting Up',
      description: 'Comprehensive diagnosis and repair of power and boot-related issues.'
    },
    {
      icon: Shield,
      title: 'Virus, Spyware, and Malware Removal',
      description: 'Complete malware removal and system security optimization services.'
    },
    {
      icon: Cpu,
      title: 'Slow Performance & System Tune-Ups',
      description: 'Performance optimization, cleanup, and system maintenance services.'
    },
    {
      icon: HardDrive,
      title: 'Hardware Upgrades (RAM, SSD)',
      description: 'Professional hardware upgrades to boost your computer\'s performance.'
    }
  ];

  const repairProcess = [
    {
      step: '1',
      title: 'Thorough Diagnosis',
      description: 'We meticulously assess your device to find the root cause of the problem using advanced diagnostic tools.',
      icon: CheckCircle
    },
    {
      step: '2',
      title: 'Expert Solution',
      description: 'Our certified technicians implement the correct fix with precision using genuine parts and professional techniques.',
      icon: Wrench
    },
    {
      step: '3',
      title: 'Rigorous Quality Check',
      description: 'We test everything thoroughly to ensure the problem is fully resolved before returning your device.',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <StructuredData 
        type="LocalBusiness" 
        data={{
          name: "Sri Pavan Computers - Computer & Laptop Repair Service",
          description: "Professional computer and laptop repair services in Kakinada for all major brands including HP, Dell, Lenovo, Apple, Acer, and Asus.",
          serviceType: "Computer Repair Service",
          areaServed: "Kakinada, Andhra Pradesh"
        }} 
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Laptop & Desktop Repair Services in Kakinada
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Don't let a broken computer slow you down. Our expert team is here to help restore your device to perfect working condition with fast, reliable, and affordable repair services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Get Free Diagnosis
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                <Link to="/contact">Call +91 98480 75759</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brands We Service */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Brands We Service</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our certified technicians are experienced in servicing all major computer and laptop brands with genuine parts and professional expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brands.map((brand, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} laptop and computer repair`}
                  className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Problems We Solve */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Problems We Solve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From hardware failures to software issues, our expert technicians can diagnose and fix a wide range of computer problems quickly and efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commonProblems.map((problem, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <problem.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{problem.title}</h3>
                <p className="text-gray-600">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Simple 3-Step Repair Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Simple 3-Step Repair Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a systematic approach to ensure your device is properly diagnosed, expertly repaired, and thoroughly tested.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-blue-200 z-0"></div>
            
            {repairProcess.map((step, index) => (
              <div key={index} className="relative z-10 text-center">
                {/* Step Number Circle */}
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                
                {/* Step Icon */}
                <step.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                
                {/* Step Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Sri Pavan Computers?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              With nearly 20 years of experience serving Kakinada, we are your trusted partner for all computer repair needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">Most repairs completed within 24-48 hours</p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Genuine Parts</h3>
              <p className="text-gray-600">Only authentic parts from authorized distributors</p>
            </div>
            
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Warranty Provided</h3>
              <p className="text-gray-600">All repairs come with service warranty</p>
            </div>
            
            <div className="text-center">
              <Wrench className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Technicians</h3>
              <p className="text-gray-600">Certified professionals with years of experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Fix Your Computer?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Don't let a broken computer slow you down. Contact Sri Pavan Computers today for a free diagnostic and quote!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComputerRepair;
