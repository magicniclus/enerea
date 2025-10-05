'use client';

import { motion } from 'framer-motion';
import { Building, Mail, Phone, Calendar } from 'lucide-react';
import { config } from '@/lib/config';

export default function MentionsLegalesPage() {
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
              Mentions Légales
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Informations légales et réglementaires concernant notre site web.
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
            {/* Éditeur du site */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Éditeur du site</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p><strong>Raison sociale :</strong> {config.company.legalName}</p>
                <p><strong>Siège social :</strong> {config.company.address}</p>
                <p><strong>Capital social :</strong> 50 000 €</p>
                <p><strong>RCS :</strong> Paris B {config.company.siret}</p>
                <p><strong>SIRET :</strong> {config.company.siret}</p>
                <p><strong>Code APE :</strong> 6201Z</p>
                <p><strong>TVA intracommunautaire :</strong> FR12 123456789</p>
              </div>
            </div>

            {/* Directeur de publication */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Directeur de publication</h2>
              <div className="space-y-4 text-gray-600">
                <p><strong>Nom :</strong> {config.company.ceo}</p>
                <p><strong>Qualité :</strong> Président de {config.company.legalName}</p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p><strong>Adresse :</strong> {config.company.address}</p>
                <p><strong>Téléphone :</strong> <a href={`tel:${config.company.phone.replace(/\s/g, '')}`} className="text-gray-600 hover:text-gray-800 transition-colors">{config.company.phone}</a></p>
                <p><strong>Email :</strong> <a href={`mailto:${config.company.email}`} className="text-gray-600 hover:text-gray-800 transition-colors">{config.company.email}</a></p>
              </div>
            </div>

            {/* Hébergement */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hébergement</h2>
              <div className="space-y-4 text-gray-600">
                <p><strong>Hébergeur :</strong> OVH SAS</p>
                <p><strong>Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France</p>
                <p><strong>Téléphone :</strong> 1007</p>
                <p><strong>Site web :</strong> <a href="https://www.ovh.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">www.ovh.com</a></p>
              </div>
            </div>

            {/* Propriété intellectuelle */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Propriété intellectuelle</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                  Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p>
                  La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
                <p>
                  Les marques citées sur ce site sont déposées par les sociétés qui en sont propriétaires.
                </p>
              </div>
            </div>

            {/* Responsabilité */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Responsabilité</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, 
                  mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
                </p>
                <p>
                  Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email 
                  à l'adresse <a href={`mailto:${config.company.email}`} className="text-gray-600 hover:text-gray-800 transition-colors">{config.company.email}</a> 
                  en décrivant le problème de la manière la plus précise possible.
                </p>
                <p>
                  Tout contenu téléchargé se fait aux risques et périls de l'utilisateur et sous sa seule responsabilité.
                </p>
              </div>
            </div>

            {/* Liens hypertextes */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Liens hypertextes</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Les sites internet peuvent offrir des liens vers d'autres sites internet ou d'autres ressources disponibles sur Internet. 
                  {config.company.legalName} ne dispose d'aucun moyen pour contrôler les sites en connexion avec ses sites internet.
                </p>
                <p>
                  {config.company.legalName} ne répond pas de la disponibilité de tels sites et sources externes, ni ne la garantit. 
                  Elle ne peut être tenue pour responsable de tout dommage, de quelque nature que ce soit, résultant du contenu de ces sites ou sources externes.
                </p>
              </div>
            </div>

            {/* Protection des données */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Protection des données personnelles</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, 
                  la loi n° 2004-801 du 6 août 2004, l'article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.
                </p>
                <p>
                  Sur le site <strong>{config.company.name.toLowerCase().replace(/\s/g, '')}.fr</strong>, {config.company.legalName} ne collecte des informations personnelles 
                  relatives à l'utilisateur que pour le besoin de certains services proposés par le site. 
                  L'utilisateur fournit ces informations en toute connaissance de cause, notamment lorsqu'il procède par lui-même à leur saisie.
                </p>
                <p>
                  Conformément aux dispositions des articles 38 et suivants de la loi 78-17 du 6 janvier 1978 relative à l'informatique, 
                  aux fichiers et aux libertés, tout utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition 
                  aux données personnelles le concernant.
                </p>
                <p>
                  Pour l'exercer, adressez-vous à : <a href={`mailto:${config.company.email}`} className="text-gray-600 hover:text-gray-800 transition-colors">{config.company.email}</a>
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Le site <strong>{config.company.name.toLowerCase().replace(/\s/g, '')}.fr</strong> peut être amené à vous demander l'acceptation de cookies pour des besoins de statistiques et d'affichage. 
                  Un cookie est une information déposée sur votre disque dur par le serveur du site que vous visitez.
                </p>
                <p>
                  Il contient plusieurs données qui sont stockées sur votre ordinateur dans un simple fichier texte auquel un serveur accède pour lire et enregistrer des informations. 
                  Certaines parties de ce site ne peuvent être fonctionnelles sans l'acceptation de cookies.
                </p>
                <p>
                  Vous pouvez choisir de désactiver les cookies dans votre navigateur. Cependant, cela peut affecter le fonctionnement de certaines parties du site.
                </p>
              </div>
            </div>

            {/* Date de mise à jour */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Calendar className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Dernière mise à jour</span>
              </div>
              <p className="text-gray-600">25 août 2025</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}