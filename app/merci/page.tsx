'use client';

import { motion } from 'framer-motion';
import { Check, Home, Phone, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function MerciPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header avec animation */}
        <motion.div
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <Check className="h-10 w-10 text-white" />
          </motion.div>
          
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Merci pour votre demande !
          </motion.h1>
          
          <motion.p
            className="text-xl text-orange-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Votre projet nous intéresse
          </motion.p>
        </motion.div>

        {/* Contenu principal */}
        <motion.div
          className="p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Que se passe-t-il maintenant ?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Nous avons bien reçu votre demande et nous vous remercions de votre confiance. 
              Notre équipe d'artisans spécialisés en électricité, peinture et plâtrerie va étudier votre projet et vous recontacter rapidement.
            </p>
          </div>

          {/* Étapes suivantes */}
          <div className="space-y-6 mb-8">
            <motion.div
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-orange-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Analyse de votre demande</h3>
                <p className="text-gray-600 text-sm">
                  Nous étudions votre projet d'électricité, peinture ou plâtrerie et déterminons la meilleure approche pour vos travaux.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-orange-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Prise de contact sous 24h</h3>
                <p className="text-gray-600 text-sm">
                  Notre équipe vous contacte pour affiner votre projet et planifier l'intervention de nos 3 collaborateurs qualifiés.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-orange-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Devis personnalisé</h3>
                <p className="text-gray-600 text-sm">
                  Recevez un devis détaillé avec garantie décennale pour vos travaux en Île-de-France.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Informations de contact */}
          <motion.div
            className="bg-gray-50 rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <h3 className="font-semibold text-gray-900 mb-4 text-center">
              Une question ? Contactez-nous
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">06 05 59 88 97</p>
                  <p className="text-sm text-gray-600">Lun-Ven 9h-18h</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">contact@olege-batiment.fr</p>
                  <p className="text-sm text-gray-600">Réponse sous 2h</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Boutons d'action */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
          >
            <Link href="/" className="flex-1">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Home className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
