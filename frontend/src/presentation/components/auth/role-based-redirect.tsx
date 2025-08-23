// frontend/src/presentation/components/auth/role-based-redirect.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/providers/auth-provider';
import { LoadingSpinner } from '@/presentation/components/ui/loading-spinner';

interface RoleBasedRedirectProps {
  children: React.ReactNode;
  allowedRoles?: ('ADMIN' | 'COACH' | 'USER')[];
  fallbackRoute?: string;
}

export function RoleBasedRedirect({ 
  children, 
  allowedRoles,
  fallbackRoute = '/login'
}: RoleBasedRedirectProps) {
  const { user, isAuthenticated, isLoading, getDashboardRoute } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(fallbackRoute);
        return;
      }

      if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Si no tiene permisos, redirigir a su dashboard correspondiente
        router.push(getDashboardRoute());
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, fallbackRoute, router, getDashboardRoute]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 to-zinc-900">
        <LoadingSpinner size="lg" text="Verificando permisos..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null; // Will redirect to appropriate dashboard
  }

  return <>{children}</>;
}

// Componente para redirección automática basada en rol después del login
export function RoleBasedDashboardRedirect() {
  const { user, isAuthenticated, isLoading, getDashboardRoute } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      router.push(getDashboardRoute());
    }
  }, [isLoading, isAuthenticated, user, router, getDashboardRoute]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 to-zinc-900">
        <LoadingSpinner size="lg" text="Redirigiendo..." />
      </div>
    );
  }

  return null;
}