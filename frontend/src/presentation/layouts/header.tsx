"use client";

import { useState } from "react";
import { BrandLogo } from "@/presentation/components/ui/brand-logo";
import { Button } from "@/presentation/components/ui/button";
import { NavLink } from "@/presentation/components/ui/nav-link";
import { Drawer } from "@/presentation/components/mobile/drawer";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--muted-2)]">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="/" className="shrink-0" aria-label="Inicio">
          <BrandLogo compact={false} />
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white">
          <NavLink href="/exercises">Ejercicios</NavLink>
          <NavLink href="/routines">Rutinas</NavLink>
          <NavLink href="#contact">Contacto</NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="soft" size="sm">Ingresar</Button>
          <Button size="sm" variant="primary">Empezar</Button>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-[var(--color-border)]"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className="p-4 flex flex-col gap-3 text-white">
          <a href="/exercises" className="py-2 hover:opacity-100 opacity-90" onClick={() => setOpen(false)}>Ejercicios</a>
          <a href="/routines" className="py-2 hover:opacity-100 opacity-90" onClick={() => setOpen(false)}>Rutinas</a>
          <a href="#contact" className="py-2 hover:opacity-100 opacity-90" onClick={() => setOpen(false)}>Contacto</a>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" size="md" className="w-full">Ingresar</Button>
            <Button size="md" className="w-full">Empezar</Button>
          </div>
        </div>
      </Drawer>
    </header>
  );
}


