'use client';

import React, { useState } from 'react';
import UltraOptimizedForm from '@/components/comparison/UltraOptimizedForm';
import NewComparisonLayout from '@/components/comparison/NewComparisonLayout';
import StructuredData from '@/components/StructuredData';

export default function ComparateurOptimisePage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleFormSubmit = (data: any) => {
    console.log('Données du formulaire ultra-optimisé soumises:', data);
    // Ici vous pouvez ajouter la logique pour traiter les données
    // Par exemple: envoyer à Firebase, API, etc.
  };

  return (
    <>
      <StructuredData type="comparison" />
      <NewComparisonLayout currentStep={currentStep}>
        <UltraOptimizedForm 
          onSubmit={handleFormSubmit}
          onStepChange={setCurrentStep}
        />
      </NewComparisonLayout>
    </>
  );
}
