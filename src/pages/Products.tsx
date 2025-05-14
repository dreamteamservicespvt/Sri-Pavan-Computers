
import React, { useState, useEffect } from 'react';
import SectionHeading from '@/components/SectionHeading';
import ProductCard, { ProductProps } from '@/components/ProductCard';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

// Mock product data with fixed image links
const productsData: ProductProps[] = [
  {
    id: "1",
    name: "HP Pavilion Gaming Laptop",
    category: "Laptops",
    price: 65999,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2032",
    description: "15.6-inch FHD, AMD Ryzen 5, 8GB RAM, 512GB SSD, NVIDIA GTX 1650",
    brand: "HP"
  },
  {
    id: "2",
    name: "Dell Inspiron Desktop",
    category: "Desktops",
    price: 49999,
    image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?q=80&w=2069",
    description: "Intel Core i5, 16GB RAM, 1TB HDD + 256GB SSD, Windows 11",
    brand: "Dell"
  },
  {
    id: "3",
    name: "Canon PIXMA All-in-One Printer",
    category: "Printers",
    price: 12999,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=2070",
    description: "Wireless inkjet color printer, scanner, and copier",
    brand: "Canon"
  },
  {
    id: "4",
    name: "Samsung 27-inch Monitor",
    category: "Monitors",
    price: 18499,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070",
    description: "4K UHD, IPS Panel, HDMI, DisplayPort, FreeSync",
    brand: "Samsung"
  },
  {
    id: "5",
    name: "Logitech MX Master 3 Mouse",
    category: "Accessories",
    price: 7999,
    image: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?q=80&w=1974",
    description: "Wireless Bluetooth mouse with advanced features",
    brand: "Logitech"
  },
  {
    id: "6",
    name: "WD Elements External Hard Drive",
    category: "Storage",
    price: 4299,
    // Fixed storage image link
    image: "https://images.unsplash.com/photo-1597347316205-38f2e5817806?q=80&w=2071",
    description: "2TB portable storage, USB 3.0",
    brand: "Western Digital"
  },
  {
    id: "7",
    name: "Apple iPad Air",
    category: "Tablets",
    price: 54900,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2033",
    description: "10.9-inch, Wi-Fi, 64GB storage",
    brand: "Apple"
  },
  {
    id: "8",
    name: "ASUS ROG Gaming Router",
    category: "Networking",
    price: 14999,
    // Updated router image
    image: "https://dlcdnwebimgs.asus.com/gain/a2367373-5b5f-45bf-a7ec-b7aa971fdb99/w185/w184/fwebp",
    description: "Tri-band WiFi 6 gaming router with advanced security",
    brand: "ASUS"
  },
  {
    id: "9",
    name: "Custom Gaming PC",
    category: "Gaming",
    price: 85999,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070",
    description: "AMD Ryzen 7, 16GB RAM, RTX 3070, 1TB NVMe SSD",
    brand: "Custom"
  },
  // Fixed smartphone products images
  {
    id: "10",
    name: "Apple iPhone 15 Pro",
    category: "Smartphones",
    price: 119900,
    image: "https://m.media-amazon.com/images/I/81SigpJN1KL._SL1500_.jpg",
    description: "A17 Pro chip, 48MP camera, 6.1-inch Super Retina XDR display with ProMotion",
    brand: "Apple"
  },
  {
    id: "11",
    name: "Samsung Galaxy S23 Ultra",
    category: "Smartphones",
    price: 109999,
    image: "https://images.samsung.com/in/smartphones/galaxy-s23-ultra/buy/product_color_phantom_black.png?imwidth=480",
    description: "200MP camera, S Pen included, Snapdragon 8 Gen 2, 6.8-inch Dynamic AMOLED 2X",
    brand: "Samsung"
  },
  {
    id: "12",
    name: "Samsung Galaxy Tab S9 Ultra",
    category: "Tablets",
    price: 119999,
    image: "https://images.samsung.com/in/galaxy-tab-s9/buy/product_color_tabS9_graphite.jpg?imwidth=480",
    description: "14.6-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2, S Pen included",
    brand: "Samsung"
  }
];

// Product categories
const categories = [
  "All Products",
  "Laptops",
  "Desktops",
  "Monitors",
  "Printers",
  "Storage",
  "Smartphones",
  "Tablets",
  "Accessories",
  "Networking",
  "Gaming"
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Filter products based on category and search term
  const filteredProducts = productsData.filter(product => {
    const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen ">
      {/* Hero section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Products</h1>
            <p className="text-xl opacity-90">Explore our extensive range of high-quality technology products</p>
          </div>
        </div>
      </section>

      {/* Products section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <SectionHeading 
              title="Browse Products" 
              subtitle="Find the perfect technology solution for your needs"
              className="md:mb-0"
            />
            
            <div className="relative mt-4 md:mt-0 max-w-xs">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "" : "bg-white"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Products grid with animations */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-fade-in" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-500">No products found matching your search criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("All Products");
                  setSearchTerm("");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Smartphone & Tablets CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-primary text-white rounded-lg overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <img 
                  src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=2070" 
                  alt="Smartphone & Tablets" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Latest Smartphones & Tablets</h2>
                <p className="mb-6">
                  Discover the latest smartphones and tablets from Apple, Samsung, and other leading brands. All devices come with excellent after-sales service and warranty support.
                </p>
                <Button asChild variant="secondary">
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory("Smartphones");
                    window.scrollTo(0, 0);
                  }}>Browse Smartphones</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Custom PC CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-primary text-white rounded-lg overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <img 
                  src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070" 
                  alt="Custom PC" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Need a Custom PC Built?</h2>
                <p className="mb-6">
                  We specialize in building custom PCs tailored to your specific needs, whether for gaming, content creation, or business. Get in touch for a personalized quote.
                </p>
                <Button asChild variant="secondary">
                  <Link to="/pc-builder">Build Your Dream PC Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
