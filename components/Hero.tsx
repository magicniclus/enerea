'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-44 overflow-hidden">
      {/* Background decoration with parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: textY }}
        >
          {/* Main Headline */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            variants={itemVariants}
          >
            Réduisez vos factures d'énergie en 
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            > comparant les offres</motion.span> de 
            <span className="text-blue-700"> + 25 fournisseurs</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Avec notre comparateur intelligent, trouvez l'offre d'énergie la plus adaptée à votre profil en 
            <span className="font-semibold text-blue-700"> simulant le prix de votre contrat</span> auprès de 
            <span className="font-semibold text-blue-700"> + 25 fournisseurs</span>. Enerea Energy, 
            <span className="font-semibold text-blue-700"> le service de courtage en énergie</span> le plus recommandé par les professionnels !
          </motion.p>

          {/* CTA Button */}
          <motion.div 
            className="mb-6"
            variants={itemVariants}
          >
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link 
                href="/comparateur-optimise"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <motion.svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </motion.svg>
                Lancer une comparaison
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.p 
            className="text-gray-500 text-sm mb-8"
            variants={itemVariants}
          >
            Sans frais et sans engagement
          </motion.p>

          {/* Mockup/Illustration placeholder */}
          <motion.div 
            className="relative max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <motion.div 
              className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Feature 1 */}
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 mb-1">Comparaison intelligente</h3>
                    <p className="text-sm text-gray-600">Analyse de + 25 fournisseurs</p>
                  </motion.div>

                  {/* Feature 2 */}
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 mb-1">Économies garanties</h3>
                    <p className="text-sm text-gray-600">Jusqu'à 30% de réduction</p>
                  </motion.div>

                  {/* Feature 3 */}
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 mb-1">Service gratuit</h3>
                    <p className="text-sm text-gray-600">Sans frais cachés</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
