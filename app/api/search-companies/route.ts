import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    
    console.log('API Server - Query reçue:', query);
    
    if (!query || query.length < 3) {
      return NextResponse.json({ error: 'Query trop courte' }, { status: 400 });
    }

    const isNumeric = /^\d+$/.test(query);
    console.log('API Server - isNumeric:', isNumeric);
    
    let apiUrl = '';
    
    if (isNumeric) {
      // Recherche par SIREN avec l'API RNE (Répertoire National des Entreprises)
      apiUrl = `https://recherche-entreprises.api.gouv.fr/search?q=${query}&per_page=5`;
    } else {
      // Recherche par nom d'entreprise
      apiUrl = `https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(query)}&per_page=5`;
    }

    console.log('API Server - URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'ENEREA-Comparateur/1.0'
      },
      // Timeout de 10 secondes
      signal: AbortSignal.timeout(10000)
    });

    console.log('API Server - Response status:', response.status);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Server - Données reçues:', JSON.stringify(data, null, 2));
    
    let results = [];
    
    if (data.results && Array.isArray(data.results)) {
      results = data.results.map((entreprise: any) => {
        // Récupérer l'adresse du siège social
        const siege = entreprise.siege || {};
        
        return {
          siren: entreprise.siren,
          uniteLegale: { 
            denominationUniteLegale: entreprise.nom_complet || 
                                   entreprise.nom_raison_sociale || 
                                   entreprise.denomination ||
                                   'Nom non disponible'
          },
          adresseEtablissement: {
            numeroVoieEtablissement: siege.numero_voie || '',
            typeVoieEtablissement: siege.type_voie || '',
            libelleVoieEtablissement: siege.libelle_voie || '',
            codePostalEtablissement: siege.code_postal || '',
            libelleCommuneEtablissement: siege.libelle_commune || ''
          }
        };
      });
    }
    
    console.log('API Server - Résultats formatés:', results.length, 'entreprises');
    console.log('API Server - Premier résultat:', results[0]);
    
    return NextResponse.json({ companies: results.slice(0, 5) });
    
  } catch (error) {
    console.error('API Server - Erreur complète:', error);
    
    // En cas d'erreur API, retourner une erreur claire
    return NextResponse.json({ 
      error: 'Erreur lors de la recherche', 
      details: error instanceof Error ? error.message : 'Erreur inconnue',
      companies: [] // Retourner un tableau vide plutôt qu'une erreur 500
    }, { status: 200 }); // Status 200 pour éviter les erreurs côté client
  }
}
