'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-6">
          {/* Première ligne : Logo et liens légaux */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            {/* Logo à gauche */}
            <div className="mb-4 md:mb-0">
              <Logo size="md" />
            </div>

            {/* Liens légaux */}
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/mentions-legales" className="text-gray-600 hover:text-gray-900 transition-colors">
                Mentions légales
              </Link>
              <Link href="/cgv" className="text-gray-600 hover:text-gray-900 transition-colors">
                CGV
              </Link>
              <Link href="/cgu" className="text-gray-600 hover:text-gray-900 transition-colors">
                CGU
              </Link>
              <Link href="/politique-confidentialite" className="text-gray-600 hover:text-gray-900 transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>

          {/* Deuxième ligne : Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-sm">
              © 2024 Enerea - Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
