'use client';

import { useState, useCallback } from 'react';

interface Company {
  siren: string;
  name: string;
  address: string;
  activity?: string;
  status?: string;
}

interface UseSirenSearchReturn {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
  searchCompanies: (query: string) => Promise<void>;
  clearResults: () => void;
}

export function useSirenSearch(): UseSirenSearchReturn {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCompanies = useCallback(async (query: string) => {
    if (query.length < 3) {
      setCompanies([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Option 1: API Sirene de l'INSEE (gratuite mais limitée)
      // const response = await fetch(
      //   `https://api.insee.fr/entreprises/sirene/V3/siret?q=denominationUniteLegale:${encodeURIComponent(query)}&nombre=10`,
      //   {
      //     headers: {
      //       'Authorization': `Bearer ${process.env.NEXT_PUBLIC_INSEE_API_KEY}`,
      //       'Accept': 'application/json'
      //     }
      //   }
      // );

      // Option 2: API entreprise.data.gouv.fr (gratuite)
      const response = await fetch(
        `https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(query)}&limite=10&per_page=10`
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la recherche');
      }

      const data = await response.json();
      
      // Adapter les données selon l'API utilisée
      const formattedCompanies: Company[] = data.results?.map((company: any) => ({
        siren: company.siren,
        name: company.nom_complet || company.nom_raison_sociale,
        address: `${company.siege?.adresse || ''} ${company.siege?.code_postal || ''} ${company.siege?.libelle_commune || ''}`.trim(),
        activity: company.activite_principale,
        status: company.etat_administratif
      })) || [];

      setCompanies(formattedCompanies);
    } catch (err) {
      console.error('Erreur lors de la recherche SIREN:', err);
      setError('Impossible de rechercher les entreprises pour le moment');
      
      // Fallback avec des données simulées pour le développement
      const mockCompanies: Company[] = [
        {
          siren: '123456789',
          name: `${query} SARL`,
          address: '123 Rue de la République, 75001 Paris',
          activity: 'Commerce de détail',
          status: 'Actif'
        },
        {
          siren: '987654321',
          name: `Entreprise ${query} SAS`,
          address: '456 Avenue des Champs, 69000 Lyon',
          activity: 'Services aux entreprises',
          status: 'Actif'
        },
        {
          siren: '456789123',
          name: `${query} & Associés`,
          address: '789 Boulevard Saint-Germain, 33000 Bordeaux',
          activity: 'Conseil et assistance',
          status: 'Actif'
        }
      ];
      
      setCompanies(mockCompanies);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setCompanies([]);
    setError(null);
  }, []);

  return {
    companies,
    isLoading,
    error,
    searchCompanies,
    clearResults
  };
}
