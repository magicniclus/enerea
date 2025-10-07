'use client';

import React, { Suspense, useRef, useEffect } from 'react';
import ComparisonHeader from '@/components/comparison/ComparisonHeader';
import ComparisonSidebar from '@/components/comparison/ComparisonSidebar';
import ComparisonForm from '@/components/comparison/ComparisonForm';
import StructuredData from '@/components/StructuredData';
import { useProspectSession } from '@/hooks/useProspectSession';
import { Loader2 } from 'lucide-react';

function ComparaisonContent() {
  const initRef = useRef(false);
  
  const {
    prospectId,
    prospect,
    loading,
    error,
    currentStep,
    updateProspect,
    isStepComplete,
    getCompletionRate
  } = useProspectSession();

  // Debug: Log pour surveiller les créations multiples
  useEffect(() => {
    if (prospectId && !initRef.current) {
      console.log('Premier prospect ID reçu:', prospectId);
      initRef.current = true;
    } else if (prospectId && initRef.current) {
      console.warn('ATTENTION: Nouveau prospect ID reçu alors qu\'un existe déjà:', prospectId);
    }
  }, [prospectId]);

  const handleStepChange = async (step: number) => {
    try {
      // Mettre à jour l'étape actuelle dans Firebase
      if (prospectId) {
        await updateProspect({ currentStep: step }, step);
        console.log('Changement vers l\'étape:', step);
      }
    } catch (error) {
      console.error('Erreur lors du changement d\'étape:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Initialisation de votre session...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erreur</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData type="comparison" />
      <ComparisonHeader />
      
      <div className="flex min-h-[calc(100vh-80px)]">
        <ComparisonSidebar 
          currentStep={currentStep} 
          onStepChange={handleStepChange}
        />
        <ComparisonForm 
          currentStep={currentStep} 
          onStepChange={handleStepChange}
          prospectId={prospectId}
          updateProspect={updateProspect}
        />
      </div>

    </div>
  );
}

export default function ComparaisonPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <ComparaisonContent />
    </Suspense>
  );
}
