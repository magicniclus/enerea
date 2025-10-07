import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface ProspectData {
  // Informations personnelles
  civility?: string;
  firstName?: string;
  lastName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  
  // Informations entreprise
  sirenNumber?: string;
  companyName?: string;
  companyAddress?: string;
  employeeCount?: string;
  
  // Informations énergie
  activityType?: string;
  concurrenceReason?: string;
  electricityConsumption?: string;
  gasConsumption?: string;
  currentProvider?: string;
  contractType?: string;
  budgetRange?: string;
  greenEnergy?: boolean;
  
  // Compteurs
  electricityMeters?: Array<{
    id: string;
    pdl: string;
    noData: boolean;
  }>;
  gasMeters?: Array<{
    id: string;
    pce: string;
    noData: boolean;
  }>;
  
  // Mise en service (pour compteurs neufs)
  electricityPower?: string;
  electricityServiceDate?: string;
  gasConsumptionRange?: string;
  gasServiceDate?: string;
  
  // Consentement
  consentGiven?: boolean;
  
  // Métadonnées
  status?: 'nouveau' | 'contacte' | 'converti';
  source?: string;
}

export const saveProspect = async (prospectData: ProspectData): Promise<string> => {
  try {
    const prospectsRef = collection(db, 'prospects');
    
    const docData = {
      ...prospectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'nouveau',
      source: 'comparateur_web'
    };
    
    const docRef = await addDoc(prospectsRef, docData);
    console.log('Prospect sauvegardé avec ID:', docRef.id);
    
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du prospect:', error);
    throw new Error('Erreur lors de la sauvegarde des données');
  }
};

export const formatProspectForSave = (formData: any): ProspectData => {
  return {
    // Informations personnelles
    civility: formData.civility,
    firstName: formData.firstName,
    lastName: formData.lastName,
    contactName: formData.contactName,
    email: formData.email,
    phone: formData.phone,
    
    // Informations entreprise
    sirenNumber: formData.sirenNumber,
    companyName: formData.companyName,
    companyAddress: formData.companyAddress,
    employeeCount: formData.employeeCount,
    
    // Informations énergie
    activityType: formData.activityType,
    concurrenceReason: formData.concurrenceReason,
    electricityConsumption: formData.electricityConsumption,
    gasConsumption: formData.gasConsumption,
    currentProvider: formData.currentProvider,
    contractType: formData.contractType,
    budgetRange: formData.budgetRange,
    greenEnergy: formData.greenEnergy,
    
    // Compteurs
    electricityMeters: formData.electricityMeters || [],
    gasMeters: formData.gasMeters || [],
    
    // Mise en service
    electricityPower: formData.electricityPower,
    electricityServiceDate: formData.electricityServiceDate,
    gasConsumptionRange: formData.gasConsumptionRange,
    gasServiceDate: formData.gasServiceDate,
    
    // Consentement
    consentGiven: formData.consentGiven,
  };
};
