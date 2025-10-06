import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enerea - Site en construction",
  description: "Site en cours de développement - Nouveau projet Enerea",
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
