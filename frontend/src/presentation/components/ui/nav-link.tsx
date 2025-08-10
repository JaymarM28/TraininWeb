import { cn } from "@/shared/utils/cn";

type Props = { 
  href: string; 
  children: React.ReactNode; 
  active?: boolean;
  className?: string;
};

export function NavLink({ href, children, active = false, className }: Props) {
  return (
    <a
      href={href}
      className={cn(
        "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group",
        active
          ? "text-white bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 shadow-lg shadow-red-500/10"
          : "text-zinc-300 hover:text-white hover:bg-zinc-800/50",
        className
      )}
    >
      {children}
      {!active && (
        <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/0 via-red-500/0 to-blue-500/0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:from-red-500/10 group-hover:via-transparent group-hover:to-blue-500/10" />
      )}
    </a>
  );
}


