'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface OptimizedProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function OptimizedProgressBar({ currentStep, totalSteps, className = '' }: OptimizedProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  const getMotivationalMessage = () => {
    switch (currentStep) {
      case 1:
        return "Étape 1 sur 3 – Vous y êtes presque ⚡";
      case 2:
        return "Étape 2 sur 3 – 70% complété 💪";
      case 3:
        return "Étape 3 sur 3 – C'est la dernière étape 🎉";
      default:
        return `Étape ${currentStep} sur ${totalSteps}`;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-gray-700">
          {getMotivationalMessage()}
        </span>
        <span className="text-sm font-bold text-blue-600">
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-blue-500 via-blue-600 to-green-500 h-3 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Effet de brillance */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 1,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      </div>
      
      {/* Message de progression */}
      <motion.div
        className="mt-2 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-xs text-gray-500">
          {currentStep === 1 && "Quelques questions rapides pour personnaliser vos offres"}
          {currentStep === 2 && "Super ! Nous préparons vos meilleures offres"}
          {currentStep === 3 && "Dernière étape avant de découvrir vos économies"}
        </span>
      </motion.div>
    </div>
  );
}
