
import React from 'react';
import SectionHeading from '@/components/SectionHeading';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Hero section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg opacity-90">Last updated: May 1, 2023</p>
          </div>
        </div>
      </section>

      {/* Policy content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <SectionHeading title="Privacy Policy" />
              
              <p className="mb-6 text-gray-700">
                At Sri Pavan Computers, we are committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our 
                website, purchase products, or use our services.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">Information We Collect</h2>
              <p className="mb-6 text-gray-700">
                We may collect personal information that you provide to us when purchasing products, creating an account, 
                signing up for our newsletter, or contacting our support team. This information may include your name, 
                email address, phone number, address, and payment information.
              </p>
              
              <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Name, email address, phone number, and home/shipping address</li>
                <li>Payment information (processed securely through our payment processors)</li>
                <li>Purchase history and product preferences</li>
                <li>Technical support and service records</li>
                <li>Communications with our team</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-2">Automatically Collected Information</h3>
              <p className="mb-6 text-gray-700">
                When you visit our website, we may automatically collect certain information about your device, 
                including information about your web browser, IP address, time zone, and some of the cookies 
                that are installed on your device.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">How We Use Your Information</h2>
              <p className="mb-4 text-gray-700">
                We use your information to process orders, provide customer support, and send you updates about your 
                purchase. We may also use your contact information to send promotional emails about new products or 
                special offers.
              </p>
              
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Provide technical support and warranty services</li>
                <li>Communicate with you about your purchases</li>
                <li>Send promotional offers and newsletter (if you've opted in)</li>
                <li>Improve our products, services, and website</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">Information Sharing</h2>
              <p className="mb-6 text-gray-700">
                We do not sell, trade, or otherwise transfer your personal information to outside parties except 
                when needed to provide our services (such as shipping companies to deliver your order) or when 
                required by law.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">Data Security</h2>
              <p className="mb-6 text-gray-700">
                We implement appropriate security measures to protect your personal information. However, no method 
                of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">Your Rights</h2>
              <p className="mb-6 text-gray-700">
                You have the right to access personal information we hold about you and to ask that your personal 
                information be corrected, updated, or deleted. If you would like to exercise this right, please contact us.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">Cookies</h2>
              <p className="mb-6 text-gray-700">
                We use cookies to improve your experience on our website, understand site usage, and assist in our marketing efforts.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">Changes to This Privacy Policy</h2>
              <p className="mb-6 text-gray-700">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              
              <h2 className="text-2xl font-bold mb-4 mt-8">Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions or concerns about our Privacy Policy, please contact us at:
              </p>
              <p className="mt-2 text-gray-700">
                <strong>Email:</strong> pavancomputers_kkd@yahoo.co.in<br />
                <strong>Phone:</strong> +91 98480 75759<br />
                <strong>Address:</strong> No. 21/9/9, Sri Krishna Kanth Plaza, R.R. Road, Near Masjid Center, Kakinada Bazar, Kakinada – 533001
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
