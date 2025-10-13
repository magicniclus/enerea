import siteConfig from '@/config/site-config.json';

export interface CompanyInfo {
  name: string;
  legalName: string;
  address: string;
  phone: string;
  email: string;
  siret: string;
  siren: string;
  rcs: string;
  codeApe: string;
  capitalSocial: string;
  tvaIntra: string;
  ceo: string;
}

export interface HeroConfig {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  backgroundImage?: string;
  backgroundVideo?: string;
}

export interface AboutSection {
  smallTitle: string;
  title: string;
  subtitle: string;
  content: string;
  gradientFrom: string;
  gradientTo: string;
  buttonText: string;
  buttonHref: string;
  reversed: boolean;
}

export interface AboutConfig {
  sections: AboutSection[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

export interface GalleryConfig {
  title: string;
  subtitle: string;
  initialDisplayCount: number;
  images?: GalleryImage[];
}

export interface ContactConfig {
  title: string;
  subtitle: string;
}

export interface TeamMember {
  name: string;
  position: string;
  description: string;
  photo: string;
}

export interface TeamConfig {
  members: TeamMember[];
}

export interface PartnerLogo {
  src: string;
  alt: string;
  name: string;
}

export interface PartnersConfig {
  logos: PartnerLogo[];
}

export interface ColorsConfig {
  primary: string;
  secondary: string;
  accent: string;
}

export interface SiteConfig {
  company: CompanyInfo;
  hero: HeroConfig;
  about: AboutConfig;
  gallery: GalleryConfig;
  contact: ContactConfig;
  team: TeamConfig;
  partners: PartnersConfig;
  colors: ColorsConfig;
}

// Default configuration fallback
const defaultConfig: SiteConfig = {
  company: {
    name: "Olege Bâtiment",
    legalName: "Olege Bâtiment SARL",
    address: "Île-de-France, France",
    phone: "06 05 59 88 97",
    email: "contact@olege-batiment.fr",
    siret: "À définir",
    siren: "À définir",
    rcs: "À définir",
    codeApe: "À définir",
    capitalSocial: "À définir",
    tvaIntra: "À définir",
    ceo: "Olege"
  },
  hero: {
    title: "Électricité, Peinture & Plâtrerie en Île-de-France",
    subtitle: "Artisan qualifié avec garantie décennale pour tous vos travaux de rénovation et construction dans un rayon de 100km",
    buttonText: "Demander un devis",
    buttonHref: "#contact",
    backgroundVideo: "video.mp4"
  },
  about: {
    sections: [
      {
        smallTitle: "Notre savoir-faire",
        title: "Expertise multi-métiers du bâtiment",
        subtitle: "Électricité, peinture et plâtrerie de qualité",
        content: "Spécialisés dans l'électricité, la peinture et la plâtrerie, nous intervenons sur tous types de chantiers en Île-de-France. Notre équipe de 2 à 5 collaborateurs qualifiés vous garantit des travaux conformes aux normes en vigueur, avec la sécurité d'une garantie décennale. Nous privilégions la qualité et la satisfaction client sur chaque intervention.",
        gradientFrom: "#2563eb",
        gradientTo: "#3b82f6",
        buttonText: "Voir nos prestations",
        buttonHref: "#services",
        reversed: false
      },
      {
        smallTitle: "Notre zone d'intervention",
        title: "Service de proximité en Île-de-France",
        subtitle: "Intervention dans un rayon de 100km",
        content: "Basés en Île-de-France, nous intervenons dans un rayon de 100 kilomètres pour répondre rapidement à vos besoins. Que ce soit pour une installation électrique, des travaux de peinture ou de plâtrerie, nous nous déplaçons chez vous avec tout le matériel nécessaire. Notre proximité géographique nous permet d'assurer un suivi personnalisé et des délais d'intervention optimisés.",
        gradientFrom: "#059669",
        gradientTo: "#10b981",
        buttonText: "Vérifier votre zone",
        buttonHref: "#contact",
        reversed: true
      }
    ]
  },
  gallery: {
    title: "Nos Réalisations",
    subtitle: "Découvrez nos travaux d'électricité, peinture et plâtrerie",
    initialDisplayCount: 4,
    images: []
  },
  contact: {
    title: "Contactez-nous",
    subtitle: "Devis gratuit et personnalisé"
  },
  team: {
    members: []
  },
  partners: {
    logos: []
  },
  colors: {
    primary: "#2563eb",
    secondary: "#059669",
    accent: "#3b82f6"
  }
};

// Merge config with defaults
function mergeWithDefaults(config: any, defaults: any): any {
  const result = { ...defaults };
  
  for (const key in config) {
    if (config[key] && typeof config[key] === 'object' && !Array.isArray(config[key])) {
      result[key] = mergeWithDefaults(config[key], defaults[key] || {});
    } else if (config[key] !== undefined && config[key] !== null) {
      result[key] = config[key];
    }
  }
  
  return result;
}

export const config: SiteConfig = mergeWithDefaults(siteConfig, defaultConfig);
