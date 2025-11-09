'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FeatureSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              L'offre Enerea Energy pour les professionnels
            </motion.h2>
            
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div>
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                  Optimisez vos coûts énergétiques sans effort
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  en bénéficiant d'offres négociées et non accessibles au grand public. Notre expertise des 
                  mécanismes de fonctionnement des fournisseurs nous permet de négocier des contrats sur la 
                  base de critères précis et d'obtenir les conditions les plus avantageuses.
                </p>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                Nous sélectionnons les fournisseurs les plus adaptés à votre secteur et profil de 
                consommation, tout en évitant les pièges contractuels.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Image with Animations */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Background decorative elements */}
            <motion.div
              className="absolute -top-8 -left-8 w-32 h-32 bg-blue-100 rounded-full opacity-60"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-100 rounded-full opacity-60"
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Main mockup container */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-2xl">
              {/* Simulated dashboard/interface */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">E</span>
                    </div>
                    <span className="font-semibold text-gray-800">Enerea Dashboard</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Animated counter */}
                <div className="text-center mb-6">
                  <motion.div
                    className="text-4xl font-bold text-blue-600 mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    12 847
                  </motion.div>
                  <p className="text-gray-600 text-sm">€ d'économies générées</p>
                </div>

                {/* Progress bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Électricité</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Gaz naturel</span>
                      <span>72%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-indigo-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "72%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Simulated team image placeholder */}
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-indigo-400 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-cyan-400 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="text-sm text-gray-600">Équipe dédiée</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-4 bg-blue-600 text-white rounded-lg p-2 shadow-lg"
              animate={{
                x: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-sm font-semibold">-30% facture</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Second Feature - Reversed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-28 h-28 bg-cyan-100 rounded-full opacity-60"
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Comparison interface mockup */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-800 mb-4">Comparateur en temps réel</h4>
                
                {/* Simulated comparison table */}
                <div className="space-y-3">
                  {[
                    { name: "EDF Pro", price: "0.1847", savings: "-15%" },
                    { name: "Engie Pro", price: "0.1692", savings: "-23%" },
                    { name: "TotalEnergies", price: "0.1634", savings: "-26%" }
                  ].map((provider, index) => (
                    <motion.div
                      key={provider.name}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                      <span className="font-medium text-gray-700">{provider.name}</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{provider.price} €/kWh</div>
                        <div className="text-sm text-green-600">{provider.savings}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Un comparateur connecté aux fournisseurs
            </motion.h2>
            
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-gray-600 text-lg leading-relaxed">
                Grâce à une connexion en temps réel aux systèmes de tarification des fournisseurs d'énergie et un 
                algorithme ultra-performant qui analyse et compare des centaines d'offres, vous accédez 
                instantanément aux options les plus avantageuses, parfaitement adaptées à vos besoins 
                énergétiques.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                Simplifiez vos décisions et maximisez vos économies en toute sérénité.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Link
                  href="/comparateur-optimise"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Tester le comparateur
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
