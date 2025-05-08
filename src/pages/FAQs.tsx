
import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import FAQItem from '@/components/FAQItem';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

// FAQ items
const faqs = [
  {
    question: "What brands of laptops do you offer?",
    answer: "We offer a wide range of laptops from leading brands including HP, Dell, Lenovo, ASUS, Acer, MSI, and Apple. Our selection covers various models suitable for different needs and budgets."
  },
  {
    question: "Do you provide assembly services for custom PCs?",
    answer: "Yes, we offer complete assembly services for custom PCs. You can either select parts using our PC Builder tool online or consult with our experts in-store to design a system that meets your specific requirements."
  },
  {
    question: "What is your warranty policy?",
    answer: "All our products come with standard manufacturer warranties. Laptops and desktops typically have 1-3 year warranties depending on the brand and model. For detailed warranty information about a specific product, please contact us."
  },
  {
    question: "Do you offer repair services for computers not purchased from your store?",
    answer: "Yes, we provide repair services for all brands and models of computers, laptops, and related peripherals, regardless of where they were purchased."
  },
  {
    question: "How long does it typically take to repair a computer?",
    answer: "Repair times vary depending on the issue and availability of parts. Minor software issues can often be resolved within 24-48 hours, while hardware repairs typically take 2-5 business days. We'll provide you with an estimated timeframe when you bring in your device."
  },
  {
    question: "Do you offer on-site technical support for businesses?",
    answer: "Yes, we provide on-site technical support for businesses in Kakinada and surrounding areas. We offer both ad-hoc services and regular maintenance contracts. Contact our business services team for more information."
  },
  {
    question: "Can you help with data recovery from a crashed hard drive?",
    answer: "Yes, we offer professional data recovery services for failed hard drives, SSDs, memory cards, and other storage devices. Our success rate depends on the type and extent of damage, but we'll assess your device and provide a free evaluation before proceeding."
  },
  {
    question: "Do you sell computer accessories and peripherals?",
    answer: "Yes, we stock a comprehensive range of accessories including keyboards, mice, monitors, printers, cables, adapters, external drives, webcams, headsets, and much more from various reputable brands."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, all major credit/debit cards, UPI payments, net banking, and select EMI options. For corporate purchases, we also offer invoice-based payment terms for approved accounts."
  },
  {
    question: "Do you provide software installation services?",
    answer: "Yes, we can install and configure operating systems, productivity software, antivirus programs, and other applications. We ensure all software is properly licensed and optimized for your system."
  }
];

const FAQs = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Hero section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl opacity-90">Find answers to common questions about our products and services</p>
          </div>
        </div>
      </section>

      {/* FAQs section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Common Questions" 
            subtitle="Get quick answers to the most common questions we receive"
            center={true}
          />
          
          <div className="max-w-3xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-6">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg text-gray-600 mb-8">
            If you couldn't find the answer to your question, please feel free to contact us directly.
            Our team is always ready to help you.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            
            <Button asChild variant="outline">
              <a href="tel:+919848075759">Call Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;
