import React, { createContext, useContext, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

// SEO metadata interface
interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  noIndex?: boolean;
}

// Default SEO values
const defaultSEO: SEOProps = {
  title: 'Sri Pavan Computers | Computer Sales & Service in Kakinada',
  description: 'Trusted computer sales, laptop repairs, IT support, and maintenance services in Kakinada since 2000. Authorized dealer for HP, Dell, Lenovo, and other premium brands.',
  keywords: 'computer sales, laptop repair, IT services, computer accessories, tech support, hardware maintenance, Kakinada',
  canonicalUrl: 'https://sripavancomputers.in',
  ogImage: 'https://sripavancomputers.in/og-image.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  noIndex: false,
};

// Context setup
const SEOContext = createContext<{
  updateSEO: (seo: SEOProps) => void;
  seo: SEOProps;
}>({
  updateSEO: () => {},
  seo: defaultSEO,
});

export const useSEO = () => useContext(SEOContext);

interface SEOProviderProps {
  children: ReactNode;
}

export const SEOProvider: React.FC<SEOProviderProps> = ({ children }) => {
  const [seo, setSEO] = React.useState<SEOProps>(defaultSEO);

  const updateSEO = (newSEO: SEOProps) => {
    setSEO({ ...seo, ...newSEO });
  };

  return (
    <SEOContext.Provider value={{ updateSEO, seo }}>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
        
        {/* OpenGraph Tags */}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content={seo.ogType} />
        {seo.canonicalUrl && <meta property="og:url" content={seo.canonicalUrl} />}
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
        <meta property="og:site_name" content="Sri Pavan Computers" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter Tags */}
        <meta name="twitter:card" content={seo.twitterCard} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}
        
        {/* Robot Meta Tags */}
        {seo.noIndex && <meta name="robots" content="noindex, nofollow" />}
      </Helmet>
      {children}
    </SEOContext.Provider>
  );
};
