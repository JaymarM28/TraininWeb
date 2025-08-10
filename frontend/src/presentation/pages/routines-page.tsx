"use client";

import { useMemo, useState } from "react";
import { RoutineCard } from "@/presentation/components/features/routines/routine-card";
import { LoadingSpinner } from "@/presentation/components/ui/loading-spinner";
import { Search, Filter, X, Calendar, Clock, Target, Zap } from "lucide-react";

type Routine = {
  id: string;
  name: string;
  description?: string;
  duration?: number;
  difficulty?: string;
  category?: string;
  exercises?: string[];
};

export function RoutinesPage({ routines }: { routines: Routine[] }) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const meta = useMemo(() => {
    const difficulties = new Set<string>();
    const categories = new Set<string>();
    
    for (const r of routines) {
      if (r.difficulty) difficulties.add(r.difficulty);
      if (r.category) categories.add(r.category);
    }
    
    return { 
      difficulties: Array.from(difficulties).sort(),
      categories: Array.from(categories).sort(),
    };
  }, [routines]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return routines.filter((r) => {
      if (q && !(`${r.name}`.toLowerCase().includes(q) || `${r.description || ""}`.toLowerCase().includes(q))) return false;
      if (difficulty && (r.difficulty || "").toLowerCase() !== difficulty.toLowerCase()) return false;
      if (category && (r.category || "").toLowerCase() !== category.toLowerCase()) return false;
      return true;
    });
  }, [routines, query, difficulty, category]);

  const activeFilters = [query, difficulty, category].filter(Boolean).length;

  const clearFilters = () => {
    setQuery("");
    setDifficulty("");
    setCategory("");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 border-b border-zinc-800/50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-6">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Rutinas de Entrenamiento
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Planes estructurados diseñados por expertos para alcanzar tus objetivos fitness
            </p>
            
            {/* Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{routines.length}</div>
                <div className="text-sm text-zinc-400">Rutinas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">{meta.categories.length}</div>
                <div className="text-sm text-zinc-400">Categorías</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{meta.difficulties.length}</div>
                <div className="text-sm text-zinc-400">Niveles</div>
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
                placeholder="Buscar rutinas..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              />
            </div>

            {/* Active Filters */}
            {activeFilters > 0 && (
              <div className="bg-zinc-800/30 rounded-xl p-4 border border-zinc-700/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-zinc-300">Filtros activos</span>
                  <button
                    onClick={clearFilters}
                    className="text-xs text-zinc-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    Limpiar todo
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {query && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-lg border border-blue-500/30">
                      "{query}"
                      <button onClick={() => setQuery("")} className="hover:text-blue-300">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {difficulty && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-lg border border-purple-500/30">
                      {difficulty}
                      <button onClick={() => setDifficulty("")} className="hover:text-purple-300">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {category && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-lg border border-green-500/30">
                      {category}
                      <button onClick={() => setCategory("")} className="hover:text-green-300">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-400" />
                Categorías
              </h3>
              <ul className="space-y-2">
                {meta.categories.map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => setCategory(category === c ? "" : c)}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-all duration-200 ${
                        category === c
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                      }`}
                    >
                      {c}
                    </button>
                  </li>
                ))}
                {meta.categories.length === 0 && (
                  <li className="text-zinc-500 text-sm py-2">Sin categorías</li>
                )}
              </ul>
            </div>

            {/* Filters */}
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5 text-purple-400" />
                Filtros
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Dificultad</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                  >
                    <option value="">Todas</option>
                    {meta.difficulties.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* No Data Warning */}
            {routines.length === 0 && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="font-semibold text-red-400 mb-2">Sin datos</div>
                <p className="text-sm text-red-300">
                  No se pudieron cargar rutinas. Verifica que el backend esté activo.
                </p>
              </div>
            )}
          </aside>

          {/* Content */}
          <div className="space-y-8">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" text="Cargando rutinas..." />
              </div>
            ) : (
              <>
                {/* Results Summary */}
                <div className="flex items-center justify-between">
                  <div className="text-zinc-400">
                    Mostrando <span className="text-white font-semibold">{filtered.length}</span> de{" "}
                    <span className="text-white font-semibold">{routines.length}</span> rutinas
                  </div>
                  {activeFilters > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-zinc-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>

                {/* Routines Grid */}
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filtered.map((r) => (
                      <RoutineCard key={r.id} id={r.id} name={r.name} description={r.description} duration={r.duration} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="text-zinc-400 text-lg mb-2">No hay resultados para los filtros aplicados.</div>
                    <button
                      onClick={clearFilters}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
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


