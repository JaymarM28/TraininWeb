import { cn } from "@/shared/utils/cn";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="relative">
        {/* Main spinner */}
        <div
          className={cn(
            "animate-spin rounded-full border-2 border-zinc-700 border-t-red-500",
            sizeClasses[size]
          )}
        />
        
        {/* Glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border-2 border-transparent border-t-red-500/30 animate-pulse",
            sizeClasses[size]
          )}
        />
      </div>
      
      {text && (
        <p className="text-sm text-zinc-400 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

// Variant with dots
export function LoadingDots({ className, text }: { className?: string; text?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="flex items-center gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full bg-red-500 animate-bounce"
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
      
      {text && (
        <p className="text-sm text-zinc-400 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

// Variant with bars
export function LoadingBars({ className, text }: { className?: string; text?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-1 bg-gradient-to-t from-red-500 to-red-600 rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1.2s",
            }}
          />
        ))}
      </div>
      
      {text && (
        <p className="text-sm text-zinc-400 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
