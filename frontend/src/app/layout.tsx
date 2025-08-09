import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MainLayout } from '@/presentation/layouts/main-layout'
import { ThemeProvider } from '@/presentation/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JSC ',
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
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
