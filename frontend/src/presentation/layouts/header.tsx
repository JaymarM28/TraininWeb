"use client";

import { useState } from "react";
import { BrandLogo } from "@/presentation/components/ui/brand-logo";
import { Button } from "@/presentation/components/ui/button";
import { NavLink } from "@/presentation/components/ui/nav-link";
import { Drawer } from "@/presentation/components/mobile/drawer";
import { Menu, X } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-blue-500/5" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="shrink-0 group" aria-label="Inicio">
          <BrandLogo compact={false} />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm">
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
          <NavLink href="#contact" className="group">
            <span className="relative">
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="soft" size="sm" className="hover:bg-zinc-800/50 transition-all duration-300">
            Ingresar
          </Button>
          <Button size="sm" variant="primary" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-500/25 transition-all duration-300">
            Empezar
          </Button>
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
          
          <nav className="space-y-2">
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
            <Button variant="outline" size="md" className="w-full hover:bg-zinc-800/50">
              Ingresar
            </Button>
            <Button size="md" className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
              Empezar
            </Button>
          </div>
        </div>
      </Drawer>
    </header>
  );
}


