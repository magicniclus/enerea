'use client';

import React, { useState } from 'react';
import ComparisonHeader from '@/components/comparison/ComparisonHeader';
import ComparisonSidebar from '@/components/comparison/ComparisonSidebar';
import ComparisonForm from '@/components/comparison/ComparisonForm';

export default function ComparaisonPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ComparisonHeader />
      
      <div className="flex min-h-[calc(100vh-80px)]">
        <ComparisonSidebar currentStep={currentStep} />
        <ComparisonForm currentStep={currentStep} onStepChange={handleStepChange} />
      </div>

      {/* Footer avec informations légales */}
      
    </div>
  );
}
