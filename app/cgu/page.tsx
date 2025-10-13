'use client';

import { motion } from 'framer-motion';
import { FileText, Globe, AlertTriangle, Calendar } from 'lucide-react';
import { config } from '@/lib/config';

export default function CGUPage() {
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
              Conditions Générales d'Utilisation
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Conditions d'utilisation du site web et des services en ligne d'{config.company.name}.
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
            {/* Préambule */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Préambule</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation du site web 
                  <strong> enerea.fr</strong> et des services en ligne proposés par {config.company.legalName}, 
                  société par actions simplifiée au capital de {config.company.capitalSocial} €, immatriculée au RCS de Paris 
                  sous le numéro {config.company.rcs}, dont le siège social est situé {config.company.address}.
                </p>
                <p>
                  L'utilisation du site web implique l'acceptation pleine et entière des présentes CGU. 
                  Si vous n'acceptez pas ces conditions, nous vous invitons à ne pas utiliser nos services en ligne.
                </p>
              </div>
            </div>

            {/* Article 1 - Définitions */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 1 - Définitions</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Site :</strong> Le site web enerea.fr et l'ensemble de ses pages</li>
                  <li><strong>Services :</strong> L'ensemble des services proposés sur le site (information, devis, souscription, espace client)</li>
                  <li><strong>Utilisateur :</strong> Toute personne physique ou morale utilisant le site</li>
                  <li><strong>Client :</strong> Utilisateur ayant souscrit à une offre énergétique d'{config.company.name}</li>
                  <li><strong>Contenu :</strong> Ensemble des éléments présents sur le site (textes, images, vidéos, etc.)</li>
                </ul>
              </div>
            </div>

            {/* Article 2 - Objet */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 2 - Objet du site</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Le site enerea.fr a pour objet de présenter les services d'{config.company.name} et de permettre :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>L'information sur nos offres d'électricité et de gaz naturel</li>
                  <li>La demande de devis personnalisés</li>
                  <li>La souscription en ligne à nos offres énergétiques</li>
                  <li>L'accès à l'espace client pour le suivi de consommation et la gestion du contrat</li>
                  <li>Le contact avec notre service client</li>
                  <li>L'accès à des conseils en efficacité énergétique</li>
                </ul>
              </div>
            </div>

            {/* Article 3 - Accès au site */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 3 - Accès au site</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  L'accès au site est gratuit pour tous les utilisateurs disposant d'un accès à Internet. 
                  Tous les frais supportés par l'utilisateur pour accéder au service (matériel informatique, 
                  logiciels, connexion Internet, etc.) sont à sa charge.
                </p>
                <p>
                  {config.company.name} se réserve le droit de refuser l'accès au site, unilatéralement et sans notification préalable, 
                  à tout utilisateur ne respectant pas les présentes conditions d'utilisation.
                </p>
                <p>
                  L'accès à certaines sections du site (espace client) nécessite une identification préalable. 
                  L'utilisateur s'engage à fournir des informations exactes et à maintenir ses données à jour.
                </p>
              </div>
            </div>

            {/* Article 4 - Utilisation du site */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 4 - Utilisation du site</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>L'utilisateur s'engage à utiliser le site de manière loyale et conforme à sa destination. Il est notamment interdit :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>D'utiliser le site à des fins illégales ou non autorisées</li>
                  <li>De porter atteinte à la sécurité ou à l'intégrité du site</li>
                  <li>De tenter d'accéder à des données non autorisées</li>
                  <li>De diffuser des virus ou tout code malveillant</li>
                  <li>De reproduire, copier ou vendre tout ou partie du contenu du site</li>
                  <li>D'usurper l'identité d'autrui ou de fournir des informations fausses</li>
                </ul>
                <p>
                  Toute utilisation abusive du site pourra entraîner la suspension immédiate de l'accès 
                  et des poursuites judiciaires si nécessaire.
                </p>
              </div>
            </div>

            {/* Article 5 - Propriété intellectuelle */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 5 - Propriété intellectuelle</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  L'ensemble du contenu du site (textes, images, vidéos, logos, graphismes, etc.) est protégé 
                  par les droits de propriété intellectuelle et appartient à {config.company.name} ou à ses partenaires.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou partie 
                  des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, 
                  sauf autorisation écrite préalable de {config.company.name}.
                </p>
                <p>
                  Les marques "{config.company.name}" et "OWN SERVICES" sont des marques déposées. 
                  Toute utilisation non autorisée de ces marques est interdite et constitue une contrefaçon.
                </p>
              </div>
            </div>

            {/* Article 6 - Données personnelles */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 6 - Protection des données personnelles</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {config.company.name} s'engage à respecter la réglementation en vigueur applicable au traitement 
                  des données personnelles et notamment le Règlement Général sur la Protection des Données (RGPD).
                </p>
                <p>
                  Les informations recueillies sur le site font l'objet d'un traitement informatique destiné 
                  à la gestion de la relation client, à l'amélioration de nos services et, avec votre consentement, 
                  à l'envoi d'informations commerciales.
                </p>
                <p>
                  Pour plus d'informations sur le traitement de vos données personnelles, 
                  consultez notre <a href="/politique-confidentialite" className="text-blue-600 hover:text-blue-800 underline">
                  Politique de Confidentialité</a>.
                </p>
              </div>
            </div>

            {/* Article 7 - Cookies */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 7 - Cookies</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Le site utilise des cookies pour améliorer l'expérience utilisateur, réaliser des statistiques 
                  de visite et proposer des contenus adaptés.
                </p>
                <p>
                  L'utilisateur peut configurer son navigateur pour refuser les cookies, mais cela peut affecter 
                  le bon fonctionnement de certaines fonctionnalités du site.
                </p>
                <p>
                  Pour plus d'informations sur notre utilisation des cookies, consultez notre politique de cookies.
                </p>
              </div>
            </div>

            {/* Article 8 - Responsabilité */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 8 - Responsabilité</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {config.company.name} s'efforce d'assurer l'exactitude et la mise à jour des informations 
                  diffusées sur le site, mais ne peut garantir l'exactitude, la précision ou l'exhaustivité 
                  des informations mises à disposition.
                </p>
                <p>
                  {config.company.name} ne pourra être tenue responsable des dommages directs ou indirects 
                  causés au matériel de l'utilisateur lors de l'accès au site, et résultant soit de l'utilisation 
                  d'un matériel ne répondant pas aux spécifications techniques requises, soit de l'apparition d'un bug ou d'une incompatibilité.
                </p>
                <p>
                  {config.company.name} ne pourra également être tenue responsable des dommages indirects 
                  (tels que perte de marché ou perte d'une chance) consécutifs à l'utilisation du site.
                </p>
              </div>
            </div>

            {/* Article 9 - Disponibilité */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 9 - Disponibilité du site</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {config.company.name} s'efforce d'assurer la disponibilité du site 24h/24 et 7j/7, 
                  mais ne peut garantir une disponibilité absolue.
                </p>
                <p>
                  Le site peut être temporairement indisponible en raison d'opérations de maintenance, 
                  de mises à jour, de pannes techniques ou de causes indépendantes de la volonté d'{config.company.name}.
                </p>
                <p>
                  {config.company.name} se réserve le droit de modifier, suspendre ou interrompre 
                  l'accès au site à tout moment et sans préavis.
                </p>
              </div>
            </div>

            {/* Article 10 - Liens externes */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 10 - Liens externes</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Le site peut contenir des liens vers d'autres sites web. {config.company.name} n'exerce aucun contrôle 
                  sur ces sites et décline toute responsabilité quant à leur contenu ou à leur politique de confidentialité.
                </p>
                <p>
                  L'existence d'un lien vers un autre site ne constitue pas une validation de ce site 
                  ou de son contenu par {config.company.name}.
                </p>
              </div>
            </div>

            {/* Article 11 - Modification des CGU */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 11 - Modification des CGU</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {config.company.name} se réserve le droit de modifier les présentes CGU à tout moment. 
                  Les modifications prennent effet dès leur publication sur le site.
                </p>
                <p>
                  Il appartient à l'utilisateur de consulter régulièrement les CGU pour prendre connaissance 
                  des éventuelles modifications.
                </p>
              </div>
            </div>

            {/* Article 12 - Droit applicable */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 12 - Droit applicable et juridiction</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Les présentes CGU sont soumises au droit français. En cas de litige, 
                  les tribunaux de Paris seront seuls compétents.
                </p>
                <p>
                  En cas de litige, les parties s'efforceront de trouver une solution amiable 
                  avant toute action judiciaire.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Pour toute question relative aux présentes CGU, vous pouvez nous contacter :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Par email : <a href={`mailto:${config.company.email}`} className="text-gray-600 hover:text-gray-800 transition-colors">{config.company.email}</a></li>
                  <li>Par téléphone : <a href={`tel:${config.company.phone.replace(/\s/g, '')}`} className="text-gray-600 hover:text-gray-800 transition-colors">{config.company.phone}</a></li>
                  <li>Par courrier : {config.company.address}</li>
                </ul>
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
