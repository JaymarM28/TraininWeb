import { Hero } from '@/presentation/components/hero';
import { ExerciseCard } from '@/presentation/components/features/exercises/exercise-card';
import { RoutineCard } from '@/presentation/components/features/routines/routine-card';

type Exercise = {
  id: string;
  name: string;
  description?: string;
  category?: string;
};

type Routine = {
  id: string;
  name: string;
  description?: string;
  duration?: number;
};

export function HomePage({ exercises, routines }: { exercises: Exercise[]; routines: Routine[] }) {
  return (
    <div>
      <Hero />

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section id="exercises">
          <h2 className="section-title mb-3">Ejercicios</h2>
          <div className="grid grid-cols-1 gap-3">
            {exercises.slice(0, 10).map((e) => (
              <ExerciseCard key={e.id} id={e.id} name={e.name} description={e.description} category={e.category} />
            ))}
            {exercises.length === 0 && (
              <div className="text-sm opacity-70">No se encontraron ejercicios.</div>
            )}
          </div>
        </section>

        <section id="routines">
          <h2 className="section-title mb-3">Rutinas</h2>
          <div className="grid grid-cols-1 gap-3">
            {routines.slice(0, 10).map((r) => (
              <RoutineCard key={r.id} id={r.id} name={r.name} description={r.description} duration={r.duration} />
            ))}
            {routines.length === 0 && (
              <div className="text-sm opacity-70">No se encontraron rutinas.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}


