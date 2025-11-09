'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Building, 
  Zap, 
  Flame, 
  RotateCcw, 
  MapPin, 
  Plus, 
  Upload, 
  Phone, 
  Mail,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Shield,
  Clock,
  Users,
  FileText,
  Star,
  TrendingUp,
  X
} from 'lucide-react';
import { OptimizedProgressBar } from '@/components/ui/optimized-progress-bar';
import { StepCard } from '@/components/ui/step-card';
import { FeedbackMessage } from '@/components/ui/feedback-message';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { saveProspect, formatProspectForSave } from '@/lib/prospects';
import { uploadProspectFile } from '@/lib/prospectManager';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface UltraOptimizedFormProps {
  onSubmit?: (data: FormData) => void;
  onStepChange?: (step: number) => void;
  className?: string;
}

interface FormData {
  // Étape 1: Besoin énergétique
  energyType: 'electricity' | 'gas' | 'both' | '';
  situation: 'compare_current' | 'new_location' | 'new_site' | '';
  
  // Étape 2: Consommation
  hasInvoice: boolean;
  invoiceFile?: File;
  needHelp: boolean;
  
  // Étape 3: Coordonnées
  civility: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
}

export default function UltraOptimizedForm({ onSubmit, onStepChange, className = '' }: UltraOptimizedFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    energyType: '',
    situation: '',
    hasInvoice: false,
    needHelp: false,
    civility: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consent: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'info' | 'energy'>('info');
  const [uploadedFiles, setUploadedFiles] = useState<Array<{id: string, name: string, url: string, file?: File}>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [prospectId, setProspectId] = useState<string | null>(null);

  // Validation des étapes
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.energyType !== '' && formData.situation !== '';
      case 2:
        return uploadedFiles.length > 0 || formData.needHelp;
      case 3:
        return formData.firstName.length > 0 && 
               formData.lastName.length > 0 && 
               formData.email.length > 0 && 
               formData.phone.length > 0 && 
               formData.consent;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid(currentStep)) {
      if (currentStep === 1) {
        showStepFeedback('✅ Parfait ! Nous analysons vos besoins énergétiques...', 'energy');
      } else if (currentStep === 2) {
        showStepFeedback('💪 Super ! Nous préparons vos meilleures offres personnalisées.', 'energy');
      }
      
      const nextStep = Math.min(currentStep + 1, 3);
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
    }
  };

  const handlePrevious = () => {
    const prevStep = Math.max(currentStep - 1, 1);
    setCurrentStep(prevStep);
    onStepChange?.(prevStep);
  };

  // Fonction pour nettoyer et sauvegarder les données
  const saveCleanProspectData = async (data: any) => {
    // Créer un objet avec seulement les champs non-undefined
    const cleanData: any = {};
    
    // Ajouter seulement les champs qui ont des valeurs
    if (data.firstName) cleanData.firstName = data.firstName;
    if (data.lastName) cleanData.lastName = data.lastName;
    if (data.email) cleanData.email = data.email;
    if (data.phone) cleanData.phone = data.phone;
    if (data.companyName) cleanData.companyName = data.companyName;
    if (data.sirenNumber) cleanData.sirenNumber = data.sirenNumber;
    if (data.energyType) cleanData.energyType = data.energyType;
    if (data.situation) cleanData.situation = data.situation;
    if (data.concurrenceReason) cleanData.concurrenceReason = data.concurrenceReason;
    if (data.activityType) cleanData.activityType = data.activityType;
    
    // Champs booléens
    cleanData.consentGiven = data.consent || false;
    cleanData.hasInvoice = data.hasInvoice || false;
    cleanData.needHelp = data.needHelp || false;
    
    // Métadonnées
    cleanData.source = data.source || 'comparateur-optimise';
    cleanData.status = 'nouveau';
    
    // Arrays (sans les objets File)
    if (data.uploadedFiles && data.uploadedFiles.length > 0) {
      cleanData.uploadedFiles = data.uploadedFiles.map((file: any) => ({
        id: file.id,
        name: file.name,
        url: file.url || ''
        // On ne sauvegarde PAS l'objet File dans Firebase
      }));
    }
    
    // Sauvegarder directement sans formatProspectForSave
    const prospectsRef = collection(db, 'prospects');
    const docRef = await addDoc(prospectsRef, {
      ...cleanData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return docRef.id;
  };

  const handleSubmit = async () => {
    if (!isStepValid(3)) return;

    setIsLoading(true);
    try {
      // 1. D'abord sauvegarder le prospect (sans les objets File)
      const prospectData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        companyName: 'Non renseigné (formulaire optimisé)',
        sirenNumber: '',
        energyType: formData.energyType,
        situation: formData.situation,
        concurrenceReason: formData.situation === 'compare_current' ? 'Comparaison fournisseur' : 
                          formData.situation === 'new_location' ? 'Nouveau local' : 
                          formData.situation === 'new_site' ? 'Nouveau site' : 'Non spécifié',
        activityType: 'Non spécifié (formulaire optimisé)',
        consent: formData.consent,
        hasInvoice: uploadedFiles.length > 0,
        needHelp: formData.needHelp,
        source: 'comparateur-optimise',
        // Informations sur les fichiers (sans les objets File)
        uploadedFiles: uploadedFiles.map(file => ({
          id: file.id,
          name: file.name,
          url: file.url || ''
        }))
      };

      const savedProspectId = await saveCleanProspectData(prospectData);
      console.log('Prospect sauvegardé avec ID:', savedProspectId);

      // 2. Ensuite téléverser les fichiers s'il y en a
      if (uploadedFiles.length > 0) {
        const uploadPromises = uploadedFiles
          .filter(fileData => fileData.file) // Seulement les fichiers avec le File object
          .map(async (fileData) => {
            try {
              const uploadResult = await uploadProspectFile(savedProspectId, fileData.file!, 'electricity-bills');
              return { id: fileData.id, url: uploadResult };
            } catch (error) {
              console.error('Erreur upload fichier:', fileData.name, error);
              return null;
            }
          });

        const uploadResults = await Promise.all(uploadPromises);
        console.log('Fichiers téléversés:', uploadResults.filter(r => r !== null));
      }
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      router.push('/comparateur-optimise/merci');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showStepFeedback('Une erreur est survenue. Veuillez réessayer.', 'error');
      setIsLoading(false);
    }
  };

  const showStepFeedback = (message: string, type: 'success' | 'error' | 'info' | 'energy') => {
    setFeedbackMessage(message);
    setFeedbackType(type);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 4000);
  };

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // Fonction pour gérer le téléversement de fichier
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifier la taille (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      showStepFeedback('Le fichier est trop volumineux (10 Mo maximum)', 'error');
      return;
    }

    // Vérifier le type de fichier
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      showStepFeedback('Format de fichier non supporté. Utilisez PDF, JPG ou PNG.', 'error');
      return;
    }

    setIsUploading(true);
    try {
      // Simuler le téléversement pour l'instant (on sauvegarde tout à la fin)
      // Créer un ID temporaire pour le fichier
      const tempFileId = Date.now().toString();
      
      // Ajouter le fichier à la liste (temporairement, sera téléversé à la fin)
      const newFile = {
        id: tempFileId,
        name: file.name,
        url: '', // Sera rempli lors de la sauvegarde finale
        file: file // Garder le fichier pour l'upload final
      };
      
      setUploadedFiles(prev => [...prev, newFile]);
      updateFormData({ hasInvoice: true, invoiceFile: file });
      showStepFeedback('✅ Facture téléversée avec succès !', 'success');
      
    } catch (error) {
      console.error('Erreur lors du téléversement:', error);
      showStepFeedback('Erreur lors du téléversement. Veuillez réessayer.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Fonction pour supprimer un fichier
  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    if (uploadedFiles.length === 1) {
      updateFormData({ hasInvoice: false });
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 ${className}`}>
      {/* Header avec progression */}
      <div className="mb-8">
        <OptimizedProgressBar currentStep={currentStep} totalSteps={3} className="mb-6" />
        
        {/* Stats de réassurance */}
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 mb-8">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>+2 300 entreprises</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span>Jusqu'à 30% d'économies</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Réponse sous 24h</span>
          </div>
        </div>
      </div>

      {/* Feedback Message */}
      <FeedbackMessage 
        type={feedbackType}
        message={feedbackMessage}
        show={showFeedback}
        className="mb-6"
      />

      {/* Contenu des étapes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          {/* Étape 1: Votre besoin énergétique */}
          {currentStep === 1 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Comparez vos tarifs d'énergie en 2 minutes ⚡
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Découvrez combien vous pouvez 
                  <span className="font-semibold text-green-600"> économiser sur vos factures pros</span>.
                </p>
              </div>

              <div className="space-y-8 max-w-3xl mx-auto">
                {/* Type d'énergie */}
                <div>
                  <Label className="text-lg font-semibold text-gray-900 mb-4 block">
                    De quel type d'énergie avez-vous besoin ?
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { value: 'electricity', label: 'Électricité', icon: Zap, emoji: '⚡' },
                      { value: 'gas', label: 'Gaz naturel', icon: Flame, emoji: '🔥' },
                      { value: 'both', label: 'Les deux', icon: Plus, emoji: '⚡+🔥' }
                    ].map(({ value, label, icon: Icon, emoji }) => (
                      <motion.button
                        key={value}
                        className={`
                          p-6 rounded-xl border-2 transition-all duration-200 text-center
                          ${formData.energyType === value
                            ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                            : 'border-gray-200 hover:border-blue-300 text-gray-700 hover:shadow-md'
                          }
                        `}
                        onClick={() => updateFormData({ energyType: value as any })}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-3xl mb-3">{emoji}</div>
                        <div className="font-semibold text-lg">{label}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Situation */}
                <div>
                  <Label className="text-lg font-semibold text-gray-900 mb-4 block">
                    Quelle est votre situation ?
                  </Label>
                  <div className="space-y-4">
                    <StepCard
                      icon={RotateCcw}
                      title="Je veux comparer mon fournisseur actuel"
                      description="Vous avez déjà un contrat et souhaitez voir si vous pouvez économiser"
                      isSelected={formData.situation === 'compare_current'}
                      onClick={() => updateFormData({ situation: 'compare_current' })}
                    />
                    
                    <StepCard
                      icon={MapPin}
                      title="Je viens d'aménager dans un nouveau local"
                      description="Vous déménagez et avez besoin d'un nouveau contrat énergétique"
                      isSelected={formData.situation === 'new_location'}
                      onClick={() => updateFormData({ situation: 'new_location' })}
                    />
                    
                    <StepCard
                      icon={Plus}
                      title="J'ouvre un nouveau site (compteur neuf)"
                      description="Première mise en service, nouveau compteur à installer"
                      isSelected={formData.situation === 'new_site'}
                      onClick={() => updateFormData({ situation: 'new_site' })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Étape 2: Ma consommation */}
          {currentStep === 2 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-4">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Aidez-nous à estimer votre consommation
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Cela nous permet d'obtenir les meilleures offres négociées auprès de nos fournisseurs partenaires.
                </p>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto">
                {/* Option facture */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
                  <div className="text-center mb-6">
                    <Upload className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Téléverser votre dernière facture (optionnel)
                    </h3>
                    <p className="text-sm text-gray-600">
                      PDF, JPG, PNG – 10 Mo max
                    </p>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="file"
                      id="invoice-upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isUploading}
                    />
                    <motion.div
                      className={`
                        w-full p-4 rounded-lg border-2 border-dashed transition-all duration-200 cursor-pointer
                        ${uploadedFiles.length > 0
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : isUploading
                            ? 'border-orange-400 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-blue-400 text-gray-600'
                        }
                      `}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        {isUploading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                            <span className="font-medium">Téléversement en cours...</span>
                          </>
                        ) : uploadedFiles.length > 0 ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">
                              {uploadedFiles.length} facture(s) téléversée(s) ✓
                            </span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-5 h-5" />
                            <span className="font-medium">
                              Cliquez pour téléverser votre facture
                            </span>
                          </>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Liste des fichiers téléversés */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">{file.name}</span>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Alternative sans facture */}
                <div className="text-center">
                  <div className="text-gray-500 mb-4">ou</div>
                  
                  <motion.button
                    className={`
                      w-full p-4 rounded-lg border-2 transition-all duration-200
                      ${formData.needHelp 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-300 hover:border-green-400 text-gray-600'
                      }
                    `}
                    onClick={() => updateFormData({ needHelp: !formData.needHelp, hasInvoice: false })}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center justify-center">
                      <span className="font-medium">
                        Je préfère qu'on m'aide à estimer ma consommation
                      </span>
                    </div>
                  </motion.button>
                </div>

                {/* Rassurance */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>
                      Vos informations restent strictement confidentielles et utilisées uniquement pour votre simulation.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Étape 3: Mes coordonnées */}
          {currentStep === 3 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-100 to-green-100 rounded-full mb-4">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Recevez vos meilleures offres personnalisées 💡
                </h2>
                <p className="text-xl text-gray-600">
                  Nous préparons vos tarifs négociés et vous recontactons rapidement.
                </p>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto">
                {/* Formulaire coordonnées */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2 block">Prénom</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Votre prénom"
                      value={formData.firstName}
                      onChange={(e) => updateFormData({ firstName: e.target.value })}
                      className="py-3 w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-2 block">Nom</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Votre nom"
                      value={formData.lastName}
                      onChange={(e) => updateFormData({ lastName: e.target.value })}
                      className="py-3 w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(e) => updateFormData({ email: e.target.value })}
                      className="py-3 w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => updateFormData({ phone: e.target.value })}
                      className="py-3 w-full"
                    />
                  </div>
                </div>

                {/* Encadré de réassurance */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-900">✅ Gratuit et sans engagement</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">📞 Nous vous recontactons sous 24h avec vos offres</span>
                    </div>
                  </div>
                </div>

                {/* Consentement */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => updateFormData({ consent: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded mt-1"
                    />
                    <Label htmlFor="consent" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                      J'accepte d'être recontacté par Enerea pour recevoir mes offres personnalisées.
                    </Label>
                  </div>
                  <div className="ml-8">
                    <a href="/politique-confidentialite" className="text-blue-600 hover:underline text-sm">
                      Voir la politique de confidentialité
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center space-y-reverse space-y-4 sm:space-y-0">
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          {currentStep > 1 && (
            <AnimatedButton
              variant="outline"
              onClick={handlePrevious}
              icon={ChevronLeft}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Étape précédente
            </AnimatedButton>
          )}
        </div>

        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          {currentStep < 3 ? (
            <AnimatedButton
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              icon={ChevronRight}
              size="lg"
              className="w-full sm:w-auto"
            >
              {currentStep === 1 ? 'Étape suivante → Voir mes économies' : 'Étape suivante → Presque terminé ✅'}
            </AnimatedButton>
          ) : (
            <AnimatedButton
              onClick={handleSubmit}
              disabled={!isStepValid(3)}
              loading={isLoading}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 w-full sm:w-auto"
            >
              Voir mes offres personnalisées →
            </AnimatedButton>
          )}
        </div>
      </div>
    </div>
  );
}
