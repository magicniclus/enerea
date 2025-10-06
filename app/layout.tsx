import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enerea Energy - Comparateur d'offres d'énergie",
  description: "Comparez les offres de 25+ fournisseurs d'énergie et réduisez vos factures. Service gratuit et sans engagement.",
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
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
