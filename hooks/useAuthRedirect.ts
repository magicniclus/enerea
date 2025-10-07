'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

export const useAuthRedirect = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return; // Attendre que le chargement soit terminé

    const publicRoutes = ['/', '/connexion', '/inscription', '/mot-de-passe-oublie', '/comparaison'];
    const protectedRoutes = ['/dashboard'];
    
    const isPublicRoute = publicRoutes.includes(pathname);
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (!user && isProtectedRoute) {
      // Utilisateur non connecté tentant d'accéder à une route protégée
      router.push('/connexion');
    } else if (user && (pathname === '/connexion' || pathname === '/inscription')) {
      // Utilisateur connecté sur les pages de connexion/inscription
      router.push('/dashboard');
    }
  }, [user, loading, pathname, router]);

  return { user, loading };
};
