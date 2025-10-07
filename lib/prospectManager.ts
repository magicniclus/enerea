import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  serverTimestamp,
  arrayUnion,
  Timestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './firebase';

// Types pour la structure des données
export interface ProspectDocument {
  id?: string;
  createdAt?: any;
  updatedAt?: any;
  status: 'draft' | 'nouveau' | 'contacte' | 'converti' | 'perdu';
  source: 'comparateur_web' | 'landing_page' | 'referral';
  currentStep: number;
  completionRate: number;
  
  contact: {
    civility?: 'M' | 'Mme';
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    contactName?: string;
  };
  
  company: {
    sirenNumber?: string;
    name?: string;
    address?: string;
    employeeCount?: string;
    activityType?: 'electricite' | 'gaz' | 'dual';
  };
  
  energy: {
    concurrenceReason?: string;
    electricityConsumption?: string;
    gasConsumption?: string;
    currentProvider?: string;
    contractType?: string;
    budgetRange?: string;
    greenEnergy?: boolean;
  };
  
  electricityMeters: Array<{
    id: string;
    pdl?: string;
    noData: boolean;
    power?: string;
    serviceDate?: string;
  }>;
  
  gasMeters: Array<{
    id: string;
    pce?: string;
    noData: boolean;
    consumptionRange?: string;
    serviceDate?: string;
  }>;
  
  documents: {
    electricityBills: Array<{
      id: string;
      fileName: string;
      fileUrl: string;
      uploadedAt: any;
      fileSize: number;
      mimeType: string;
    }>;
    gasBills: Array<{
      id: string;
      fileName: string;
      fileUrl: string;
      uploadedAt: any;
      fileSize: number;
      mimeType: string;
    }>;
    otherDocuments: Array<{
      id: string;
      fileName: string;
      fileUrl: string;
      uploadedAt: any;
      fileSize: number;
      mimeType: string;
      category: string;
    }>;
  };
  
  consents: {
    dataProcessing: boolean;
    commercialContact: boolean;
    partnerSharing: boolean;
    consentDate?: any;
    ipAddress?: string;
  };
  
  analytics: {
    sessionId?: string;
    userAgent?: string;
    referrer?: string;
    timeSpent?: number;
    stepTimings: {
      step1?: number;
      step2?: number;
      step3?: number;
      step4?: number;
      step5?: number;
      step6?: number;
    };
  };
}

