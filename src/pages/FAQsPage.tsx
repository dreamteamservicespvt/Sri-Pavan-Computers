import React, { useEffect } from 'react';
import { useSEO } from '@/contexts/SEOContext';
import StructuredData from '@/components/SEO/StructuredData';
import SectionHeading from '@/components/SectionHeading';
import FAQItem from '@/components/FAQItem';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';

const FAQs = () => {
  const { updateSEO } = useSEO();
  
  useEffect(() => {
    updateSEO({
      title: 'Frequently Asked Questions | Sri Pavan Computers Kakinada',
      description: 'Find answers to common questions about computer repair, custom PC builds, data recovery, and our services in Kakinada. Quick help for all your tech queries.',
      keywords: 'computer repair faq, laptop service questions, custom pc build help, data recovery queries, kakinada computer shop questions, tech support answers',
      canonicalUrl: 'https://sripavancomputers.com/faqs',
      ogImage: 'https://sripavancomputers.com/images/faq-og.jpg'
    });
  }, [updateSEO]);

  const generalFAQs = [
    {
      question: "Where are you located?",
      answer: "We are located at No. 21/9/9, Sri Krishna Kanth Plaza, R.R. Road, Near Masjid Center, Kakinada Bazar, Kakinada – 533001, Andhra Pradesh."
    },
    {
      question: "What are your business hours?",
      answer: "We are open Monday through Saturday from 9:30 AM to 8:30 PM. We are closed on Sundays."
    },
    {
      question: "What forms of payment do you accept?",
      answer: "We accept cash, all major credit/debit cards, UPI payments, and bank transfers. We also offer EMI options for larger purchases through select banks."
    },
    {
      question: "How long have you been in business?",
      answer: "Sri Pavan Computers has been serving Kakinada since 2005 - nearly 20 years of trusted service in the technology sector."
    }
  ];

  const repairFAQs = [
    {
      question: "What types of computers and laptops do you repair?",
      answer: "We repair all major brands including HP, Dell, Lenovo, Acer, Asus, and Apple MacBooks. We service both Windows and Mac systems, desktops, laptops, and all-in-one computers."
    },
    {
      question: "Do you service Apple products like MacBooks and iMacs?",
      answer: "Yes, our certified technicians are experienced in servicing Apple products including MacBooks, iMacs, and Mac accessories. We use genuine Apple-compatible parts when available."
    },
    {
      question: "How long will my repair take?",
      answer: "Most repairs are completed within 24-48 hours. Complex issues like motherboard repairs or data recovery may take 3-5 days. We provide estimated timelines after diagnosis."
    },
    {
      question: "Do you offer a warranty on your repairs?",
      answer: "Yes, we provide a 30-day warranty on all repair services and 90 days warranty on replaced parts. Our warranty covers the specific issue that was repaired."
    },
    {
      question: "How much is your diagnostic fee?",
      answer: "We offer free basic diagnostics for most common issues. Advanced diagnostics for complex problems may have a nominal fee of ₹200-500, which is adjusted against the final repair cost if you proceed with the service."
    },
    {
      question: "Do you repair laptop screens?",
      answer: "Yes, we specialize in laptop screen replacement for all major brands. We stock original and compatible screens and can usually complete screen replacements within 24 hours."
    }
  ];

  const customPCFAQs = [
    {
      question: "What is the benefit of a custom-built PC?",
      answer: "Custom PCs offer better performance per rupee, choice of quality components, future upgradeability, and optimization for your specific needs whether gaming, content creation, or professional work."
    },
    {
      question: "Can you help me choose the right parts for my budget?",
      answer: "Absolutely! Our experts will consult with you to understand your needs and budget, then recommend the best component combination for optimal performance and value."
    },
    {
      question: "How long does it take to build a custom PC?",
      answer: "Custom PC builds typically take 3-5 days from component selection to final testing. Complex builds with custom cooling or special requirements may take up to a week."
    },
    {
      question: "Do you provide a warranty on custom builds?",
      answer: "Yes, we provide a comprehensive 1-year warranty on our custom builds, covering both assembly and component issues. Individual components also carry their manufacturer warranties."
    },
    {
      question: "Can you build a gaming PC within ₹50,000?",
      answer: "Yes, we can build excellent gaming PCs at various budget levels. A ₹50,000 budget can get you a solid 1080p gaming machine. We'll help optimize your budget for maximum gaming performance."
    }
  ];

  const serviceAreaFAQs = [
    {
      question: "Do you offer on-site support for businesses?",
      answer: "Yes, we provide on-site support for businesses in Kakinada for network setup, maintenance, and troubleshooting. Contact us to discuss your specific requirements."
    },
    {
      question: "I live in Vijayawada. Can I still use your services?",
      answer: "Absolutely! For repairs, we offer a convenient pickup and delivery service. For custom PC builds, we provide remote consultation and can deliver your finished build directly to Vijayawada with full setup support."
    },
    {
      question: "Do you provide pickup and delivery service?",
      answer: "Yes, we offer pickup and delivery service for repairs within Kakinada city limits and can arrange delivery to nearby cities like Vijayawada for custom builds and bulk orders."
    }
  ];

  const dataRecoveryFAQs = [
    {
      question: "Can you recover data from a completely dead hard drive?",
      answer: "In many cases, yes. Our data recovery experts use specialized tools and clean room techniques to recover data from failed drives. Success rates vary depending on the type of failure, but we achieve 90%+ success in most cases."
    },
    {
      question: "How much does data recovery cost?",
      answer: "Data recovery costs vary based on the complexity of the case. Simple file recovery starts from ₹2,000, while complex hardware failures may cost ₹5,000-15,000. We provide quotes after initial assessment."
    },
    {
      question: "Is my data safe during the recovery process?",
      answer: "Absolutely. We maintain strict confidentiality and security protocols. Your data is handled only by certified technicians and is never accessed unnecessarily or shared with anyone."
    }
  ];

  const structuredFAQData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      ...generalFAQs,
      ...repairFAQs,
      ...customPCFAQs,
      ...serviceAreaFAQs,
      ...dataRecoveryFAQs
    ].map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data for FAQs */}
      <StructuredData 
        type="FAQPage" 
        data={structuredFAQData} 
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Find quick answers to common questions about our computer services, repairs, and support in Kakinada.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* General Questions */}
            <div className="mb-12">
              <SectionHeading 
                title="General Questions" 
                subtitle="Basic information about our business and services"
              />
              <div className="mt-8 space-y-4">
                {generalFAQs.map((faq, index) => (
                  <FAQItem 
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>

            {/* Repair Services */}
            <div className="mb-12">
              <SectionHeading 
                title="Repair Services" 
                subtitle="Everything about our computer and laptop repair services"
              />
              <div className="mt-8 space-y-4">
                {repairFAQs.map((faq, index) => (
                  <FAQItem 
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>

            {/* Custom PC Builds */}
            <div className="mb-12">
              <SectionHeading 
                title="Custom PC Builds" 
                subtitle="Questions about our custom PC building services"
              />
              <div className="mt-8 space-y-4">
                {customPCFAQs.map((faq, index) => (
                  <FAQItem 
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>

            {/* Service Area & Logistics */}
            <div className="mb-12">
              <SectionHeading 
                title="Service Area & Logistics" 
                subtitle="Information about our service coverage and logistics"
              />
              <div className="mt-8 space-y-4">
                {serviceAreaFAQs.map((faq, index) => (
                  <FAQItem 
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>

            {/* Data Recovery */}
            <div className="mb-12">
              <SectionHeading 
                title="Data Recovery" 
                subtitle="Questions about our data recovery services"
              />
              <div className="mt-8 space-y-4">
                {dataRecoveryFAQs.map((faq, index) => (
                  <FAQItem 
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Can't find what you're looking for? Get in touch with our friendly team for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <a href="https://wa.me/919848075759" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;
