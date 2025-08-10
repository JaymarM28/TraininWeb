import { Dumbbell, Target, Clock } from 'lucide-react';

type Props = {
  id: string;
  name: string;
  description?: string;
  category?: string;
};

export function ExerciseCard({ name, description, category }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 p-6 transition-all duration-300 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Icon */}
      <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
        <Dumbbell className="h-6 w-6 text-white" />
      </div>

      {/* Content */}
      <div className="relative space-y-3">
        <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-300">
          {name}
        </h3>
        
        {description && (
          <p className="text-sm text-zinc-400 leading-relaxed">
            {description}
          </p>
        )}
        
        {category && (
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-red-400" />
            <span className="inline-flex items-center rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 border border-red-500/20">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-red-500/20 via-transparent to-blue-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}



