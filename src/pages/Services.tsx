
import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import ServiceCard from '@/components/ServiceCard';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { 
  Hammer, HardDrive, WifiIcon, Database, ShieldCheck, 
  Laptop, Monitor, Printer, Headphones, CloudCog,
  Smartphone, ArrowRight
} from 'lucide-react';

// Services data
const services = [
  {
    id: "1",
    title: "Computer Repair",
    icon: Hammer,
    description: "Expert repair services for desktops, laptops, and all computer hardware with quick turnaround time."
  },
  {
    id: "2",
    title: "Data Recovery",
    icon: HardDrive,
    description: "Professional recovery of lost data from crashed hard drives, corrupted storage, and formatted media."
  },
  {
    id: "3",
    title: "Networking Solutions",
    icon: WifiIcon,
    description: "Complete networking setup including routers, switches, access points, and network security."
  },
  {
    id: "4",
    title: "Software Solutions",
    icon: Database,
    description: "Software installation, configuration, and troubleshooting for business and personal needs."
  },
  {
    id: "5",
    title: "IT Security",
    icon: ShieldCheck,
    description: "Comprehensive security solutions including antivirus, firewall setup, and data protection."
  },
  {
    id: "6",
    title: "Laptop Repair",
    icon: Laptop,
    description: "Specialized laptop repairs including screen replacement, keyboard fixing, and component upgrades."
  },
  {
    id: "7",
    title: "Monitor Repair",
    icon: Monitor,
    description: "LCD/LED monitor diagnostics and repair services for all major brands."
  },
  {
    id: "8",
    title: "Printer Service",
    icon: Printer,
    description: "Printer maintenance, repair, and cartridge refilling for inkjet and laser printers."
  },
  {
    id: "9",
    title: "Technical Support",
    icon: Headphones,
    description: "Remote and on-site technical support for all your computer-related issues."
  },
  {
    id: "10",
    title: "Cloud Services",
    icon: CloudCog,
    description: "Cloud storage setup, backup solutions, and cloud migration services."
  },
  {
    id: "11",
    title: "Mobile Repair",
    icon: Smartphone,
    description: "Smartphone and tablet repairs including screen replacement, battery replacement, and software issues."
  }
];

const Services = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Hero section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl opacity-90">Professional IT services for all your technology needs</p>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="What We Offer" 
            subtitle="Comprehensive technology services delivered by experienced professionals"
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.map(service => (
              <ServiceCard 
                key={service.id}
                title={service.title}
                icon={service.icon}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Service Process" 
            subtitle="How we work to deliver exceptional service"
            center={true}
          />
          
          <div className="max-w-4xl mx-auto mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-primary relative">
                  <span className="text-2xl font-bold">1</span>
                  <div className="hidden md:block absolute top-1/2 left-full h-0.5 w-full bg-gray-200"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">Diagnosis</h3>
                <p className="text-gray-600">We thoroughly assess your device or technology issue to identify the root cause.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-primary relative">
                  <span className="text-2xl font-bold">2</span>
                  <div className="hidden md:block absolute top-1/2 left-full h-0.5 w-full bg-gray-200"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">Solution</h3>
                <p className="text-gray-600">Our technicians implement the appropriate fix or service with expertise and precision.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-primary">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Check</h3>
                <p className="text-gray-600">We thoroughly test everything to ensure the issue is fully resolved before delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Service Plans" 
            subtitle="Choose the right service plan for your needs"
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-gray-400">
              <h3 className="text-2xl font-bold mb-2">Basic Plan</h3>
              <p className="text-gray-500 mb-6">For individual users</p>
              <div className="text-4xl font-bold mb-6">₹499<span className="text-lg font-normal text-gray-500">/visit</span></div>
              
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Basic diagnostics
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Software installations
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Virus removal
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Priority support
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  24/7 assistance
                </li>
              </ul>
              
              <Button asChild className="w-full">
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-primary transform scale-105">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Popular</div>
              <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
              <p className="text-gray-500 mb-6">For small businesses</p>
              <div className="text-4xl font-bold mb-6">₹1,499<span className="text-lg font-normal text-gray-500">/month</span></div>
              
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  All Basic features
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Monthly maintenance
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Network support
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  24/7 assistance
                </li>
              </ul>
              
              <Button asChild className="w-full">
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-gray-400">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-gray-500 mb-6">For large organizations</p>
              <div className="text-4xl font-bold mb-6">₹4,999<span className="text-lg font-normal text-gray-500">/month</span></div>
              
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  All Pro features
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  24/7 assistance
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Dedicated support
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Customized solutions
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  On-site support
                </li>
              </ul>
              
              <Button asChild className="w-full">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Technical Support?</h2>
          <p className="text-lg mb-8 text-white/90">Contact us today to discuss your IT service needs. Our team is ready to help.</p>
          
          <Button asChild variant="secondary" size="lg" className="inline-flex items-center">
            <Link to="/contact">
              Contact Our Service Team <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
