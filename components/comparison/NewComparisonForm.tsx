'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Building, 
  Zap, 
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
  Users
} from 'lucide-react';
import { ProgressBar } from '@/components/ui/progress-bar';
import { StepCard } from '@/components/ui/step-card';
import { FeedbackMessage } from '@/components/ui/feedback-message';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSirenSearch } from '@/hooks/useSirenSearch';

interface NewComparisonFormProps {
  onSubmit?: (data: FormData) => void;
  onStepChange?: (step: number) => void;
  className?: string;
}

interface FormData {
  // Étape 1: Mon entreprise
  companyName: string;
  sirenNumber: string;
  energyType: 'electricity' | 'gas' | 'both' | '';
  noSiren: boolean;
  
  // Étape 2: Ma situation énergétique
  situation: 'change_provider' | 'new_location' | 'new_site' | '';
  hasInvoice: boolean;
  invoiceFile?: File;
  needHelp: boolean;
  
  // Étape 3: Mes coordonnées
  civility: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
}

export default function NewComparisonForm({ onSubmit, onStepChange, className = '' }: NewComparisonFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    sirenNumber: '',
    energyType: '',
    noSiren: false,
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
  
  // Hook pour la recherche SIREN
  const { companies, isLoading: isSearching, searchCompanies, clearResults } = useSirenSearch();

  // Fonction pour gérer la recherche d'entreprise
  const handleCompanySearch = (query: string) => {
    if (query.length < 3) {
      clearResults();
      return;
    }
    searchCompanies(query);
  };

  // Validation des étapes
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.companyName.length > 0 && formData.energyType !== '';
      case 2:
        return formData.situation !== '';
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
        showStepFeedback('✅ Entreprise trouvée ! Vous êtes à 1 minute de vos économies.', 'energy');
      } else if (currentStep === 2) {
        showStepFeedback('💪 Plus qu\'une minute pour découvrir vos économies.', 'energy');
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

  const handleSubmit = async () => {
    if (!isStepValid(3)) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulation
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      // Redirection vers la page de remerciement
      router.push('/nouveau-comparateur/merci');
    } catch (error) {
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

  return (
    <div className={`max-w-4xl mx-auto p-6 ${className}`}>
      {/* Header avec progression */}
      <div className="mb-8">
        <ProgressBar currentStep={currentStep} totalSteps={3} className="mb-6" />
        
        {/* Stats de réassurance */}
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 mb-8">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>+2 300 entreprises accompagnées</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Gratuit et sans engagement</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-orange-600" />
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
          {/* Étape 1: Mon entreprise */}
          {currentStep === 1 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Building className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Commençons par votre entreprise ⚡
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Comparez vos tarifs d'énergie en 2 minutes et découvrez si vous pouvez 
                  <span className="font-semibold text-blue-600"> réduire vos coûts jusqu'à 30%</span>.
                </p>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto">
                {/* Nom de l'entreprise */}
                <div>
                  <Label htmlFor="companyName" className="text-lg font-medium text-gray-900 mb-3 block">
                    Nom de votre entreprise
                  </Label>
                  <div className="relative">
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="Tapez le nom de votre entreprise..."
                      value={formData.companyName}
                      onChange={(e) => {
                        updateFormData({ companyName: e.target.value });
                        handleCompanySearch(e.target.value);
                      }}
                      className="text-lg py-4 pl-12 pr-4"
                    />
                    <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    
                    {isSearching && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Résultats de recherche */}
                  {companies.length > 0 && (
                    <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {companies.map((company, index) => (
                        <button
                          key={index}
                          className="w-full text-left p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            updateFormData({ 
                              companyName: company.name,
                              sirenNumber: company.siren 
                            });
                            clearResults();
                          }}
                        >
                          <div className="font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-600">SIREN: {company.siren}</div>
                          <div className="text-sm text-gray-500">{company.address}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Type d'énergie */}
                <div>
                  <Label className="text-lg font-medium text-gray-900 mb-4 block">
                    Type d'énergie à comparer
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { value: 'electricity', label: 'Électricité', icon: Zap },
                      { value: 'gas', label: 'Gaz', icon: Building },
                      { value: 'both', label: 'Les deux', icon: Plus }
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        className={`
                          p-4 rounded-xl border-2 transition-all duration-200 text-center
                          ${formData.energyType === value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 text-gray-700'
                          }
                        `}
                        onClick={() => updateFormData({ energyType: value as any })}
                      >
                        <Icon className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-medium">{label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Option SIREN */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="noSiren"
                    checked={formData.noSiren}
                    onChange={(e) => updateFormData({ noSiren: e.target.checked })}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <Label htmlFor="noSiren" className="text-gray-700 cursor-pointer">
                    Je ne connais pas mon SIREN
                  </Label>
                </div>
              </div>
            </div>
          )}

          {/* Étape 2: Ma situation énergétique */}
          {currentStep === 2 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Dites-nous où vous en êtes aujourd'hui
                </h2>
              </div>

              <div className="space-y-6 max-w-3xl mx-auto">
                {/* Cartes de situation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StepCard
                    icon={RotateCcw}
                    title="Je souhaite changer de fournisseur"
                    description="Vous avez déjà un contrat et souhaitez trouver mieux"
                    isSelected={formData.situation === 'change_provider'}
                    onClick={() => updateFormData({ situation: 'change_provider' })}
                  />
                  
                  <StepCard
                    icon={MapPin}
                    title="J'aménage dans un nouveau local"
                    description="Vous déménagez et avez besoin d'un nouveau contrat"
                    isSelected={formData.situation === 'new_location'}
                    onClick={() => updateFormData({ situation: 'new_location' })}
                  />
                  
                  <StepCard
                    icon={Plus}
                    title="J'ouvre un nouveau site"
                    description="Compteur neuf, première mise en service"
                    isSelected={formData.situation === 'new_site'}
                    onClick={() => updateFormData({ situation: 'new_site' })}
                  />
                </div>

                {/* Zone facture */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Facture d'énergie (facultatif)
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <button
                        className={`
                          flex items-center space-x-3 px-6 py-3 rounded-lg border-2 transition-all
                          ${formData.hasInvoice 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-300 hover:border-blue-300'
                          }
                        `}
                        onClick={() => updateFormData({ hasInvoice: !formData.hasInvoice })}
                      >
                        <Upload className="w-5 h-5" />
                        <span>Téléverser une facture</span>
                      </button>
                      
                      <span className="text-gray-500">ou</span>
                      
                      <button
                        className={`
                          flex items-center space-x-3 px-6 py-3 rounded-lg border-2 transition-all
                          ${formData.needHelp 
                            ? 'border-green-500 bg-green-50 text-green-700' 
                            : 'border-gray-300 hover:border-green-300'
                          }
                        `}
                        onClick={() => updateFormData({ needHelp: !formData.needHelp })}
                      >
                        <Phone className="w-5 h-5" />
                        <span>Un conseiller m'aide</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>Vos informations restent strictement confidentielles. Nous ne partageons rien sans votre accord.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Étape 3: Mes coordonnées */}
          {currentStep === 3 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                  <Mail className="w-8 h-8 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Recevez vos meilleures offres personnalisées 💡
                </h2>
                <p className="text-xl text-gray-600">
                  Un expert Enerea vous rappelle sous 24h avec vos tarifs négociés.
                </p>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto">
                {/* Civilité */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Civilité</Label>
                    <Select value={formData.civility} onValueChange={(value) => updateFormData({ civility: value })}>
                      <SelectTrigger className="py-3">
                        <SelectValue placeholder="M./Mme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M.">M.</SelectItem>
                        <SelectItem value="Mme">Mme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2 block">Prénom</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Votre prénom"
                      value={formData.firstName}
                      onChange={(e) => updateFormData({ firstName: e.target.value })}
                      className="py-3"
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
                      className="py-3"
                    />
                  </div>
                </div>

                {/* Email et téléphone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(e) => updateFormData({ email: e.target.value })}
                      className="py-3"
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
                      className="py-3"
                    />
                  </div>
                </div>

                {/* Encadré rassurant */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900">Simulation gratuite et sans engagement</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">Votre conseiller dédié vous recontacte dans les prochaines 24h</span>
                    </div>
                  </div>
                </div>

                {/* Consentement */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={(e) => updateFormData({ consent: e.target.checked })}
                    className="w-5 h-5 text-blue-600 rounded mt-1"
                  />
                  <Label htmlFor="consent" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                    J'accepte d'être recontacté par Enerea et ses partenaires pour recevoir mes offres personnalisées. 
                    <a href="/politique-confidentialite" className="text-blue-600 hover:underline ml-1">
                      Voir la politique de confidentialité
                    </a>
                  </Label>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div>
          {currentStep > 1 && (
            <AnimatedButton
              variant="outline"
              onClick={handlePrevious}
              icon={ChevronLeft}
              iconPosition="left"
            >
              Étape précédente
            </AnimatedButton>
          )}
        </div>

        <div>
          {currentStep < 3 ? (
            <AnimatedButton
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              icon={ChevronRight}
              size="lg"
            >
              {currentStep === 1 ? 'Étape suivante → Voir mes économies' : 'Étape suivante → Presque terminé !'}
            </AnimatedButton>
          ) : (
            <AnimatedButton
              onClick={handleSubmit}
              disabled={!isStepValid(3)}
              loading={isLoading}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600"
            >
              Voir mes offres personnalisées →
            </AnimatedButton>
          )}
        </div>
      </div>
    </div>
  );
}
