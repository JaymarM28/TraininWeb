"use client";

import { useMemo, useState } from "react";
import { ExerciseCard } from "@/presentation/components/features/exercises/exercise-card";
import { LoadingSpinner } from "@/presentation/components/ui/loading-spinner";
import { Search, Filter, X, Dumbbell, Target, Clock } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);

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

  const activeFilters = [query, difficulty, muscle, equipment].filter(Boolean).length;

  const clearFilters = () => {
    setQuery("");
    setDifficulty("");
    setMuscle("");
    setEquipment("");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 border-b border-zinc-800/50">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-blue-500/5" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 mb-6">
              <Dumbbell className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Biblioteca de Ejercicios
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Descubre nuestra colección completa de ejercicios diseñados para maximizar tu potencial físico
            </p>
            
            {/* Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">{exercises.length}</div>
                <div className="text-sm text-zinc-400">Ejercicios</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{meta.categories.length}</div>
                <div className="text-sm text-zinc-400">Categorías</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">{meta.muscles.length}</div>
                <div className="text-sm text-zinc-400">Grupos Musculares</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Filters */}
          <aside className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                placeholder="Buscar ejercicios..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
              />
            </div>

            {/* Active Filters */}
            {activeFilters > 0 && (
              <div className="bg-zinc-800/30 rounded-xl p-4 border border-zinc-700/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-zinc-300">Filtros activos</span>
                  <button
                    onClick={clearFilters}
                    className="text-xs text-zinc-400 hover:text-red-400 transition-colors duration-200"
                  >
                    Limpiar todo
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {query && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-lg border border-red-500/30">
                      "{query}"
                      <button onClick={() => setQuery("")} className="hover:text-red-300">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {difficulty && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-lg border border-blue-500/30">
                      {difficulty}
                      <button onClick={() => setDifficulty("")} className="hover:text-blue-300">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {muscle && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-lg border border-purple-500/30">
                      {muscle}
                      <button onClick={() => setMuscle("")} className="hover:text-purple-300">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {equipment && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-lg border border-green-500/30">
                      {equipment}
                      <button onClick={() => setEquipment("")} className="hover:text-green-300">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Categories Index */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-red-400" />
                Categorías
              </h3>
              <ul className="space-y-2">
                {categories.map((c) => (
                  <li key={c}>
                    <a 
                      href={`#cat-${slugify(c)}`} 
                      className="block py-2 px-3 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
                    >
                      {c}
                    </a>
                  </li>
                ))}
                {categories.length === 0 && (
                  <li className="text-zinc-500 text-sm py-2">Sin categorías</li>
                )}
              </ul>
            </div>

            {/* Filters */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-400" />
                Filtros
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Dificultad</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  >
                    <option value="">Todas</option>
                    {meta.difficulties.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Grupo muscular</label>
                  <select
                    value={muscle}
                    onChange={(e) => setMuscle(e.target.value)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                  >
                    <option value="">Todos</option>
                    {meta.muscles.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Equipo</label>
                  <select
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                  >
                    <option value="">Todos</option>
                    {meta.equipments.map((eq) => (
                      <option key={eq} value={eq}>
                        {eq}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* No Data Warning */}
            {exercises.length === 0 && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="font-semibold text-red-400 mb-2">Sin datos</div>
                <p className="text-sm text-red-300">
                  No se pudieron cargar ejercicios. Verifica que el backend esté activo.
                </p>
              </div>
            )}
          </aside>

          {/* Content */}
          <div className="space-y-12">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" text="Cargando ejercicios..." />
              </div>
            ) : (
              <>
                {/* Results Summary */}
                <div className="flex items-center justify-between">
                  <div className="text-zinc-400">
                    Mostrando <span className="text-white font-semibold">{filtered.length}</span> de{" "}
                    <span className="text-white font-semibold">{exercises.length}</span> ejercicios
                  </div>
                  {activeFilters > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-zinc-400 hover:text-red-400 transition-colors duration-200"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>

                {/* Exercises by Category */}
                {categories.map((cat) => (
                  <section key={cat} id={`cat-${slugify(cat)}`} className="scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                        <Target className="h-4 w-4 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">{cat}</h2>
                      <span className="text-sm text-zinc-400 bg-zinc-800/50 px-3 py-1 rounded-full">
                        {grouped[cat].length}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {grouped[cat].map((e) => (
                        <ExerciseCard key={e.id} id={e.id} name={e.name} description={e.description} category={e.category} />
                      ))}
                    </div>
                  </section>
                ))}

                {/* No Results */}
                {categories.length === 0 && exercises.length > 0 && (
                  <div className="text-center py-20">
                    <div className="text-zinc-400 text-lg mb-2">No hay resultados para los filtros aplicados.</div>
                    <button
                      onClick={clearFilters}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


