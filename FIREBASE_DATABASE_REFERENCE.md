# 🔥 Firebase Database Reference - ENEREA

## 📊 Structure de la Base de Données Firestore

### 🎯 Collection `/prospects`

#### Structure du Document Prospect
```typescript
interface ProspectDocument {
  // === MÉTADONNÉES ===
  id: string;                    // ID auto-généré par Firebase
  createdAt: Timestamp;          // Date de création
  updatedAt: Timestamp;          // Dernière modification
  status: 'draft' | 'nouveau' | 'contacte' | 'converti' | 'perdu';
  source: 'comparateur_web' | 'landing_page' | 'referral';
  currentStep: number;           // Étape actuelle du formulaire (1-6)
  completionRate: number;        // Pourcentage de completion (0-100)
  
  // === INFORMATIONS PERSONNELLES ===
  contact: {
    civility?: 'M' | 'Mme';
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    contactName?: string;        // Nom du contact principal
  };
  
  // === INFORMATIONS ENTREPRISE ===
  company: {
    sirenNumber?: string;
    name?: string;
    address?: string;
    employeeCount?: '1-10' | '11-50' | '51-200' | '201-500' | '500+';
    activityType?: 'electricite' | 'gaz' | 'dual';
  };
  
  // === BESOINS ÉNERGÉTIQUES ===
  energy: {
    concurrenceReason?: string;
    electricityConsumption?: string;
    gasConsumption?: string;
    currentProvider?: string;
    contractType?: 'fixe' | 'variable' | 'indexe';
    budgetRange?: string;
    greenEnergy?: boolean;
  };
  
  // === COMPTEURS ÉLECTRICITÉ ===
  electricityMeters: Array<{
    id: string;                  // ID unique du compteur
    pdl?: string;               // Point de Livraison
    noData: boolean;            // Si pas de données disponibles
    power?: string;             // Puissance souscrite (pour nouveaux compteurs)
    serviceDate?: string;       // Date de mise en service
  }>;
  
  // === COMPTEURS GAZ ===
  gasMeters: Array<{
    id: string;                  // ID unique du compteur
    pce?: string;               // Point de Comptage et d'Estimation
    noData: boolean;            // Si pas de données disponibles
    consumptionRange?: string;  // Tranche de consommation
    serviceDate?: string;       // Date de mise en service
  }>;
  
  // === DOCUMENTS ET FICHIERS ===
  documents: {
    electricityBills: Array<{
      id: string;
      fileName: string;
      fileUrl: string;          // URL Firebase Storage
      uploadedAt: Timestamp;
      fileSize: number;
      mimeType: string;
    }>;
    gasBills: Array<{
      id: string;
      fileName: string;
      fileUrl: string;          // URL Firebase Storage
      uploadedAt: Timestamp;
      fileSize: number;
      mimeType: string;
    }>;
    otherDocuments: Array<{
      id: string;
      fileName: string;
      fileUrl: string;          // URL Firebase Storage
      uploadedAt: Timestamp;
      fileSize: number;
      mimeType: string;
      category: 'kbis' | 'rib' | 'mandat' | 'autre';
    }>;
  };
  
  // === CONSENTEMENTS ===
  consents: {
    dataProcessing: boolean;     // Traitement des données
    commercialContact: boolean;  // Contact commercial
    partnerSharing: boolean;     // Partage avec partenaires
    consentDate?: Timestamp;     // Date du consentement
    ipAddress?: string;          // IP de consentement
  };
  
  // === SUIVI COMMERCIAL ===
  tracking: {
    lastActivity?: Timestamp;    // Dernière activité
    assignedTo?: string;         // Commercial assigné
    notes: Array<{
      id: string;
      content: string;
      author: string;
      createdAt: Timestamp;
      type: 'call' | 'email' | 'meeting' | 'note';
    }>;
    tags: string[];             // Tags pour classification
  };
  
  // === ANALYTICS ===
  analytics: {
    sessionId?: string;         // ID de session
    userAgent?: string;         // Navigateur utilisé
    referrer?: string;          // Page de provenance
    timeSpent?: number;         // Temps passé sur le formulaire (secondes)
    stepTimings: {              // Temps passé par étape
      step1?: number;
      step2?: number;
      step3?: number;
      step4?: number;
      step5?: number;
      step6?: number;
    };
  };
}
```

## 📁 Firebase Storage Structure

### 🗂️ Organisation des Fichiers
```
/prospects/{prospectId}/
  ├── electricity-bills/
  │   ├── {fileId}_facture_electricite.pdf
  │   └── {fileId}_facture_electricite_2.pdf
  ├── gas-bills/
  │   ├── {fileId}_facture_gaz.pdf
  │   └── {fileId}_facture_gaz_2.pdf
  └── documents/
      ├── {fileId}_kbis.pdf
      ├── {fileId}_rib.pdf
      └── {fileId}_mandat.pdf
```

