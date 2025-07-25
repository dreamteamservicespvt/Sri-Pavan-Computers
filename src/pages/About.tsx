import React, { useEffect } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { 
  CheckCircle, 
  Users, 
  Clock, 
  Target, 
  Award, 
  Truck, 
  ShieldCheck,
  GraduationCap,
  Heart
} from 'lucide-react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useSEO } from '@/contexts/SEOContext';
import TeamSection from '@/components/TeamSection';

const About = () => {
  const { updateSEO } = useSEO();
  
  useEffect(() => {
    updateSEO({
      title: 'The Story of Sri Pavan Computers | Kakinada\'s Tech Partner Since 2005',
      description: 'Learn about Sri Pavan Computers, Kakinada\'s trusted source for computer solutions for nearly 20 years. Discover our commitment to quality, expertise, and customer satisfaction.',
      keywords: 'sri pavan computers history, kakinada computer shop, it services team, expert technicians, computer store experience, trusted technology partner',
      canonicalUrl: 'https://sripavancomputers.com/about',
      ogImage: 'https://sripavancomputers.com/images/about-og.jpg'
    });
  }, [updateSEO]);

  // Updated company milestones starting from 2005 (corrected establishment year)
  const milestones = [
    { year: 2005, event: "Sri Pavan Computers established in Kakinada with a vision to bring professional, reliable computer services to the community", icon: "🏪" },
    { year: 2008, event: "Expanded service offerings with advanced data recovery and networking solutions", icon: "🔧" },
    { year: 2012, event: "Became authorized dealer for HP, Dell, and Lenovo with growing customer base", icon: "🤝" },
    { year: 2015, event: "Launched custom PC building service, becoming the go-to expert for gaming and professional rigs", icon: "�" },
    { year: 2018, event: "Opened expanded showroom in Sri Krishna Kanth Plaza, R.R. Road", icon: "🏢" },
    { year: 2020, event: "Adapted to digital transformation with enhanced online presence and remote support", icon: "🌐" },
    { year: 2022, event: "Celebrating nearly two decades of trusted service to Kakinada and surrounding areas", icon: "🎉" },
    { year: 2024, event: "Expanding reach to Vijayawada market with specialized custom PC building services", icon: "🏆" }
  ];

  // Company values - updated to match business fact sheet
  const values = [
    "Nearly 20 years of trusted service in the Kakinada region",
    "Team of certified and experienced expert technicians",
    "Commitment to genuine products from authorized distributors with warranty",
    "Fast, reliable service with quick turnaround times",
    "Specialist in high-performance custom PC builds",
    "Comprehensive IT solutions for individuals, students, and businesses",
    "Honest pricing and transparent service policies",
    "Continuous learning and staying updated with latest technology"
  ];
  
  // Animation for sections - completely replaced with a more reliable version
  const FadeInSection = ({ children, delay = 0 }) => {
    // Simple implementation that ensures content is always visible
    return (
      <div className="opacity-100 visible">
        <motion.div
          initial={{ opacity: 1, y: 0 }} // Start fully visible
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay }}
        >
          {children}
        </motion.div>
      </div>
    );
  };

  // Stats with counters (updated to reflect 2005 establishment)
  const stats = [
    { label: "Years of Experience", value: "19+", icon: Clock },
    { label: "Satisfied Customers", value: "8,000+", icon: Users },
    { label: "Products & Services", value: "200+", icon: Award },
    { label: "Expert Technicians", value: "8+", icon: ShieldCheck }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section with parallax effect */}
      <section className="relative bg-primary text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070')"
            }}
          ></div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/90"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our Story: Two Decades of Technology and Trust in Kakinada
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white/90 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Sri Pavan Computers - Your trusted technology partner since 2005
            </motion.p>
            
            {/* Quick stats overview */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <stat.icon className="h-8 w-8 mb-3 text-white/80" />
                  <span className="text-2xl md:text-3xl font-bold">{stat.value}</span>
                  <span className="text-sm text-white/80">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <div className="rounded-lg overflow-hidden shadow-xl relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-blue-600/40 opacity-0 group-hover:opacity-70 transition-opacity duration-500 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070" 
                  alt="Team at Sri Pavan Computers" 
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <SectionHeading 
                title="Our History" 
                subtitle="A journey that began in 2005 with a vision to bring professional, reliable computer services to Kakinada"
              />
              <p className="mb-4 text-gray-700 leading-relaxed">
                Sri Pavan Computers was established in 2005 with a clear mission: to provide professional, reliable computer services to the people of Kakinada and surrounding areas. What started with a commitment to quality and customer service has grown into nearly 20 years of trusted expertise in the technology sector.
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Located at No. 21/9/9, Sri Krishna Kanth Plaza, R.R. Road, Near Masjid Center, Kakinada Bazar, we have built our reputation on genuine products from authorized distributors, expert technicians, and fast, reliable service that our customers can depend on.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we are proud to be Kakinada's leading computer sales and service center, specializing in comprehensive IT solutions for individuals, students, professionals, and businesses. Our team of certified technicians continues to deliver the same commitment to excellence that has defined us since day one.
              </p>
              
              <div className="mt-6">
                <Button asChild className="bg-primary hover:bg-primary/90 shadow-md">
                  <Link to="/services">Explore Our Services</Link>
                </Button>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Mission & Vision" 
            subtitle="What drives us and where we're heading"
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <FadeInSection>
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 h-full flex flex-col">
                <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
                <p className="text-gray-700 flex-grow">
                  To provide genuine products, expert service, and build long-term relationships with our customers in Kakinada and beyond. We are committed to delivering reliable, fast, and professional technology solutions that meet the evolving needs of individuals, students, professionals, and businesses.
                </p>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 h-full flex flex-col">
                <div className="rounded-full bg-blue-600/10 w-14 h-14 flex items-center justify-center mb-6">
                  <GraduationCap className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Why Choose Us?</h3>
                <p className="text-gray-700 flex-grow">
                  With nearly 20 years of experience serving Kakinada, we offer expert technicians, quality products from authorized distributors with warranty, fast service with quick turnaround times, and specialized expertise in high-performance custom PC builds. Our commitment to genuine parts and customer satisfaction sets us apart.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Core Values" 
            subtitle="The principles that guide everything we do"
            center={true}
          />
          
          <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <FadeInSection delay={index * 0.1} key={index}>
                <div className="flex items-start p-5 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300">
                  <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1 mr-4" />
                  <p className="text-gray-800 font-medium">{value}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Milestones timeline - mobile optimized */}
      <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Journey" 
            subtitle="Key milestones since 2005"
            center={true}
          />
          
          <div className="max-w-5xl mx-auto mt-16 relative">
            {/* Desktop timeline decorative line - hidden on mobile */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2 hidden md:block"></div>
            
            {/* Mobile timeline decorative line */}
            <div className="absolute left-6 top-10 bottom-10 w-1 bg-primary/20 md:hidden"></div>
            
            <div className="space-y-12 md:space-y-24">
              {milestones.map((milestone, index) => (
                <FadeInSection delay={index * 0.1} key={index}>
                  {/* Desktop view */}
                  <div className={`hidden md:flex items-center relative ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Year bubble */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-blue-600 shadow-lg flex items-center justify-center text-white font-bold">
                        {milestone.year}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`w-[calc(50%-3rem)] ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                        <div className="text-3xl mb-3">{milestone.icon}</div>
                        <h3 className="text-xl font-bold text-primary mb-2">{milestone.event}</h3>
                        <p className="text-gray-600">
                          {index === 0 && "Started with a small shop selling computer peripherals and offering repair services."}
                          {index === 1 && "Started offering products from major brands and expanded service offerings."}
                          {index === 2 && "Expanded our reach to serve customers in neighboring cities."}
                          {index === 3 && "Began providing comprehensive IT solutions for businesses of all sizes."}
                          {index === 4 && "Became an authorized dealer for premium brands to ensure quality and warranty."}
                          {index === 5 && "Adapted to changing market needs with custom solutions and e-commerce."}
                          {index === 6 && "Invested in a larger space to showcase more products and improve customer experience."}
                          {index === 7 && "A major milestone reflecting our growing customer trust and loyalty."}
                        </p>
                      </div>
                    </div>
                    
                    {/* Empty space for the other side */}
                    <div className="w-[calc(50%-3rem)]"></div>
                  </div>
                  
                  {/* Mobile view - completely redesigned to match screenshot */}
                  <div className="md:hidden flex gap-4 relative">
                    {/* Year bubble - styled to match screenshot */}
                    <div className="z-10 flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-base shadow-md">
                        {milestone.year}
                      </div>
                    </div>
                    
                    {/* Mobile-optimized content card - matches screenshot design */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="p-5">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="text-2xl">{milestone.icon}</div>
                          <h3 className="text-lg font-bold text-blue-900 leading-tight">
                            {milestone.event}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm pl-8">
                          {index === 0 && "Started with a small shop selling computer peripherals and offering repair services."}
                          {index === 1 && "Started offering products from major brands and expanded service offerings."}
                          {index === 2 && "Expanded our reach to serve customers in neighboring cities."}
                          {index === 3 && "Began providing comprehensive IT solutions for businesses of all sizes."}
                          {index === 4 && "Became an authorized dealer for premium brands to ensure quality and warranty."}
                          {index === 5 && "Adapted to changing market needs with custom solutions and e-commerce."}
                          {index === 6 && "Invested in a larger space to showcase more products and improve customer experience."}
                          {index === 7 && "A major milestone reflecting our growing customer trust and loyalty."}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team section - now using dynamic TeamSection component */}
      <TeamSection />

      {/* Call to action */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Our Service?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
              Visit our store or get in touch today to discover how we can meet your technology needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-primary hover:bg-white/20 hover:text-white">
                <Link to="/products">Explore Products</Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default About;
