'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight, Home, FileText, Phone } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import Logo from '@/components/Logo';

function MerciPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [prospectId, setProspectId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('prospectId');
    if (id) {
      setProspectId(id);
    } else {
      // Si pas d'ID, rediriger vers l'accueil après 5 secondes
      setTimeout(() => {
        router.push('/');
      }, 5000);
    }
  }, [searchParams, router]);

  return (
    <>
      <Head>
        <title>Merci pour votre demande | ENEREA</title>
        <meta name="description" content="Votre demande de comparaison énergétique a été transmise avec succès. Notre équipe vous recontactera sous 24h." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <Logo />
            </Link>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Icône de succès */}
          <div className="mx-auto flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Merci pour votre demande !
          </h1>

          {/* Sous-titre */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Votre demande de comparaison énergétique a été transmise avec succès. 
            Notre équipe d'experts va analyser vos besoins et vous recontacter sous 24h.
          </p>

          {/* Informations sur le prospect */}
          {prospectId && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Référence de votre demande
              </h3>
              <p className="text-blue-700 font-mono text-sm break-all">
                {prospectId}
              </p>
              <p className="text-blue-600 text-xs mt-2">
                Conservez cette référence pour le suivi de votre dossier
              </p>
            </div>
          )}

          {/* Prochaines étapes */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Que va-t-il se passer maintenant ?
            </h2>
            
            <div className="space-y-6 text-left">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Analyse de votre profil</h3>
                  <p className="text-gray-600 text-sm">
                    Nos experts analysent vos données de consommation et vos besoins spécifiques
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Sélection des meilleures offres</h3>
                  <p className="text-gray-600 text-sm">
                    Nous négocions avec nos partenaires pour vous proposer les tarifs les plus avantageux
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Prise de contact personnalisée</h3>
                  <p className="text-gray-600 text-sm">
                    Un conseiller vous contacte sous 24h pour vous présenter vos options
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/"
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Retour à l'accueil</span>
            </Link>

            <Link 
              href="/contact"
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Nous contacter</span>
            </Link>
          </div>

        </div>
      </main>

      {/* Footer simple */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; 2024 ENEREA. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

export default function MerciPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <MerciPageContent />
    </Suspense>
  );
}
