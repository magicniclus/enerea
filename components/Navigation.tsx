'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const phoneNumber = "06 05 59 88 97";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navigationLinks = [
    { name: 'Notre expertise', href: '#expertise' },
    { name: 'Services', href: '#services' },
    { name: 'Nos réalisations', href: '#realisations' },
  ];

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle scroll to show/hide floating call button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show floating button only when scrolled down significantly (past nav + some buffer)
      setShowFloatingButton(scrollY > 100);
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b z-50" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
          {/* Logo à gauche */}
          <motion.div 
            className="flex-shrink-0"
            initial={isMounted ? { opacity: 0, x: -30 } : false}
            animate={isMounted ? { opacity: 1, x: 0 } : false}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={isMounted ? { scale: 1.02 } : {}}
          >
            <a href="/" className="flex items-center justify-center">
              <motion.div 
                className="h-16 w-auto bg-slate-900 rounded-xl p-2"
                whileHover={isMounted ? { scale: 1.05 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/logo.png"
                  alt="Olege Bâtiment - Électricité, Peinture, Plâtrerie"
                  width={120}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
              </motion.div>
            </a>
          </motion.div>

          {/* Navigation au centre - Desktop */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={link.name}>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <NavigationMenuLink
                        href={link.href}
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      >
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {link.name}
                        </motion.span>
                      </NavigationMenuLink>
                    </motion.div>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Boutons à droite - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Bouton téléphone */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Button 
                variant="outline"
                size="lg"
                className="flex items-center space-x-2 hover:bg-gray-50 transition-all duration-300"
                asChild
              >
                <motion.a
                  href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Phone className="h-4 w-4" />
                  <span>{phoneNumber}</span>
                </motion.a>
              </Button>
            </motion.div>

            {/* Bouton CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Button 
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Demander un devis
                </motion.a>
              </Button>
            </motion.div>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-gray-900 font-medium"
              asChild
            >
              <a href="https://app.trouver-mon-chantier.fr" target="_blank" rel="noopener noreferrer">
                <User className="h-4 w-4 mr-2" />
                Mon espace
              </a>
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Ouvrir le menu</span>
            </Button>
          </div>
        </div>
      </div>
      </nav>

    {/* Mobile Menu Overlay - Full Screen */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background md:hidden"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          <div className="flex flex-col h-full">
            {/* Header with close button */}
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex items-center">
                <motion.div 
                  className="h-10 w-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src="/logo.png"
                    alt="Olege Bâtiment - Électricité, Peinture, Plâtrerie"
                    width={100}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </motion.div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Navigation Links */}
            <div className="px-6 pt-8">
              <div className="space-y-6">
                {navigationLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="block text-2xl font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.1 + index * 0.1,
                      type: "spring",
                      damping: 25,
                      stiffness: 300
                    }}
                    whileHover={{ x: 10 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Buttons */}
            <div className="p-6 space-y-4">
              {/* Phone Button */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  variant="outline"
                  className="w-full h-14 text-lg flex items-center justify-center space-x-2" 
                  size="lg"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <a href={`tel:${phoneNumber.replace(/\s/g, '')}`}>
                    <Phone className="h-5 w-5" />
                    <span>{phoneNumber}</span>
                  </a>
                </Button>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  className="w-full h-14 text-lg bg-orange-500 hover:bg-orange-600 text-white" 
                  size="lg"
                  onClick={() => setIsOpen(false)}
                >
                  Demander un devis
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Floating Call Button - Mobile (Simple) */}
    <AnimatePresence>
      {showFloatingButton && (
        <motion.div
          className="fixed bottom-4 right-4 md:hidden z-[60]"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            duration: 0.3 
          }}
        >
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white shadow-xl hover:shadow-2xl rounded-full w-14 h-14 p-0 transition-all duration-300"
            asChild
          >
            <motion.a
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex items-center justify-center"
            >
              <Phone className="h-6 w-6" />
            </motion.a>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Floating Call Button - Desktop (Expanded) */}
    <AnimatePresence>
      {showFloatingButton && (
        <div className="hidden md:block fixed top-0 left-0 right-0 z-[60] pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:p-6 lg:p-8 py-4 flex justify-end">
            <motion.div
              className="pointer-events-auto"
              initial={{ opacity: 0, x: 100, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 100, y: -20 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
                duration: 0.4 
              }}
            >
              <motion.a
                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="bg-white hover:bg-gray-50 shadow-xl hover:shadow-2xl rounded-2xl px-6 py-4 transition-all duration-300 flex items-center space-x-4 border border-gray-200"
              >
                <div className="bg-orange-500 rounded-full p-3 shadow-lg">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600 font-bold text-base">Appelez-nous !</span>
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">Gratuit</span>
                  </div>
                  <span className="text-sm text-gray-600 leading-tight">Du lundi au samedi - 8h à 18h</span>
                  <span className="font-bold text-xl text-gray-900 mt-1">{phoneNumber}</span>
                </div>
              </motion.a>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
