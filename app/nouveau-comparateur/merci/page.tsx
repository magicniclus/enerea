'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, Mail, Clock, ArrowRight, Home } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import Link from 'next/link';

export default function MerciPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Icône de succès */}
        <motion.div
          className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
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
          🎉 Bravo !
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Votre demande de comparaison a été envoyée avec succès
        </motion.p>

        {/* Informations sur la suite */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Que se passe-t-il maintenant ?
          </h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-1">Dans les prochaines 24h</h3>
                <p className="text-gray-600">
                  Un expert Enerea analysera votre demande et préparera vos offres personnalisées
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-1">Appel de votre conseiller</h3>
                <p className="text-gray-600">
                  Votre conseiller dédié vous appellera pour vous présenter les meilleures offres du marché
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-1">Récapitulatif par email</h3>
                <p className="text-gray-600">
                  Vous recevrez également un récapitulatif détaillé de vos offres par email
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistiques rassurantes */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">30%</div>
            <div className="text-sm text-blue-700">Économies moyennes réalisées</div>
          </div>
          
          <div className="bg-green-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">2 300+</div>
            <div className="text-sm text-green-700">Entreprises accompagnées</div>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-600 mb-2">4.9/5</div>
            <div className="text-sm text-yellow-700">Satisfaction client</div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
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
          
          <Link href="/nouveau-comparateur">
            <AnimatedButton
              variant="primary"
              icon={ArrowRight}
              size="lg"
            >
              Nouvelle comparaison
            </AnimatedButton>
          </Link>
        </motion.div>

        {/* Message de confidentialité */}
        <motion.div
          className="mt-8 p-4 bg-gray-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-gray-600">
            🔒 Vos données sont sécurisées et ne seront jamais partagées sans votre consentement explicite.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
