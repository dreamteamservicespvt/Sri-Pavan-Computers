import React from 'react';
import SectionHeading from '@/components/SectionHeading';

const Terms = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Hero section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-lg opacity-90">Last updated: May 1, 2023</p>
          </div>
        </div>
      </section>

      {/* Terms content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <SectionHeading title="Terms and Conditions" />
              
              <p className="mb-6 text-gray-700">
                Welcome to Sri Pavan Computers. Please read these terms and conditions carefully before 
                using our website or purchasing products from our store.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">1. Acceptance of Terms</h2>
              <p className="mb-6 text-gray-700">
                By accessing our website, purchasing products, or using our services, you agree to be bound by 
                these Terms and Conditions, our Privacy Policy, and any additional terms and conditions that may apply.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">2. Product Purchases</h2>
              <p className="mb-6 text-gray-700">
                All purchases made through our website or in our physical store are subject to product availability. 
                We reserve the right to discontinue any product at any time. Prices are subject to change without notice.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">3. Warranty Information</h2>
              <p className="mb-6 text-gray-700">
                Products sold by Sri Pavan Computers come with a standard manufacturer's warranty. 
                Extended warranty options may be available for certain products. Warranty service will be provided 
                in accordance with the manufacturer's warranty policy.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">4. Return Policy</h2>
              <p className="mb-6 text-gray-700">
                Products may be returned within 7 days of purchase with the original receipt and in the original packaging. 
                Some items, such as opened software packages, custom-built PCs, and certain accessories may not be eligible for return.
              </p>
              <p className="mb-6 text-gray-700">
                A restocking fee of up to 15% may be charged for returned items that are not defective. 
                Defective items will be repaired, replaced, or refunded at our discretion.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">5. Payment Terms</h2>
              <p className="mb-6 text-gray-700">
                We accept various payment methods including cash, credit/debit cards, UPI, net banking, and EMI options 
                from select banks. All online transactions are processed through secure payment gateways.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">6. Delivery and Installation</h2>
              <p className="mb-6 text-gray-700">
                Delivery times are estimates and not guaranteed. Additional charges may apply for delivery and installation services. 
                We are not responsible for delays caused by factors outside our control.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">7. Service Terms</h2>
              <p className="mb-6 text-gray-700">
                For repair and technical services, we provide estimates before commencing work. Actual charges may vary 
                based on the extent of the problem discovered during repair. We are not responsible for data loss during 
                service and recommend backing up your data before service.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">8. User Responsibilities</h2>
              <p className="mb-6 text-gray-700">
                Customers are responsible for ensuring compatibility of products with their existing systems. 
                We provide advice but cannot guarantee compatibility in all scenarios.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">9. Intellectual Property</h2>
              <p className="mb-6 text-gray-700">
                All content on our website including text, graphics, logos, and images is the property of 
                Sri Pavan Computers and protected by copyright laws.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">10. Limitation of Liability</h2>
              <p className="mb-6 text-gray-700">
                Sri Pavan Computers shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                resulting from your use or purchase of our products or services.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">11. Governing Law</h2>
              <p className="mb-6 text-gray-700">
                These terms and conditions are governed by the laws of India. Any disputes arising from these terms 
                shall be subject to the exclusive jurisdiction of the courts in Kakinada, Andhra Pradesh.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">12. Changes to Terms</h2>
              <p className="mb-6 text-gray-700">
                We reserve the right to modify these terms and conditions at any time. Changes will be effective 
                immediately upon posting on our website.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">Contact Information</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <p className="mt-2 text-gray-700">
                <strong>Email:</strong> sales@sripavancomputers.in<br />
                 +91 98480 75759<br />
                 No. 21/9/9, Sri Krishna Kanth Plaza, R.R. Road, Near Masjid Center, Kakinada Bazar, Kakinada – 533001
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
