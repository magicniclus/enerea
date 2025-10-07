'use client';

import React from 'react';
import { CheckCircle, Clock, Search, ThumbsUp, Zap } from 'lucide-react';

interface ComparisonSidebarProps {
  currentStep: number;
}

const advantages = [
  {
    icon: Zap,
    title: "Rapide et sans démarche",
    description: "Obtenez votre comparaison en quelques minutes"
  },
  {
    icon: Search,
    title: "Suivi personnalisé",
    description: "Un accompagnement adapté à vos besoins"
  },
  {
    icon: ThumbsUp,
    title: "Tarifs négociés et sans frais caché",
    description: "Les meilleurs prix du marché garantis"
  },
  {
    icon: Clock,
    title: "Aucune coupure d'énergie",
    description: "Transition sans interruption de service"
  }
];

const steps = [
  "Informations entreprise",
  "Type d'activité",
  "Consommation actuelle",
  "Préférences tarifaires",
  "Coordonnées",
  "Récapitulatif"
];

export default function ComparisonSidebar({ currentStep }: ComparisonSidebarProps) {
  return (
    <div className="w-[480px] bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 p-8 flex flex-col justify-center min-h-full relative">
      {/* Avantages - Seulement à la première étape */}
      {currentStep === 1 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Pourquoi choisir notre comparateur ?
          </h3>
          <div className="space-y-5">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white/70 rounded-xl shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-base">
                      {advantage.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Étapes - À partir de la deuxième étape */}
      {currentStep > 1 && (
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Étapes du comparateur
          </h3>
          <div className="space-y-4">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`
                    flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                    ${isCompleted 
                      ? 'bg-green-500 text-white shadow-md' 
                      : isCurrent 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span className={`
                    text-base font-medium
                    ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}
                  `}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Décoration géométrique en haut */}
      <div className="absolute top-4 left-0 w-full h-32 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-4 w-12 h-12 bg-blue-300 rounded-full opacity-40"></div>
        <div className="absolute top-8 left-8 w-8 h-8 bg-indigo-200 rounded-full opacity-50"></div>
        <div className="absolute top-16 right-16 w-6 h-6 bg-blue-200 rounded-full opacity-60"></div>
      </div>

      {/* Décoration géométrique en bas */}
      <div className="absolute bottom-4 left-0 w-full h-32 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-4 w-16 h-16 bg-blue-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-8 right-8 w-12 h-12 bg-indigo-200 rounded-full opacity-40"></div>
        <div className="absolute bottom-16 right-16 w-8 h-8 bg-blue-300 rounded-full opacity-60"></div>
      </div>
    </div>
  );
}
