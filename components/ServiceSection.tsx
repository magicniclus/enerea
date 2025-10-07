'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ServiceSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre principal */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Un service client expert, réactif et 100% dédié à votre satisfaction
          </h2>
        </motion.div>

        {/* Section avec image et contenu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image à gauche */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image 
                src="/services.jpg" 
                alt="Service" 
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Contenu à droite */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Un suivi contractuel optimisé et sûr
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">
                  Un service client réactif situé en France
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">
                  Une équipe formée aux évolutions du marché de l'énergie
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">
                  Un courtier et un analyste dédié à chaque client
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">
                  Un service client disponible par téléphone, e-mail et chat
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
