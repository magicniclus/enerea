// Global type definitions for Enerea

// Google Analytics / Google Ads types
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: {
        page_path?: string;
        page_title?: string;
        page_location?: string;
        send_to?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        currency?: string;
        [key: string]: string | number | boolean | undefined;
      }
    ) => void;
    dataLayer?: Array<{
      event?: string;
      [key: string]: string | number | boolean | undefined;
    }>;
  }
}

// Form data interface
export interface FormData {
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

// Tracking event interface
export interface TrackingEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export {};
