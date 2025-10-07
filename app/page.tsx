'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import StatsSection from '@/components/StatsSection';
import FeatureSection from '@/components/FeatureSection';
import PartnersSection from '@/components/PartnersSection';
import ServiceSection from '@/components/ServiceSection';
import PremiumSection from '@/components/PremiumSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <StructuredData type="homepage" />
      <Header />
      <main>
        <Hero />
        <CTASection />
        <StatsSection />
        <FeatureSection />
        <PartnersSection />
        <ServiceSection />
        <PremiumSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
