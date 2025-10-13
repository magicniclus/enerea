import { useCallback } from 'react';
import { conversions, event, trackConversion } from '@/lib/gtag';

export const useTracking = () => {
  // Track form submissions
  const trackFormSubmission = useCallback((formType: string, formData?: any) => {
    switch (formType) {
      case 'devis':
        conversions.demandeDevis();
        event({
          action: 'form_submit',
          category: 'lead_generation',
          label: 'demande_devis'
        });
        break;
      
      case 'contact':
        conversions.contact();
        event({
          action: 'form_submit',
          category: 'engagement',
          label: 'contact_form'
        });
        break;
      
      case 'souscription':
        conversions.souscription(formData?.value);
        event({
          action: 'form_submit',
          category: 'conversion',
          label: 'souscription_offre'
        });
        break;
      
      default:
        event({
          action: 'form_submit',
          category: 'engagement',
          label: formType
        });
    }
  }, []);

  // Track button clicks
  const trackButtonClick = useCallback((buttonName: string, location?: string) => {
    conversions.ctaClick(buttonName);
    event({
      action: 'click',
      category: 'engagement',
      label: `${buttonName}${location ? `_${location}` : ''}`
    });
  }, []);

  // Track page engagement
  const trackPageEngagement = useCallback((engagementType: string, details?: string) => {
    event({
      action: engagementType,
      category: 'engagement',
      label: details || engagementType
    });
  }, []);

  // Track file downloads
  const trackDownload = useCallback((fileName: string, fileType?: string) => {
    conversions.downloadDocument(fileName);
    event({
      action: 'download',
      category: 'engagement',
      label: `${fileName}${fileType ? `_${fileType}` : ''}`
    });
  }, []);

  // Track phone calls
  const trackPhoneCall = useCallback(() => {
    event({
      action: 'phone_call',
      category: 'engagement',
      label: 'header_phone_click'
    });
  }, []);

  // Track email clicks
  const trackEmailClick = useCallback(() => {
    event({
      action: 'email_click',
      category: 'engagement',
      label: 'contact_email'
    });
  }, []);

  return {
    trackFormSubmission,
    trackButtonClick,
    trackPageEngagement,
    trackDownload,
    trackPhoneCall,
    trackEmailClick,
    // Direct access to conversion functions
    conversions,
    // Direct access to custom event tracking
    trackCustomEvent: event,
    trackCustomConversion: trackConversion
  };
};
