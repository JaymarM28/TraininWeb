"use client";

import { useMemo, useState } from "react";
import { RoutineCard } from "@/presentation/components/features/routines/routine-card";

type Routine = {
  id: string;
  name: string;
  description?: string;
  duration?: number;
  difficulty?: string;
};

export function RoutinesPage({ routines }: { routines: Routine[] }) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const meta = useMemo(() => {
    const difficulties = new Set<string>();
    for (const r of routines) {
      if (r.difficulty) difficulties.add(r.difficulty);
    }
    return { difficulties: Array.from(difficulties).sort() };
  }, [routines]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return routines.filter((r) => {
      if (q && !(`${r.name}`.toLowerCase().includes(q) || `${r.description || ""}`.toLowerCase().includes(q))) return false;
      if (difficulty && (r.difficulty || "").toLowerCase() !== difficulty.toLowerCase()) return false;
      return true;
    });
  }, [routines, query, difficulty]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 mt-8">
      <aside className="space-y-6">
        <div className="card p-4 space-y-3">
          <div className="font-semibold">Filtros</div>
          <input
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border border-[var(--color-border)] rounded px-3 py-2 text-sm"
          />
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full bg-transparent border border-[var(--color-border)] rounded px-3 py-2 text-sm"
          >
            <option value="">Dificultad</option>
            {meta.difficulties.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <button
            className="btn btn-outline w-full"
            onClick={() => {
              setQuery("");
              setDifficulty("");
            }}
          >
            Limpiar filtros
          </button>
        </div>

        {routines.length === 0 && (
          <div className="card p-4 text-sm">
            <div className="font-semibold mb-1">Sin datos</div>
            <p className="opacity-80">Verifica que el backend esté activo.</p>
          </div>
        )}
      </aside>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r) => (
          <RoutineCard key={r.id} id={r.id} name={r.name} description={r.description} duration={r.duration} />
        ))}

        {filtered.length === 0 && routines.length > 0 && (
          <div className="opacity-70 text-sm">No hay resultados para los filtros aplicados.</div>
        )}
      </div>
    </div>
  );
}


