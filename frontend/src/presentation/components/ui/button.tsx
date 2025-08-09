"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/utils/cn";

type Variant = "primary" | "outline" | "ghost" | "soft";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-red)] disabled:opacity-50 disabled:pointer-events-none";

    const variants: Record<Variant, string> = {
      primary: "bg-[var(--brand-red)] text-white hover:bg-[var(--brand-red-600)] border border-transparent",
      outline: "bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-muted)]/60 border border-[var(--color-border)]",
      ghost: "bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-muted)]/50",
      soft: "bg-[var(--brand-red)]/15 text-white/90 hover:bg-[var(--brand-red)]/25 border border-[var(--brand-red)]/20",
    };

    const sizes: Record<Size, string> = {
      sm: "h-9 px-3 text-sm rounded-full",
      md: "h-10 px-4 text-sm rounded-full",
      lg: "h-12 px-5 text-base rounded-full",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";


