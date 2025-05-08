import React, { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  CheckCircle, Cpu, HardDrive, 
  Monitor, BarChart3, Laptop, Send
} from 'lucide-react';

// PC component options
const components = {
  processor: [
    { id: "p1", name: "Intel Core i3-12100", price: 12000 },
    { id: "p2", name: "Intel Core i5-12400", price: 18000 },
    { id: "p3", name: "Intel Core i7-12700K", price: 32000 },
    { id: "p4", name: "AMD Ryzen 5 5600X", price: 17000 },
    { id: "p5", name: "AMD Ryzen 7 5800X", price: 29000 },
  ],
  motherboard: [
    { id: "m1", name: "ASUS Prime B660M-A", price: 11000 },
    { id: "m2", name: "MSI PRO Z690-A", price: 18000 },
    { id: "m3", name: "Gigabyte B550 AORUS Elite", price: 14000 },
    { id: "m4", name: "ASRock B550 Phantom Gaming", price: 12000 },
  ],
  ram: [
    { id: "r1", name: "Crucial 8GB DDR4 3200MHz", price: 2500 },
    { id: "r2", name: "Corsair Vengeance 16GB DDR4 3600MHz", price: 5000 },
    { id: "r3", name: "G.Skill Ripjaws 32GB DDR4 3200MHz", price: 9000 },
  ],
  storage: [
    { id: "s1", name: "Kingston 500GB NVMe SSD", price: 4500 },
    { id: "s2", name: "Samsung 970 EVO Plus 1TB NVMe SSD", price: 9000 },
    { id: "s3", name: "Seagate Barracuda 2TB HDD", price: 4000 },
    { id: "s4", name: "Western Digital Blue 1TB SSD", price: 7000 },
  ],
  graphics: [
    { id: "g0", name: "Integrated Graphics", price: 0 },
    { id: "g1", name: "NVIDIA GTX 1660 Super", price: 20000 },
    { id: "g2", name: "NVIDIA RTX 3060", price: 35000 },
    { id: "g3", name: "AMD Radeon RX 6600", price: 28000 },
    { id: "g4", name: "NVIDIA RTX 3070", price: 55000 },
  ],
  case: [
    { id: "c1", name: "Corsair 4000D Airflow", price: 7000 },
    { id: "c2", name: "NZXT H510", price: 6500 },
    { id: "c3", name: "Cooler Master MasterBox Q300L", price: 4000 },
    { id: "c4", name: "Phanteks Eclipse P400", price: 6000 },
  ],
  power: [
    { id: "pw1", name: "Corsair CV650 650W", price: 5000 },
    { id: "pw2", name: "EVGA SuperNOVA 750 GT 750W", price: 8000 },
    { id: "pw3", name: "Cooler Master MWE 550W", price: 4000 },
  ]
};

// Build types presets
const buildPresets = [
  {
    id: "basic",
    name: "Basic Office PC",
    description: "Perfect for everyday tasks, browsing, and office applications",
    budgetRange: [30000, 40000],
    icon: Laptop,
  },
  {
    id: "gaming",
    name: "Gaming PC",
    description: "Designed for smooth gaming experience at high settings",
    budgetRange: [70000, 90000],
    icon: BarChart3,
  },
  {
    id: "workstation",
    name: "Workstation",
    description: "High-performance system for professional work and content creation",
    budgetRange: [100000, 150000],
    icon: Monitor,
  }
];

