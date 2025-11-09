'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, Zap } from 'lucide-react';

interface FeedbackMessageProps {
  type: 'success' | 'error' | 'info' | 'energy';
  message: string;
  show: boolean;
  className?: string;
}

export function FeedbackMessage({ type, message, show, className = '' }: FeedbackMessageProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'error':
        return AlertCircle;
      case 'info':
        return Info;
      case 'energy':
        return Zap;
      default:
        return Info;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'energy':
        return 'bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const Icon = getIcon();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`
            flex items-center space-x-3 p-4 rounded-lg border
            ${getStyles()}
            ${className}
          `}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
