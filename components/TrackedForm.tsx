'use client';

import React from 'react';
import { useTracking } from '@/hooks/useTracking';
import type { FormData } from '@/types/global';

interface TrackedFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  formType: 'devis' | 'contact' | 'souscription' | string;
  formData?: FormData;
  className?: string;
}

export default function TrackedForm({
  children,
  onSubmit,
  formType,
  formData,
  className = ''
}: TrackedFormProps) {
  const { trackFormSubmission } = useTracking();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track the form submission
    trackFormSubmission(formType, formData);
    
    // Execute the original onSubmit
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
}

// Exemple d'utilisation :
// <TrackedForm 
//   formType="devis" 
//   onSubmit={handleDevisSubmit}
//   className="space-y-4"
// >
//   <input type="email" placeholder="Email" />
//   <input type="tel" placeholder="Téléphone" />
//   <button type="submit">Envoyer</button>
// </TrackedForm>
