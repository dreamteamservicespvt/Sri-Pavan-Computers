import React, { useState, useEffect } from 'react';
import SectionHeading from '@/components/SectionHeading';
import ProductCard, { ProductProps } from '@/components/ProductCard';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { useSEO } from '@/contexts/SEOContext';

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
    image: "data:image/jpeg;base64,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",
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
  const { updateSEO } = useSEO();
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    updateSEO({
      title: 'Products | Sri Pavan Computers - Computer Sales in Kakinada',
      description: 'Browse our wide range of computers, laptops, accessories, and more. Authorized dealer for top brands like HP, Dell, Lenovo, and others in Kakinada.',
      keywords: 'computer store Kakinada, laptop sales, desktop PC, computer accessories, printers',
      canonicalUrl: 'https://sripavancomputers.in/products',
      ogImage: 'https://sripavancomputers.in/images/products-og.jpg'
    });
  }, []); // Empty dependency array since updateSEO is now memoized
  
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
