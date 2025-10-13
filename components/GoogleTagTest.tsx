'use client';

import { useEffect, useState } from 'react';

export default function GoogleTagTest() {
  const [gtagLoaded, setGtagLoaded] = useState(false);
  const [dataLayerExists, setDataLayerExists] = useState(false);

  useEffect(() => {
    // Vérifier si gtag est chargé
    const checkGtag = () => {
      if (typeof window !== 'undefined') {
        setGtagLoaded(typeof window.gtag === 'function');
        setDataLayerExists(Array.isArray(window.dataLayer));
      }
    };

    // Vérifier immédiatement
    checkGtag();

    // Vérifier après un délai pour laisser le temps au script de se charger
    const timer = setTimeout(checkGtag, 2000);

    return () => clearTimeout(timer);
  }, []);

  const testConversion = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16405496127/test_conversion',
        'value': 1,
        'currency': 'EUR'
      });
      alert('Test de conversion envoyé ! Vérifiez dans Google Analytics.');
    } else {
      alert('gtag n\'est pas encore chargé.');
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null; // Ne pas afficher en production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-50">
      <h3 className="font-bold text-sm mb-2">Google Tag Test</h3>
      <div className="space-y-1 text-xs">
        <div className={`flex items-center space-x-2 ${gtagLoaded ? 'text-green-600' : 'text-red-600'}`}>
          <span>{gtagLoaded ? '✅' : '❌'}</span>
          <span>gtag function: {gtagLoaded ? 'Loaded' : 'Not loaded'}</span>
        </div>
        <div className={`flex items-center space-x-2 ${dataLayerExists ? 'text-green-600' : 'text-red-600'}`}>
          <span>{dataLayerExists ? '✅' : '❌'}</span>
          <span>dataLayer: {dataLayerExists ? 'Exists' : 'Missing'}</span>
        </div>
      </div>
      <button
        onClick={testConversion}
        className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
        disabled={!gtagLoaded}
      >
        Test Conversion
      </button>
    </div>
  );
}
