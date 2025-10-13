import type { Metadata } from "next";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import Analytics from "@/components/Analytics";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "ENEREA - Comparateur d'Énergie Professionnel | Électricité & Gaz",
  description: "Comparez gratuitement les offres d'électricité et de gaz naturel pour votre entreprise. Plus de 30 fournisseurs partenaires. Économisez jusqu'à 40% sur vos factures énergétiques. Devis personnalisé en 24h.",
  keywords: [
    "comparateur énergie entreprise",
    "électricité professionnelle",
    "gaz naturel entreprise",
    "fournisseur énergie",
    "devis électricité",
    "économies énergie",
    "ENEREA",
    "courtier énergie",
    "marché de l'énergie",
    "contrat électricité gaz"
  ],
  authors: [{ name: "ENEREA" }],
  creator: "ENEREA",
  publisher: "ENEREA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://enerea.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ENEREA - Comparateur d'Énergie Professionnel",
    description: "Comparez gratuitement les offres d'électricité et de gaz pour votre entreprise. Plus de 30 fournisseurs partenaires. Économisez jusqu'à 40% sur vos factures.",
    url: 'https://enerea.fr',
    siteName: 'ENEREA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ENEREA - Comparateur d\'énergie professionnel',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ENEREA - Comparateur d'Énergie Professionnel",
    description: "Comparez gratuitement les offres d'électricité et de gaz pour votre entreprise. Économisez jusqu'à 40% sur vos factures énergétiques.",
    images: ['/og-image.jpg'],
    creator: '@enerea_energie',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        
        {/* Google tag (gtag.js) - Installation manuelle */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16405496127"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16405496127');
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          <Analytics />
          <StructuredData type="homepage" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
