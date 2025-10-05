'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ServiceCard {
  title: string;
  subtitle: string;
  content: string;
  image?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  cards: ServiceCard[];
}

export default function ServicesSection({
  title = "Nos Services",
  subtitle = "Découvrez notre gamme complète de prestations",
  cards
}: ServicesSectionProps) {
  const getBackgroundStyle = (card: ServiceCard) => {
    if (card.image) {
      return {};
    }
    return {
      background: `linear-gradient(135deg, ${card.gradientFrom || '#667eea'} 0%, ${card.gradientTo || '#764ba2'} 100%)`
    };
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
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

        {/* Cards Grid */}
        <div className={`grid gap-8 ${
          cards.length === 2 ? 'md:grid-cols-2' :
          cards.length === 3 ? 'md:grid-cols-2 lg:grid-cols-3' :
          'md:grid-cols-2 lg:grid-cols-4'
        }`}>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Left side - Image or Gradient */}
                <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={getBackgroundStyle(card)}
                    />
                  )}
                </div>

                {/* Right side - Content */}
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <h4 className="text-lg font-medium text-orange-500 mb-3">
                    {card.subtitle}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {card.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
