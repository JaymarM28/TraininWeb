import { LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: "default" | "success" | "warning" | "danger";
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  className,
  variant = "default" 
}: StatsCardProps) {
  const variantStyles = {
    default: "from-zinc-800/50 to-zinc-700/50 border-zinc-700",
    success: "from-green-800/50 to-green-700/50 border-green-600/50",
    warning: "from-yellow-800/50 to-yellow-700/50 border-yellow-600/50",
    danger: "from-red-800/50 to-red-700/50 border-red-600/50",
  };

  const iconColors = {
    default: "text-zinc-400",
    success: "text-green-400",
    warning: "text-yellow-400",
    danger: "text-red-400",
  };

  const trendColors = {
    success: "text-green-400",
    warning: "text-yellow-400",
    danger: "text-red-400",
  };

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-xl border bg-gradient-to-br p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      variantStyles[variant],
      className
    )}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Icon */}
      {Icon && (
        <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800/50 shadow-lg">
          <Icon className={cn("h-6 w-6", iconColors[variant])} />
        </div>
      )}

      {/* Content */}
      <div className="relative space-y-3">
        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wide">
          {title}
        </h3>
        
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">
            {value}
          </span>
          
          {trend && (
            <span className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend.isPositive ? trendColors.success : trendColors.danger
            )}>
              {trend.isPositive ? "↗" : "↘"}
              {Math.abs(trend.value)}%
            </span>
          )}
        </div>
        
        {description && (
          <p className="text-sm text-zinc-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

// Grid component for multiple stats
export function StatsGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
      className
    )}>
      {children}
    </div>
  );
}
