'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'CGV', href: '/cgv' },
    { name: 'Contact', href: '/contact' },
    { name: 'Espace pro', href: 'https://app.trouver-mon-chantier.fr' },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Logo and description */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center ">
                <motion.div 
                  className="h-12 w-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src="/logo.png"
                    alt="HDJ Rénovation - Placo, Peinture, Sol, Plomberie, Électricité"
                    width={120}
                    height={48}
                    className="h-12 w-auto object-contain filter invert"
                  />
                </motion.div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Artisan spécialisé en placo, peinture, sol, plomberie, électricité et menuiserie en Gironde. Auto-entrepreneur qualifié avec garantie décennale.
              </p>
              <a 
                href="mailto:hdj.renovation@gmail.com" 
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                hdj.renovation@gmail.com
              </a>
            </motion.div>

            {/* Legal links */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold">Liens utiles</h3>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-slate-300 hover:text-white text-sm transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact info */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold">Contact</h3>
              <div className="space-y-2">
                <a 
                  href="tel:0658173744"
                  className="text-slate-300 hover:text-white text-sm transition-colors duration-200 block flex items-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>06 58 17 37 44</span>
                </a>
                <p className="text-slate-400 text-xs">
                  Disponible du lundi au samedi de 8h à 18h
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.p 
              className="text-slate-400 text-sm text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              © {currentYear} HDJ Rénovation. Tous droits réservés.
            </motion.p>

            {/* Powered by */}
            <motion.p 
              className="text-slate-500 text-xs text-center md:text-right"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Site propulsé par{' '}
              <a 
                href="https://trouver-mon-chantier.fr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-500/80 transition-colors underline"
              >
                trouver-mon-chantier.fr
              </a>
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
