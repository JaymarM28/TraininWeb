import { AuroraTextEffect } from "@/presentation/styles/aurora-text";
import { ArrowRight, Play, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 md:pt-10">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,36,36,0.18),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.1),transparent_65%)]" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-60" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-blue-500 rounded-full animate-pulse opacity-40" />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-purple-500 rounded-full animate-pulse opacity-50" />
      
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 relative grid grid-cols-1 gap-8 items-center">
        {/* Main content */}
        <div className="mb-2 -mt-6 md:-mt-10 text-center md:text-left">
          <AuroraTextEffect
            text="JSC Entrenamiento Diferencial"
            fontSize="clamp(2.25rem, 6vw, 4rem)"
            colors={{
              first: "bg-red-500",
              second: "bg-red-700",
              third: "bg-white/60",
              fourth: "bg-white/30",
            }}
            blurAmount="blur-lg"
            animationSpeed={{ border: 10, first: 8, second: 7, third: 5, fourth: 12 }}
            className="bg-transparent"
            textClassName="font-extrabold tracking-tight"
          />
          
          {/* Subtitle with icon */}
          <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm text-zinc-400 font-medium">Entrenamiento de élite</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="mt-4 max-w-2xl text-base md:text-lg text-zinc-300 leading-relaxed pr-4 text-center md:text-left">
          Alto rendimiento, disciplina y resultados medibles. Diseñamos tu camino con precisión hacia el éxito deportivo.
        </p>
        
        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          <a 
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 min-w-[200px]" 
            href="/exercises"
          >
            <Play className="mr-2 h-5 w-5" />
            Explorar ejercicios
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          
          <a 
            className="group relative inline-flex items-center justify-center px-8 py-4 border border-zinc-700 text-white font-semibold rounded-xl hover:border-zinc-600 hover:bg-zinc-800/50 transition-all duration-300 hover:scale-105 min-w-[200px]" 
            href="/routines"
          >
            Ver rutinas
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
        
        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">500+</div>
            <div className="text-sm text-zinc-400">Ejercicios</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">50+</div>
            <div className="text-sm text-zinc-400">Rutinas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">1000+</div>
            <div className="text-sm text-zinc-400">Usuarios</div>
          </div>
        </div>
      </div>
    </section>
  );
}


