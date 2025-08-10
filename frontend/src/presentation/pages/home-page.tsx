import { Hero } from '@/presentation/components/hero';
import { ExerciseCard } from '@/presentation/components/features/exercises/exercise-card';
import { RoutineCard } from '@/presentation/components/features/routines/routine-card';
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


