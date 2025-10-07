'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqData = [
    {
      question: "Pourquoi utiliser un comparateur d'offre d'électricité ?",
      answer: "Un comparateur d'offres d'électricité vous permet de trouver rapidement les meilleures offres du marché adaptées à votre profil de consommation. Cela vous fait économiser du temps et de l'argent en évitant de contacter chaque fournisseur individuellement."
    },
    {
      question: "Choisir son contrat d'électricité selon son profil",
      answer: "Votre profil de consommation détermine le type de contrat le plus avantageux pour vous. Nous analysons vos habitudes de consommation, votre secteur d'activité et vos besoins spécifiques pour vous recommander les offres les plus adaptées."
    },
    {
      question: "Recevoir plusieurs offres de fournisseurs d'électricité",
      answer: "Notre plateforme vous permet de recevoir simultanément plusieurs devis personnalisés de différents fournisseurs. Cela vous donne une vision complète du marché et vous aide à négocier les meilleures conditions."
    },
    {
      question: "Un comparateur pour changer de fournisseur d'électricité",
      answer: "Changer de fournisseur est gratuit et sans coupure. Notre comparateur vous accompagne dans toutes les démarches administratives et s'assure que la transition se déroule en toute transparence."
    },
    {
      question: "L'électricité au meilleur prix",
      answer: "Nous négocions directement avec les fournisseurs pour obtenir des tarifs préférentiels non accessibles au grand public. Notre expertise du marché nous permet de vous proposer les prix les plus compétitifs."
    },
    {
      question: "Un comparateur indépendant",
      answer: "Enerea Energy est totalement indépendant des fournisseurs d'énergie. Notre rémunération provient uniquement de nos clients, ce qui nous garantit une neutralité totale dans nos recommandations."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comparez les offres d'électricité pro en ligne
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tout ce que vous voulez savoir sur notre comparateur d'électricité
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-xl border border-gray-200 px-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Lancer une comparaison
          </button>
        </motion.div>
      </div>
    </section>
  );
}
