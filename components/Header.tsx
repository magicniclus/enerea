'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/services" 
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Services
            </Link>
            <Link 
              href="/tarifs" 
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Tarifs
            </Link>
            <Link 
              href="/a-propos" 
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              À propos
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <Link 
            href="/comparaison"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Lancer une comparaison
          </Link>
        </div>
      </div>
    </header>
  );
}
