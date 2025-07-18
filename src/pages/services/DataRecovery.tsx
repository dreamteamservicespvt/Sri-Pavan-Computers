import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/contexts/SEOContext';
import StructuredData from '@/components/SEO/StructuredData';
import { Button } from "@/components/ui/button";
import { 
  HardDrive, Database, AlertTriangle, Shield, 
  CheckCircle, Clock, Lock, Phone, FileX, Zap
} from 'lucide-react';

const DataRecovery = () => {
  const { updateSEO } = useSEO();
  
  useEffect(() => {
    updateSEO({
      title: 'Professional Data Recovery Services in Kakinada | Hard Drive & SSD',
      description: 'Lost critical data? Sri Pavan Computers in Kakinada offers expert data recovery from crashed hard drives, SSDs, and corrupted media. Fast, secure, and reliable.',
      keywords: 'data recovery kakinada, hard drive recovery, ssd data recovery, file recovery service, corrupted drive repair, lost data recovery, crashed hard drive, deleted file recovery',
      canonicalUrl: 'https://sripavancomputers.com/services/data-recovery',
      ogImage: 'https://sripavancomputers.com/images/data-recovery-og.jpg'
    });
  }, [updateSEO]);

  const recoveryScenarios = [
    {
      icon: HardDrive,
      title: 'Crashed or Failed Hard Drives (HDD)',
      description: 'Professional recovery from mechanical failures, head crashes, and corrupted drive systems.'
    },
    {
      icon: Database,
      title: 'Unreadable Solid State Drives (SSD)',
      description: 'Specialized SSD recovery using advanced techniques for flash memory data retrieval.'
    },
    {
      icon: FileX,
      title: 'Accidentally Deleted Files and Folders',
      description: 'Quick recovery of accidentally deleted important documents, photos, and files.'
    },
    {
      icon: Zap,
      title: 'Formatted USB Drives or Memory Cards',
      description: 'Complete data recovery from formatted storage devices and memory cards.'
    },
    {
      icon: AlertTriangle,
      title: 'Data Loss Due to Virus or Ransomware Attack',
      description: 'Specialized recovery from virus attacks and ransomware encryption damage.'
    },
    {
      icon: Shield,
      title: 'Physically Damaged Storage Devices',
      description: 'Clean room recovery from physically damaged drives and storage media.'
    }
  ];

  const recoveryProcess = [
    {
      step: '1',
      title: 'Emergency Assessment',
      description: 'Immediate evaluation of the damage and feasibility of data recovery.',
      icon: AlertTriangle
    },
    {
      step: '2',
      title: 'Secure Recovery Process',
      description: 'Professional data extraction using specialized tools in a controlled environment.',
      icon: Lock
    },
    {
      step: '3',
      title: 'Data Verification & Delivery',
      description: 'Thorough verification of recovered data before secure delivery to client.',
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <StructuredData 
        type="LocalBusiness" 
        data={{
          name: "Sri Pavan Computers - Data Recovery Service",
          description: "Critical data recovery experts in Kakinada specializing in hard drive, SSD, and storage device data recovery with high success rates.",
          serviceType: "Data Recovery Service",
          areaServed: "Kakinada, Andhra Pradesh"
        }} 
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AlertTriangle className="h-16 w-16 text-yellow-300 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Critical Data Recovery Experts in Kakinada
            </h1>
            <p className="text-xl mb-8 text-red-100">
              We understand the stress of losing irreplaceable files. Don't panic - there is hope. Our expert technicians have the tools and expertise to recover your precious data from the most challenging situations.
            </p>
            <div className="bg-yellow-400 text-red-900 p-4 rounded-lg mb-8 font-semibold">
              ⚠️ CRITICAL: Time is essential in data recovery. Power down your device immediately and contact us for professional assistance.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-red-900 hover:bg-gray-100">
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency Recovery Call
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-900">
                <Link to="/contact">Call +91 98480 75759</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* When You Need Data Recovery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">When You Need Data Recovery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our data recovery experts can help in various critical situations where important data has been lost or compromised.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recoveryScenarios.map((scenario, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow border-l-4 border-red-500">
                <scenario.icon className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{scenario.title}</h3>
                <p className="text-gray-600">{scenario.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Saved a Local Business</h2>
              <p className="text-gray-600">A real success story from our data recovery experts</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-start mb-6">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">The Challenge</h3>
                  <p className="text-gray-600">
                    A local Kakinada accounting firm arrived one morning to find their main server had crashed. All their client files, invoices, and financial records were inaccessible. Years of business data seemed lost forever, threatening their entire operation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Intervention</h3>
                  <p className="text-gray-600">
                    The business owner contacted Sri Pavan Computers immediately. Our team responded within hours, taking the failed hardware into our secure lab. We identified a critical head crash on the primary hard drive that required specialized clean-room recovery techniques.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">The Result</h3>
                  <p className="text-gray-600">
                    After 48 hours of meticulous work, we successfully recovered over 95% of the business's critical data. The relief on the owner's face was unforgettable.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <blockquote className="text-lg italic text-gray-700 mb-4">
                  "We had a critical server failure threatening our business. The team at Sri Pavan Computers worked overnight to recover our data and get us back online. They literally saved our business!"
                </blockquote>
                <cite className="text-blue-600 font-semibold">- Sunita Reddy, Small Business Owner</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Confidential & Secure Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Confidential & Secure Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We handle all data with the utmost care, maintaining strict confidentiality and security throughout the recovery process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-red-200 z-0"></div>
            
            {recoveryProcess.map((step, index) => (
              <div key={index} className="relative z-10 text-center">
                {/* Step Number Circle */}
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                
                {/* Step Icon */}
                <step.icon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                
                {/* Step Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Data Security is Our Priority</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We maintain the highest standards of data security and confidentiality throughout the recovery process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Lock className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Strict Confidentiality</h3>
              <p className="text-gray-600">All data handled with complete privacy</p>
            </div>
            
            <div className="text-center">
              <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Environment</h3>
              <p className="text-gray-600">Clean room and controlled lab conditions</p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">High Success Rate</h3>
              <p className="text-gray-600">90%+ success rate in data recovery</p>
            </div>
            
            <div className="text-center">
              <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Response</h3>
              <p className="text-gray-600">Emergency response within hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Call to Action */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="h-16 w-16 text-yellow-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Don't Wait - Every Minute Counts!</h2>
          <p className="text-xl mb-8 text-red-100">
            Time is critical in data recovery. Power down your device and call us immediately for professional assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              <Link to="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Emergency Call Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataRecovery;
