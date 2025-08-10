"use client";

import { ButtonHTMLAttributes, forwardRef, ReactElement, cloneElement } from "react";
import { cn } from "@/shared/utils/cn";

type Variant = "primary" | "outline" | "ghost" | "soft" | "gradient";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 disabled:opacity-50 disabled:pointer-events-none group relative overflow-hidden";

    const variants: Record<Variant, string> = {
      primary: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 border border-transparent shadow-lg hover:shadow-red-500/25 hover:scale-105",
      outline: "bg-transparent text-white hover:bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 hover:scale-105",
      ghost: "bg-transparent text-white hover:bg-zinc-800/50 hover:scale-105",
      soft: "bg-red-500/15 text-white/90 hover:bg-red-500/25 border border-red-500/20 hover:scale-105",
      gradient: "bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-white border border-transparent shadow-lg hover:shadow-purple-500/25 hover:scale-105",
    };

    const sizes: Record<Size, string> = {
      sm: "h-9 px-4 text-sm rounded-xl",
      md: "h-11 px-6 text-sm rounded-xl",
      lg: "h-12 px-8 text-base rounded-xl",
    };

    const classes = cn(base, variants[variant], sizes[size], className);

    // Si asChild es true, clona el primer hijo y le aplica las clases
    if (asChild && children) {
      const childElement = children as ReactElement<any>;
      return cloneElement(childElement, {
        className: cn(classes, childElement.props?.className),
        ref,
        ...props,
      } as any);
    }

    // Componente normal de botón
    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {/* Gradient overlay for gradient variant */}
        {variant === "gradient" && (
          <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        
        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";