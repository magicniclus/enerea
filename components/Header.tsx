'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Logo from './Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', updateScrolled);
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

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

            {/* CTA Button */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link 
                href="/comparaison"
                className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                  isScrolled ? 'px-4 py-2 text-sm' : 'px-6 py-2 text-base'
                }`}
              >
                {isScrolled ? 'Comparer' : 'Lancer une comparaison'}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
