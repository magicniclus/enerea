// Google Analytics / Google Ads tracking functions

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = 'AW-16405496127';

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track conversions for Google Ads
export const trackConversion = (conversionLabel: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': `${GA_TRACKING_ID}/${conversionLabel}`,
      'value': value || 1,
      'currency': 'EUR'
    });
  }
};

// Predefined conversion events for Enerea
export const conversions = {
  // Demande de devis
  demandeDevis: () => trackConversion('devis_demande'),
  
  // Souscription à une offre
  souscription: (value?: number) => trackConversion('souscription', value),
  
  // Contact formulaire
  contact: () => trackConversion('contact_form'),
  
  // Téléchargement de document
  downloadDocument: (documentName: string) => {
    event({
      action: 'download',
      category: 'engagement',
      label: documentName
    });
  },
  
  // Consultation de page importante
  pageView: (pageName: string) => {
    event({
      action: 'page_view',
      category: 'navigation',
      label: pageName
    });
  },
  
  // Clic sur bouton CTA
  ctaClick: (ctaName: string) => {
    event({
      action: 'cta_click',
      category: 'engagement',
      label: ctaName
    });
  }
};
