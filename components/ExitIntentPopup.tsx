'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { X, Calendar, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { submitFormToFirebase, FormData } from '@/lib/firebase-service';
import FormLoader from '@/components/FormLoader';

interface ExitIntentPopupProps {
  onClose: () => void;
}

export default function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loaderStage, setLoaderStage] = useState<'sending' | 'success' | 'redirecting'>('sending');
  const [showLoader, setShowLoader] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setShowLoader(true);
    setLoaderStage('sending');
    
    try {
      // Convert popup form data to Firebase format
      const firebaseFormData: FormData = {
        nom: formData.name.split(' ')[1] || formData.name,
        prenom: formData.name.split(' ')[0] || '',
        email: formData.email,
        telephone: formData.phone || 'Non renseigné',
        motif: formData.message || 'Demande de contact via popup',
        rgpd: true, // Implicit consent for popup
        source: 'popup'
      };

      const docId = await submitFormToFirebase(firebaseFormData);
      console.log('Popup form submitted successfully:', docId);
      
      // Show success stage
      setLoaderStage('success');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show redirecting stage
      setLoaderStage('redirecting');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Close popup and redirect
      onClose();
      router.push('/merci');
    } catch (error) {
      console.error('Error submitting popup form:', error);
      setShowLoader(false);
      // Could add error handling here if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close on escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Prevent body scroll when popup is open
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Ne partez pas !</h2>
              <p className="text-orange-100">Obtenez votre devis gratuit maintenant</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Prenez rendez-vous en 2 minutes
            </h3>
            <p className="text-gray-600 text-sm">
              Notre équipe de 3 collaborateurs spécialisés en électricité, peinture et plâtrerie vous rappelle sous 24h.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="popup-name" className="block text-sm font-semibold text-gray-700 mb-2">
                Nom complet *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="popup-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div>
              <label htmlFor="popup-email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  id="popup-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="popup-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  id="popup-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="06 05 59 88 97"
                />
              </div>
            </div>

            <div>
              <label htmlFor="popup-message" className="block text-sm font-semibold text-gray-700 mb-2">
                Décrivez votre projet
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <textarea
                  id="popup-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none text-sm"
                  placeholder="Électricité, peinture, plâtrerie, surface, délais..."
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Prendre rendez-vous</span>
              </div>
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              ✓ Devis gratuit ✓ Sans engagement ✓ Réponse sous 24h
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Form Loader */}
      <FormLoader isVisible={showLoader} stage={loaderStage} />
    </motion.div>
  );
}
