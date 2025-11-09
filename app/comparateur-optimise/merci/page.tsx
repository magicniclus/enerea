'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, Mail, Clock, ArrowRight, Home, Zap, TrendingUp } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import Link from 'next/link';

export default function MerciOptimisePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Icône de succès animée */}
        <motion.div
          className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          🎉 Félicitations !
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-700 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Votre simulation d'économies d'énergie est terminée
        </motion.p>

        <motion.p
          className="text-lg text-green-600 font-semibold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Nos experts préparent vos meilleures offres personnalisées
        </motion.p>

        {/* Informations sur la suite */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Que se passe-t-il maintenant ?
          </h2>

          <div className="space-y-6">
            <motion.div 
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-1">Analyse immédiate</h3>
                <p className="text-gray-600">
                  Nos algorithmes analysent votre profil énergétique parmi +25 fournisseurs
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-1">Appel de votre expert sous 24h</h3>
                <p className="text-gray-600">
                  Un conseiller Enerea vous présente vos 3 meilleures offres négociées
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-1">Économies garanties</h3>
                <p className="text-gray-600">
                  Découvrez combien vous pouvez économiser sur vos factures professionnelles
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Statistiques rassurantes avec animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <motion.div 
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="text-3xl font-bold text-blue-600 mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, type: "spring" }}
            >
              30%
            </motion.div>
            <div className="text-sm text-blue-700">Économies moyennes réalisées</div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="text-3xl font-bold text-green-600 mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
            >
              2 300+
            </motion.div>
            <div className="text-sm text-green-700">Entreprises accompagnées</div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="text-3xl font-bold text-yellow-600 mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, type: "spring" }}
            >
              4.9/5
            </motion.div>
            <div className="text-sm text-yellow-700">Satisfaction client</div>
          </motion.div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <Link href="/">
            <AnimatedButton
              variant="outline"
              icon={Home}
              iconPosition="left"
              size="lg"
            >
              Retour à l'accueil
            </AnimatedButton>
          </Link>
          
          <Link href="/comparateur-optimise">
            <AnimatedButton
              variant="primary"
              icon={ArrowRight}
              size="lg"
            >
              Nouvelle simulation
            </AnimatedButton>
          </Link>
        </motion.div>

        {/* Message de confidentialité */}
        <motion.div
          className="mt-8 p-4 bg-gray-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-sm text-gray-600">
            🔒 Vos données sont sécurisées et ne seront jamais partagées sans votre consentement explicite.
          </p>
        </motion.div>

        {/* Effet de particules en arrière-plan */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 10,
                scale: 0
              }}
              animate={{ 
                y: -10,
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
