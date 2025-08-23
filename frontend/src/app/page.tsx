"use client";

import { useEffect } from 'react';
import { useAuth } from '@/presentation/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { LoginPage } from '@/presentation/pages/login-page';
import { LoadingSpinner } from '@/presentation/components/ui/loading-spinner';

export default function Login() {
  const { isAuthenticated, isLoading, getDashboardRoute } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(getDashboardRoute());
    }
  }, [isAuthenticated, isLoading, router, getDashboardRoute]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 to-zinc-900">
        <LoadingSpinner size="lg" text="Verificando autenticación..." />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 to-zinc-900">
        <LoadingSpinner size="lg" text="Redirigiendo..." />
      </div>
    );
  }

  return <LoginPage />;
}