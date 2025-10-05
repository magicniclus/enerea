'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PartnersConfig, PartnerLogo } from '@/lib/config';

interface LogoCarouselProps {
  config?: PartnersConfig;
  title?: string;
  subtitle?: string;
  logos?: PartnerLogo[];
  speed?: number;
}

export default function LogoCarousel({
  config,
  title = "Nos Partenaires",
  subtitle = "Ils nous font confiance",
  logos = [],
  speed = 50
}: LogoCarouselProps) {
  // Use config values if provided, otherwise fall back to props or defaults
  const partnerLogos = config?.logos || logos;
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Infinite Scrolling Logos */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-12 items-center"
              animate={{
                x: [0, `-${100 / 2}%`]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: speed,
                  ease: "linear",
                },
              }}
            >
              {duplicatedLogos.map((logo, index) => (
                <motion.div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={128}
                    height={80}
                    className="object-contain max-w-full max-h-full"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
