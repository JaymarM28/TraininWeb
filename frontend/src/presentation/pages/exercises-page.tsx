"use client";

import { useMemo, useState } from "react";
import { ExerciseCard } from "@/presentation/components/features/exercises/exercise-card";

type Exercise = {
  id: string;
  name: string;
  description?: string;
  category?: string;
  difficulty?: string;
  muscleGroup?: string;
  equipment?: string[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function ExercisesPage({ exercises }: { exercises: Exercise[] }) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [muscle, setMuscle] = useState("");
  const [equipment, setEquipment] = useState("");

  const meta = useMemo(() => {
    const difficulties = new Set<string>();
    const muscles = new Set<string>();
    const equipments = new Set<string>();
    const categories = new Set<string>();

    for (const e of exercises) {
      if (e.difficulty) difficulties.add(e.difficulty);
      if (e.muscleGroup) muscles.add(e.muscleGroup);
      if (Array.isArray(e.equipment)) e.equipment.forEach((x) => equipments.add(x));
      categories.add(e.category || "Sin categoría");
    }

    return {
      difficulties: Array.from(difficulties).sort(),
      muscles: Array.from(muscles).sort(),
      equipments: Array.from(equipments).sort(),
      categories: Array.from(categories).sort(),
    };
  }, [exercises]);

  const filtered = useMemo(() => {
    return exercises.filter((e) => {
      const q = query.trim().toLowerCase();
      if (q && !(`${e.name}`.toLowerCase().includes(q) || `${e.description || ""}`.toLowerCase().includes(q))) {
        return false;
      }
      if (difficulty && (e.difficulty || "").toLowerCase() !== difficulty.toLowerCase()) return false;
      if (muscle && (e.muscleGroup || "").toLowerCase() !== muscle.toLowerCase()) return false;
      if (equipment && (!Array.isArray(e.equipment) || !e.equipment.map((x) => x.toLowerCase()).includes(equipment.toLowerCase()))) return false;
      return true;
    });
  }, [exercises, query, difficulty, muscle, equipment]);

  const grouped = useMemo(() => {
    return filtered.reduce((acc: Record<string, Exercise[]>, e) => {
      const cat = e.category || "Sin categoría";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(e);
      return acc;
    }, {} as Record<string, Exercise[]>);
  }, [filtered]);

  const categories = useMemo(() => Object.keys(grouped).sort((a, b) => a.localeCompare(b)), [grouped]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 mt-8">
      {/* Sidebar index & filters */}
      <aside className="space-y-6">
        <div className="card p-4">
          <div className="font-semibold mb-2">Categorías</div>
          <ul className="space-y-1 text-sm">
            {categories.map((c) => (
              <li key={c}>
                <a href={`#cat-${slugify(c)}`} className="hover:opacity-100 opacity-90">
                  {c}
                </a>
              </li>
            ))}
            {categories.length === 0 && <li className="opacity-70">Sin categorías</li>}
          </ul>
        </div>

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
          <select
            value={muscle}
            onChange={(e) => setMuscle(e.target.value)}
            className="w-full bg-transparent border border-[var(--color-border)] rounded px-3 py-2 text-sm"
          >
            <option value="">Grupo muscular</option>
            {meta.muscles.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="w-full bg-transparent border border-[var(--color-border)] rounded px-3 py-2 text-sm"
          >
            <option value="">Equipo</option>
            {meta.equipments.map((eq) => (
              <option key={eq} value={eq}>
                {eq}
              </option>
            ))}
          </select>
          <button
            className="btn btn-outline w-full"
            onClick={() => {
              setQuery("");
              setDifficulty("");
              setMuscle("");
              setEquipment("");
            }}
          >
            Limpiar filtros
          </button>
        </div>

        {exercises.length === 0 && (
          <div className="card p-4 text-sm">
            <div className="font-semibold mb-1">Sin datos</div>
            <p className="opacity-80">
              No se pudieron cargar ejercicios. Verifica que el backend esté activo en <code>http://localhost:3000</code>.
            </p>
          </div>
        )}
      </aside>

      {/* Content */}
      <div className="space-y-10">
        {categories.map((cat) => (
          <section key={cat} id={`cat-${slugify(cat)}`}>
            <h2 className="section-title mb-3">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {grouped[cat].map((e) => (
                <ExerciseCard key={e.id} id={e.id} name={e.name} description={e.description} category={e.category} />
              ))}
            </div>
          </section>
        ))}

        {categories.length === 0 && exercises.length > 0 && (
          <div className="opacity-70 text-sm">No hay resultados para los filtros aplicados.</div>
        )}
      </div>
    </div>
  );
}


