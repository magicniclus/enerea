'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Marquer le composant comme monté pour forcer un re-render
    setMounted(true);
    
    const updateScrolled = () => setIsScrolled(window.scrollY > 50);
    
    updateScrolled();
    window.addEventListener('scroll', updateScrolled);
    
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  // Pendant le premier rendu, utiliser des classes CSS pures pour éviter les problèmes
  if (!mounted) {
    return (
      <header className="fixed left-0 right-0 z-50 top-0">
        <div className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center">
                <Logo size="md" />
              </Link>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Link 
                  href="/connexion"
                  className="hidden sm:inline-flex border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200 px-4 py-2 text-base"
                >
                  Mon espace
                </Link>
                <Link 
                  href="/comparateur-optimise"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md px-2 py-1.5 text-xs sm:px-6 sm:py-2 sm:text-base"
                >
                  <span className="hidden sm:inline">Lancer une comparaison</span>
                  <span className="sm:hidden">Comparer</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <motion.header 
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'top-4 mx-4' 
          : 'top-0 mx-0'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        duration: 0.8 
      }}
    >
      <div className={`transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-2xl border border-gray-200/50 rounded-2xl' 
          : 'bg-white shadow-sm border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-500 ${
            isScrolled ? 'h-14' : 'h-16'
          }`}>
            {/* Logo */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Link href="/" className="flex items-center">
                <Logo size={isScrolled ? "sm" : "md"} />
              </Link>
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              {/* Mon espace Button - Hidden on mobile */}
              <Link 
                href="/connexion"
                className={`hidden sm:inline-flex border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 ${
                  isScrolled 
                    ? 'px-3 py-2 text-sm' 
                    : 'px-4 py-2 text-base'
                }`}
              >
                Mon espace
              </Link>

              {/* CTA Button */}
              <Link 
                href="/comparateur-optimise"
                className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                  isScrolled 
                    ? 'px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm' 
                    : 'px-3 py-1.5 text-sm sm:px-6 sm:py-2 sm:text-base'
                }`}
              >
                <span className="hidden sm:inline">{isScrolled ? 'Comparer' : 'Lancer une comparaison'}</span>
                <span className="sm:hidden">Comparer</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
