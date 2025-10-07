'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PremiumSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section avec image et contenu - Layout inversé */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenu à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Des services premium inclus et sans frais
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">
                  Suivi des prix de l'énergie en temps réel
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">
                  Alertes prix personnalisées
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">
                  Optimisation des souscriptions et des puissances
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">
                  Supervision des coûts
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">
                  Vérification des factures
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">
                  Reporting dynamique vos dépenses énergétiques
                </p>
              </div>
            </div>
          </motion.div>

          {/* Image à droite */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image 
                src="/logiciel.jpg" 
                alt="Service" 
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
