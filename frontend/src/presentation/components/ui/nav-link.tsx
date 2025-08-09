import { cn } from "@/shared/utils/cn";

type Props = { href: string; children: React.ReactNode; active?: boolean };

export function NavLink({ href, children, active = false }: Props) {
  return (
    <a
      href={href}
      className={cn(
        "relative px-3 py-1 text-sm rounded-full transition-colors",
        active
          ? "text-white bg-white/10 border border-white/10"
          : "text-white/90 hover:text-white hover:bg-white/5",
      )}
    >
      {children}
    </a>
  );
}


