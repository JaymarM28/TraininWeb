import React from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TraininWeb - Plataforma de Entrenamiento',
  description: 'Plataforma web integral para gimnasios y entrenadores personales',
  keywords: 'entrenamiento, gimnasio, ejercicios, fitness, workout',
  authors: [{ name: 'JaymarM28' }],
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
        {/* 
          Aquí se integrarán los providers de nuestra arquitectura hexagonal:
          - AuthProvider
          - ThemeProvider  
          - WorkoutProvider
          - ToastProvider
        */}
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}
