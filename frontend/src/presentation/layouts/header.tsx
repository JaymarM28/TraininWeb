// frontend/src/presentation/layouts/header.tsx (actualización con roles)
"use client";

import { useState } from "react";
import { BrandLogo } from "@/presentation/components/ui/brand-logo";
import { Button } from "@/presentation/components/ui/button";
import { NavLink } from "@/presentation/components/ui/nav-link";
import { Drawer } from "@/presentation/components/mobile/drawer";
import { useAuth } from "@/presentation/providers/auth-provider";
import { Menu, X, User, LogOut, Settings, Crown, Shield, Users } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout, getDashboardRoute } = useAuth();

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  // Función para obtener el icono según el rol
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return <Crown className="h-4 w-4 text-yellow-400" />;
      case 'COACH':
        return <Shield className="h-4 w-4 text-blue-400" />;
      case 'USER':
        return <User className="h-4 w-4 text-green-400" />;
      default:
        return <User className="h-4 w-4 text-white" />;
    }
  };

  // Función para obtener el color del badge según el rol
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'from-yellow-500 to-yellow-600';
      case 'COACH':
        return 'from-blue-500 to-blue-600';
      case 'USER':
        return 'from-green-500 to-green-600';
      default:
        return 'from-zinc-500 to-zinc-600';
    }
  };

  // Función para obtener el nombre del rol en español
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Administrador';
      case 'COACH':
        return 'Entrenador';
      case 'USER':
        return 'Cliente';
      default:
        return 'Usuario';
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-blue-500/5" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="shrink-0 group" aria-label="Inicio">
          <BrandLogo compact={false} />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {/* Navegación básica visible para todos */}
          <NavLink href="/exercises" className="group">
            <span className="relative">
              Ejercicios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </NavLink>
          <NavLink href="/routines" className="group">
            <span className="relative">
              Rutinas
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </NavLink>
          
          {/* Navegación específica por rol */}
          {user?.role === 'ADMIN' && (
            <NavLink href="/admin" className="group">
              <span className="relative flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-400" />
                Panel Admin
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NavLink>
          )}
          
          {user?.role === 'COACH' && (
            <NavLink href="/coach" className="group">
              <span className="relative flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                Panel Coach
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NavLink>
          )}
          
          <NavLink href="#contact" className="group">
            <span className="relative">
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 text-white">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getRoleBadgeColor(user?.role || '')} flex items-center justify-center`}>
                  {getRoleIcon(user?.role || '')}
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{user?.name}</div>
                  <div className="text-xs text-zinc-400">{getRoleDisplayName(user?.role || '')}</div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="hover:bg-zinc-800/50 transition-all duration-300"
              >
                <a href={getDashboardRoute()}>
                  <Settings className="h-4 w-4 mr-2" />
                  Dashboard
                </a>
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleLogout}
                className="hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all duration-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="soft" 
                size="sm" 
                asChild
                className="hover:bg-zinc-800/50 transition-all duration-300"
              >
                <a href="/login">Ingresar</a>
              </Button>
              <Button 
                size="sm" 
                variant="primary" 
                asChild
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-500/25 transition-all duration-300"
              >
                <a href="/register">Empezar</a>
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center h-12 w-12 rounded-xl border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/50 transition-all duration-300"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          {open ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <Menu className="h-5 w-5 text-white" />
          )}
        </button>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className="p-6 flex flex-col gap-4 text-white bg-zinc-950/95 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <BrandLogo compact={true} />
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* User info in mobile */}
          {isAuthenticated && user && (
            <div className="flex items-center gap-3 p-4 bg-zinc-800/30 rounded-lg mb-4">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRoleBadgeColor(user.role)} flex items-center justify-center`}>
                {getRoleIcon(user.role)}
              </div>
              <div>
                <p className="font-medium text-white">{user.name}</p>
                <p className="text-sm text-zinc-400">{getRoleDisplayName(user.role)}</p>
              </div>
            </div>
          )}
          
          <nav className="space-y-2">
            {isAuthenticated && (
              <a 
                href={getDashboardRoute()} 
                className="block py-3 px-4 rounded-lg hover:bg-zinc-800/50 transition-all duration-200 hover:text-red-400" 
                onClick={() => setOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Dashboard
                </div>
              </a>
            )}
            
            {/* Navegación específica por rol en móvil */}
            {user?.role === 'ADMIN' && (
              <a 
                href="/admin" 
                className="block py-3 px-4 rounded-lg hover:bg-zinc-800/50 transition-all duration-200 hover:text-yellow-400" 
                onClick={() => setOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  Panel Admin
                </div>
              </a>
            )}
            
            {user?.role === 'COACH' && (
              <a 
                href="/coach" 
                className="block py-3 px-4 rounded-lg hover:bg-zinc-800/50 transition-all duration-200 hover:text-blue-400" 
                onClick={() => setOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Panel Coach
                </div>
              </a>
            )}
            
            <a 
              href="/exercises" 
              className="block py-3 px-4 rounded-lg hover:bg-zinc-800/50 transition-all duration-200 hover:text-red-400" 
              onClick={() => setOpen(false)}
            >
              Ejercicios
            </a>
            <a 
              href="/routines" 
              className="block py-3 px-4 rounded-lg hover:bg-zinc-800/50 transition-all duration-200 hover:text-blue-400" 
              onClick={() => setOpen(false)}
            >
              Rutinas
            </a>
            <a 
              href="#contact" 
              className="block py-3 px-4 rounded-lg hover:bg-zinc-800/50 transition-all duration-200 hover:text-purple-400" 
              onClick={() => setOpen(false)}
            >
              Contacto
            </a>
          </nav>
          
          <div className="flex flex-col gap-3 pt-4 border-t border-zinc-800">
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                size="md" 
                className="w-full hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="md" 
                  className="w-full hover:bg-zinc-800/50"
                  asChild
                >
                  <a href="/login" onClick={() => setOpen(false)}>
                    Ingresar
                  </a>
                </Button>
                <Button 
                  size="md" 
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  asChild
                >
                  <a href="/register" onClick={() => setOpen(false)}>
                    Empezar
                  </a>
                </Button>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </header>
  );
}