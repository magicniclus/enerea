'use client';

import React, { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';

export const FirebaseTest: React.FC = () => {
  const [firebaseStatus, setFirebaseStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      // Test de connexion à Firebase
      if (auth) {
        setFirebaseStatus('connected');
      } else {
        setFirebaseStatus('error');
        setError('Firebase Auth non initialisé');
      }
    } catch (err: any) {
      setFirebaseStatus('error');
      setError(err.message);
    }
  }, []);

  if (firebaseStatus === 'loading') {
    return (
      <div className="fixed bottom-4 left-4 bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-sm">
        <span className="text-yellow-800">🔄 Test Firebase en cours...</span>
      </div>
    );
  }

  if (firebaseStatus === 'error') {
    return (
      <div className="fixed bottom-4 left-4 bg-red-100 border border-red-300 rounded-lg p-3 text-sm max-w-sm">
        <div className="text-red-800">
          <div className="font-medium">❌ Erreur Firebase</div>
          <div className="text-xs mt-1">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-green-100 border border-green-300 rounded-lg p-3 text-sm">
      <span className="text-green-800">✅ Firebase connecté</span>
    </div>
  );
};

export default FirebaseTest;
