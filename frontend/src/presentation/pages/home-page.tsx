import { Hero } from '@/presentation/components/hero';
import { ExerciseCard } from '@/presentation/components/features/exercises/exercise-card';
import { RoutineCard } from '@/presentation/components/features/routines/routine-card';
import { ProgressDashboard } from '@/presentation/components/ui/progress-dashboard';
import { Dumbbell, Zap, ArrowRight, TrendingUp, Calendar, Target } from 'lucide-react';

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
    <div className="min-h-screen">
      <Hero />

      {/* Main content sections */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Progress Dashboard */}
        <section>
          <ProgressDashboard />
        </section>

        {/* Featured Exercises */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Ejercicios Destacados</h2>
                <p className="text-zinc-400">Los mejores ejercicios para tu entrenamiento</p>
              </div>
            </div>
            <a 
              href="/exercises" 
              className="group flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors duration-200"
            >
              Ver todos
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.slice(0, 6).map((exercise) => (
              <ExerciseCard key={exercise.id} {...exercise} />
            ))}
          </div>
        </section>

        {/* Featured Routines */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Rutinas Recomendadas</h2>
                <p className="text-zinc-400">Planes de entrenamiento personalizados</p>
              </div>
            </div>
            <a 
              href="/routines" 
              className="group flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Ver todas
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routines.slice(0, 6).map((routine) => (
              <RoutineCard key={routine.id} {...routine} />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 border border-zinc-700/50 p-12">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-blue-500/5" />
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-blue-600 mb-8">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-4">
                ¿Listo para Transformar tu Cuerpo?
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
                Únete a miles de personas que ya han alcanzado sus objetivos fitness con nuestros programas de entrenamiento
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="/exercises" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/25"
                >
                  <Dumbbell className="h-5 w-5" />
                  Explorar Ejercicios
                </a>
                <a 
                  href="/routines" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-zinc-600 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 hover:scale-105"
                >
                  <Calendar className="h-5 w-5" />
                  Ver Rutinas
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


