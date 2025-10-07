'use client';

import Script from 'next/script';

interface StructuredDataProps {
  type?: 'homepage' | 'comparison' | 'service';
}

export default function StructuredData({ type = 'homepage' }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ENEREA",
      "description": "Comparateur d'énergie professionnel spécialisé dans l'électricité et le gaz naturel pour les entreprises",
      "url": "https://enerea.fr",
      "logo": "https://enerea.fr/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+33-1-XX-XX-XX-XX",
        "contactType": "customer service",
        "availableLanguage": "French"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR",
        "addressLocality": "Paris"
      },
      "sameAs": [
        "https://www.linkedin.com/company/enerea",
        "https://twitter.com/enerea_energie"
      ]
    };

    if (type === 'comparison') {
      return {
        ...baseData,
        "@type": ["Organization", "Service"],
        "serviceType": "Comparateur d'énergie",
        "provider": {
          "@type": "Organization",
          "name": "ENEREA"
        },
        "areaServed": "FR",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR",
          "description": "Service de comparaison gratuit d'offres d'électricité et de gaz naturel"
        }
      };
    }

    if (type === 'service') {
      return {
        ...baseData,
        "@type": ["Organization", "ProfessionalService"],
        "serviceType": "Courtage en énergie",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Services énergétiques",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Comparaison d'offres d'électricité",
                "description": "Comparaison gratuite des offres d'électricité professionnelle"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Comparaison d'offres de gaz naturel",
                "description": "Comparaison gratuite des offres de gaz naturel professionnel"
              }
            }
          ]
        }
      };
    }

    return baseData;
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
