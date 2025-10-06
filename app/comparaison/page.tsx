'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';

export default function ComparaisonPage() {
  const [formData, setFormData] = useState({
    typeClient: '',
    consommationAnnuelle: '',
    codePostal: '',
    typeEnergie: 'electricite'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de comparaison à implémenter
    console.log('Données du formulaire:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Comparez les offres d'énergie
          </h1>
          <p className="text-xl text-gray-600">
            Trouvez l'offre la plus adaptée à votre profil en quelques clics
          </p>
        </div>

        {/* Formulaire de comparaison */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type de client */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Vous êtes :
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                  <input
                    type="radio"
                    name="typeClient"
                    value="particulier"
                    checked={formData.typeClient === 'particulier'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${formData.typeClient === 'particulier' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                    {formData.typeClient === 'particulier' && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Particulier</div>
                    <div className="text-sm text-gray-600">Logement personnel</div>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                  <input
                    type="radio"
                    name="typeClient"
                    value="professionnel"
                    checked={formData.typeClient === 'professionnel'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${formData.typeClient === 'professionnel' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                    {formData.typeClient === 'professionnel' && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Professionnel</div>
                    <div className="text-sm text-gray-600">Entreprise, local commercial</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Type d'énergie */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Type d'énergie :
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                  <input
                    type="radio"
                    name="typeEnergie"
                    value="electricite"
                    checked={formData.typeEnergie === 'electricite'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${formData.typeEnergie === 'electricite' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                    {formData.typeEnergie === 'electricite' && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <span className="font-semibold text-gray-900">Électricité</span>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                  <input
                    type="radio"
                    name="typeEnergie"
                    value="gaz"
                    checked={formData.typeEnergie === 'gaz'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${formData.typeEnergie === 'gaz' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                    {formData.typeEnergie === 'gaz' && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    <span className="font-semibold text-gray-900">Gaz naturel</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Consommation annuelle */}
            <div>
              <label htmlFor="consommationAnnuelle" className="block text-sm font-semibold text-gray-700 mb-3">
                Consommation annuelle estimée (kWh) :
              </label>
              <input
                type="number"
                id="consommationAnnuelle"
                name="consommationAnnuelle"
                value={formData.consommationAnnuelle}
                onChange={handleInputChange}
                placeholder="Ex: 5000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-2">
                Vous pouvez trouver cette information sur votre dernière facture
              </p>
            </div>

            {/* Code postal */}
            <div>
              <label htmlFor="codePostal" className="block text-sm font-semibold text-gray-700 mb-3">
                Code postal :
              </label>
              <input
                type="text"
                id="codePostal"
                name="codePostal"
                value={formData.codePostal}
                onChange={handleInputChange}
                placeholder="Ex: 75001"
                maxLength={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Bouton de soumission */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Comparer les offres
              </button>
            </div>
          </form>

          {/* Informations de sécurité */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Service 100% gratuit et sans engagement</h4>
                <p className="text-sm text-blue-800">
                  Vos données sont sécurisées et ne seront jamais partagées avec des tiers sans votre consentement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
