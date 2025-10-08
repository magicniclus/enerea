'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PartnersSection() {
  const partners = [
    {
      name: "Endesa",
      logo: "/partner/logo-endesa.svg"
    },
    {
      name: "ENI",
      logo: "/partner/logo-eni.svg"
    },
    {
      name: "Gaz de Bordeaux",
      logo: "/partner/logo-gaz-de-bordeaux.svg"
    },
    {
      name: "Total Energies",
      logo: "/partner/logo-total-energies.svg"
    },
    {
      name: "Vattenfall",
      logo: "/partner/logo-vattenfall.svg"
    }
  ];

  // Dupliquer les logos pour un scroll infini
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="w-full">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nous comparons plus de +25 fournisseurs 
          </h2>
        </div>

        {/* Conteneur de scroll infini */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex space-x-8 sm:space-x-16 lg:space-x-24 items-center"
            animate={{
              x: [0, `-${100 / 3}%`]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear"
              }
            }}
            style={{ width: `${300}%` }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 min-w-[120px] sm:min-w-[160px] lg:min-w-[200px]"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 sm:h-14 lg:h-16 w-auto object-contain max-w-[100px] sm:max-w-[140px] lg:max-w-[180px]"
                />
              </div>
            ))}
          </motion.div>

          {/* Dégradés sur les côtés */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
}
