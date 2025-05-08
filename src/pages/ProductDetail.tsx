
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, ShieldCheck, Truck, RotateCw } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import BuyButton from '@/components/BuyButton';
import { ProductProps } from '@/components/ProductCard';
import { useResponsive } from '@/utils/responsive';

// Helper function to convert price string to number
const parsePriceToNumber = (priceStr: string): number => {
  // Remove currency symbol, commas and convert to number
  return parseFloat(priceStr.replace(/[₹,]/g, ''));
};

// This would typically come from an API, but we'll mock it for now
const getProductById = (id: string): ProductProps | undefined => {
  const products: ProductProps[] = [
    {
      id: "1",
      name: "HP Pavilion Gaming Laptop",
      category: "Laptops",
      price: parsePriceToNumber("₹65,999"),
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2032",
      description: "15.6-inch FHD, AMD Ryzen 5, 8GB RAM, 512GB SSD, NVIDIA GTX 1650. Experience seamless gaming and multitasking with this powerful laptop designed for performance.",
      brand: "HP",
      specifications: {
        processor: "AMD Ryzen 5 5600H",
        ram: "8GB DDR4 (Upgradable to 32GB)",
        storage: "512GB NVMe SSD",
        display: "15.6-inch FHD (1920 x 1080) IPS Anti-glare",
        graphics: "NVIDIA GTX 1650 4GB GDDR6",
        os: "Windows 11 Home",
        battery: "52.5Wh, up to 6 hours",
        weight: "2.28 kg",
        warranty: "1 Year Onsite Warranty"
      }
    },
    {
      id: "2",
      name: "Dell Inspiron Desktop",
      category: "Desktops",
      price: parsePriceToNumber("₹49,999"),
      image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?q=80&w=2069",
      description: "Intel Core i5, 16GB RAM, 1TB HDD + 256GB SSD, Windows 11. A powerful desktop for your home office or productivity needs with ample storage and memory.",
      brand: "Dell",
      specifications: {
        processor: "11th Gen Intel Core i5-11400",
        ram: "16GB DDR4 (Upgradable to 64GB)",
        storage: "1TB HDD + 256GB SSD",
        graphics: "Intel UHD Graphics 730",
        os: "Windows 11 Home",
        ports: "USB 3.2, HDMI, DisplayPort, Ethernet",
        connectivity: "Wi-Fi 6, Bluetooth 5.1",
        warranty: "3 Years Onsite Warranty"
      }
    },
    {
      id: "3",
      name: "Canon PIXMA All-in-One Printer",
      category: "Printers",
      price: parsePriceToNumber("₹12,999"),
      image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=2070",
      description: "Wireless inkjet color printer, scanner, and copier. Perfect for home or small office use with high-quality printing capabilities.",
      brand: "Canon",
      specifications: {
        type: "All-in-One Inkjet",
        functions: "Print, Scan, Copy",
        connectivity: "Wi-Fi, USB, Mobile Printing",
        resolution: "4800 x 1200 dpi",
        speed: "Up to 10 ipm (black), 6 ipm (color)",
        paperSize: "A4, A5, B5, Letter, Legal",
        warranty: "1 Year Warranty"
      }
    },
    {
      id: "4",
      name: "Samsung 27-inch Monitor",
      category: "Monitors",
      price: parsePriceToNumber("₹18,499"),
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070",
      description: "4K UHD, IPS Panel, HDMI, DisplayPort, FreeSync. An immersive visual experience with vibrant colors and crisp details.",
      brand: "Samsung",
      specifications: {
        size: "27-inch",
        resolution: "3840 x 2160 (4K UHD)",
        panel: "IPS",
        refreshRate: "60Hz",
        responseTime: "5ms",
        ports: "HDMI x2, DisplayPort, USB Hub",
        features: "AMD FreeSync, Eye Saver Mode",
        warranty: "3 Years Warranty"
      }
    },
    {
      id: "5",
      name: "Logitech MX Master 3 Mouse",
      category: "Accessories",
      price: parsePriceToNumber("₹7,999"),
      image: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?q=80&w=1974",
      description: "Wireless Bluetooth mouse with advanced features. Engineered for precision with customizable buttons and ergonomic design.",
      brand: "Logitech",
      specifications: {
        connectivity: "Bluetooth, USB Receiver",
        battery: "Up to 70 days on full charge",
        buttons: "7 programmable buttons",
        scrollWheel: "MagSpeed electromagnetic scroll",
        dpi: "200-4000 DPI",
        compatibility: "Windows, macOS, iPadOS",
        warranty: "2 Years Warranty"
      }
    },
    {
      id: "6",
      name: "WD Elements External Hard Drive",
      category: "Storage",
      price: parsePriceToNumber("₹4,299"),
      image: "https://images.unsplash.com/photo-1597347316205-38f2e5817806?q=80&w=2071",
      description: "2TB portable storage, USB 3.0. Reliable and high-capacity storage solution for your backup needs.",
      brand: "Western Digital",
      specifications: {
        capacity: "2TB",
        interface: "USB 3.0 (backward compatible with 2.0)",
        speed: "Up to 5Gbps",
        compatibility: "Windows, macOS (reformatting may be required)",
        dimensions: "111 x 82 x 15 mm",
        weight: "131g",
        warranty: "2 Years Warranty"
      }
    },
    {
      id: "7",
      name: "Apple iPad Air",
      category: "Tablets",
      price: parsePriceToNumber("₹54,900"),
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2033",
      description: "10.9-inch, Wi-Fi, 64GB storage. Powerful performance in a sleek design with all-day battery life.",
      brand: "Apple",
      specifications: {
        display: "10.9-inch Liquid Retina",
        chip: "A14 Bionic chip",
        storage: "64GB",
        camera: "12MP back, 7MP FaceTime HD front",
        connectivity: "Wi-Fi 6, Bluetooth 5.0",
        authentication: "Touch ID",
        batteryLife: "Up to 10 hours",
        warranty: "1 Year Warranty"
      }
    },
    {
      id: "8",
      name: "ASUS ROG Gaming Router",
      category: "Networking",
      price: parsePriceToNumber("₹14,999"),
      image: "https://dlcdnwebimgs.asus.com/gain/a2367373-5b5f-45bf-a7ec-b7aa971fdb99/w185/w184/fwebp",
      description: "Tri-band WiFi 6 gaming router with advanced security. Designed for low latency and smooth online gaming experience.",
      brand: "ASUS",
      specifications: {
        standard: "Wi-Fi 6 (802.11ax)",
        bands: "Tri-band (2.4GHz + 5GHz + 5GHz)",
        speed: "Up to 10,000 Mbps",
        coverage: "Large homes (up to 5,000 sq.ft)",
        ports: "1x Gigabit WAN, 4x Gigabit LAN, 2x USB 3.0",
        security: "AiProtection Pro, WPA3",
        features: "Game acceleration, QoS, VPN",
        warranty: "3 Years Warranty"
      }
    },
    {
      id: "9",
      name: "Custom Gaming PC",
      category: "Gaming",
      price: parsePriceToNumber("₹85,999"),
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070",
      description: "AMD Ryzen 7, 16GB RAM, RTX 3070, 1TB NVMe SSD. A high-performance custom build for serious gamers and content creators.",
      brand: "Custom",
      specifications: {
        processor: "AMD Ryzen 7 5800X",
        motherboard: "ASUS ROG Strix B550-F Gaming",
        ram: "16GB DDR4 3600MHz",
        gpu: "NVIDIA RTX 3070 8GB",
        storage: "1TB NVMe SSD",
        psu: "750W 80+ Gold",
        cooling: "240mm AIO Liquid Cooler",
        case: "NZXT H510 Elite",
        os: "Windows 11 Pro",
        warranty: "1 Year Warranty on Parts & Service"
      }
    },
    {
      id: "10",
      name: "Apple iPhone 15 Pro",
      category: "Smartphones",
      price: parsePriceToNumber("₹119,900"),
      image: "https://m.media-amazon.com/images/I/81SigpJN1KL._SL1500_.jpg",
      description: "A17 Pro chip, 48MP camera, 6.1-inch Super Retina XDR display with ProMotion. The most advanced iPhone yet with revolutionary features.",
      brand: "Apple",
      specifications: {
        display: "6.1-inch Super Retina XDR with ProMotion",
        chip: "A17 Pro chip with 6-core CPU",
        storage: "128GB, 256GB, 512GB, or 1TB",
        camera: "48MP main, 12MP ultra wide, 12MP telephoto",
        frontCamera: "12MP TrueDepth camera",
        battery: "Up to 23 hours video playback",
        connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3",
        authentication: "Face ID",
        warranty: "1 Year Warranty"
      }
    },
    {
      id: "11",
      name: "Samsung Galaxy S23 Ultra",
      category: "Smartphones",
      price: parsePriceToNumber("₹109,999"),
      image: "https://images.samsung.com/in/smartphones/galaxy-s23-ultra/buy/product_color_phantom_black.png?imwidth=480",
      description: "200MP camera, S Pen included, Snapdragon 8 Gen 2, 6.8-inch Dynamic AMOLED 2X. The ultimate Galaxy experience with unmatched performance.",
      brand: "Samsung",
      specifications: {
        display: "6.8-inch Quad HD+ Dynamic AMOLED 2X",
        processor: "Snapdragon 8 Gen 2",
        storage: "256GB, 512GB, or 1TB",
        ram: "12GB LPDDR5",
        camera: "200MP main, 12MP ultra wide, 10MP telephoto (3x), 10MP telephoto (10x)",
        frontCamera: "12MP",
        battery: "5000mAh",
        spen: "Built-in S Pen",
        os: "Android 13 with One UI 5.1",
        warranty: "1 Year Warranty"
      }
    },
    {
      id: "12",
      name: "Samsung Galaxy Tab S9 Ultra",
      category: "Tablets",
      price: parsePriceToNumber("₹119,999"),
      image: "https://images.samsung.com/in/galaxy-tab-s9/buy/product_color_tabS9_graphite.jpg?imwidth=480",
      description: "14.6-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2, S Pen included. The ultimate tablet for productivity and entertainment.",
      brand: "Samsung",
      specifications: {
        display: "14.6-inch Dynamic AMOLED 2X (2960 x 1848)",
        processor: "Snapdragon 8 Gen 2",
        storage: "256GB, 512GB, or 1TB (expandable)",
        ram: "12GB or 16GB",
        camera: "13MP wide + 8MP ultra-wide (rear), 12MP + 12MP (front)",
        battery: "11,200mAh",
        spen: "S Pen included",
        connectivity: "5G (optional), Wi-Fi 6E, Bluetooth 5.3",
        os: "Android 13 with One UI 5.1",
        warranty: "1 Year Warranty"
      }
    }
  ];
  
  return products.find(product => product.id === id);
};

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = getProductById(productId || "");
  const { isMobile } = useResponsive();
  
  const [mainImage, setMainImage] = useState(product?.image || "");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState<number>(product ? product.price : 0);
  
  // Update total price when quantity changes
  React.useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity);
    }
  }, [quantity, product]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-16">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you're looking for does not exist or has been removed.</p>
        <Button asChild>
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>
    );
  }

  // Additional product images - in a real app, these would come from the API
  const additionalImages = [
    product.image,
    "https://images.unsplash.com/photo-1589561253898-768105ca91a8?q=80&w=1978", 
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1968",
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070"
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="text-gray-600 hover:text-primary">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">{product.name}</span>
          </div>
        </div>
      </nav>

      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images */}
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-96 object-contain p-4"
                />
              </div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {additionalImages.map((img, index) => (
                  <div 
                    key={index} 
                    className={`cursor-pointer rounded-md overflow-hidden border-2 ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setMainImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">(24 Reviews)</span>
              </div>
              
              <div className="text-2xl font-bold text-primary mb-6">
                ₹{totalPrice.toLocaleString()}
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              {/* Brand */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">Brand:</div>
                <div className="flex items-center">
                  <span className="font-medium">{product.brand}</span>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">
                    Authorized Dealer
                  </span>
                </div>
              </div>
              
              {/* Quantity */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Quantity:</div>
                <div className="flex items-center">
                  <button 
                    className="bg-gray-200 px-3 py-2 rounded-l-md hover:bg-gray-300"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 px-3 py-2 text-center border-y border-gray-200 focus:outline-none"
                    min="1"
                  />
                  <button 
                    className="bg-gray-200 px-3 py-2 rounded-r-md hover:bg-gray-300"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Buy Button */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <BuyButton 
                  productName={product.name}
                  productId={product.id}
                  price={totalPrice}
                  image={product.image}
                  size="lg"
                  quantity={quantity}
                />
              </div>
              
              {/* Benefits */}
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
                    <span className="text-sm">Genuine Product</span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-blue-600" />
                    <span className="text-sm">Free Delivery</span>
                  </div>
                  <div className="flex items-center">
                    <RotateCw className="h-5 w-5 mr-2 text-orange-600" />
                    <span className="text-sm">Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Specifications */}
          <div className="mt-12">
            <SectionHeading 
              title="Specifications" 
              subtitle="Detailed technical specifications"
              center={false}
            />
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
              <table className="min-w-full">
                <tbody>
                  {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-200">
                      <td className="py-3 px-4 bg-gray-50 font-medium capitalize w-1/3">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                      <td className="py-3 px-4">{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Related Products - placeholder */}
          <div className="mt-16">
            <SectionHeading 
              title="Related Products" 
              subtitle="You might also be interested in"
              center={false}
            />
            
            <div className="bg-white rounded-lg shadow-sm p-8 mt-6 text-center">
              <p className="text-gray-600">Related products will be displayed here.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
