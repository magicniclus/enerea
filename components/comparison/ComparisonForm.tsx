'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Building, Zap, Euro, User, FileText, ArrowRight, ArrowLeft, Plus, X, Upload, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { saveProspect, formatProspectForSave } from '@/lib/prospects';
import { uploadProspectFile } from '@/lib/prospectManager';

interface ComparisonFormProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  prospectId?: string | null;
  updateProspect?: (stepData: any, stepNumber: number) => Promise<void>;
}

interface FormData {
  // Étape 1: Informations entreprise
  sirenNumber: string;
  companyName: string;
  companyAddress: string;
  
  // Étape 2: Type d'activité
  activityType: string;
  employeeCount: string;
  
  // Étape 3: Raison de la mise en concurrence
  concurrenceReason: string;
  
  // Étape 4: Compteurs
  electricityMeters: Array<{id: string, pdl: string, noData: boolean}>;
  gasMeters: Array<{id: string, pce: string, noData: boolean}>;
  hasInvoices: boolean;
  
  // Étape 4.5: Informations de mise en service (conditionnelle)
  electricityPower: string;
  electricityServiceDate: string;
  gasConsumptionRange: string;
  gasServiceDate: string;
  
  // Étape 5: Préférences tarifaires (ancien étape 4)
  electricityConsumption: string;
  gasConsumption: string;
  currentProvider: string;
  contractType: string;
  budgetRange: string;
  greenEnergy: boolean;
  
  // Étape 6: Coordonnées
  civility: string;
  firstName: string;
  lastName: string;
  contactName: string;
  email: string;
  phone: string;
  consentGiven: boolean;
  
  // Étape 6: Récapitulatif (pas de champs supplémentaires)
}