const PCBuilder = () => {
  const [budget, setBudget] = useState<number[]>([50000]);
  const [buildType, setBuildType] = useState("");
  const [selectedComponents, setSelectedComponents] = useState<Record<string, string>>({
    processor: "",
    motherboard: "",
    ram: "",
    storage: "",
    graphics: "g0", // Default to integrated graphics
    case: "",
    power: ""
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Calculate total cost
  const calculateTotal = () => {
    let total = 0;
    
    for (const [category, componentId] of Object.entries(selectedComponents)) {
      if (componentId && components[category as keyof typeof components]) {
        const component = components[category as keyof typeof components].find(c => c.id === componentId);
        if (component) total += component.price;
      }
    }
    
    return total;
  };
  
  const total = calculateTotal();
  
  // Handle build preset selection
  const selectBuildPreset = (presetId: string) => {
    setBuildType(presetId);
    const preset = buildPresets.find(p => p.id === presetId);
    if (preset) {
      setBudget([preset.budgetRange[0]]);
      
      // Default component selection based on build type
      if (presetId === "basic") {
        setSelectedComponents({
          processor: "p1",  // Intel Core i3
          motherboard: "m1",  // Basic motherboard
          ram: "r1",  // 8GB RAM
          storage: "s1",  // 500GB SSD
          graphics: "g0",  // Integrated graphics
          case: "c3",  // Budget case
          power: "pw3"  // 550W power supply
        });
      } else if (presetId === "gaming") {
        setSelectedComponents({
          processor: "p2",  // Intel Core i5
          motherboard: "m2",  // Gaming motherboard
          ram: "r2",  // 16GB RAM
          storage: "s2",  // 1TB SSD
          graphics: "g2",  // RTX 3060
          case: "c1",  // Airflow case
          power: "pw1"  // 650W power supply
        });
      } else if (presetId === "workstation") {
        setSelectedComponents({
          processor: "p3",  // Intel Core i7
          motherboard: "m2",  // High-end motherboard
          ram: "r3",  // 32GB RAM
          storage: "s2",  // 1TB NVMe
          graphics: "g4",  // RTX 3070
          case: "c2",  // Premium case
          power: "pw2"  // 750W power supply
        });
      }
    }
  };
  
  const handleComponentChange = (category: string, componentId: string) => {
    setSelectedComponents(prev => ({
      ...prev,
      [category]: componentId
    }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log("Form submitted:", {
      ...formData,
      buildType,
      budget: budget[0],
      selectedComponents,
      total
    });
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    }, 5000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Hero section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Custom PC Builder</h1>
            <p className="text-xl opacity-90">Design your perfect computer with our interactive PC builder tool</p>
          </div>
        </div>
      </section>

      {/* PC Builder Tool */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Build Your Custom PC" 
            subtitle="Select components that match your requirements and budget"
            center={true}
          />
          
          {formSubmitted ? (
            <div className="max-w-2xl mx-auto mt-12 bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-800 mb-2">Request Submitted!</h2>
              <p className="text-green-700 mb-4">Thank you for your custom PC build request. Our team will contact you shortly with a detailed quote.</p>
              <Button 
                onClick={() => setFormSubmitted(false)}
                variant="outline"
              >
                Build Another PC
              </Button>
            </div>
          ) : (
            <div className="mt-12">
              {/* Build Type Selection */}
              <div className="mb-12">
                <h2 className="text-xl font-bold mb-6">1. Choose Build Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {buildPresets.map(preset => (
                    <div 
                      key={preset.id}
                      className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
                        buildType === preset.id ? 'border-primary bg-blue-50 shadow-md' : 'border-gray-200'
                      }`}
                      onClick={() => selectBuildPreset(preset.id)}
                    >
                      <div className="flex items-center mb-3">
                        <div className="bg-primary text-white rounded-full p-2 mr-3">
                          <preset.icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-semibold">{preset.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{preset.description}</p>
                      <p className="text-primary font-medium">
                        ₹{preset.budgetRange[0].toLocaleString()} - ₹{preset.budgetRange[1].toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Budget Slider */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">2. Set Your Budget</h2>
                  <p className="font-medium text-primary">₹{budget[0].toLocaleString()}</p>
                </div>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  max={200000}
                  min={30000}
                  step={1000}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>₹30,000</span>
                  <span>₹200,000</span>
                </div>
              </div>
              
              {/* Component Selection */}
              <div className="mb-12">
                <h2 className="text-xl font-bold mb-6">3. Select Components</h2>
                
                <div className="space-y-6">
                  {/* Processor */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-4">
                      <Cpu className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-semibold">Processor (CPU)</h3>
                    </div>
                    <div className="space-y-2">
                      {components.processor.map(component => (
                        <div 
                          key={component.id}
                          className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50"
                          onClick={() => handleComponentChange('processor', component.id)}
                        >
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              name="processor" 
                              value={component.id}
                              checked={selectedComponents.processor === component.id}
                              onChange={() => {}}
                              className="mr-2"
                            />
                            <span>{component.name}</span>
                          </div>
                          <span className="font-medium">₹{component.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Motherboard */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-4">
                      <Cpu className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-semibold">Motherboard</h3>
                    </div>
                    <div className="space-y-2">
                      {components.motherboard.map(component => (
                        <div 
                          key={component.id}
                          className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50"
                          onClick={() => handleComponentChange('motherboard', component.id)}
                        >
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              name="motherboard" 
                              value={component.id}
                              checked={selectedComponents.motherboard === component.id}
                              onChange={() => {}}
                              className="mr-2"
                            />
                            <span>{component.name}</span>
                          </div>
                          <span className="font-medium">₹{component.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* RAM */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-4">
                      <Cpu className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-semibold">RAM Memory</h3>
                    </div>
                    <div className="space-y-2">
                      {components.ram.map(component => (
                        <div 
                          key={component.id}
                          className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50"
                          onClick={() => handleComponentChange('ram', component.id)}
                        >
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              name="ram" 
                              value={component.id}
                              checked={selectedComponents.ram === component.id}
                              onChange={() => {}}
                              className="mr-2"
                            />
                            <span>{component.name}</span>
                          </div>
                          <span className="font-medium">₹{component.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Storage */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-4">
                      <HardDrive className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-semibold">Storage</h3>
                    </div>
                    <div className="space-y-2">
                      {components.storage.map(component => (
                        <div 
                          key={component.id}
                          className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50"
                          onClick={() => handleComponentChange('storage', component.id)}
                        >
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              name="storage" 
                              value={component.id}
                              checked={selectedComponents.storage === component.id}
                              onChange={() => {}}
                              className="mr-2"
                            />
                            <span>{component.name}</span>
                          </div>
                          <span className="font-medium">₹{component.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Graphics Card */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-4">
                      <Monitor className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-semibold">Graphics Card</h3>
                    </div>
                    <div className="space-y-2">
                      {components.graphics.map(component => (
                        <div 
                          key={component.id}
                          className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50"
                          onClick={() => handleComponentChange('graphics', component.id)}
                        >
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              name="graphics" 
                              value={component.id}
                              checked={selectedComponents.graphics === component.id}
                              onChange={() => {}}
                              className="mr-2"
                            />
                            <span>{component.name}</span>
                          </div>
                          <span className="font-medium">₹{component.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* PC Summary */}
              <div className="mb-12 bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold mb-6">4. Your PC Build Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {Object.entries(selectedComponents).map(([category, componentId]) => {
                    const componentList = components[category as keyof typeof components] || [];
                    const component = componentList.find(c => c.id === componentId);
                    
                    return (
                      <div key={category} className="flex justify-between pb-2 border-b border-gray-100">
                        <span className="capitalize">{category}:</span>
                        <div className="text-right">
                          <span className="font-medium">{component ? component.name : "Not selected"}</span>
                          {component && (
                            <span className="block text-sm text-gray-500">₹{component.price.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-xl font-bold text-primary">₹{total.toLocaleString()}</span>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="mb-12">
                <h2 className="text-xl font-bold mb-6">5. Get Your Custom Quote</h2>
                
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
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
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      ></textarea>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full flex items-center justify-center gap-2">
                    <Send className="h-5 w-5" />
                    Request Quote
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PCBuilder;
