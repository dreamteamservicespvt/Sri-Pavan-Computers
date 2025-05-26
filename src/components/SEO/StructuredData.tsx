import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'LocalBusiness' | 'Product' | 'Article' | 'FAQPage' | 'BreadcrumbList';
  data: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  // Base schema for Local Business
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ComputerStore',
    name: 'Sri Pavan Computers',
    image: 'https://sripavancomputers.in/logo.png',
    '@id': 'https://sripavancomputers.in/#organization',
    url: 'https://sripavancomputers.in',
    telephone: '+919848075759',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No. 21/9/9, Sri Krishna Kanth Plaza, R.R. Road, Near Masjid Center',
      addressLocality: 'Kakinada',
      postalCode: '533001',
      addressRegion: 'Andhra Pradesh',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '16.9452857',  // Update with exact coordinates
      longitude: '82.2156568'  // Update with exact coordinates
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        opens: '09:30',
        closes: '20:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '18:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/sripavancomputers',
      'https://www.instagram.com/sripavancomputers',
      'https://twitter.com/sripavancomp'
    ],
    priceRange: '₹₹',
    servesCuisine: 'Computer Sales and Services',
    ...data
  };

  // Base schema for Product
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name || 'Computer Product',
    image: data.image || 'https://sripavancomputers.in/default-product.jpg',
    description: data.description || 'High-quality computer product from Sri Pavan Computers',
    sku: data.sku,
    mpn: data.mpn,
    brand: {
      '@type': 'Brand',
      name: data.brandName || 'Generic Brand'
    },
    offers: {
      '@type': 'Offer',
      url: data.url || 'https://sripavancomputers.in/products',
      price: data.price || '0',
      priceCurrency: 'INR',
      availability: data.availability || 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Sri Pavan Computers'
      }
    },
    ...data
  };

  // Base schema for Article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url || 'https://sripavancomputers.in/'
    },
    headline: data.headline || 'Computer Technology Article',
    image: data.image || 'https://sripavancomputers.in/default-article.jpg',
    datePublished: data.datePublished || new Date().toISOString(),
    dateModified: data.dateModified || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: data.author || 'Sri Pavan Computers'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sri Pavan Computers',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sripavancomputers.in/logo.png'
      }
    },
    ...data
  };

  // Base schema for FAQ Page
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.questions || [],
    ...data
  };

  // Base schema for Breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: data.itemListElements || [],
    ...data
  };

  // Select schema based on type
  let schemaData;
  switch (type) {
    case 'LocalBusiness':
      schemaData = localBusinessSchema;
      break;
    case 'Product':
      schemaData = productSchema;
      break;
    case 'Article':
      schemaData = articleSchema;
      break;
    case 'FAQPage':
      schemaData = faqSchema;
      break;
    case 'BreadcrumbList':
      schemaData = breadcrumbSchema;
      break;
    default:
      schemaData = { '@context': 'https://schema.org', ...data };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