// Générer un ID de session unique
const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Créer un nouveau prospect
export const createProspect = async (): Promise<string> => {
  try {
    const prospectData: Omit<ProspectDocument, 'id'> = {
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'draft',
      source: 'comparateur_web',
      currentStep: 1,
      completionRate: 0,
      
      contact: {},
      company: {},
      energy: {},
      electricityMeters: [],
      gasMeters: [],
      
      documents: {
        electricityBills: [],
        gasBills: [],
        otherDocuments: []
      },
      
      consents: {
        dataProcessing: false,
        commercialContact: false,
        partnerSharing: false
      },
      
      analytics: {
        sessionId: generateSessionId(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        timeSpent: 0,
        stepTimings: {}
      }
    };
    
    const docRef = await addDoc(collection(db, 'prospects'), prospectData);
    console.log('Prospect créé avec ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création du prospect:', error);
    throw new Error('Erreur lors de la création du prospect');
  }
};

// Récupérer un prospect par ID
export const getProspect = async (prospectId: string): Promise<ProspectDocument | null> => {
  try {
    const docRef = doc(db, 'prospects', prospectId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as ProspectDocument;
    } else {
      console.log('Aucun prospect trouvé avec cet ID');
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du prospect:', error);
    throw new Error('Erreur lors de la récupération du prospect');
  }
};

// Mettre à jour un prospect (étape par étape)
export const updateProspectStep = async (
  prospectId: string, 
  stepData: Partial<ProspectDocument>, 
  stepNumber: number
): Promise<void> => {
  try {
    const updateData = {
      ...stepData,
      updatedAt: serverTimestamp(),
      currentStep: stepNumber,
      completionRate: Math.round((stepNumber / 6) * 100),
      [`analytics.stepTimings.step${stepNumber}`]: Date.now()
    };
    
    await updateDoc(doc(db, 'prospects', prospectId), updateData);
    console.log(`Prospect ${prospectId} mis à jour - Étape ${stepNumber}`);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du prospect:', error);
    throw new Error('Erreur lors de la mise à jour du prospect');
  }
};

// Finaliser un prospect (étape finale)
export const finalizeProspect = async (
  prospectId: string, 
  finalData: Partial<ProspectDocument>
): Promise<void> => {
  try {
    const updateData = {
      ...finalData,
      updatedAt: serverTimestamp(),
      status: 'nouveau',
      currentStep: 6,
      completionRate: 100,
      'analytics.timeSpent': Date.now(),
      'consents.consentDate': serverTimestamp(),
      'consents.ipAddress': await getClientIP()
    };
    
    await updateDoc(doc(db, 'prospects', prospectId), updateData);
    console.log(`Prospect ${prospectId} finalisé`);
  } catch (error) {
    console.error('Erreur lors de la finalisation du prospect:', error);
    throw new Error('Erreur lors de la finalisation du prospect');
  }
};

// Upload d'un fichier
export const uploadProspectFile = async (
  prospectId: string,
  file: File,
  category: 'electricity-bills' | 'gas-bills' | 'documents',
  documentCategory?: string
): Promise<string> => {
  try {
    const fileId = generateSessionId();
    const fileName = `${fileId}_${file.name}`;
    const filePath = `prospects/${prospectId}/${category}/${fileName}`;
    
    // Upload vers Firebase Storage
    const storageRef = ref(storage, filePath);
    const uploadResult = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(uploadResult.ref);
    
    // Préparer les données du fichier
    const fileData = {
      id: fileId,
      fileName: file.name,
      fileUrl: downloadURL,
      uploadedAt: new Date().toISOString(),
      fileSize: file.size,
      mimeType: file.type,
      ...(documentCategory && { category: documentCategory })
    };
    
    // Mettre à jour le document prospect
    const categoryKey = category === 'electricity-bills' ? 'electricityBills' : 
                       category === 'gas-bills' ? 'gasBills' : 'otherDocuments';
    const updateField = `documents.${categoryKey}`;
    await updateDoc(doc(db, 'prospects', prospectId), {
      [updateField]: arrayUnion(fileData),
      updatedAt: serverTimestamp()
    });
    
    console.log(`Fichier uploadé pour le prospect ${prospectId}:`, fileName);
    return downloadURL;
  } catch (error) {
    console.error('Erreur lors de l\'upload du fichier:', error);
    throw new Error('Erreur lors de l\'upload du fichier');
  }
};

// Supprimer un fichier
export const deleteProspectFile = async (
  prospectId: string,
  fileId: string,
  category: 'electricity-bills' | 'gas-bills' | 'documents'
): Promise<void> => {
  try {
    // Récupérer le prospect pour obtenir les infos du fichier
    const prospect = await getProspect(prospectId);
    if (!prospect) throw new Error('Prospect non trouvé');
    
    const categoryKey = category === 'electricity-bills' ? 'electricityBills' : 
                       category === 'gas-bills' ? 'gasBills' : 'otherDocuments';
    const files = prospect.documents[categoryKey];
    const fileToDelete = files.find((f: any) => f.id === fileId);
    
    if (!fileToDelete) throw new Error('Fichier non trouvé');
    
    // Supprimer de Firebase Storage
    const fileRef = ref(storage, fileToDelete.fileUrl);
    await deleteObject(fileRef);
    
    // Mettre à jour le document (retirer le fichier du tableau)
    const updatedFiles = files.filter((f: any) => f.id !== fileId);
    await updateDoc(doc(db, 'prospects', prospectId), {
      [`documents.${categoryKey}`]: updatedFiles,
      updatedAt: serverTimestamp()
    });
    
    console.log(`Fichier supprimé pour le prospect ${prospectId}:`, fileToDelete.fileName);
  } catch (error) {
    console.error('Erreur lors de la suppression du fichier:', error);
    throw new Error('Erreur lors de la suppression du fichier');
  }
};

// Obtenir l'IP du client (pour le consentement)
const getClientIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'IP:', error);
    return 'unknown';
  }
};

// Utilitaires pour la gestion des étapes
export const STEP_NAMES = {
  1: 'Informations entreprise',
  2: 'Besoins énergétiques', 
  3: 'Compteurs électricité',
  4: 'Compteurs gaz',
  5: 'Documents',
  6: 'Contact et validation'
};

export const getStepProgress = (currentStep: number): number => {
  return Math.round((currentStep / 6) * 100);
};

export const isStepComplete = (prospect: ProspectDocument, step: number): boolean => {
  switch (step) {
    case 1:
      return !!(prospect.company.name && prospect.company.activityType);
    case 2:
      return !!(prospect.energy.concurrenceReason);
    case 3:
      return prospect.company.activityType === 'gaz' || prospect.electricityMeters.length > 0;
    case 4:
      return prospect.company.activityType === 'electricite' || prospect.gasMeters.length > 0;
    case 5:
      return true; // Documents optionnels
    case 6:
      return !!(prospect.contact.email && prospect.consents.dataProcessing);
    default:
      return false;
  }
};
