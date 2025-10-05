'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactInfo {
  address: string;
  phone: string;
  email?: string;
  hours?: string;
  mapEmbedUrl?: string;
}

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  contactInfo: ContactInfo;
}

export default function ContactSection({
  title = "Nous Trouver",
  subtitle = "HDJ Rénovation intervient en Gironde dans un rayon de 100km",
  contactInfo
}: ContactSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Informations de Contact</h3>
            
            {/* Address */}
            <motion.div
              className="flex items-start space-x-4 mb-6"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Secteur</h4>
                <p className="text-gray-600 leading-relaxed">{contactInfo.address}</p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              className="flex items-start space-x-4 mb-6"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Phone className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Téléphone</h4>
                <a 
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </motion.div>

            {/* Email */}
            {contactInfo.email && (
              <motion.div
                className="flex items-start space-x-4 mb-6"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </motion.div>
            )}

            {/* Hours */}
            {contactInfo.hours && (
              <motion.div
                className="flex items-start space-x-4 mb-8"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Horaires</h4>
                  <p className="text-gray-600 leading-relaxed">{contactInfo.hours}</p>
                </div>
              </motion.div>
            )}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  const contactForm = document.getElementById('contact-form');
                  if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Demander un Devis Gratuit
              </Button>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            className="h-96 lg:h-full min-h-[400px]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
              {contactInfo.mapEmbedUrl ? (
                <iframe
                  src={contactInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Carte à configurer</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
