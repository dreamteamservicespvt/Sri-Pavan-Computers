
import React, { useEffect } from 'react';
import SectionHeading from '@/components/SectionHeading';
import BrandLogo from '@/components/BrandLogo';

// Brand data with fixed logo URLs
const brandsData = [
  {
    name: "HP",
    logoUrl: "https://1000logos.net/wp-content/uploads/2017/02/HP-Logo-2012.png",
    website: "https://www.hp.com"
  },
  {
    name: "Dell",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Dell_Logo.png/1200px-Dell_Logo.png",
    website: "https://www.dell.com"
  },
  {
    name: "Lenovo",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/2560px-Lenovo_logo_2015.svg.png",
    website: "https://www.lenovo.com"
  },
  {
    name: "ASUS",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/2560px-ASUS_Logo.svg.png",
    website: "https://www.asus.com"
  },
  {
    name: "Acer",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Acer_2011.svg/2560px-Acer_2011.svg.png",
    website: "https://www.acer.com"
  },
  {
    name: "MSI",
    logoUrl: "https://1000logos.net/wp-content/uploads/2018/10/MSI-Logo.png",
    website: "https://www.msi.com"
  },
  {
    name: "Apple",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
    website: "https://www.apple.com"
  },
  {
    name: "Samsung",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png",
    website: "https://www.samsung.com"
  },
  {
    name: "LG",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/LG_logo_%282014%29.svg",
    website: "https://www.lg.com"
  },
  {
    name: "Sony",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/2560px-Sony_logo.svg.png",
    website: "https://www.sony.com"
  },
  {
    name: "Canon",
    logoUrl: "https://global.canon/en/corporate/logo/img/logo_01.png",
    website: "https://www.canon.com"
  },
  {
    name: "Epson",
    logoUrl: "https://1000logos.net/wp-content/uploads/2018/02/Epson-Logo.png",
    website: "https://www.epson.com"
  },
  {
    name: "Brother",
    logoUrl: "https://static.cdnlogo.com/logos/b/91/brother.png",
    website: "https://www.brother.com"
  },
  {
    name: "Western Digital",
    logoUrl: "https://www.westerndigital.com/content/dam/store/en-us/assets/legal/trademarks/western-digital-new-logo.png.thumb.1280.1280.png",
    website: "https://www.westerndigital.com"
  },
  {
    name: "Seagate",
    logoUrl: "https://www.seagate.com/content/dam/seagate/migrated-assets/www-content/news/_shared/images/seagate-logo-image-center-374x328.png",
    website: "https://www.seagate.com"
  },
  {
    name: "Intel",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/1280px-Intel_logo_%282006-2020%29.svg.png",
    website: "https://www.intel.com"
  },
  {
    name: "AMD",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/2560px-AMD_Logo.svg.png",
    website: "https://www.amd.com"
  },
  {
    name: "NVIDIA",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png",
    website: "https://www.nvidia.com"
  }
];

// Group brands by type
const brandGroups = {
  "Computer Manufacturers": ["HP", "Dell", "Lenovo", "ASUS", "Acer", "MSI", "Apple"],
  "Electronics": ["Samsung", "LG", "Sony", "Apple"],
  "Printers & Imaging": ["Canon", "Epson", "Brother", "HP"],
  "Storage Solutions": ["Western Digital", "Seagate", "Samsung"],
  "Computer Components": ["Intel", "AMD", "NVIDIA", "ASUS", "MSI"]
}

const Brands = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Brands We Deal</h1>
            <p className="text-xl opacity-90">Partner brands we trust and offer to our customers</p>
          </div>
        </div>
      </section>

      {/* Brands overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Partner Brands" 
            subtitle="We partner with industry-leading brands to provide you with quality products"
            center={true}
          />
          
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {brandsData.map((brand) => (
              <BrandLogo 
                key={brand.name}
                name={brand.name}
                logoUrl={brand.logoUrl}
                website={brand.website}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Brands By Category" 
            subtitle="Explore our brands by product category"
            center={true}
          />
          
          <div className="mt-12 space-y-10">
            {Object.entries(brandGroups).map(([category, brandNames]) => (
              <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
                <h3 className="text-2xl font-bold mb-6 text-primary">{category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {brandNames.map(brandName => {
                    const brand = brandsData.find(b => b.name === brandName);
                    if (brand) {
                      return (
                        <BrandLogo 
                          key={brandName}
                          name={brand.name}
                          logoUrl={brand.logoUrl}
                          website={brand.website}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why we choose these brands */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Why We Choose These Brands" 
            subtitle="Our commitment to quality and customer satisfaction"
            center={true}
          />
          
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-bold mb-4">Quality & Reliability</h3>
                <p className="text-gray-700">
                  We partner only with brands known for their quality, durability, and reliability. 
                  Every product we offer has been carefully selected to ensure it meets our high standards.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-bold mb-4">Warranty Support</h3>
                <p className="text-gray-700">
                  As authorized dealers, we provide genuine products with full manufacturer warranty. 
                  Our partnerships allow us to offer excellent after-sales support.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-bold mb-4">Latest Technology</h3>
                <p className="text-gray-700">
                  Our brand partners are leaders in innovation, allowing us to offer the latest technology 
                  and features to our customers.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-bold mb-4">Value for Money</h3>
                <p className="text-gray-700">
                  We carefully select brands that offer the best value for money without compromising on quality, 
                  ensuring our customers get the best possible products at competitive prices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Brands;
