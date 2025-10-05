import { db } from '@/app/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface FormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motif: string;
  rgpd: boolean;
  source?: 'hero' | 'popup';
}

export const submitFormToFirebase = async (formData: FormData): Promise<string> => {
  try {
    const userId = process.env.NEXT_PUBLIC_FIREBASE_USER_ID;
    
    if (!userId) {
      throw new Error('NEXT_PUBLIC_FIREBASE_USER_ID not configured');
    }

    // Structure: clients/{userId}/projets
    const projetsCollection = collection(db, 'clients', userId, 'projets');
    
    const docData = {
      ...formData,
      dateCreation: serverTimestamp(),
      status: 'nouveau',
      uid: userId
    };

    const docRef = await addDoc(projetsCollection, docData);
    console.log('Document written with ID: ', docRef.id);
    
    // Send email notification via API route
    try {
      const emailData = {
        ...formData,
        dateCreation: new Date().toLocaleString('fr-FR')
      };
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      
      if (response.ok) {
        console.log('Email notification sent successfully');
      } else {
        console.error('Failed to send email notification');
      }
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't throw error - form submission should still succeed even if email fails
    }
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

export const validateFormData = (formData: FormData): boolean => {
  return !!(
    formData.nom &&
    formData.prenom &&
    formData.email &&
    formData.telephone &&
    formData.motif &&
    formData.rgpd
  );
};
