'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  createProspect, 
  getProspect, 
  updateProspectStep,
  ProspectDocument 
} from '@/lib/prospectManager';

// PROTECTION GLOBALE contre les créations multiples
let globalCreationInProgress = false;
let globalProspectId: string | null = null;

export const useProspectSession = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [prospectId, setProspectId] = useState<string | null>(null);
  const [prospect, setProspect] = useState<ProspectDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [initializationStarted, setInitializationStarted] = useState(false);

  // Initialiser ou récupérer le prospect - AVEC PROTECTION CONTRE DOUBLE APPEL
  useEffect(() => {
    if (!isInitialized && !initializationStarted) {
      setInitializationStarted(true);
      initializeProspect();
    }
  }, [isInitialized, initializationStarted]);

  const initializeProspect = async () => {
    try {
      setLoading(true);
      setError(null);

      // Vérifier si un ID existe dans l'URL
      const urlProspectId = searchParams.get('prospectId');
      
      if (urlProspectId) {
        // Vérifier que l'ID a un format valide (éviter les IDs corrompus)
        if (urlProspectId.length < 10) {
          console.log('ID invalide dans l\'URL, redirection vers page d\'accueil');
          router.replace('/comparaison');
          return;
        }

        // Récupérer le prospect existant
        console.log('Récupération du prospect existant:', urlProspectId);
        const existingProspect = await getProspect(urlProspectId);
        
        if (existingProspect) {
          // Synchroniser l'état global avec l'état local
          globalProspectId = urlProspectId;
          setProspectId(urlProspectId);
          setProspect(existingProspect);
          console.log('Prospect récupéré:', existingProspect);
        } else {
          // ID invalide, rediriger vers page d'accueil pour créer un nouveau
          console.log('Prospect non trouvé, redirection vers page d\'accueil');
          router.replace('/comparaison');
          return;
        }
      } else {
        // Pas d'ID, créer un nouveau prospect
        console.log('Aucun ID dans l\'URL, création d\'un nouveau prospect');
        await createNewProspect();
      }
    } catch (err: any) {
      console.error('Erreur lors de l\'initialisation du prospect:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  };

  const createNewProspect = async () => {
    // PROTECTION GLOBALE ET LOCALE contre les créations multiples
    if (isCreating || prospectId || globalCreationInProgress || globalProspectId) {
      console.log('Création déjà en cours ou prospect existant (local/global), abandon');
      return;
    }

    try {
      // Marquer la création comme en cours GLOBALEMENT
      globalCreationInProgress = true;
      setIsCreating(true);
      console.log('Début de création d\'un nouveau prospect');
      
      // TRIPLE VÉRIFICATION: local, global, et état
      if (prospectId || globalProspectId) {
        console.log('Un prospect existe déjà (local/global), abandon de la création');
        return;
      }
      
      const newProspectId = await createProspect();
      
      // VÉRIFICATION FINALE: s'assurer qu'aucun ID n'a été défini entre temps
      if (prospectId || globalProspectId) {
        console.log('Un autre prospect a été créé entre temps, abandon');
        return;
      }
      
      // Définir l'ID localement ET globalement
      globalProspectId = newProspectId;
      setProspectId(newProspectId);
      
      // Récupérer le prospect créé
      const newProspect = await getProspect(newProspectId);
      setProspect(newProspect);
      
      // Mettre à jour l'URL avec le nouvel ID
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('prospectId', newProspectId);
      router.replace(currentUrl.pathname + currentUrl.search);
      
      console.log('Nouveau prospect créé avec succès:', newProspectId);
    } catch (err: any) {
      throw new Error('Erreur lors de la création du prospect: ' + err.message);
    } finally {
      globalCreationInProgress = false;
      setIsCreating(false);
    }
  };

  // Mettre à jour le prospect (étape par étape)
  const updateProspect = async (
    stepData: Partial<ProspectDocument>, 
    stepNumber: number
  ): Promise<void> => {
    if (!prospectId) {
      throw new Error('Aucun prospect actif');
    }

    try {
      await updateProspectStep(prospectId, stepData, stepNumber);
      
      // Récupérer le prospect mis à jour
      const updatedProspect = await getProspect(prospectId);
      setProspect(updatedProspect);
      
      console.log(`Prospect ${prospectId} mis à jour - Étape ${stepNumber}`);
    } catch (err: any) {
      console.error('Erreur lors de la mise à jour:', err);
      throw new Error('Erreur lors de la mise à jour: ' + err.message);
    }
  };

  // Rafraîchir les données du prospect
  const refreshProspect = async (): Promise<void> => {
    if (!prospectId) return;

    try {
      const refreshedProspect = await getProspect(prospectId);
      setProspect(refreshedProspect);
    } catch (err: any) {
      console.error('Erreur lors du rafraîchissement:', err);
      setError('Erreur lors du rafraîchissement des données');
    }
  };

  // Réinitialiser la session (créer un nouveau prospect)
  const resetSession = async (): Promise<void> => {
    try {
      setLoading(true);
      // Réinitialiser les états locaux ET globaux
      setProspectId(null);
      setProspect(null);
      setIsInitialized(false);
      setInitializationStarted(false);
      setIsCreating(false);
      
      // Réinitialiser les variables globales
      globalProspectId = null;
      globalCreationInProgress = false;
      
      await createNewProspect();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtenir l'URL de partage du prospect
  const getShareUrl = (): string => {
    if (!prospectId) return '';
    const baseUrl = window.location.origin;
    return `${baseUrl}/comparaison?prospectId=${prospectId}`;
  };

  // Vérifier si une étape est complète
  const isStepComplete = (stepNumber: number): boolean => {
    if (!prospect) return false;

    switch (stepNumber) {
      case 1:
        return !!(prospect.company?.name && prospect.company?.activityType);
      case 2:
        return !!(prospect.energy?.concurrenceReason);
      case 3:
        return prospect.company?.activityType === 'gaz' || 
               (prospect.electricityMeters && prospect.electricityMeters.length > 0);
      case 4:
        return prospect.company?.activityType === 'electricite' || 
               (prospect.gasMeters && prospect.gasMeters.length > 0);
      case 5:
        return true; // Documents optionnels
      case 6:
        return !!(prospect.contact?.email && prospect.consents?.dataProcessing);
      default:
        return false;
    }
  };

  // Calculer le pourcentage de completion
  const getCompletionRate = (): number => {
    if (!prospect) return 0;
    
    const completedSteps = [1, 2, 3, 4, 5, 6].filter(step => isStepComplete(step)).length;
    return Math.round((completedSteps / 6) * 100);
  };

  return {
    // État
    prospectId,
    prospect,
    loading,
    error,
    
    // Actions
    updateProspect,
    refreshProspect,
    resetSession,
    
    // Utilitaires
    getShareUrl,
    isStepComplete,
    getCompletionRate,
    
    // Informations
    currentStep: prospect?.currentStep || 1,
    completionRate: prospect?.completionRate || 0
  };
};
