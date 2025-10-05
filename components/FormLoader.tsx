'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Send } from 'lucide-react';

interface FormLoaderProps {
  isVisible: boolean;
  stage: 'sending' | 'success' | 'redirecting';
}

export default function FormLoader({ isVisible, stage }: FormLoaderProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Icon Animation */}
            <div className="mb-6">
              {stage === 'sending' && (
                <motion.div
                  className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Send className="h-8 w-8 text-orange-500" />
                </motion.div>
              )}
              
              {(stage === 'success' || stage === 'redirecting') && (
                <motion.div
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                >
                  <Check className="h-8 w-8 text-green-500" />
                </motion.div>
              )}
            </div>

            {/* Title */}
            <motion.h2
              className="text-2xl font-bold text-gray-900 mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {stage === 'sending' && 'Envoi en cours...'}
              {stage === 'success' && 'Envoyé avec succès !'}
              {stage === 'redirecting' && 'Redirection...'}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {stage === 'sending' && 'Nous traitons votre demande'}
              {stage === 'success' && 'Votre demande a été transmise'}
              {stage === 'redirecting' && 'Vous allez être redirigé'}
            </motion.p>

            {/* Progress Animation */}
            {stage === 'sending' && (
              <motion.div
                className="w-full bg-gray-200 rounded-full h-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </motion.div>
            )}

            {/* Success Animation */}
            {(stage === 'success' || stage === 'redirecting') && (
              <motion.div
                className="flex items-center justify-center space-x-2 text-green-600"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", damping: 15 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
