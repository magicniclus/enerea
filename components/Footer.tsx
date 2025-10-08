'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo à gauche */}
          <div className="mb-4 md:mb-0">
            <Logo size="md" />
          </div>

          {/* Copyright à droite */}
          <div>
            <p className="text-gray-500 text-sm">
              © 2025 Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
