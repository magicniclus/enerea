'use client';

import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export default function SEOHead({
  title = "ENEREA - Comparateur d'Énergie Professionnel",
  description = "Comparez gratuitement les offres d'électricité et de gaz naturel pour votre entreprise",
  keywords = [],
  canonical,
  ogImage = "/og-image.jpg",
  noindex = false
}: SEOHeadProps) {
  const fullTitle = title.includes('ENEREA') ? title : `${title} | ENEREA`;
  
  return (
    <Head>
      {/* Balises meta de base */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={`https://enerea.fr${canonical}`} />}
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://enerea.fr${ogImage}`} />
      <meta property="og:url" content={`https://enerea.fr${canonical || ''}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ENEREA" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://enerea.fr${ogImage}`} />
      <meta name="twitter:creator" content="@enerea_energie" />
      
      {/* Autres balises importantes */}
      <meta name="author" content="ENEREA" />
      <meta name="language" content="French" />
      <meta name="geo.region" content="FR" />
      <meta name="geo.country" content="France" />
      
      {/* Favicon et icônes */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Preconnect pour les performances */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch pour les domaines externes */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    </Head>
  );
}
