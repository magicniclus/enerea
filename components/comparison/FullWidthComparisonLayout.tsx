'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Clock, Users } from 'lucide-react';

interface FullWidthComparisonLayoutProps {
  children: React.ReactNode;
  currentStep?: number;
}

export default function FullWidthComparisonLayout({ children, currentStep = 1 }: FullWidthComparisonLayoutProps) {
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

      {/* Contenu principal pleine largeur */}
      <main className="w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer mobile */}
      <div className="lg:hidden bg-white border-t border-gray-200 p-4">
        <div className="flex justify-center space-x-6 text-xs text-gray-600">
          <a href="/mentions-legales" className="hover:text-blue-600">Mentions légales</a>
          <a href="/politique-confidentialite" className="hover:text-blue-600">Confidentialité</a>
        </div>
      </div>
    </div>
  );
}
