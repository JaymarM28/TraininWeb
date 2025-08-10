import React from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MainLayout } from '@/presentation/layouts/main-layout'
import { ThemeProvider } from '@/presentation/providers/theme-provider'
import { AuthProvider } from '@/presentation/providers/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JSC - Entrenamiento Diferencial',
  description: 'Plataforma de entrenamiento con enfoque diferencial y alto rendimiento',
  keywords: 'JSC, entrenamiento, fuerza, rendimiento, gimnasio, rutinas',
  authors: [{ name: 'JSC' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <MainLayout>{children}</MainLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}