'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Calendar } from 'lucide-react';
import { config } from '@/lib/config';

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20 overflow-hidden">
        {/* Optional background image overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              Politique de Confidentialité
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Protection et traitement de vos données personnelles chez {config.company.name}.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {config.company.legalName}, société par actions simplifiée au capital de {config.company.capitalSocial} €, 
                  immatriculée au RCS de Paris sous le numéro {config.company.rcs}, dont le siège social est situé {config.company.address}, 
                  ci-après dénommée « {config.company.name} », s'engage à protéger la confidentialité et la sécurité des données personnelles 
                  de ses clients et utilisateurs.
                </p>
                <p>
                  La présente politique de confidentialité décrit comment nous collectons, utilisons, stockons et protégeons 
                  vos données personnelles dans le cadre de nos services de fourniture d'énergie, conformément au Règlement Général 
                  sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
                </p>
              </div>
            </div>

            {/* Responsable du traitement */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Responsable du traitement</h2>
              <div className="space-y-4 text-gray-600">
                <p><strong>Responsable :</strong> {config.company.legalName}</p>
                <p><strong>Représentant légal :</strong> {config.company.ceo}, Président</p>
                <p><strong>Adresse :</strong> {config.company.address}</p>
                <p><strong>Email :</strong> <a href={`mailto:${config.company.email}`} className="text-gray-600 hover:text-gray-800 transition-colors">{config.company.email}</a></p>
                <p><strong>Téléphone :</strong> <a href={`tel:${config.company.phone.replace(/\s/g, '')}`} className="text-gray-600 hover:text-gray-800 transition-colors">{config.company.phone}</a></p>
              </div>
            </div>

            {/* Données collectées */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Database className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Données collectées</h2>
                </div>
              </div>
              
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Données d'identification</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Nom, prénom, raison sociale</li>
                    <li>Adresse postale complète</li>
                    <li>Numéro de téléphone</li>
                    <li>Adresse email</li>
                    <li>Date de naissance (pour les particuliers)</li>
                    <li>Numéro SIRET (pour les professionnels)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Données de consommation énergétique</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Numéro de Point de Livraison (PDL) ou Point de Comptage et d'Estimation (PCE)</li>
                    <li>Historique de consommation d'électricité et/ou de gaz</li>
                    <li>Index de compteur</li>
                    <li>Puissance souscrite</li>
                    <li>Type de compteur et caractéristiques techniques</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Données contractuelles et financières</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Informations sur l'offre souscrite</li>
                    <li>Modalités de paiement choisies</li>
                    <li>Coordonnées bancaires (RIB)</li>
                    <li>Historique de facturation et paiements</li>
                    <li>Données relatives aux réclamations et au service client</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Finalités du traitement */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Finalités du traitement</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Vos données personnelles sont collectées et traitées pour les finalités suivantes :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Gestion des contrats :</strong> Souscription, modification, résiliation des contrats de fourniture d'énergie</li>
                  <li><strong>Facturation et encaissement :</strong> Établissement des factures, gestion des paiements et du recouvrement</li>
                  <li><strong>Service client :</strong> Traitement des demandes, réclamations et assistance technique</li>
                  <li><strong>Gestion des points de livraison :</strong> Mise en service, relevés, maintenance</li>
                  <li><strong>Obligations légales :</strong> Respect des obligations réglementaires du secteur énergétique</li>
                  <li><strong>Amélioration des services :</strong> Analyse de la satisfaction client et développement de nouveaux services</li>
                  <li><strong>Marketing :</strong> Envoi d'offres commerciales personnalisées (avec votre consentement)</li>
                </ul>
              </div>
            </div>

            {/* Base légale */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Base légale du traitement</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Le traitement de vos données personnelles repose sur les bases légales suivantes :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Exécution du contrat :</strong> Pour la fourniture d'énergie et la gestion de votre contrat</li>
                  <li><strong>Obligation légale :</strong> Pour respecter nos obligations réglementaires (Code de l'énergie, etc.)</li>
                  <li><strong>Intérêt légitime :</strong> Pour l'amélioration de nos services et la prévention de la fraude</li>
                  <li><strong>Consentement :</strong> Pour l'envoi de communications marketing (révocable à tout moment)</li>
                </ul>
              </div>
            </div>

            {/* Destinataires */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Destinataires des données</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Vos données personnelles peuvent être transmises aux destinataires suivants :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Gestionnaires de réseaux :</strong> Enedis, GRDF pour la gestion technique des points de livraison</li>
                  <li><strong>Prestataires techniques :</strong> Sociétés de services informatiques, centres d'appels</li>
                  <li><strong>Partenaires financiers :</strong> Établissements bancaires pour les prélèvements et virements</li>
                  <li><strong>Autorités compétentes :</strong> CRE, médiateur de l'énergie, administrations fiscales</li>
                  <li><strong>Sous-traitants :</strong> Prestataires de services agissant pour notre compte</li>
                </ul>
                <p>
                  Tous nos partenaires et sous-traitants sont tenus par des obligations contractuelles strictes 
                  de confidentialité et de sécurité des données.
                </p>
              </div>
            </div>

            {/* Durée de conservation */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Durée de conservation</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Vos données sont conservées pendant les durées suivantes :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Données contractuelles :</strong> 5 ans après la fin du contrat</li>
                  <li><strong>Données de facturation :</strong> 10 ans conformément aux obligations comptables</li>
                  <li><strong>Données de consommation :</strong> 5 ans après la fin du contrat</li>
                  <li><strong>Données de prospection :</strong> 3 ans après le dernier contact</li>
                  <li><strong>Données de réclamation :</strong> 1 an après la clôture du dossier</li>
                </ul>
                <p>
                  À l'expiration de ces délais, vos données sont supprimées ou anonymisées, 
                  sauf obligation légale de conservation plus longue.
                </p>
              </div>
            </div>

            {/* Vos droits */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Vos droits</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données personnelles</li>
                  <li><strong>Droit de rectification :</strong> Corriger des données inexactes ou incomplètes</li>
                  <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données dans certains cas</li>
                  <li><strong>Droit à la limitation :</strong> Limiter le traitement de vos données</li>
                  <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré</li>
                  <li><strong>Droit d'opposition :</strong> Vous opposer au traitement pour des raisons légitimes</li>
                  <li><strong>Droit de retrait du consentement :</strong> Retirer votre consentement à tout moment</li>
                </ul>
                <p>
                  Pour exercer ces droits, contactez-nous à l'adresse : 
                  <a href={`mailto:${config.company.email}`} className="text-gray-600 hover:text-gray-800 transition-colors"> {config.company.email}</a>
                </p>
                <p>
                  Vous disposez également du droit d'introduire une réclamation auprès de la CNIL 
                  (Commission Nationale de l'Informatique et des Libertés).
                </p>
              </div>
            </div>

            {/* Sécurité */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Lock className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Sécurité des données</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {config.company.name} met en œuvre des mesures techniques et organisationnelles appropriées 
                  pour assurer la sécurité de vos données personnelles :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Chiffrement des données sensibles</li>
                  <li>Contrôle d'accès strict aux données</li>
                  <li>Sauvegarde régulière des données</li>
                  <li>Formation du personnel à la protection des données</li>
                  <li>Audits de sécurité réguliers</li>
                  <li>Procédures de notification en cas de violation de données</li>
                </ul>
              </div>
            </div>

            {/* Cookies */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies et technologies similaires</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Notre site web utilise des cookies pour améliorer votre expérience utilisateur et analyser 
                  l'utilisation de nos services. Vous pouvez gérer vos préférences de cookies via les paramètres 
                  de votre navigateur.
                </p>
                <p>
                  Pour plus d'informations sur notre utilisation des cookies, consultez notre politique de cookies 
                  disponible sur notre site web.
                </p>
              </div>
            </div>

            {/* Modifications */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Modifications de la politique</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {config.company.name} se réserve le droit de modifier la présente politique de confidentialité 
                  à tout moment. Toute modification sera portée à votre connaissance par email ou via notre site web.
                </p>
                <p>
                  Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance 
                  des éventuelles modifications.
                </p>
              </div>
            </div>

            {/* Date de mise à jour */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Calendar className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Dernière mise à jour</span>
              </div>
              <p className="text-gray-600">13 octobre 2024</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
