'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function StatsSection() {
  const stats = [
    {
      number: "8 500",
      label: "clients",
      subtitle: "et 8 500 compteurs",
      color: "from-blue-500 to-blue-700"
    },
    {
      number: "25+",
      label: "fournisseurs d'énergie",
      subtitle: "partenaires certifiés",
      color: "from-indigo-500 to-indigo-700"
    },
    {
      number: "48h",
      label: "heures",
      subtitle: "de délai moyen de réponse",
      color: "from-cyan-500 to-cyan-700"
    },
    {
      number: "3",
      label: "M€",
      subtitle: "d'économies générées en 2024",
      color: "from-blue-600 to-blue-800"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Enerea Energy, le spécialiste du courtage en énergie pour les professionnels, 
            les entreprises et les collectivités
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className={`inline-block bg-gradient-to-r ${stat.color} text-transparent bg-clip-text mb-2`}
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <span className="text-5xl md:text-6xl font-black">
                  {stat.number}
                </span>
              </motion.div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {stat.label}
              </h3>
              
              <p className="text-gray-600 text-sm">
                {stat.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative elements */}
        <div className="relative mt-16">
          <motion.div
            className="absolute top-0 left-1/4 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-8 right-1/4 w-24 h-24 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -30, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  );
}
