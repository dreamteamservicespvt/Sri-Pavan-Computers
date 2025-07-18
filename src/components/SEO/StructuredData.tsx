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
    image: 'https://sripavancomputers.com/images/logo.png',
    '@id': 'https://sripavancomputers.com/#organization',
    url: 'https://sripavancomputers.com',
    telephone: '+919848075759',
    email: 'pavancomputers_kkd@yahoo.co.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No. 21/9/9, Sri Krishna Kanth Plaza, R.R. Road, Near Masjid Center, Kakinada Bazar',
      addressLocality: 'Kakinada',
      postalCode: '533001',
      addressRegion: 'Andhra Pradesh',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '16.9891',
      longitude: '82.2475'
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
      }
    ],
    description: 'Sri Pavan Computers is a leading and trusted computer sales and service center in Kakinada, Andhra Pradesh, established in 2005. We specialize in comprehensive IT solutions for individuals, students, professionals, and businesses.',
    foundingDate: '2005',
    areaServed: {
      '@type': 'City',
      name: 'Kakinada'
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Computer Repair Service',
          description: 'Expert laptop and desktop repair services for all major brands'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Data Recovery Service',
          description: 'Professional data recovery from hard drives, SSDs, and storage devices'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom PC Building',
          description: 'High-performance custom PC builds for gaming and professional use'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Networking Solutions',
          description: 'Complete networking solutions for homes and businesses'
        }
      }
    ],
    priceRange: '₹₹',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'UPI'],
    currenciesAccepted: 'INR',
    sameAs: [
      'https://www.facebook.com/sripavancomputers',
      'https://www.instagram.com/sripavancomputers',
      'https://twitter.com/sripavancomp'
    ],
    ...data
  };

  // Base schema for Product
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name || 'Computer Product',
    image: data.image || 'https://sripavancomputers.com/images/default-product.jpg',
    description: data.description || 'High-quality computer product from Sri Pavan Computers',
    sku: data.sku,
    mpn: data.mpn,
    brand: {
      '@type': 'Brand',
      name: data.brandName || 'Generic Brand'
    },
    offers: {
      '@type': 'Offer',
      url: data.url || 'https://sripavancomputers.com/products',
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
      '@id': data.url || 'https://sripavancomputers.com/'
    },
    headline: data.headline || 'Computer Technology Article',
    image: data.image || 'https://sripavancomputers.com/images/default-article.jpg',
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
        url: 'https://sripavancomputers.com/images/logo.png'
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
