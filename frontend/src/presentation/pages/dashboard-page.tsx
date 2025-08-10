"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/presentation/providers/auth-provider';
import { LoadingSpinner } from '@/presentation/components/ui/loading-spinner';
import { Button } from '@/presentation/components/ui/button';
import { ProgressDashboard } from '@/presentation/components/ui/progress-dashboard';
import { ExerciseCard } from '@/presentation/components/features/exercises/exercise-card';
import { RoutineCard } from '@/presentation/components/features/routines/routine-card';
import { StatsCard, StatsGrid } from '@/presentation/components/ui/stats-card';
import { apiClient } from '@/infrastructure/http/api-client';
import { 
  User, 
  Activity, 
  Calendar, 
  Target, 
  TrendingUp, 
  Dumbbell, 
  Zap, 
  Plus,
  Settings,
  LogOut,
  Clock,
  Flame
} from 'lucide-react';

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

export function DashboardPage() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Cargar ejercicios y rutinas en paralelo
      const [exercisesResponse, routinesResponse] = await Promise.all([
        fetch('/api/exercises').then(res => res.ok ? res.json() : []),
        fetch('/api/routines').then(res => res.ok ? res.json() : [])
      ]);

      setExercises(exercisesResponse || []);
      setRoutines(routinesResponse || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Error al cargar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando dashboard..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Acceso denegado</h1>
          <p className="text-zinc-400 mb-6">Debes iniciar sesión para acceder al dashboard</p>
          <Button asChild>
            <a href="/login">Iniciar Sesión</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  ¡Hola, {user.email}!
                </h1>
                <p className="text-sm text-zinc-400">
                  Bienvenido a tu panel de entrenamiento
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Quick Stats */}
        <StatsGrid>
          <StatsCard
            title="Entrenamientos"
            value="24"
            trend={{ value: 12, isPositive: true }}
            icon={Activity}
            variant="default"
          />
          <StatsCard
            title="Días Activos"
            value="18"
            trend={{ value: 8, isPositive: true }}
            icon={Calendar}
            variant="success"
          />
          <StatsCard
            title="Objetivos"
            value="7/10"
            trend={{ value: 3, isPositive: true }}
            icon={Target}
            variant="warning"
          />
          <StatsCard
            title="Calorías"
            value="12,450"
            trend={{ value: 15, isPositive: true }}
            icon={Flame}
            variant="danger"
          />
        </StatsGrid>

        {/* Progress Dashboard */}
        <section>
          <ProgressDashboard />
        </section>

        {/* Quick Actions */}
        <section className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700/50">
          <h2 className="text-xl font-bold text-white mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 flex-col gap-2 bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-500/30 hover:from-red-500/30 hover:to-red-600/30">
              <Plus className="h-5 w-5" />
              <span>Nuevo Entrenamiento</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Target className="h-5 w-5" />
              <span>Establecer Meta</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <TrendingUp className="h-5 w-5" />
              <span>Ver Progreso</span>
            </Button>
          </div>
        </section>

        {/* Recent Exercises */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <Dumbbell className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Ejercicios Recientes</h2>
            </div>
            <Button variant="ghost" asChild>
              <a href="/exercises">Ver todos</a>
            </Button>
          </div>
          
          {exercises.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.slice(0, 6).map((exercise) => (
                <ExerciseCard key={exercise.id} {...exercise} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-zinc-800/30 rounded-xl border border-zinc-700/50">
              <Dumbbell className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
              <p className="text-zinc-400">No hay ejercicios disponibles</p>
              <Button className="mt-4" asChild>
                <a href="/exercises">Explorar Ejercicios</a>
              </Button>
            </div>
          )}
        </section>

        {/* Recent Routines */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Rutinas Recomendadas</h2>
            </div>
            <Button variant="ghost" asChild>
              <a href="/routines">Ver todas</a>
            </Button>
          </div>
          
          {routines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routines.slice(0, 6).map((routine) => (
                <RoutineCard key={routine.id} {...routine} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-zinc-800/30 rounded-xl border border-zinc-700/50">
              <Zap className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
              <p className="text-zinc-400">No hay rutinas disponibles</p>
              <Button className="mt-4" asChild>
                <a href="/routines">Explorar Rutinas</a>
              </Button>
            </div>
          )}
        </section>

        {/* Today's Schedule */}
        <section className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Horario de Hoy</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-white">Entrenamiento de Fuerza</p>
                  <p className="text-sm text-zinc-400">9:00 AM - 10:30 AM</p>
                </div>
              </div>
              <Button size="sm">Iniciar</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg opacity-60">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-zinc-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-white">Cardio Suave</p>
                  <p className="text-sm text-zinc-400">6:00 PM - 6:45 PM</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Programado</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}