
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
      image: "data:image/jpeg;base64,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",
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