export default function ComparisonForm({ currentStep, onStepChange, prospectId, updateProspect }: ComparisonFormProps) {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<Array<{id: string, name: string, url: string}>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    sirenNumber: '',
    companyName: '',
    companyAddress: '',
    activityType: '',
    employeeCount: '',
    concurrenceReason: '',
    electricityMeters: [],
    gasMeters: [],
    hasInvoices: true,
    electricityPower: '',
    electricityServiceDate: '',
    gasConsumptionRange: '',
    gasServiceDate: '',
    electricityConsumption: '',
    gasConsumption: '',
    currentProvider: '',
    contractType: '',
    budgetRange: '',
    greenEnergy: false,
    civility: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contactName: '',
    consentGiven: false
  });

  const [electricitySectionOpen, setElectricitySectionOpen] = useState(true);
  const [gasSectionOpen, setGasSectionOpen] = useState(true);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [sirenError, setSirenError] = useState('');
  const [forceValidationUpdate, setForceValidationUpdate] = useState(0);

  const updateFormData = (field: keyof FormData, value: string | boolean | any[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Cacher les erreurs de validation quand l'utilisateur modifie les données
    if (showValidationErrors) {
      setShowValidationErrors(false);
    }
  };

  // Fonctions pour gérer les compteurs électriques
  const addElectricityMeter = () => {
    const newMeter = {
      id: Date.now().toString(),
      pdl: '',
      noData: false
    };
    setFormData(prev => ({
      ...prev,
      electricityMeters: [...prev.electricityMeters, newMeter]
    }));
  };

  const removeElectricityMeter = (id: string) => {
    setFormData(prev => ({
      ...prev,
      electricityMeters: prev.electricityMeters.filter(meter => meter.id !== id)
    }));
  };

  const updateElectricityMeter = (id: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      electricityMeters: prev.electricityMeters.map(meter =>
        meter.id === id ? { ...meter, [field]: value } : meter
      )
    }));
  };

  // Fonctions pour gérer les compteurs gaz
  const addGasMeter = () => {
    const newMeter = {
      id: Date.now().toString(),
      pce: '',
      noData: false
    };
    setFormData(prev => ({
      ...prev,
      gasMeters: [...prev.gasMeters, newMeter]
    }));
  };

  const removeGasMeter = (id: string) => {
    setFormData(prev => ({
      ...prev,
      gasMeters: prev.gasMeters.filter(meter => meter.id !== id)
    }));
  };

  const updateGasMeter = (id: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      gasMeters: prev.gasMeters.map(meter =>
        meter.id === id ? { ...meter, [field]: value } : meter
      )
    }));
  };

  // Fonction pour gérer l'upload de fichiers
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !prospectId) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Vérifier la taille (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert(`Le fichier ${file.name} est trop volumineux (max 10MB)`);
          continue;
        }

        // Vérifier le type de fichier
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
          alert(`Le fichier ${file.name} n'est pas au bon format (PDF, JPG, PNG uniquement)`);
          continue;
        }

        // Upload du fichier
        const fileUrl = await uploadProspectFile(prospectId, file, 'documents', 'facture');
        
        // Ajouter à la liste des fichiers uploadés
        setUploadedFiles(prev => [...prev, {
          id: Date.now().toString() + i,
          name: file.name,
          url: fileUrl
        }]);
      }
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      alert('Erreur lors de l\'upload des fichiers');
    } finally {
      setIsUploading(false);
      // Reset l'input file
      event.target.value = '';
    }
  };

  // Ajouter un compteur par défaut si nécessaire
  React.useEffect(() => {
    if (currentStep === 4) {
      // Ajouter un compteur électrique par défaut si électricité ou dual
      if ((formData.activityType === 'electricite' || formData.activityType === 'dual') && formData.electricityMeters.length === 0) {
        addElectricityMeter();
      }
      // Ajouter un compteur gaz par défaut si gaz ou dual
      if ((formData.activityType === 'gaz' || formData.activityType === 'dual') && formData.gasMeters.length === 0) {
        addGasMeter();
      }
    }
  }, [currentStep, formData.activityType]);

  // Recherche en temps réel d'entreprises via API Next.js
  const searchCompanies = async (query: string) => {
    if (query.length < 3) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      setIsLoading(true);
      
      console.log('Recherche via API Next.js:', query);
      
      // Appel à notre API route Next.js (pas de problème CORS)
      const response = await fetch(`/api/search-companies?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Données reçues:', data);
        
        const results = data.companies || [];
        
        console.log('Résultats formatés:', results);
        setSearchResults(results.slice(0, 5));
        setShowResults(true);
        
      } else {
        console.log('Erreur API:', response.status, response.statusText);
        setSearchResults([]);
        setShowResults(false);
      }
      
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setSearchResults([]);
      setShowResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion de la saisie avec délai
  const handleSearchInput = (value: string) => {
    updateFormData('sirenNumber', value);
    setSirenError('');
    
    // Annuler la recherche précédente
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Nouvelle recherche avec délai
    const timeout = setTimeout(() => {
      searchCompanies(value);
    }, 300); // Délai de 300ms
    
    setSearchTimeout(timeout);
  };

  // Sélection d'une entreprise
  const selectCompany = async (company: any) => {
    console.log('Sélection entreprise:', company);
    
    const companyName = company.uniteLegale?.denominationUniteLegale || '';
    const siren = company.siren || '';
    const address = `${company.adresseEtablissement?.numeroVoieEtablissement || ''} ${company.adresseEtablissement?.typeVoieEtablissement || ''} ${company.adresseEtablissement?.libelleVoieEtablissement || ''}, ${company.adresseEtablissement?.codePostalEtablissement || ''} ${company.adresseEtablissement?.libelleCommuneEtablissement || ''}`.trim();
    
    console.log('Données extraites:', { siren, companyName, address });
    
    // Vérifier que les données essentielles sont présentes
    if (!siren || !companyName) {
      console.error('Données manquantes:', { siren, companyName });
      setSirenError('Erreur lors de la sélection de l\'entreprise. Veuillez réessayer.');
      return;
    }
    
    // Mettre à jour les données de manière synchrone
    const newFormData = {
      ...formData,
      sirenNumber: siren,
      companyName: companyName,
      companyAddress: address
    };
    
    // Mettre à jour le state
    updateFormData('sirenNumber', siren);
    updateFormData('companyName', companyName);
    updateFormData('companyAddress', address);
    
    // Effacer les erreurs
    setSirenError('');
    setShowValidationErrors(false);
    
    setShowResults(false);
    setSearchResults([]);
    
    console.log('Entreprise sélectionnée avec succès');
    console.log('Nouvelles données:', newFormData);
    
    // Forcer une mise à jour de la validation
    setForceValidationUpdate(prev => prev + 1);
    
    // Vérifier la validation après un court délai pour s'assurer que le state est mis à jour
    setTimeout(() => {
      const isValid = validateStep(1);
      console.log('Validation après sélection:', isValid);
    }, 100);
  };

  const searchSiren = async () => {
    if (!formData.sirenNumber || formData.sirenNumber.length !== 9) {
      setSirenError('Le numéro SIREN doit contenir 9 chiffres');
      return;
    }

    setIsLoading(true);
    setSirenError('');

    try {
      // API SIREN - Utilisation de l'API publique INSEE
      const response = await fetch(`https://api.insee.fr/entreprises/sirene/V3/siren/${formData.sirenNumber}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer YOUR_INSEE_TOKEN' // À remplacer par un vrai token
        }
      });

      if (response.ok) {
        const data = await response.json();
        const etablissement = data.etablissements?.[0];
        
        if (etablissement) {
          updateFormData('companyName', etablissement.uniteLegale?.denominationUniteLegale || '');
          updateFormData('companyAddress', 
            `${etablissement.adresseEtablissement?.numeroVoieEtablissement || ''} ${etablissement.adresseEtablissement?.typeVoieEtablissement || ''} ${etablissement.adresseEtablissement?.libelleVoieEtablissement || ''}, ${etablissement.adresseEtablissement?.codePostalEtablissement || ''} ${etablissement.adresseEtablissement?.libelleCommuneEtablissement || ''}`
          );
        }
      } else {
        setSirenError('Entreprise non trouvée');
      }
    } catch (error) {
      setSirenError('Erreur lors de la recherche');
      // Pour la démo, on simule des données
      updateFormData('companyName', 'Entreprise Demo SARL');
      updateFormData('companyAddress', '123 Rue de la Demo, 75001 Paris');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de validation pour chaque étape
  const validateStep = (step: number): boolean => {
    // Utiliser forceValidationUpdate pour s'assurer que la validation se met à jour
    forceValidationUpdate; // Référence pour forcer le re-render
    switch (step) {
      case 1:
        // Étape 1: SIREN et nom d'entreprise obligatoires
        const step1Valid = !!(formData.sirenNumber.trim() && formData.companyName.trim());
        console.log('Validation étape 1:', { 
          sirenNumber: formData.sirenNumber, 
          companyName: formData.companyName, 
          isValid: step1Valid 
        });
        return step1Valid;
      
      case 2:
        // Étape 2: Type d'activité obligatoire
        return !!formData.activityType;
      
      case 3:
        // Étape 3: Raison de la mise en concurrence obligatoire
        return !!formData.concurrenceReason;
      
      case 4:
        // Étape 4: Au moins un compteur avec PDL/PCE (même partiel) ou case "pas de données" cochée
        const hasValidElectricityMeter = formData.electricityMeters.length === 0 || 
          formData.electricityMeters.every(meter => meter.pdl.trim().length >= 3 || meter.noData);
        const hasValidGasMeter = formData.gasMeters.length === 0 || 
          formData.gasMeters.every(meter => meter.pce.trim().length >= 3 || meter.noData);
        const hasValidInvoices = !formData.hasInvoices || uploadedFiles.length > 0;
        return hasValidElectricityMeter && hasValidGasMeter && hasValidInvoices;
      
      case 5:
        // Étape 5: Informations de mise en service (seulement pour compteur neuf)
        if (formData.concurrenceReason !== 'emmenagement-neuf') return true;
        
        let isValid = true;
        // Vérifier électricité si applicable
        if (formData.activityType === 'electricite' || formData.activityType === 'dual') {
          isValid = isValid && !!(formData.electricityPower && formData.electricityServiceDate);
        }
        // Vérifier gaz si applicable
        if (formData.activityType === 'gaz' || formData.activityType === 'dual') {
          isValid = isValid && !!(formData.gasConsumptionRange && formData.gasServiceDate);
        }
        return isValid;
      
      case 6:
        // Étape 6: Coordonnées obligatoires + consentement
        return !!(
          formData.civility &&
          formData.firstName.trim() &&
          formData.lastName.trim() &&
          formData.email.trim() &&
          formData.phone.trim() &&
          formData.consentGiven
        );
      
      default:
        return true;
    }
  };

  // Fonction pour obtenir les messages d'erreur de validation
  const getValidationErrors = (step: number): string[] => {
    const errors: string[] = [];
    
    switch (step) {
      case 1:
        if (!formData.sirenNumber.trim()) errors.push("Le numéro SIREN est obligatoire");
        if (!formData.companyName.trim()) errors.push("Le nom de l'entreprise est obligatoire");
        break;
      
      case 2:
        if (!formData.activityType) errors.push("Veuillez sélectionner un type d'énergie");
        break;
      
      case 3:
        if (!formData.concurrenceReason) errors.push("Veuillez sélectionner la raison de la mise en concurrence");
        break;
      
      case 4:
        const invalidElectricityMeters = formData.electricityMeters.filter(meter => !meter.pdl.trim() && !meter.noData);
        const invalidGasMeters = formData.gasMeters.filter(meter => !meter.pce.trim() && !meter.noData);
        
        if (invalidElectricityMeters.length > 0) {
          errors.push("Veuillez renseigner les numéros PDL ou cocher 'Je ne dispose pas de mon Point de Livraison'");
        }
        if (invalidGasMeters.length > 0) {
          errors.push("Veuillez renseigner les numéros PCE ou cocher 'Je ne dispose pas de mon Point d'Estimation et de Comptage'");
        }
        if (formData.hasInvoices && uploadedFiles.length === 0) {
          errors.push("Veuillez téléverser vos factures ou cocher 'Je ne dispose pas de mes factures'");
        }
        break;
      
      case 5:
        if (formData.concurrenceReason === 'emmenagement-neuf') {
          if ((formData.activityType === 'electricite' || formData.activityType === 'dual')) {
            if (!formData.electricityPower) errors.push("Veuillez sélectionner la puissance électrique");
            if (!formData.electricityServiceDate) errors.push("Veuillez indiquer la date de mise en service électrique");
          }
          if ((formData.activityType === 'gaz' || formData.activityType === 'dual')) {
            if (!formData.gasConsumptionRange) errors.push("Veuillez sélectionner la consommation annuelle de gaz");
            if (!formData.gasServiceDate) errors.push("Veuillez indiquer la date de mise en service gaz");
          }
        }
        break;
      
      case 6:
        if (!formData.civility) errors.push("Veuillez sélectionner votre civilité");
        if (!formData.firstName.trim()) errors.push("Le prénom est obligatoire");
        if (!formData.lastName.trim()) errors.push("Le nom est obligatoire");
        if (!formData.email.trim()) errors.push("L'email est obligatoire");
        if (!formData.phone.trim()) errors.push("Le téléphone est obligatoire");
        if (!formData.consentGiven) errors.push("Veuillez accepter les conditions pour continuer");
        break;
    }
    
    return errors;
  };

  // Fonction pour sauvegarder les données de l'étape actuelle
  const saveCurrentStepData = async (stepNumber: number) => {
    if (!prospectId || !updateProspect) return;

    try {
      let stepData = {};
      
      switch (stepNumber) {
        case 1:
          stepData = {
            'company.sirenNumber': formData.sirenNumber,
            'company.name': formData.companyName,
            'company.address': formData.companyAddress,
          };
          break;
        case 2:
          stepData = {
            'company.activityType': formData.activityType,
            'company.employeeCount': formData.employeeCount,
          };
          break;
        case 3:
          stepData = {
            'energy.concurrenceReason': formData.concurrenceReason,
          };
          break;
        case 4:
          stepData = {
            electricityMeters: formData.electricityMeters,
            gasMeters: formData.gasMeters,
          };
          break;
        case 5:
          stepData = {
            'energy.electricityPower': formData.electricityPower,
            'energy.electricityServiceDate': formData.electricityServiceDate,
            'energy.gasConsumptionRange': formData.gasConsumptionRange,
            'energy.gasServiceDate': formData.gasServiceDate,
          };
          break;
        case 6:
          stepData = {
            'contact.civility': formData.civility,
            'contact.firstName': formData.firstName,
            'contact.lastName': formData.lastName,
            'contact.contactName': formData.contactName,
            'contact.email': formData.email,
            'contact.phone': formData.phone,
            'consents.dataProcessing': formData.consentGiven,
          };
          break;
      }

      await updateProspect(stepData, stepNumber);
      console.log(`Données de l'étape ${stepNumber} sauvegardées`);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  // Fonction pour faire défiler vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const nextStep = async () => {
    // Vérifier la validation avant de passer à l'étape suivante
    if (!validateStep(currentStep)) {
      setShowValidationErrors(true); // Afficher les erreurs seulement quand on essaie de passer
      return; // Ne pas avancer si la validation échoue
    }
    
    setShowValidationErrors(false); // Cacher les erreurs si validation OK

    // Sauvegarder les données de l'étape actuelle avant de passer à la suivante
    await saveCurrentStepData(currentStep);

    // Fonction helper pour changer d'étape avec scroll
    const changeStepWithScroll = (newStep: number) => {
      onStepChange(newStep);
      // Petit délai pour laisser le temps au DOM de se mettre à jour
      setTimeout(() => {
        scrollToTop();
      }, 100);
    };

    if (currentStep === 4) {
      // Debug: vérifier la raison de concurrence
      console.log('Navigation depuis étape 4 - concurrenceReason:', formData.concurrenceReason);
      
      // Si c'est un changement de fournisseur, passer directement à l'étape 6 (coordonnées)
      if (formData.concurrenceReason === 'changement-fournisseur') {
        console.log('Changement de fournisseur -> étape 6');
        changeStepWithScroll(6);
      } else {
        // Pour les emménagements, afficher l'étape 5 seulement pour les compteurs neufs
        if (formData.concurrenceReason === 'emmenagement-neuf') {
          // Aller à l'étape 5 (informations de mise en service)
          console.log('Emménagement neuf -> étape 5');
          changeStepWithScroll(5);
        } else {
          // Pour les emménagements avec compteur existant, passer directement aux coordonnées
          console.log('Emménagement existant -> étape 6');
          changeStepWithScroll(6);
        }
      }
    } else if (currentStep === 5) {
      // De l'étape 5 (mise en service), aller à l'étape 6 (coordonnées)
      changeStepWithScroll(6);
    } else if (currentStep < 6) {
      changeStepWithScroll(currentStep + 1);
    }
  };

  const prevStep = () => {
    setShowValidationErrors(false); // Cacher les erreurs quand on revient en arrière
    
    // Fonction helper pour changer d'étape avec scroll (même que dans nextStep)
    const changeStepWithScroll = (newStep: number) => {
      onStepChange(newStep);
      // Petit délai pour laisser le temps au DOM de se mettre à jour
      setTimeout(() => {
        scrollToTop();
      }, 100);
    };
    
    if (currentStep === 6) {
      // Si on revient de l'étape 6 (coordonnées)
      if (formData.concurrenceReason === 'changement-fournisseur' || formData.concurrenceReason === 'emmenagement-existant') {
        // Si c'était un changement de fournisseur ou emménagement existant, revenir à l'étape 4 (compteurs)
        changeStepWithScroll(4);
      } else if (formData.concurrenceReason === 'emmenagement-neuf') {
        // Si c'était un emménagement neuf, revenir à l'étape 5 (mise en service)
        changeStepWithScroll(5);
      } else {
        // Par défaut, revenir à l'étape 4
        changeStepWithScroll(4);
      }
    } else if (currentStep === 5) {
      // De l'étape 5 (mise en service), revenir à l'étape 4 (compteurs)
      changeStepWithScroll(4);
    } else if (currentStep > 1) {
      changeStepWithScroll(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Votre entreprise</h2>
              <p className="text-gray-600">
                Optira Energie propose des services de courtage en énergie pour les professionnels.<br />
                Pour pouvoir traiter au mieux votre demande, merci d'indiquer la Raison Sociale ou le SIREN de votre entreprise.
              </p>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raison sociale ou SIREN
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.sirenNumber}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  onFocus={() => formData.sirenNumber.length >= 3 && setShowResults(true)}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  placeholder="Tapez le nom de votre entreprise ou le numéro SIREN"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>

              {/* Liste des résultats */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {searchResults.map((company, index) => (
                    <div
                      key={index}
                      onClick={() => selectCompany(company)}
                      className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">
                            {company.uniteLegale?.denominationUniteLegale || 'Nom non disponible'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            SIREN: {company.siren}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {company.adresseEtablissement?.numeroVoieEtablissement} {company.adresseEtablissement?.typeVoieEtablissement} {company.adresseEtablissement?.libelleVoieEtablissement}, {company.adresseEtablissement?.codePostalEtablissement} {company.adresseEtablissement?.libelleCommuneEtablissement}
                          </p>
                        </div>
                        <div className="ml-2">
                          <Search className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {sirenError && (
                <p className="text-red-600 text-sm mt-2">{sirenError}</p>
              )}
            </div>

            {formData.companyName && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800">{formData.companyName}</h3>
                <p className="text-green-600 text-sm">{formData.companyAddress}</p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Pour quel type d'énergie souhaitez-vous comparer les offres ?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Cette information est nécessaire afin de traiter au mieux votre appel d'offres
              </p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Option Électricité */}
              <div 
                onClick={() => updateFormData('activityType', 'electricite')}
                className={`
                  relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md
                  ${formData.activityType === 'electricite' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-blue-300'
                  }
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1
                    ${formData.activityType === 'electricite' 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'
                    }
                  `}>
                    {formData.activityType === 'electricite' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Électricité</h3>
                    <p className="text-gray-600 text-sm">
                      Ma demande concerne uniquement des compteurs électriques
                    </p>
                  </div>
                  <div className="text-yellow-500">
                    <Zap className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Option Gaz naturel */}
              <div 
                onClick={() => updateFormData('activityType', 'gaz')}
                className={`
                  relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md
                  ${formData.activityType === 'gaz' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-blue-300'
                  }
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1
                    ${formData.activityType === 'gaz' 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'
                    }
                  `}>
                    {formData.activityType === 'gaz' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Gaz naturel</h3>
                    <p className="text-gray-600 text-sm">
                      Ma demande concerne uniquement des compteurs de gaz
                    </p>
                  </div>
                  <div className="text-blue-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Option Électricité & Gaz naturel */}
              <div 
                onClick={() => updateFormData('activityType', 'dual')}
                className={`
                  relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md
                  ${formData.activityType === 'dual' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 bg-white hover:border-green-300'
                  }
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1
                    ${formData.activityType === 'dual' 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300'
                    }
                  `}>
                    {formData.activityType === 'dual' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Électricité & Gaz naturel</h3>
                    <p className="text-gray-600 text-sm">
                      Ma demande concerne des compteurs électriques et de gaz
                    </p>
                  </div>
                  <div className="text-green-500">
                    <div className="flex space-x-1">
                      <Zap className="w-5 h-5" />
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                {formData.activityType === 'dual' && (
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <p className="text-green-800 text-sm font-medium">
                      ✓ Recommandé : Obtenez les meilleurs tarifs en groupant vos contrats
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Merci de nous indiquer la raison de cette mise en concurrence énergie
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Cette information est nécessaire afin de traiter au mieux votre appel d'offres
              </p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Option Changement de fournisseur */}
              <div 
                onClick={() => updateFormData('concurrenceReason', 'changement-fournisseur')}
                className={`
                  relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md
                  ${formData.concurrenceReason === 'changement-fournisseur' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-blue-300'
                  }
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1
                    ${formData.concurrenceReason === 'changement-fournisseur' 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'
                    }
                  `}>
                    {formData.concurrenceReason === 'changement-fournisseur' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Changement de fournisseur sur le site actuel</h3>
                    <p className="text-gray-600 text-sm">
                      Vous souhaitez mettre en concurrence le fournisseur qui fournit l'électricité et/ou le gaz naturel du site dans lequel vous exercez actuellement votre activité professionnelle.
                    </p>
                  </div>
                </div>
              </div>

              {/* Option Emménagement compteur existant */}
              <div 
                onClick={() => updateFormData('concurrenceReason', 'emmenagement-existant')}
                className={`
                  relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md
                  ${formData.concurrenceReason === 'emmenagement-existant' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-blue-300'
                  }
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1
                    ${formData.concurrenceReason === 'emmenagement-existant' 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'
                    }
                  `}>
                    {formData.concurrenceReason === 'emmenagement-existant' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Emménagement sur un nouveau site (compteur existant)</h3>
                    <p className="text-gray-600 text-sm">
                      Vous emménagez sur un site professionnel déjà équipé d'un compteur électricité et/ou gaz naturel. Ce ou ces compteurs ont déjà un historique de consommation relatif au précédent locataire ou propriétaire du site.
                    </p>
                  </div>
                </div>
              </div>

              {/* Option Emménagement compteur neuf */}
              <div 
                onClick={() => updateFormData('concurrenceReason', 'emmenagement-neuf')}
                className={`
                  relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md
                  ${formData.concurrenceReason === 'emmenagement-neuf' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 bg-white hover:border-green-300'
                  }
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1
                    ${formData.concurrenceReason === 'emmenagement-neuf' 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300'
                    }
                  `}>
                    {formData.concurrenceReason === 'emmenagement-neuf' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Emménagement sur un nouveau site (compteur neuf)</h3>
                    <p className="text-gray-600 text-sm">
                      Vous emménagez sur un site professionnel entièrement neuf n'ayant aucun historique de consommation d'énergie. Le ou les compteurs viennent d'être mis en service par le gestionnaire de réseau, vous êtes en possession d'un conseil.
                    </p>
                  </div>
                </div>
                {formData.concurrenceReason === 'emmenagement-neuf' && (
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <p className="text-green-800 text-sm font-medium">
                      ✓ Nouveau site : Nous vous accompagnerons dans toutes les démarches
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Pour quel(s) compteur(s) souhaitez-vous comparer les prix ?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Cette information est fortement conseillée afin de comparer des offres sur la base d'une consommation réelle liée à votre activité professionnelle.
              </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Section Compteurs Électriques */}
              {(formData.activityType === 'electricite' || formData.activityType === 'dual') && (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setElectricitySectionOpen(!electricitySectionOpen)}
                  >
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <h3 className="text-lg font-semibold text-gray-800">Compteur électrique</h3>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                        {formData.electricityMeters.length}
                      </span>
                    </div>
                    {electricitySectionOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  
                  {electricitySectionOpen && (
                    <div className="p-6 space-y-4">
                      {formData.electricityMeters.map((meter, index) => (
                        <div key={meter.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-800">Compteur n°{index + 1}</h4>
                            {formData.electricityMeters.length > 0 && (
                              <button
                                onClick={() => removeElectricityMeter(meter.id)}
                                className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                title="Supprimer ce compteur"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <input
                                type="text"
                                value={meter.pdl}
                                onChange={(e) => updateElectricityMeter(meter.id, 'pdl', e.target.value)}
                                placeholder="Numéro de Point de Livraison (PDL ou PAE)"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                disabled={meter.noData}
                              />
                            </div>
                            
                            <label className="flex items-center text-sm text-gray-600">
                              <input
                                type="checkbox"
                                checked={meter.noData}
                                onChange={(e) => updateElectricityMeter(meter.id, 'noData', e.target.checked)}
                                className="mr-2"
                              />
                              Je ne dispose pas de mon Point de Livraison
                            </label>
                          </div>
                        </div>
                      ))}
                      
                      <button
                        onClick={addElectricityMeter}
                        className="flex items-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors w-full justify-center"
                      >
                        <Plus className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Ajouter un compteur</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Section Compteurs Gaz */}
              {(formData.activityType === 'gaz' || formData.activityType === 'dual') && (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setGasSectionOpen(!gasSectionOpen)}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-800">Compteur de gaz naturel</h3>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                        {formData.gasMeters.length}
                      </span>
                    </div>
                    {gasSectionOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  
                  {gasSectionOpen && (
                    <div className="p-6 space-y-4">
                      {formData.gasMeters.map((meter, index) => (
                        <div key={meter.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-800">Compteur n°{index + 1}</h4>
                            {formData.gasMeters.length > 0 && (
                              <button
                                onClick={() => removeGasMeter(meter.id)}
                                className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                title="Supprimer ce compteur"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <input
                                type="text"
                                value={meter.pce}
                                onChange={(e) => updateGasMeter(meter.id, 'pce', e.target.value)}
                                placeholder="Numéro de Point de Livraison (PCE ou PAG)"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                disabled={meter.noData}
                              />
                            </div>
                            
                            <label className="flex items-center text-sm text-gray-600">
                              <input
                                type="checkbox"
                                checked={meter.noData}
                                onChange={(e) => updateGasMeter(meter.id, 'noData', e.target.checked)}
                                className="mr-2"
                              />
                              Je ne dispose pas de mon Point d'Estimation et de Comptage
                            </label>
                          </div>
                        </div>
                      ))}
                      
                      <button
                        onClick={addGasMeter}
                        className="flex items-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors w-full justify-center"
                      >
                        <Plus className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Ajouter un compteur</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Section Téléversement de factures */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="flex items-start space-x-4">
                  <Upload className="w-6 h-6 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Téléverser votre dernière facture d'électricité et de gaz naturel
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Afin d'obtenir le meilleur de vos factures d'énergie pour mieux traiter votre demande, vous pouvez les transmettre ici si vous le souhaitez :
                    </p>
                    
                    <div className="space-y-3">
                      <div className="relative">
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          disabled={isUploading}
                        />
                        <div className={`border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors ${isUploading ? 'opacity-50' : 'cursor-pointer'}`}>
                          <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                          <p className="text-blue-600 font-medium">
                            {isUploading ? 'Upload en cours...' : 'Cliquez pour téléverser vos factures'}
                          </p>
                          <p className="text-gray-500 text-sm mt-1">PDF, JPG, PNG - Max 10MB par fichier</p>
                        </div>
                      </div>

                      {/* Liste des fichiers uploadés */}
                      {uploadedFiles.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">Fichiers téléversés :</p>
                          {uploadedFiles.map((file) => (
                            <div key={file.id} className="flex items-center justify-between bg-green-50 p-2 rounded border">
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-green-800">{file.name}</span>
                              </div>
                              <button
                                onClick={() => setUploadedFiles(prev => prev.filter(f => f.id !== file.id))}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <label className="flex items-center text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={!formData.hasInvoices}
                          onChange={(e) => updateFormData('hasInvoices', !e.target.checked)}
                          className="mr-2"
                        />
                        Je ne dispose pas de mes factures
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        // Debug: vérifier pourquoi l'étape 5 ne s'affiche pas
        console.log('Étape 5 - concurrenceReason:', formData.concurrenceReason);
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Informations de mise en service
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ces informations nous permettront de mieux traiter votre demande de mise en service
              </p>
            </div>

            <div className="space-y-6 w-full max-w-lg mx-auto px-6">
              {/* Section Électricité */}
              {(formData.activityType === 'electricite' || formData.activityType === 'dual') && (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <h3 className="text-lg font-semibold text-gray-800">Informations pour votre compteur électrique</h3>
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-4">Puissance compteur électrique souhaitée</h4>
                      <div className="space-y-3">
                        {[
                          { value: 'basse-tension-36', label: 'Basse tension < 36kVA' },
                          { value: 'basse-tension-plus-36', label: 'Basse tension > 36kVA' },
                          { value: 'haute-tension', label: 'Haute tension' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                              type="radio"
                              name="electricityPower"
                              value={option.value}
                              checked={formData.electricityPower === option.value}
                              onChange={(e) => updateFormData('electricityPower', e.target.value)}
                              className="mr-3"
                            />
                            <span className="text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {!formData.electricityPower && (
                        <p className="text-red-500 text-sm mt-2">La puissance du compteur est obligatoire</p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-4">Date de mise en service souhaitée du compteur électrique</h4>
                      <div className="flex items-center space-x-3">
                        <input
                          type="date"
                          value={formData.electricityServiceDate}
                          onChange={(e) => updateFormData('electricityServiceDate', e.target.value)}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="flex items-center text-sm text-gray-600">
                          <input
                            type="checkbox"
                            checked={!formData.electricityServiceDate}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateFormData('electricityServiceDate', '');
                              }
                            }}
                            className="mr-2"
                          />
                          Sélectionner une date
                        </label>
                      </div>
                      {!formData.electricityServiceDate && (
                        <p className="text-red-500 text-sm mt-2">La date de mise en service est obligatoire</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Section Gaz */}
              {(formData.activityType === 'gaz' || formData.activityType === 'dual') && (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-800">Informations pour votre compteur gaz naturel</h3>
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-4">Consommation Annuelle de référence estimée</h4>
                      <div className="space-y-3">
                        {[
                          { value: '0-100', label: '0 - 100 MWh / an' },
                          { value: '100-20000', label: '100 MWh - 20 GWh / an' },
                          { value: 'plus-20000', label: 'Supérieure à 20 GWh / an' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                              type="radio"
                              name="gasConsumptionRange"
                              value={option.value}
                              checked={formData.gasConsumptionRange === option.value}
                              onChange={(e) => updateFormData('gasConsumptionRange', e.target.value)}
                              className="mr-3"
                            />
                            <span className="text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {!formData.gasConsumptionRange && (
                        <p className="text-red-500 text-sm mt-2">La consommation annuelle de référence est obligatoire</p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-4">Date de mise en service souhaitée</h4>
                      <div className="flex items-center space-x-3">
                        <input
                          type="date"
                          value={formData.gasServiceDate}
                          onChange={(e) => updateFormData('gasServiceDate', e.target.value)}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="flex items-center text-sm text-gray-600">
                          <input
                            type="checkbox"
                            checked={!formData.gasServiceDate}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateFormData('gasServiceDate', '');
                              }
                            }}
                            className="mr-2"
                          />
                          Sélectionner une date
                        </label>
                      </div>
                      {!formData.gasServiceDate && (
                        <p className="text-red-500 text-sm mt-2">La date de mise en service est obligatoire</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Merci de nous communiquer vos coordonnées
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Pour finaliser votre demande et voir les meilleures offres du marché.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              {/* Civilité */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Civilité</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="civility"
                      value="monsieur"
                      checked={formData.civility === 'monsieur'}
                      onChange={(e) => updateFormData('civility', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Monsieur</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="civility"
                      value="madame"
                      checked={formData.civility === 'madame'}
                      onChange={(e) => updateFormData('civility', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Madame</span>
                  </label>
                </div>
              </div>

              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Votre nom de famille"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Prénom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="Votre prénom"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="votre.email@entreprise.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="01 23 45 67 89"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>


              {/* Consentement */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentGiven}
                    onChange={(e) => updateFormData('consentGiven', e.target.checked)}
                    className="mt-1 flex-shrink-0"
                  />
                  <div className="text-sm text-gray-700 leading-relaxed">
                    <p className="mb-3">
                      En validant cette demande, vous autorisez expressément <strong>ENEREA</strong> et ses partenaires fournisseurs d'énergie à accéder, utiliser et partager vos données techniques, contractuelles, de consommation et de production, ainsi que vos relevés d'index historiques pour les sites communiqués.
                    </p>
                    <p className="mb-3">
                      Vous autorisez également nos partenaires fournisseurs (dont la liste peut évoluer dans le temps) à demander et accéder à ces données via les portails gestionnaires de réseau (Enedis, GRDF) ou toute autre plateforme officielle.
                    </p>
                    <p className="mb-3">
                      Ces données seront utilisées exclusivement pour : établir et transmettre des offres personnalisées de fourniture d'électricité et/ou de gaz naturel, effectuer un suivi de vos consommations énergétiques.
                    </p>
                    <p className="text-xs text-gray-600">
                      Cette autorisation est valable pour une durée de 36 mois et couvre l'ensemble des points de livraison dont votre structure est titulaire. Vous certifiez être habilité à donner cette autorisation pour les sites communiqués.
                    </p>
                  </div>
                </label>
              </div>

              <button
                onClick={async () => {
                  if (!formData.consentGiven) {
                    alert('Veuillez accepter les conditions pour continuer.');
                    return;
                  }
                  
                  if (isSubmitting) return; // Éviter les doubles clics
                  
                  try {
                    setIsSubmitting(true);
                    
                    // Sauvegarder les données finales
                    if (prospectId && updateProspect) {
                      // Sauvegarder les données de contact
                      await updateProspect({
                        'contact.civility': formData.civility,
                        'contact.firstName': formData.firstName,
                        'contact.lastName': formData.lastName,
                        'contact.contactName': formData.contactName,
                        'contact.email': formData.email,
                        'contact.phone': formData.phone,
                        'consents.dataProcessing': formData.consentGiven,
                        'consents.consentDate': new Date().toISOString(),
                        'consents.ipAddress': 'web-form',
                        status: 'nouveau',
                        completionRate: 100,
                        currentStep: 6
                      }, 6);
                      
                      console.log('Prospect finalisé avec succès');
                      
                      // Rediriger vers la page de remerciement
                      router.push(`/merci?prospectId=${prospectId}`);
                    } else {
                      throw new Error('Aucun prospect actif');
                    }
                  } catch (error) {
                    console.error('Erreur lors de la finalisation:', error);
                    alert('Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.');
                    setIsSubmitting(false);
                  }
                }}
                disabled={!formData.consentGiven || isSubmitting}
                className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                  formData.consentGiven && !isSubmitting
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande de devis'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-white md:p-8 p-4 py-8">
      <div className="max-w-2xl mx-auto">
        {renderStep()}

        {/* Navigation */}
        {currentStep < 6 && (
          <div className="mt-8">
            {/* Messages d'erreur de validation */}
            {showValidationErrors && !validateStep(currentStep) && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 text-red-500 mt-0.5">⚠️</div>
                  <div>
                    <h4 className="text-sm font-medium text-red-800 mb-2">
                      Veuillez compléter les informations suivantes :
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {getValidationErrors(currentStep).map((error, index) => (
                        <li key={index} className="flex items-start space-x-1">
                          <span className="text-red-500 mt-1">•</span>
                          <span>{error}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              {currentStep > 1 ? (
                <button
                  onClick={prevStep}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </button>
              ) : (
                <div></div> // Espace vide pour maintenir l'alignement
              )}

              <button
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                  validateStep(currentStep)
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>{currentStep === 1 ? "C'est parti !" : "Suivant"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
