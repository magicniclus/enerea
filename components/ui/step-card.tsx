'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export function StepCard({ 
  icon: Icon, 
  title, 
  description, 
  isSelected, 
  onClick, 
  className = '' 
}: StepCardProps) {
  return (
    <motion.div
      className={`
        relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-lg' 
          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
        }
        ${className}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isSelected && (
        <motion.div
          className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
      
      <div className="flex items-start space-x-4">
        <div className={`
          p-3 rounded-lg 
          ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}
        `}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <h3 className={`
            font-semibold text-lg mb-2
            ${isSelected ? 'text-blue-900' : 'text-gray-900'}
          `}>
            {title}
          </h3>
          <p className={`
            text-sm leading-relaxed
            ${isSelected ? 'text-blue-700' : 'text-gray-600'}
          `}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
