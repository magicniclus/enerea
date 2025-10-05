'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface AboutSectionProps {
  smallTitle?: string;
  title: string;
  subtitle: string;
  content: string;
  image?: string;
  video?: string;
  gradientFrom?: string;
  gradientTo?: string;
  buttonText?: string;
  buttonHref?: string;
  reversed?: boolean;
}

export default function AboutSection({
  smallTitle = "À propos",
  title,
  subtitle,
  content,
  image,
  video,
  gradientFrom = "#667eea",
  gradientTo = "#764ba2",
  buttonText,
  buttonHref,
  reversed = false
}: AboutSectionProps) {
  const getBackgroundStyle = () => {
    if (image || video) {
      return {};
    }
    return {
      background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`
    };
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reversed ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Image side */}
          <motion.div
            className={`relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl ${reversed ? 'lg:col-start-2' : ''}`}
            initial={{ opacity: 0, x: reversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {video ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={video} type="video/mp4" />
              </video>
            ) : image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            ) : (
              <div
                className="w-full h-full"
                style={getBackgroundStyle()}
              />
            )}
          </motion.div>

          {/* Content side */}
          <motion.div
            className={`space-y-6 ${reversed ? 'lg:col-start-1' : ''}`}
            initial={{ opacity: 0, x: reversed ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Small title with orange line */}
            <div className="flex items-center space-x-4">
              <motion.span
                className="text-orange-500 font-semibold text-sm uppercase tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {smallTitle}
              </motion.span>
              <motion.div
                className="w-[150px] h-1 bg-orange-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 150 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>

            {/* Main title */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {title}
            </motion.h2>

            {/* Subtitle */}
            <motion.h3
              className="text-xl md:text-2xl font-medium text-orange-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {subtitle}
            </motion.h3>

            {/* Content paragraph */}
            <motion.p
              className="text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {content}
            </motion.p>

            {/* Button */}
            {buttonText && buttonHref && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    const contactForm = document.getElementById('contact-form');
                    if (contactForm) {
                      contactForm.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {buttonText}
                  </motion.span>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}