### 🔐 Règles de Sécurité Storage
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Prospects documents
    match /prospects/{prospectId}/{allPaths=**} {
      allow read, write: if request.auth != null;
      allow read: if resource.metadata.isPublic == true;
    }
  }
}
```

## 🔄 Flux de Données

### 1️⃣ **Création du Prospect (Page Comparaison)**
```typescript
// URL: /comparaison?prospectId=abc123
const createProspect = async (): Promise<string> => {
  const prospectData = {
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
    tracking: {
      notes: [],
      tags: []
    },
    analytics: {
      sessionId: generateSessionId(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      stepTimings: {}
    }
  };
  
  const docRef = await addDoc(collection(db, 'prospects'), prospectData);
  return docRef.id;
};
```

### 2️⃣ **Mise à Jour Progressive**
```typescript
const updateProspectStep = async (prospectId: string, stepData: any, stepNumber: number) => {
  const updateData = {
    ...stepData,
    updatedAt: serverTimestamp(),
    currentStep: stepNumber,
    completionRate: (stepNumber / 6) * 100,
    [`analytics.stepTimings.step${stepNumber}`]: Date.now()
  };
  
  await updateDoc(doc(db, 'prospects', prospectId), updateData);
};
```

### 3️⃣ **Upload de Fichiers**
```typescript
const uploadFile = async (
  prospectId: string, 
  file: File, 
  category: 'electricity-bills' | 'gas-bills' | 'documents'
): Promise<string> => {
  const fileId = generateId();
  const fileName = `${fileId}_${file.name}`;
  const filePath = `prospects/${prospectId}/${category}/${fileName}`;
  
  const storageRef = ref(storage, filePath);
  const uploadResult = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(uploadResult.ref);
  
  // Mise à jour du document prospect
  const fileData = {
    id: fileId,
    fileName: file.name,
    fileUrl: downloadURL,
    uploadedAt: serverTimestamp(),
    fileSize: file.size,
    mimeType: file.type
  };
  
  await updateDoc(doc(db, 'prospects', prospectId), {
    [`documents.${category}`]: arrayUnion(fileData)
  });
  
  return downloadURL;
};
```

## 📋 Règles de Sécurité Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Collection prospects
    match /prospects/{prospectId} {
      // Lecture : utilisateurs authentifiés ou prospects publics
      allow read: if request.auth != null || 
                     resource.data.status == 'draft';
      
      // Écriture : utilisateurs authentifiés
      allow write: if request.auth != null;
      
      // Création : toujours autorisée (pour les formulaires publics)
      allow create: if true;
      
      // Mise à jour : vérifier que certains champs ne sont pas modifiés
      allow update: if request.auth != null &&
                       request.resource.data.createdAt == resource.data.createdAt;
    }
  }
}
```

## 🔍 Requêtes Optimisées

### 📊 **Dashboard - Liste des Prospects**
```typescript
// Prospects récents
const getRecentProspects = () => {
  return query(
    collection(db, 'prospects'),
    where('status', '!=', 'draft'),
    orderBy('status'),
    orderBy('updatedAt', 'desc'),
    limit(50)
  );
};

// Prospects par statut
const getProspectsByStatus = (status: string) => {
  return query(
    collection(db, 'prospects'),
    where('status', '==', status),
    orderBy('updatedAt', 'desc')
  );
};

// Prospects incomplets (abandonnés)
const getIncompleteProspects = () => {
  return query(
    collection(db, 'prospects'),
    where('status', '==', 'draft'),
    where('updatedAt', '<', Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000))),
    orderBy('updatedAt', 'desc')
  );
};
```

### 🔎 **Recherche et Filtres**
```typescript
// Index composites requis dans Firestore :
// - status + updatedAt (desc)
// - company.activityType + status + updatedAt (desc)
// - contact.email + status
// - company.employeeCount + status + updatedAt (desc)
```

## 📈 Analytics et Métriques

### 🎯 **KPIs Calculés**
```typescript
interface ProspectAnalytics {
  totalProspects: number;
  conversionRate: number;        // (convertis / total) * 100
  averageCompletionTime: number; // Temps moyen de completion
  abandonmentByStep: {           // Taux d'abandon par étape
    step1: number;
    step2: number;
    step3: number;
    step4: number;
    step5: number;
    step6: number;
  };
  topSources: Array<{           // Sources les plus performantes
    source: string;
    count: number;
    conversionRate: number;
  }>;
}
```

## 🔄 Synchronisation Temps Réel

### 📡 **Listeners pour le Dashboard**
```typescript
// Écoute des changements en temps réel
const useProspectsRealtime = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  
  useEffect(() => {
    const q = query(
      collection(db, 'prospects'),
      where('status', '!=', 'draft'),
      orderBy('status'),
      orderBy('updatedAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prospectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProspects(prospectsData);
    });
    
    return unsubscribe;
  }, []);
  
  return prospects;
};
```

## 🚀 Optimisations Performance

### ⚡ **Stratégies de Cache**
- **Cache local** : Utiliser React Query pour cache côté client
- **Pagination** : Limiter à 50 prospects par page
- **Lazy loading** : Charger les documents à la demande
- **Compression** : Compresser les images avant upload

### 🔧 **Index Firestore Requis**
```
Collection: prospects
- status (Ascending) + updatedAt (Descending)
- company.activityType (Ascending) + status (Ascending) + updatedAt (Descending)
- contact.email (Ascending) + status (Ascending)
- createdAt (Descending)
- completionRate (Descending)
```

## 📝 Notes Importantes

1. **IDs URL** : Utiliser des IDs courts et sécurisés pour les URLs publiques
2. **Validation** : Valider toutes les données côté client ET serveur
3. **Backup** : Sauvegarder automatiquement les données toutes les 24h
4. **RGPD** : Implémenter la suppression automatique après consentement retiré
5. **Monitoring** : Surveiller les erreurs et performances avec Firebase Analytics
