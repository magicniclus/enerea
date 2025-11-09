'use client';

import React, { useState } from 'react';
import NewComparisonForm from '@/components/comparison/NewComparisonForm';
import NewComparisonLayout from '@/components/comparison/NewComparisonLayout';
import StructuredData from '@/components/StructuredData';

export default function NouveauComparateurPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleFormSubmit = (data: any) => {
    console.log('Données du formulaire soumises:', data);
    // Ici vous pouvez ajouter la logique pour traiter les données
    // Par exemple: envoyer à Firebase, API, etc.
  };

  return (
    <>
      <StructuredData type="comparison" />
      <NewComparisonLayout currentStep={currentStep}>
        <NewComparisonForm 
          onSubmit={handleFormSubmit}
          onStepChange={setCurrentStep}
        />
      </NewComparisonLayout>
    </>
  );
}
