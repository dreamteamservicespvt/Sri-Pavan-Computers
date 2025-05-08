
import React, { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { Button } from "@/components/ui/button";
import { 
  Phone, Mail, MapPin, Clock, MessageSquare, 
  Send, CheckCircle 
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log("Form submitted:", formData);
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 5000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Hero section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl opacity-90">Get in touch with our team for any inquiries or support</p>
          </div>
        </div>
      </section>

      {/* Contact information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <SectionHeading 
                title="Get In Touch" 
                subtitle="We're here to answer any questions you may have"
              />
              
              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary text-white p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Phone</h3>
                    <p className="mb-1"><a href="tel:+919848075759" className="hover:text-primary">+91 98480 75759</a></p>
                    <p><a href="tel:08842355888" className="hover:text-primary">0884 2355888</a></p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email</h3>
                    <p><a href="mailto:pavancomputers_kkd@yahoo.co.in" className="hover:text-primary">pavancomputers_kkd@yahoo.co.in</a></p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Address</h3>
                    <p>
                      No. 21/9/9, Sri Krishna Kanth Plaza,<br />
                      R.R. Road, Near Masjid Center,<br />
                      Kakinada Bazar, Kakinada – 533001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Business Hours</h3>
                    <p className="mb-1">Monday - Saturday: 9:30 AM - 8:30 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white p-3 rounded-full mr-4">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">WhatsApp</h3>
                    <p>
                      <a 
                        href="https://wa.me/919848075759" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-green-600 font-medium flex items-center"
                      >
                        Chat with us on WhatsApp
                        <svg className="h-5 w-5 ml-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center h-full flex flex-col items-center justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h2>
                  <p className="text-green-700 mb-4">Thank you for contacting Sri Pavan Computers. We'll get back to you shortly.</p>
                  <Button 
                    onClick={() => setFormSubmitted(false)}
                    variant="outline"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <SectionHeading 
                    title="Send Us a Message" 
                    subtitle="Fill out the form and we'll get back to you as soon as possible"
                  />
                  
                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone"
                          value={formData.phone} 
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <select 
                          id="subject" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select a subject</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Product Information">Product Information</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Service Request">Service Request</option>
                          <option value="Feedback">Feedback</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea 
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      ></textarea>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Send className="h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Location" 
            subtitle="Find us on the map"
            center={true}
          />
          
          <div className="mt-12 h-[400px] rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30543.593196466992!2d82.22005826269077!3d16.95763056889296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3797c3e5a16c0d%3A0x33eb1c3b98626076!2sKakinada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1668459061374!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sri Pavan Computers location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
