'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenue sur Enerea
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Site en construction - Nouveau projet en cours de développement
          </p>
          <div className="space-y-4">
            <p className="text-gray-500">
              Ce site est actuellement en cours de développement.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/cgv" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Conditions Générales de Vente
              </a>
              <a 
                href="/mentions-legales" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Mentions Légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
