'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Clock, Users, Star, TrendingUp } from 'lucide-react';

interface NewComparisonLayoutProps {
  children: React.ReactNode;
  currentStep?: number;
}

export default function NewComparisonLayout({ children, currentStep = 1 }: NewComparisonLayoutProps) {
  const steps = [
    { id: 1, title: 'Votre besoin énergétique', icon: Zap },
    { id: 2, title: 'Ma consommation', icon: Users },
    { id: 3, title: 'Mes coordonnées', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header pleine largeur */}
      <header className="w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">Enerea</span>
                <div className="text-xs text-gray-500">Comparateur d'énergie</div>
              </div>
            </div>
            
            {/* Indicateurs de confiance */}
            <div className="hidden lg:flex items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2 text-green-600">
                <Shield className="w-4 h-4" />
                <span className="font-medium">Gratuit</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Clock className="w-4 h-4" />
                <span className="font-medium">2 minutes</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-600">
                <Users className="w-4 h-4" />
                <span className="font-medium">+2 300 clients</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar avec étapes (desktop uniquement) - FIXE */}
        <div className="hidden lg:block w-80 bg-white border-r border-gray-200 fixed left-0 top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="p-8">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Votre progression</h3>
              <p className="text-sm text-gray-600">Comparez vos tarifs en 3 étapes simples</p>
            </div>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <motion.div
                    key={step.id}
                    className={`
                      flex items-center space-x-4 p-4 rounded-xl transition-all duration-200
                      ${isActive 
                        ? 'bg-blue-50 border-2 border-blue-200' 
                        : isCompleted 
                          ? 'bg-green-50 border-2 border-green-200'
                          : 'bg-gray-50 border-2 border-transparent'
                      }
                    `}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${isActive 
                        ? 'bg-blue-100 text-blue-600' 
                        : isCompleted 
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }
                    `}>
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className={`
                        font-medium
                        ${isActive 
                          ? 'text-blue-900' 
                          : isCompleted 
                            ? 'text-green-900'
                            : 'text-gray-500'
                        }
                      `}>
                        Étape {step.id}
                      </div>
                      <div className={`
                        text-sm
                        ${isActive 
                          ? 'text-blue-700' 
                          : isCompleted 
                            ? 'text-green-700'
                            : 'text-gray-400'
                        }
                      `}>
                        {step.title}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Témoignages / Social proof */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-700">4.9/5</span>
              </div>
              <blockquote className="text-sm text-gray-700 italic mb-3">
                "Grâce à Enerea, nous avons économisé 25% sur notre facture d'électricité. Service impeccable !"
              </blockquote>
              <div className="text-xs text-gray-600">
                — Marie L., Directrice Administrative
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">30%</div>
                <div className="text-xs text-gray-600">Économies moyennes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">24h</div>
                <div className="text-xs text-gray-600">Délai de réponse</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal - SCROLLABLE */}
        <div className="flex-1 flex flex-col lg:ml-80">
          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            {children}
          </main>

          {/* Footer mobile */}
          <div className="lg:hidden bg-white border-t border-gray-200 p-4">
            <div className="flex justify-center space-x-6 text-xs text-gray-600">
              <a href="/mentions-legales" className="hover:text-blue-600">Mentions légales</a>
              <a href="/politique-confidentialite" className="hover:text-blue-600">Confidentialité</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
