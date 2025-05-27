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

const About = () => {
  const { updateSEO } = useSEO();
  
  useEffect(() => {
    updateSEO({
      title: 'About Sri Pavan Computers | Computer Sales & Service History in Kakinada',
      description: 'Discover our journey since 2000 as Kakinada\'s premier computer sales and service center. Learn about our team, values, and mission to provide top-quality IT solutions. SEO by Dream Team Services.',
      keywords: 'computer shop Kakinada, IT services history, computer repair team, tech support specialists, computer store mission',
      canonicalUrl: 'https://sripavancomputers.in/about',
      ogImage: 'https://sripavancomputers.in/images/about-og.jpg'
    });
  }, [updateSEO]);

  // Updated company milestones starting from 2000
  const milestones = [
    { year: 2000, event: "Sri Pavan Computers established in Kakinada", icon: "🏪" },
    { year: 2005, event: "Expanded product range with major technology partnerships", icon: "🤝" },
    { year: 2010, event: "Opened second branch in Rajahmundry", icon: "🏢" },
    { year: 2015, event: "Launched corporate IT solutions division", icon: "💼" },
    { year: 2018, event: "Began partnerships with HP, Dell and Lenovo as authorized dealer", icon: "🖥️" },
    { year: 2020, event: "Launched custom PC building service and online store", icon: "🛒" },
    { year: 2022, event: "Opened expanded flagship showroom in Kakinada", icon: "🎉" },
    { year: 2023, event: "Celebrated serving over 10,000 customers", icon: "🏆" }
  ];

  // Company values - unchanged
  const values = [
    "Customer satisfaction is our top priority",
    "Honesty and transparency in all dealings",
    "Quality products and services at competitive prices",
    "Technical expertise and continuous learning",
    "Community involvement and support"
  ];
  
  // Team members with enhanced details
  const teamMembers = [
    {
      name: "Srikanth Varma",
      position: "Founder & CEO",
      bio: "With over 20 years in the IT industry, Srikanth leads our company with expertise and vision. He founded Sri Pavan Computers in 2000 with a mission to provide quality technology solutions to the region.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        email: "sales@sripavancomputers.in"
      }
    },
    {
      name: "Priya Reddy",
      position: "Technical Director",
      bio: "Priya oversees all technical operations and ensures top-quality service delivery. With her expertise in hardware and networking, she has been instrumental in our growth since 2005.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        email: "sales@sripavancomputers.in"
      }
    },
    {
      name: "Rajesh Kumar",
      position: "Customer Relations Manager",
      bio: "Rajesh ensures our customers receive exceptional service and support. His people-first approach has helped us maintain a loyal customer base for over a decade.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        email: "sales@sripavancomputers.in"
      }
    },
    {
      name: "Ananya Sharma",
      position: "Sales Manager",
      bio: "Ananya drives our sales strategies and has consistently exceeded targets year after year. Her deep understanding of technology products helps customers make informed decisions.",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1470",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        email: "sales@sripavancomputers.in"
      }
    }
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

  // Stats with counters
  const stats = [
    { label: "Years of Experience", value: "24+", icon: Clock },
    { label: "Satisfied Customers", value: "10,000+", icon: Users },
    { label: "Products & Services", value: "500+", icon: Award },
    { label: "Certified Technicians", value: "15+", icon: ShieldCheck }
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
              About Sri Pavan Computers
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white/90 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your trusted technology partner in Kakinada since 2000
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
                title="Our Story" 
                subtitle="A journey of innovation, service, and growth since 2000"
              />
              <p className="mb-4 text-gray-700 leading-relaxed">
                Sri Pavan Computers was established in 2000 with a vision to provide high-quality computer products and services to the people of Kakinada and surrounding areas. What started as a modest technology store has evolved into one of the region's most trusted comprehensive technology solutions providers.
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Our journey began when founder Srikanth Varma identified the need for reliable technology solutions in the growing digital landscape. With his technical expertise and entrepreneurial spirit, he established Sri Pavan Computers to bridge this critical gap.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Over two decades, we have grown steadily by maintaining our core values of customer satisfaction, quality products, and excellent after-sales support. Today, we proudly serve both individual consumers and businesses with a wide range of IT products and specialized services.
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
                  To provide high-quality technology solutions that empower individuals and businesses to achieve their goals, backed by exceptional customer service and technical expertise that exceeds expectations.
                </p>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 h-full flex flex-col">
                <div className="rounded-full bg-blue-600/10 w-14 h-14 flex items-center justify-center mb-6">
                  <GraduationCap className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
                <p className="text-gray-700 flex-grow">
                  To be the most trusted technology partner in Eastern India, leading innovation in IT retail and services while contributing positively to our community's digital advancement and literacy.
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

      {/* Enhanced Milestones timeline */}
      <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Journey" 
            subtitle="Key milestones since 2000"
            center={true}
          />
          
          <div className="max-w-5xl mx-auto mt-16 relative">
            {/* Decorative elements */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-24">
              {milestones.map((milestone, index) => (
                <FadeInSection delay={index * 0.1} key={index}>
                  <div className={`flex items-center relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Year bubble */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-blue-600 shadow-lg flex items-center justify-center text-white font-bold">
                        {milestone.year}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`w-full md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                        <div className="text-3xl mb-3">{milestone.icon}</div>
                        <h3 className="text-xl font-bold text-primary mb-2">{milestone.event}</h3>
                        <p className="text-gray-600">
                          {/* Adding some more context to milestones */}
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
                    <div className="hidden md:block w-[calc(50%-3rem)]"></div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Meet Our Leadership Team" 
            subtitle="The experts behind our success"
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {teamMembers.map((member, index) => (
              <FadeInSection delay={index * 0.1} key={index}>
                <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="relative overflow-hidden h-72">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay with social links */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <div className="flex space-x-4">
                        <a href={member.socialLinks.linkedin} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                          </svg>
                        </a>
                        <a href={member.socialLinks.twitter} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                          </svg>
                        </a>
                        <a href={`mailto:${member.socialLinks.email}`} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.position}</p>
                    <p className="text-gray-700 text-sm line-clamp-4">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

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
