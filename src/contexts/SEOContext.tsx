import React, { createContext, useContext, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

// Define SEO data structure
interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

// Define context type
interface SEOContextType {
  updateSEO: (data: SEOData) => void;
}

// Create context
const SEOContext = createContext<SEOContextType | undefined>(undefined);

// Custom hook to use SEO context
export const useSEO = () => {
  const context = useContext(SEOContext);
  if (context === undefined) {
    throw new Error('useSEO must be used within a SEOProvider');
  }
  return context;
};

// SEO Provider component
export const SEOProvider = ({ children }: { children: React.ReactNode }) => {
  const [seoData, setSeoData] = useState<SEOData>({
    title: 'Expert Computer Repair & Laptop Sales in Kakinada | Sri Pavan Computers',
    description: 'Kakinada\'s trusted computer expert since 2005. Expert laptop repair, custom PC builds, data recovery & sales. Serving Kakinada & Vijayawada. Visit us or call today!',
    keywords: 'computer repair kakinada, laptop service center near me, sri pavan computers, custom pc build vijayawada, gaming pc store vijayawada, data recovery services kakinada, best computer shop kakinada, dell laptop repair vijayawada, business laptops kakinada, computer networking solutions',
    canonicalUrl: 'https://sripavancomputers.com',
    ogImage: 'https://sripavancomputers.com/images/og-image.jpg'
  });

  // Memoize the updateSEO function to prevent it from changing on each render
  const updateSEO = useCallback((data: SEOData) => {
    setSeoData(data);
  }, []);

  return (
    <SEOContext.Provider value={{ updateSEO }}>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        {seoData.keywords && <meta name="keywords" content={seoData.keywords} />}
        {seoData.canonicalUrl && <link rel="canonical" href={seoData.canonicalUrl} />}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        {seoData.ogImage && <meta property="og:image" content={seoData.ogImage} />}
        <meta property="og:type" content="website" />
        {seoData.canonicalUrl && <meta property="og:url" content={seoData.canonicalUrl} />}
      </Helmet>
      {children}
    </SEOContext.Provider>
  );
};
