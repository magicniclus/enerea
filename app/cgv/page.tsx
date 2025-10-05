'use client';

import { motion } from 'framer-motion';
import { FileText, Shield, AlertCircle, Calendar } from 'lucide-react';
import { config } from '@/lib/config';

export default function CGVPage() {
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
              Conditions Générales de Vente
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Conditions régissant l'utilisation de nos services et la relation contractuelle.
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
                  Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre 
                  {config.company.legalName}, société par actions simplifiée au capital de 50 000 €, immatriculée au RCS de Paris 
                  sous le numéro B {config.company.siret}, dont le siège social est situé {config.company.address}, 
                  ci-après dénommée « {config.company.name} » ou « la Société », et toute personne physique ou morale, 
                  ci-après dénommée « le Client », souhaitant bénéficier des services proposés par TrouverMonChantier.
                </p>
                <p>
                  L'acceptation des présentes CGV est matérialisée par la validation de toute commande ou demande de service. 
                  Cette acceptation emporte adhésion entière et sans réserve aux présentes CGV.
                </p>
              </div>
            </div>

            {/* Article 1 - Objet */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 1 - Objet</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {config.company.name} est une plateforme de mise en relation entre particuliers et professionnels du bâtiment. 
                  La Société propose les services suivants :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Mise en relation avec des artisans et entrepreneurs qualifiés</li>
                  <li>Établissement de devis gratuits</li>
                  <li>Suivi de projets de construction et rénovation</li>
                  <li>Conseil et accompagnement personnalisé</li>
                  <li>Garanties sur les travaux réalisés</li>
                </ul>
              </div>
            </div>

            {/* Article 2 - Commandes */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 2 - Commandes et devis</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Toute demande de service doit faire l'objet d'une demande écrite (formulaire en ligne, email ou courrier). 
                  Un devis détaillé sera établi gratuitement et sans engagement.
                </p>
                <p>
                  Le devis est valable 30 jours à compter de sa date d'émission. Passé ce délai, 
                  {config.company.name} se réserve le droit de modifier les prix proposés.
                </p>
                <p>
                  L'acceptation du devis par le Client, matérialisée par sa signature et le versement de l'acompte éventuel, 
                  vaut commande ferme et définitive.
                </p>
              </div>
            </div>

            {/* Article 3 - Prix */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 3 - Prix et modalités de paiement</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Les prix sont exprimés en euros, toutes taxes comprises (TTC). Ils incluent la TVA au taux en vigueur 
                  à la date de facturation.
                </p>
                <p>
                  Les modalités de paiement sont les suivantes :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Acompte de 30% à la commande</li>
                  <li>40% à la livraison des matériaux ou au démarrage des travaux</li>
                  <li>Solde de 30% à la réception des travaux</li>
                </ul>
                <p>
                  Les paiements peuvent être effectués par chèque, virement bancaire ou carte bancaire. 
                  Tout retard de paiement entraînera l'application d'intérêts de retard au taux légal en vigueur.
                </p>
              </div>
            </div>

            {/* Article 4 - Délais */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 4 - Délais d'exécution</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Les délais d'exécution sont mentionnés dans le devis et courent à compter de la réception de l'acompte 
                  et de tous les éléments nécessaires à la réalisation des travaux.
                </p>
                <p>
                  Ces délais sont donnés à titre indicatif et peuvent être prolongés en cas de force majeure, 
                  d'intempéries exceptionnelles ou de modifications demandées par le Client.
                </p>
                <p>
                  En cas de retard imputable à {config.company.name}, le Client pourra demander l'application de pénalités 
                  de retard fixées à 0,1% du montant TTC des travaux par jour de retard.
                </p>
              </div>
            </div>

            {/* Article 5 - Garanties */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 5 - Garanties</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {config.company.name} garantit la conformité des travaux réalisés selon les règles de l'art et 
                  les normes en vigueur. Les garanties légales s'appliquent :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Garantie de parfait achèvement :</strong> 1 an à compter de la réception des travaux</li>
                  <li><strong>Garantie biennale :</strong> 2 ans pour les équipements dissociables</li>
                  <li><strong>Garantie décennale :</strong> 10 ans pour les éléments d'équipement indissociables</li>
                </ul>
                <p>
                  Tous nos artisans partenaires sont assurés et disposent des garanties légales obligatoires.
                </p>
              </div>
            </div>

            {/* Article 6 - Responsabilité */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 6 - Responsabilité</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {config.company.name} s'engage à mettre en œuvre tous les moyens nécessaires pour assurer 
                  la bonne exécution des travaux confiés aux artisans partenaires.
                </p>
                <p>
                  La responsabilité de {config.company.name} ne peut être engagée qu'en cas de faute prouvée 
                  dans la sélection ou le suivi des artisans partenaires.
                </p>
                <p>
                  En aucun cas, {config.company.name} ne pourra être tenue responsable des dommages indirects 
                  tels que perte d'exploitation, perte de clientèle, trouble commercial quelconque.
                </p>
              </div>
            </div>

            {/* Article 7 - Rétractation */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 7 - Droit de rétractation</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Conformément aux articles L.221-18 et suivants du Code de la consommation, le Client dispose 
                  d'un délai de 14 jours francs pour exercer son droit de rétractation sans avoir à justifier 
                  de motifs ni à payer de pénalités.
                </p>
                <p>
                  Ce délai court à compter de la signature du devis. Le droit de rétractation peut être exercé 
                  en adressant le formulaire de rétractation ou toute autre déclaration dénuée d'ambiguïté 
                  exprimant la volonté de se rétracter.
                </p>
                <p>
                  <strong>Exception :</strong> Le droit de rétractation ne peut être exercé si les travaux ont commencé 
                  avec l'accord exprès du Client avant la fin du délai de rétractation.
                </p>
              </div>
            </div>

            {/* Article 8 - Protection des données */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 8 - Protection des données personnelles</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {config.company.name} s'engage à respecter la réglementation en vigueur applicable au traitement 
                  des données personnelles, notamment le Règlement Général sur la Protection des Données (RGPD).
                </p>
                <p>
                  Les données collectées sont nécessaires à l'exécution du contrat et à la gestion de la relation client. 
                  Elles ne sont pas transmises à des tiers sans consentement préalable.
                </p>
                <p>
                  Le Client dispose d'un droit d'accès, de rectification, de suppression et de portabilité 
                  de ses données personnelles qu'il peut exercer en contactant : 
                  <a href={`mailto:${config.company.email}`} className="text-gray-600 hover:text-gray-800 transition-colors"> {config.company.email}</a>
                </p>
              </div>
            </div>

            {/* Article 9 - Litiges */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 9 - Règlement des litiges</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  En cas de litige, les parties s'efforceront de trouver une solution amiable. 
                  À défaut, le Client peut recourir à une médiation ou saisir les juridictions compétentes.
                </p>
                <p>
                  Pour les litiges de consommation, le Client peut recourir gratuitement au service de médiation 
                  de la consommation dont relève {config.company.name} ou à tout autre médiateur de la consommation.
                </p>
                <p>
                  Les présentes CGV sont soumises au droit français. En cas de litige, 
                  les tribunaux de Paris seront seuls compétents.
                </p>
              </div>
            </div>

            {/* Article 10 - Dispositions générales */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article 10 - Dispositions générales</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Si une ou plusieurs stipulations des présentes CGV étaient déclarées nulles en application 
                  d'une loi, d'un règlement ou à la suite d'une décision définitive d'une juridiction compétente, 
                  les autres stipulations garderont toute leur force et leur portée.
                </p>
                <p>
                  {config.company.name} se réserve le droit de modifier les présentes CGV à tout moment. 
                  Les CGV applicables sont celles en vigueur à la date de la commande.
                </p>
                <p>
                  Pour toute question relative aux présentes CGV, le Client peut contacter {config.company.name} 
                  à l'adresse suivante : <a href={`mailto:${config.company.email}`} className="text-gray-600 hover:text-gray-800 transition-colors">{config.company.email}</a>
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