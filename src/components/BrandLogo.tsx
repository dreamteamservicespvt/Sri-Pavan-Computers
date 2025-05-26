import React, { useState } from 'react';

interface BrandLogoProps {
  name: string;
  logoUrl: string;
  website?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ name, logoUrl, website }) => {
  const [imageError, setImageError] = useState(false);
  
  // Use a fallback URL for brands with broken images
  const fallbackUrls: Record<string, string> = {
    "HP": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/HP_logo_2012.svg/2048px-HP_logo_2012.svg.png",
    "Dell": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Dell_Logo.png/1200px-Dell_Logo.png",
    "Lenovo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/2560px-Lenovo_logo_2015.svg.png",
    "ASUS": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/2560px-ASUS_Logo.svg.png",
    "Acer": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Acer_2011.svg/2560px-Acer_2011.svg.png",
    "MSI": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/MSI_Logo.svg/2560px-MSI_Logo.svg.png",
    "Apple": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
    "Samsung": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png",
    "LG": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/LG_logo_%282015%29.svg/2560px-LG_logo_%282015%29.svg.png",
    "Sony": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/2560px-Sony_logo.svg.png",
    "Canon": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Canon_logo.svg/2560px-Canon_logo.svg.png",
    "Epson": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Epson_logo.svg/2560px-Epson_logo.svg.png",
    "Brother": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Brother_logo.svg/2560px-Brother_logo.svg.png",
    "Western Digital": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Western_Digital_logo.svg/1024px-Western_Digital_logo.svg.png",
    "Seagate": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Seagate_Technology_logo.svg/2560px-Seagate_Technology_logo.svg.png",
    "Intel": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/1280px-Intel_logo_%282006-2020%29.svg.png",
    "AMD": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/2560px-AMD_Logo.svg.png",
    "NVIDIA": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png",
  };

  // If the image fails to load, use the fallback URL or show a placeholder
  const handleImageError = () => {
    setImageError(true);
  };

  // Determine the image source
  const imageSrc = imageError && fallbackUrls[name] ? fallbackUrls[name] : logoUrl;
  
  // Enhanced SEO-friendly alt text
  const altText = `${name} - Authorized dealer at Sri Pavan Computers in Kakinada`;
  
  const content = (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all flex items-center justify-center h-32 group">
      {imageSrc ? (
        <img 
          src={imageSrc}
          alt={altText}
          className="max-h-16 max-w-[80%] object-contain group-hover:scale-110 transition-transform duration-300"
          onError={handleImageError}
          loading="lazy"
        />
      ) : (
        <div className="text-lg font-bold text-gray-700">{name}</div>
      )}
    </div>
  );

  return website ? (
    <a href={website} target="_blank" rel="noopener noreferrer" className="block" aria-label={`Visit ${name} official website`}>
      {content}
    </a>
  ) : (
    content
  );
};

export default BrandLogo;
