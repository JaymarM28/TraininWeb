import { AuroraTextEffect } from "@/presentation/styles/aurora-text";
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 md:pt-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,36,36,0.18),transparent_65%)]" />
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 relative grid grid-cols-1 gap-8 items-center">
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
        </div>
        <p className="mt-4 max-w-2xl text-base md:text-lg opacity-90 pr-4">
          Alto rendimiento, disciplina y resultados medibles. Diseñamos tu camino con precisión.
        </p>
        <div className="mt-8 flex gap-4">
          <a className="btn btn-primary" href="/exercises">Explorar ejercicios</a>
          <a className="btn btn-outline" href="/routines">Ver rutinas</a>
        </div>
      </div>
    </section>
  );
}


