import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/contexts/SEOContext';
import StructuredData from '@/components/SEO/StructuredData';
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, Thermometer, Volume2, 
  Zap, Battery, Phone, ArrowLeft
} from 'lucide-react';

const LaptopRepairSignsBlog = () => {
  const { updateSEO } = useSEO();
  
  useEffect(() => {
    updateSEO({
      title: 'The Top 5 Signs Your Laptop Needs a Professional Repair in Kakinada',
      description: 'Learn the warning signs that indicate your laptop needs professional repair. Expert advice from Sri Pavan Computers on when to seek help for laptop problems in Kakinada.',
      keywords: 'laptop repair signs, computer problems kakinada, laptop troubleshooting, when to repair laptop, laptop service indicators, computer repair guide',
      canonicalUrl: 'https://sripavancomputers.com/blog/laptop-repair-signs-kakinada',
      ogImage: 'https://sripavancomputers.com/images/blog/laptop-repair-signs-og.jpg'
    });
  }, [updateSEO]);

  const warningSigns = [
    {
      icon: Zap,
      title: "The Dreaded Slowdown",
      description: "When your laptop suddenly becomes unbearably slow",
      symptoms: ["Takes forever to boot up", "Programs freeze frequently", "Opening files is painfully slow", "Multiple crashes per day"],
      causes: ["Malware or virus infection", "Hard drive failure", "Insufficient RAM", "Registry corruption"],
      urgency: "Medium - Address within a week"
    },
    {
      icon: Thermometer,
      title: "The Overheating Problem",
      description: "When your laptop becomes too hot to handle",
      symptoms: ["Laptop feels very hot to touch", "Fan running constantly at high speed", "Sudden shutdowns during use", "Performance throttling"],
      causes: ["Dust accumulation in cooling system", "Thermal paste degradation", "Fan malfunction", "Blocked air vents"],
      urgency: "High - Address immediately to prevent damage"
    },
    {
      icon: Volume2,
      title: "Strange Noises",
      description: "Unusual sounds coming from your laptop",
      symptoms: ["Grinding or clicking from hard drive", "Loud fan noises", "Buzzing or whining sounds", "Intermittent beeping"],
      causes: ["Hard drive mechanical failure", "Fan bearing issues", "Loose components", "Electrical problems"],
      urgency: "Critical - Stop using and seek help immediately"
    },
    {
      icon: AlertTriangle,
      title: "The Blue Screen of Death (BSOD)",
      description: "When Windows crashes with a blue error screen",
      symptoms: ["Blue screen with error codes", "Automatic restarts", "Memory dump files", "System instability"],
      causes: ["Driver conflicts", "Hardware failures", "Memory problems", "System file corruption"],
      urgency: "High - Professional diagnosis needed"
    },
    {
      icon: Battery,
      title: "Battery Not Holding Charge",
      description: "When your laptop battery life becomes unusable",
      symptoms: ["Battery drains in under 2 hours", "Laptop shuts down unexpectedly", "Battery indicator shows wrong percentage", "Won't charge to 100%"],
      causes: ["Battery degradation", "Charging circuit problems", "Power adapter issues", "Battery calibration needed"],
      urgency: "Medium - Plan for replacement soon"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <StructuredData 
        type="Article" 
        data={{
          headline: "The Top 5 Signs Your Laptop Needs a Professional Repair in Kakinada",
          description: "Expert guide to identifying laptop problems that require professional repair services in Kakinada.",
          author: "Sri Pavan Computers",
          datePublished: "2024-07-18",
          publisher: "Sri Pavan Computers"
        }} 
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-900 via-red-800 to-orange-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Top 5 Signs Your Laptop Needs Professional Repair in Kakinada
            </h1>
            <p className="text-xl text-red-100 mb-8">
              Don't ignore these warning signs - early intervention can save your laptop and your data
            </p>
            <div className="flex items-center text-red-200">
              <span>Published by Sri Pavan Computers</span>
              <span className="mx-3">•</span>
              <span>July 18, 2024</span>
              <span className="mx-3">•</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-gray-700 leading-relaxed">
                In today's digital world, we depend heavily on our laptops for work, education, and entertainment here in Kakinada. 
                When these essential devices start showing signs of trouble, it can be incredibly disruptive to our daily lives. 
                The key to avoiding catastrophic failures and expensive replacements is recognizing the warning signs early 
                and seeking professional help before small problems become major disasters.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                As Kakinada's trusted computer repair experts since 2005, we've seen every type of laptop problem imaginable. 
                Here are the five most critical warning signs that indicate your laptop needs immediate professional attention.
              </p>
            </div>

            {/* Warning Signs */}
            <div className="space-y-12">
              {warningSigns.map((sign, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500">
                  <div className="flex items-start mb-6">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <sign.icon className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {index + 1}. {sign.title}
                      </h2>
                      <p className="text-gray-600 text-lg">{sign.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Symptoms to Watch For:</h3>
                      <ul className="space-y-2">
                        {sign.symptoms.map((symptom, idx) => (
                          <li key={idx} className="text-gray-600 flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Causes:</h3>
                      <ul className="space-y-2">
                        {sign.causes.map((cause, idx) => (
                          <li key={idx} className="text-gray-600 flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            {cause}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Urgency Level:</h3>
                      <div className={`p-3 rounded-lg ${
                        sign.urgency.includes('Critical') ? 'bg-red-100 border border-red-300' :
                        sign.urgency.includes('High') ? 'bg-orange-100 border border-orange-300' :
                        'bg-yellow-100 border border-yellow-300'
                      }`}>
                        <p className={`font-semibold ${
                          sign.urgency.includes('Critical') ? 'text-red-700' :
                          sign.urgency.includes('High') ? 'text-orange-700' :
                          'text-yellow-700'
                        }`}>
                          {sign.urgency}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="mt-12 bg-blue-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Don't Wait Until It's Too Late</h2>
              <p className="text-lg text-gray-700 mb-6">
                Ignoring these warning signs can lead to complete system failure, permanent data loss, and expensive replacements. 
                The good news is that most laptop problems are completely repairable when caught early by experienced professionals.
              </p>
              
              <p className="text-lg text-gray-700 mb-6">
                At Sri Pavan Computers, we've been helping Kakinada residents and businesses keep their laptops running smoothly 
                since 2005. Our certified technicians have the expertise and tools to diagnose and fix any laptop problem quickly and affordably.
              </p>
              
              <div className="bg-white p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Why Choose Sri Pavan Computers for Laptop Repair?
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Free diagnostic for most issues
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Most repairs completed in 24-48 hours
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Genuine parts with warranty
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Certified and experienced technicians
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Transparent pricing with no hidden costs
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    30-day warranty on all repairs
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </article>

      {/* Call to Action */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experiencing Any of These Signs?</h2>
          <p className="text-xl mb-8 text-red-100">
            Don't wait for complete failure. Bring your laptop to Sri Pavan Computers today for expert diagnosis and repair.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              <Link to="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Get Free Diagnosis
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              <Link to="/services/computer-repair">Learn About Our Repair Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaptopRepairSignsBlog;
