
import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import { CheckCircle } from 'lucide-react';

const About = () => {
  // Company milestones
  const milestones = [
    { year: 2015, event: "Sri Pavan Computers founded in Kakinada" },
    { year: 2017, event: "Expanded to offer corporate IT solutions" },
    { year: 2018, event: "Began partnerships with major brands like HP, Dell and Lenovo" },
    { year: 2020, event: "Launched custom PC building service" },
    { year: 2022, event: "Opened expanded showroom in Kakinada" },
    { year: 2023, event: "Celebrated serving over 5,000 customers" }
  ];

  // Company values
  const values = [
    "Customer satisfaction is our top priority",
    "Honesty and transparency in all dealings",
    "Quality products and services at competitive prices",
    "Technical expertise and continuous learning",
    "Community involvement and support"
  ];

  return (
    <div className="bg-gray-50 ">
      {/* Hero section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Sri Pavan Computers</h1>
            <p className="text-xl opacity-90">Your trusted technology partner in Kakinada since 2015</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading 
                title="Our Story" 
                subtitle="How we started and grew to become Kakinada's trusted technology partner"
              />
              <p className="mb-4">
                Sri Pavan Computers was established in 2015 with a vision to provide high-quality computer products and services to the people of Kakinada and surrounding areas. What started as a small retail store has now grown into a comprehensive technology solutions provider.
              </p>
              <p className="mb-4">
                Our journey began when founder Srikanth Varma noticed the lack of reliable computer stores in the region. With his background in IT and passion for technology, he established Sri Pavan Computers to bridge this gap.
              </p>
              <p>
                Over the years, we have grown steadily by maintaining our core values of customer satisfaction, quality products, and excellent after-sales support. Today, we serve both individual consumers and businesses with a wide range of IT products and services.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070" 
                alt="Team at Sri Pavan Computers" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Values" 
            subtitle="The principles that guide everything we do"
            center={true}
          />
          
          <div className="max-w-3xl mx-auto mt-12">
            <ul className="space-y-4">
              {values.map((value, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5 mr-3" />
                  <p className="text-gray-700">{value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Journey" 
            subtitle="Key milestones in our growth"
            center={true}
          />
          
          <div className="max-w-4xl mx-auto mt-12">
            <div className="relative border-l-2 border-primary pl-8 ml-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="mb-12 relative">
                  <div className="absolute -left-11 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">{milestone.year}</h3>
                    <p className="text-gray-700">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Team" 
            subtitle="Meet the people who make it all happen"
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974" 
                alt="Srikanth Varma" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-1">Srikanth Varma</h3>
                <p className="text-primary mb-3">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  With over 15 years in the IT industry, Srikanth leads our company with expertise and vision.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976" 
                alt="Priya Reddy" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-1">Priya Reddy</h3>
                <p className="text-primary mb-3">Technical Manager</p>
                <p className="text-gray-600 text-sm">
                  Priya oversees all technical operations and ensures top-quality service delivery.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974" 
                alt="Rajesh Kumar" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-1">Rajesh Kumar</h3>
                <p className="text-primary mb-3">Customer Relations</p>
                <p className="text-gray-600 text-sm">
                  Rajesh ensures our customers receive exceptional service and support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
