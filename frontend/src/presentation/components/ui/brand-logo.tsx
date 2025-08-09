import { AuroraTextEffect } from "@/presentation/styles/aurora-text";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-[var(--brand-red)]" />
        <span className="text-lg font-semibold tracking-tight">JSC</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded bg-[var(--brand-red)]" />
      <AuroraTextEffect
        text="JSC Entrenamiento Diferencial"
        textClassName="text-lg"
        fontSize="clamp(1.1rem,3vw,1.25rem)"
        colors={{ first: "bg-red-500", second: "bg-red-700", third: "bg-white/60", fourth: "bg-white/30" }}
        blurAmount="blur-md"
        animationSpeed={{ border: 8, first: 7, second: 6, third: 4, fourth: 10 }}
        className="bg-transparent"
      />
    </div>
  );
}


