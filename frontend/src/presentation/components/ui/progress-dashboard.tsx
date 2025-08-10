import { TrendingUp, Calendar, Target, Award, Flame, Activity, Clock, Zap } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface ProgressMetric {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  color?: string;
}

interface ProgressDashboardProps {
  className?: string;
  metrics?: ProgressMetric[];
}

export function ProgressDashboard({ className, metrics }: ProgressDashboardProps) {
  // Default metrics if none provided
  const defaultMetrics: ProgressMetric[] = [
    {
      label: "Entrenamientos",
      value: "24",
      change: 12,
      icon: <Activity className="h-5 w-5" />,
      color: "text-red-400"
    },
    {
      label: "Días Activos",
      value: "18",
      change: 8,
      icon: <Calendar className="h-5 w-5" />,
      color: "text-blue-400"
    },
    {
      label: "Objetivos Alcanzados",
      value: "7",
      change: 3,
      icon: <Target className="h-5 w-5" />,
      color: "text-green-400"
    },
    {
      label: "Calorías Quemadas",
      value: "12,450",
      change: 15,
      icon: <Flame className="h-5 w-5" />,
      color: "text-orange-400"
    }
  ];

  const displayMetrics = metrics || defaultMetrics;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Tu Progreso</h2>
          <p className="text-zinc-400">Mantén el seguimiento de tu rendimiento</p>
        </div>
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <TrendingUp className="h-4 w-4" />
          <span>+15% este mes</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayMetrics.map((metric, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 p-6 transition-all duration-300 hover:border-zinc-700 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            {/* Icon */}
            <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800/50 shadow-lg">
              <div className={cn("text-zinc-400 group-hover:text-white transition-colors duration-300", metric.color)}>
                {metric.icon}
              </div>
            </div>

            {/* Content */}
            <div className="relative space-y-2">
              <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wide">
                {metric.label}
              </h3>
              
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">
                  {metric.value}
                </span>
                
                {metric.change && (
                  <span className="flex items-center gap-1 text-sm font-medium text-green-400">
                    <TrendingUp className="h-3 w-3" />
                    +{metric.change}%
                  </span>
                )}
              </div>
            </div>

            {/* Hover effect border */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Progreso Semanal</h3>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Clock className="h-4 w-4" />
              <span>Últimos 7 días</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, index) => (
              <div key={day} className="flex items-center gap-4">
                <span className="text-sm text-zinc-400 w-8">{day}</span>
                <div className="flex-1 bg-zinc-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.random() * 100}%` }}
                  />
                </div>
                <span className="text-sm text-zinc-400 w-12 text-right">
                  {Math.floor(Math.random() * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Progress */}
        <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Objetivos del Mes</h3>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Target className="h-4 w-4" />
              <span>3 de 5 completados</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { name: "Entrenar 20 días", progress: 85, color: "from-red-500 to-red-600" },
              { name: "Correr 50km", progress: 60, color: "from-blue-500 to-blue-600" },
              { name: "Levantar 100kg", progress: 90, color: "from-green-500 to-green-600" },
              { name: "Flexibilidad", progress: 45, color: "from-purple-500 to-purple-600" },
              { name: "Nutrición", progress: 75, color: "from-orange-500 to-orange-600" }
            ].map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-300">{goal.name}</span>
                  <span className="text-zinc-400">{goal.progress}%</span>
                </div>
                <div className="bg-zinc-800 rounded-full h-2">
                  <div 
                    className={cn("bg-gradient-to-r h-2 rounded-full transition-all duration-500", goal.color)}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 rounded-xl p-6 border border-zinc-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-red-500/50 transition-all duration-300 group">
            <div className="p-2 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-colors duration-300">
              <Zap className="h-5 w-5 text-red-400" />
            </div>
            <div className="text-left">
              <div className="font-medium text-white">Iniciar Entrenamiento</div>
              <div className="text-sm text-zinc-400">Comienza tu rutina diaria</div>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-blue-500/50 transition-all duration-300 group">
            <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300">
              <Target className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-left">
              <div className="font-medium text-white">Establecer Meta</div>
              <div className="text-sm text-zinc-400">Define nuevos objetivos</div>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-green-500/50 transition-all duration-300 group">
            <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors duration-300">
              <Award className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-left">
              <div className="font-medium text-white">Ver Logros</div>
              <div className="text-sm text-zinc-400">Revisa tu progreso</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
