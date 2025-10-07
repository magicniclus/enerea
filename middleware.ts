import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes publiques qui ne nécessitent pas d'authentification
  const publicRoutes = [
    '/',
    '/connexion',
    '/inscription', 
    '/mot-de-passe-oublie',
    '/comparaison',
    '/services',
    '/a-propos',
    '/contact',
    '/mentions-legales',
    '/politique-confidentialite'
  ];

  // Routes protégées qui nécessitent une authentification
  const protectedRoutes = ['/dashboard'];

  // Vérifier si la route est publique
  const isPublicRoute = publicRoutes.includes(pathname) || 
                       pathname.startsWith('/_next') || 
                       pathname.startsWith('/api') ||
                       pathname.includes('.');

  // Si c'est une route publique, laisser passer
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Pour les routes protégées, la vérification d'authentification 
  // sera gérée côté client par les composants ProtectedRoute
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
