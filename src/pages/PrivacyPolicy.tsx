
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '@/components/SectionHeading';
import { useSEO } from '@/contexts/SEOContext';
import { Shield, Lock, Eye, FileText, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

const PrivacyPolicy = () => {
  const { updateSEO } = useSEO();

  useEffect(() => {
    updateSEO({
      title: 'Privacy Policy | Sri Pavan Computers - Data Protection & Privacy Rights',
      description: 'Our comprehensive Privacy Policy explains how Sri Pavan Computers collects, uses, and protects your personal information in compliance with privacy laws and Google Play Store requirements.',
      keywords: 'privacy policy, data protection, Sri Pavan Computers, privacy rights, Google Play Store, legal compliance, personal information, data security',
      canonicalUrl: 'https://sripavancomputers.in/privacy-policy'
    });
  }, [updateSEO]);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <section className="bg-gradient-to-br from-primary to-primary-foreground text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-xl opacity-90 mb-4 max-w-2xl mx-auto">
              Your privacy and data protection are our top priorities. Learn how we collect, use, and safeguard your information.
            </p>
            <p className="text-lg opacity-75">
              <strong>Effective Date:</strong> {currentDate} | <strong>Last Updated:</strong> {currentDate}
            </p>
          </div>
        </div>
      </section>

      {/* Policy content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              
              {/* Table of Contents */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                  <FileText className="h-6 w-6 mr-3 text-primary" />
                  Table of Contents
                </h2>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <a href="#introduction" className="text-primary hover:text-primary-foreground transition-colors p-2 rounded hover:bg-white/50">1. Introduction</a>
                  <a href="#information-we-collect" className="text-primary hover:text-primary-foreground transition-colors p-2 rounded hover:bg-white/50">2. Information We Collect</a>
                  <a href="#how-we-use-information" className="text-primary hover:text-primary-foreground transition-colors p-2 rounded hover:bg-white/50">3. How We Use Information</a>
                  <a href="#third-party-services" className="text-primary hover:text-primary-foreground transition-colors p-2 rounded hover:bg-white/50">4. Third-Party Services</a>
                  <a href="#data-sharing" className="text-primary hover:text-primary-foreground transition-colors p-2 rounded hover:bg-white/50">5. Data Sharing</a>
                  <a href="#data-security" className="text-primary hover:text-primary-foreground transition-colors p-2 rounded hover:bg-white/50">6. Data Security</a>
                  <a href="#data-retention" className="text-primary hover:text-primary-foreground transition-colors p-2 rounded hover:bg-white/50">7. Data Retention</a>
                  <a href="#your-rights" className="text-primary hover:text-primary-foreground transition-colors p-2 rounded hover:bg-white/50">8. Your Rights</a>
                  <a href="#cookies" className="text-primary hover:text-primary-foreground transition-colors p-2 rounded hover:bg-white/50">9. Cookies & Tracking</a>
                  <a href="#children-privacy" className="text-primary hover:text-primary-foreground transition-colors p-2 rounded hover:bg-white/50">10. Children's Privacy</a>
                  <a href="#international-users" className="text-primary hover:text-primary-foreground transition-colors p-2 rounded hover:bg-white/50">11. International Users</a>
                  <a href="#policy-changes" className="text-primary hover:text-primary-foreground transition-colors p-2 rounded hover:bg-white/50">12. Policy Changes</a>
                  <a href="#contact-us" className="text-primary hover:text-primary-foreground transition-colors p-2 rounded hover:bg-white/50">13. Contact Us</a>
                </div>
              </div>

              <div className="p-8 space-y-12">
                
                {/* Introduction */}
                <section id="introduction">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center border-b pb-3">
                    <Shield className="h-7 w-7 mr-3 text-primary" />
                    1. Introduction
                  </h2>
                  <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                    <p className="text-lg leading-relaxed">
                      Welcome to Sri Pavan Computers. We are committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your personal information when you:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Visit our website at <a href="https://sripavancomputers.in" className="text-primary hover:underline">sripavancomputers.in</a></li>
                      <li>Use our progressive web application (PWA) available on Google Play Store</li>
                      <li>Purchase products or services from us</li>
                      <li>Contact us for technical support or inquiries</li>
                      <li>Visit our physical store location in Kakinada</li>
                    </ul>
                    <p>
                      This Privacy Policy explains our practices regarding data collection, usage, sharing, and your rights concerning your personal information. By using our services, you agree to the collection and use of information in accordance with this policy.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <p className="font-semibold text-blue-800">About Our Business:</p>
                      <p className="text-blue-700">Sri Pavan Computers has been serving the Kakinada community since 2000, providing quality computer hardware, software solutions, repair services, and IT support to individuals and businesses.</p>
                    </div>
                  </div>
                </section>

                {/* Information We Collect */}
                <section id="information-we-collect">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center border-b pb-3">
                    <Eye className="h-7 w-7 mr-3 text-primary" />
                    2. Information We Collect
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">2.1 Personal Information You Provide</h3>
                      <p className="mb-4 text-gray-700">We collect information you voluntarily provide when you:</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Contact Information</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Full name</li>
                            <li>• Email address</li>
                            <li>• Phone number</li>
                            <li>• Mailing address</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Service Information</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Product inquiries</li>
                            <li>• Service requests</li>
                            <li>• Technical support queries</li>
                            <li>• Feedback and reviews</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">2.2 Information Collected Automatically</h3>
                      <p className="mb-4 text-gray-700">When you visit our website or use our PWA, we may automatically collect:</p>
                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <ul className="space-y-2 text-gray-700">
                          <li>• <strong>Device Information:</strong> Device type, operating system, browser type and version</li>
                          <li>• <strong>Usage Data:</strong> Pages visited, time spent, clicks, scrolling behavior</li>
                          <li>• <strong>Technical Data:</strong> IP address, location data (if permitted), cookies and similar technologies</li>
                          <li>• <strong>Performance Data:</strong> App performance metrics, crash reports, loading times</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">2.3 Information We Do NOT Collect</h3>
                      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                        <p className="text-green-800 font-medium mb-2">We respect your privacy and do NOT collect:</p>
                        <ul className="space-y-1 text-green-700">
                          <li>• Financial information (credit card details, bank accounts)</li>
                          <li>• Social security numbers or government ID numbers</li>
                          <li>• Personal conversations or private communications</li>
                          <li>• Data from other apps on your device</li>
                          <li>• Access to your camera, microphone, or contacts without explicit permission</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* How We Use Information */}
                <section id="how-we-use-information">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center border-b pb-3">
                    <Lock className="h-7 w-7 mr-3 text-primary" />
                    3. How We Use Your Information
                  </h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 text-blue-800">Primary Purposes</h3>
                        <ul className="space-y-2 text-blue-700">
                          <li>• Process and fulfill service requests</li>
                          <li>• Provide technical support and customer service</li>
                          <li>• Communicate about your inquiries and services</li>
                          <li>• Send appointment confirmations and updates</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 text-green-800">Secondary Purposes</h3>
                        <ul className="space-y-2 text-green-700">
                          <li>• Improve our website and services</li>
                          <li>• Send promotional offers (with your consent)</li>
                          <li>• Analyze usage patterns and preferences</li>
                          <li>• Ensure security and prevent fraud</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3">Legal Basis for Processing (GDPR Compliance)</h3>
                      <p className="text-gray-700 mb-3">We process your personal data based on:</p>
                      <ul className="space-y-1 text-gray-600">
                        <li>• <strong>Consent:</strong> When you voluntarily provide information or opt-in to communications</li>
                        <li>• <strong>Contract:</strong> To fulfill service agreements and process your requests</li>
                        <li>• <strong>Legitimate Interest:</strong> To improve our services and ensure website security</li>
                        <li>• <strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Third-Party Services */}
                <section id="third-party-services">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center border-b pb-3">
                    <ExternalLink className="h-7 w-7 mr-3 text-primary" />
                    4. Third-Party Services
                  </h2>
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                      Our website and mobile application use the following third-party services that may collect information about you:
                    </p>
                    
                    <div className="grid gap-6">
                      <div className="border border-gray-200 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-orange-600 font-bold text-sm">F</span>
                          </div>
                          Google Firebase
                        </h3>
                        <div className="ml-11">
                          <p className="text-gray-600 mb-2"><strong>Purpose:</strong> Database storage, user authentication, and app functionality</p>
                          <p className="text-gray-600 mb-2"><strong>Data Collected:</strong> User account information, app usage data, performance metrics</p>
                          <p className="text-gray-600 mb-3"><strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Privacy Policy</a></p>
                        </div>
                      </div>

                      <div className="border border-gray-200 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-bold text-sm">C</span>
                          </div>
                          Cloudinary
                        </h3>
                        <div className="ml-11">
                          <p className="text-gray-600 mb-2"><strong>Purpose:</strong> Image and media hosting for website content</p>
                          <p className="text-gray-600 mb-2"><strong>Data Collected:</strong> Uploaded images and associated metadata</p>
                          <p className="text-gray-600 mb-3"><strong>Privacy Policy:</strong> <a href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Cloudinary Privacy Policy</a></p>
                        </div>
                      </div>

                      <div className="border border-gray-200 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-red-600 font-bold text-sm">G</span>
                          </div>
                          Google Services
                        </h3>
                        <div className="ml-11">
                          <p className="text-gray-600 mb-2"><strong>Purpose:</strong> Maps integration, analytics (if enabled), and fonts</p>
                          <p className="text-gray-600 mb-2"><strong>Data Collected:</strong> Location data (for maps), usage analytics, performance data</p>
                          <p className="text-gray-600 mb-3"><strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Privacy Policy</a></p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                      <p className="text-amber-800">
                        <strong>Important:</strong> These third-party services have their own privacy policies. We encourage you to review them to understand how they handle your data.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Data Sharing */}
                <section id="data-sharing">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">5. Information Sharing and Disclosure</h2>
                  <div className="space-y-6">
                    <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3 text-red-800">We DO NOT Sell Your Data</h3>
                      <p className="text-red-700">Sri Pavan Computers does not sell, rent, or trade your personal information to third parties for their marketing purposes.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Limited Sharing Scenarios</h3>
                      <p className="mb-4 text-gray-700">We may share your information only in the following limited circumstances:</p>
                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-semibold">Service Providers</h4>
                          <p className="text-gray-600">Trusted partners who help us operate our website and provide services (hosting, technical support)</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-semibold">Legal Requirements</h4>
                          <p className="text-gray-600">When required by law, court order, or to protect our rights and safety</p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h4 className="font-semibold">Business Transfers</h4>
                          <p className="text-gray-600">In case of merger, acquisition, or asset sale (you will be notified)</p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4">
                          <h4 className="font-semibold">With Your Consent</h4>
                          <p className="text-gray-600">When you explicitly agree to share information for specific purposes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Data Security */}
                <section id="data-security">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">6. Data Security</h2>
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                      We implement industry-standard security measures to protect your personal information:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Technical Safeguards</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li>• SSL/TLS encryption for data transmission</li>
                          <li>• Secure cloud hosting infrastructure</li>
                          <li>• Regular security updates and monitoring</li>
                          <li>• Access controls and authentication</li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Organizational Measures</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li>• Limited access to personal data</li>
                          <li>• Employee privacy training</li>
                          <li>• Regular security assessments</li>
                          <li>• Incident response procedures</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <p className="text-yellow-800">
                        <strong>Important Notice:</strong> While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but we use reasonable measures to protect your data.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Data Retention */}
                <section id="data-retention">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">7. Data Retention</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700">We retain your personal information only as long as necessary for the purposes outlined in this privacy policy:</p>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="grid gap-4">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Contact Form Submissions</span>
                          <span className="text-gray-600">3 years</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Service Request Records</span>
                          <span className="text-gray-600">5 years</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Website Analytics Data</span>
                          <span className="text-gray-600">2 years</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Marketing Communications</span>
                          <span className="text-gray-600">Until unsubscribed</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm">
                      After the retention period expires, we will securely delete or anonymize your personal information unless we are required to retain it for legal purposes.
                    </p>
                  </div>
                </section>

                {/* Your Rights */}
                <section id="your-rights">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">8. Your Privacy Rights</h2>
                  <div className="space-y-6">
                    <p className="text-gray-700">You have the following rights regarding your personal information:</p>
                    
                    <div className="grid gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-800 mb-2">Right to Access</h3>
                        <p className="text-blue-700">Request a copy of the personal information we hold about you</p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h3 className="font-semibold text-green-800 mb-2">Right to Rectification</h3>
                        <p className="text-green-700">Request correction of inaccurate or incomplete personal information</p>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h3 className="font-semibold text-purple-800 mb-2">Right to Erasure</h3>
                        <p className="text-purple-700">Request deletion of your personal information (subject to legal obligations)</p>
                      </div>
                      
                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <h3 className="font-semibold text-orange-800 mb-2">Right to Restrict Processing</h3>
                        <p className="text-orange-700">Request limitation of how we process your personal information</p>
                      </div>
                      
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h3 className="font-semibold text-red-800 mb-2">Right to Object</h3>
                        <p className="text-red-700">Object to processing of your personal information for marketing purposes</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-2">Right to Data Portability</h3>
                        <p className="text-gray-700">Request transfer of your data to another service provider</p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-100 p-6 rounded-lg">
                      <h3 className="font-semibold mb-3">How to Exercise Your Rights</h3>
                      <p className="mb-3">To exercise any of these rights, please contact us using the information provided in the "Contact Us" section. We will respond to your request within 30 days.</p>
                      <p className="text-sm text-gray-600">Note: Some rights may be limited by applicable laws or if we need to retain information for legal purposes.</p>
                    </div>
                  </div>
                </section>

                {/* Cookies and Tracking */}
                <section id="cookies">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">9. Cookies and Tracking Technologies</h2>
                  <div className="space-y-6">
                    <p className="text-gray-700">Our website uses cookies and similar technologies to enhance your browsing experience:</p>
                    
                    <div className="grid gap-4">
                      <div className="border border-gray-200 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Essential Cookies</h3>
                        <p className="text-gray-600 mb-2">Required for basic website functionality and security</p>
                        <p className="text-sm text-gray-500">These cannot be disabled and do not require consent</p>
                      </div>
                      
                      <div className="border border-gray-200 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Performance Cookies</h3>
                        <p className="text-gray-600 mb-2">Help us understand how visitors interact with our website</p>
                        <p className="text-sm text-gray-500">Used for analytics and website improvement</p>
                      </div>
                      
                      <div className="border border-gray-200 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Functional Cookies</h3>
                        <p className="text-gray-600 mb-2">Remember your preferences and personalize your experience</p>
                        <p className="text-sm text-gray-500">Such as language settings and form data</p>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Managing Cookies</h3>
                      <p className="text-yellow-800">You can control and delete cookies through your browser settings. Note that disabling cookies may affect website functionality.</p>
                    </div>
                  </div>
                </section>

                {/* Children's Privacy */}
                <section id="children-privacy">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">10. Children's Privacy</h2>
                  <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-red-800">Age Restriction</h3>
                    <p className="text-red-700 mb-4">
                      Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                    </p>
                    <p className="text-red-700 mb-4">
                      If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                    </p>
                    <p className="text-red-700">
                      If we discover that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
                    </p>
                  </div>
                </section>

                {/* International Users */}
                <section id="international-users">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">11. International Users</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Sri Pavan Computers is based in India. If you are accessing our services from outside India, please be aware that your information may be transferred to, stored, and processed in India.
                    </p>
                    
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-blue-800">Data Protection Laws</h3>
                      <p className="text-blue-700">
                        We comply with applicable data protection laws, including GDPR for European users and other relevant privacy regulations. By using our services, you consent to the transfer and processing of your information in India.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Policy Changes */}
                <section id="policy-changes">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">12. Changes to This Privacy Policy</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
                    </p>
                    
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-green-800">How We Notify You</h3>
                      <ul className="space-y-1 text-green-700">
                        <li>• Update the "Last Updated" date at the top of this policy</li>
                        <li>• Post prominent notice on our website for material changes</li>
                        <li>• Send email notification if we have your contact information</li>
                        <li>• Provide notice through our mobile application</li>
                      </ul>
                    </div>
                    
                    <p className="text-gray-600">
                      We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                    </p>
                  </div>
                </section>

                {/* Contact Us */}
                <section id="contact-us">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">13. Contact Us</h2>
                  <div className="space-y-6">
                    <p className="text-gray-700">
                      If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
                        <h3 className="font-semibold mb-4 text-blue-800">Primary Contact</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-blue-600 mr-3" />
                            <div>
                              <p className="font-medium">Email</p>
                              <a href="mailto:pavancomputers_kkd@yahoo.co.in" className="text-blue-600 hover:underline">
                                pavancomputers_kkd@yahoo.co.in
                              </a>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-blue-600 mr-3" />
                            <div>
                              <p className="font-medium">Phone</p>
                              <a href="tel:+919010111166" className="text-blue-600 hover:underline">
                                +91 9010 111 166
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border">
                        <h3 className="font-semibold mb-4 text-green-800">Visit Our Store</h3>
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-green-600 mr-3 mt-1" />
                          <div>
                            <p className="font-medium mb-1">Address</p>
                            <p className="text-green-700 text-sm leading-relaxed">
                              No. 21/9/9, Sri Krishna Kanth Plaza,<br />
                              R.R. Road, Near Masjid Center,<br />
                              Kakinada Bazar, Kakinada – 533001,<br />
                              Andhra Pradesh, India
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <h3 className="font-semibold mb-3">Response Time</h3>
                      <p className="text-gray-700 mb-2">
                        We aim to respond to all privacy-related inquiries within <strong>7 business days</strong>.
                      </p>
                      <p className="text-gray-600 text-sm">
                        For urgent privacy matters, please call us directly at +91 9010 111 166.
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <p className="text-blue-800 text-center">
                        <strong>Data Protection Officer:</strong> For GDPR-related inquiries, you may contact our designated privacy officer at the email address above with the subject line "Data Protection Inquiry."
                      </p>
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <div className="border-t pt-8 mt-12">
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg">
                    <div className="text-center">
                      <p className="text-gray-600 mb-2">
                        This Privacy Policy was last updated on <strong>{currentDate}</strong>
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        This policy is effective immediately for new users and will become effective on the date mentioned above for existing users.
                      </p>
                      <div className="flex justify-center space-x-4 text-sm">
                        <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link>
                        <span className="text-gray-400">|</span>
                        <Link to="/contact" className="text-primary hover:underline">Contact Us</Link>
                        <span className="text-gray-400">|</span>
                        <Link to="/" className="text-primary hover:underline">Return to Homepage</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
