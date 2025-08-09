"use client";

import * as React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, useInView, HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/utils/cn";

type SidebarContextType = {
  expanded: boolean;
  onChange: (expanded: boolean) => void;
  activeMenuItem: string | null;
  setActiveMenuItem: (id: string | null) => void;
  menuItemPosition: React.MutableRefObject<{
    left: number;
    width: number;
    top: number;
    height: number;
  }>;
  menuItemRefs: React.MutableRefObject<Map<string, HTMLDivElement | null>>;
  menuRef: React.MutableRefObject<HTMLDivElement | null>;
  updateIndicatorPosition: (id: string | null) => void;
  notifyMenuItemRefChange: () => void;
};

const SidebarContext = React.createContext<SidebarContextType | undefined>(
  undefined,
);

type SidebarProviderProps = {
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  children: React.ReactNode;
};

export function SidebarProvider({
  defaultExpanded = true,
  expanded: controlledExpanded,
  onExpandedChange,
  children,
}: SidebarProviderProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const [activeMenuItem, setActiveMenuItem] = React.useState<string | null>(
    null,
  );
  const menuItemPosition = React.useRef({ left: 0, width: 0, top: 0, height: 0 });
  const menuItemRefs = React.useRef<Map<string, HTMLDivElement | null>>(new Map());
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const [menuRefsVersion, setMenuRefsVersion] = React.useState(0);

  const isControlled = controlledExpanded !== undefined;
  const actualExpanded = isControlled ? controlledExpanded : expanded;
  const onExpandedChangeRef = React.useRef(onExpandedChange);
  React.useEffect(() => { onExpandedChangeRef.current = onExpandedChange; }, [onExpandedChange]);
  const handleExpandedChange = React.useCallback((value: boolean) => {
    if (!isControlled) setExpanded(value);
    onExpandedChangeRef.current?.(value);
  }, [isControlled]);

  const notifyMenuItemRefChange = React.useCallback(() => {
    setMenuRefsVersion((v) => v + 1);
  }, []);

  const updateIndicatorPosition = React.useCallback((id: string | null) => {
    const indicator = menuRef.current?.querySelector(
      ".sidebar-menu-indicator",
    ) as HTMLElement | null;
    if (id && menuRef.current) {
      const selectedItem = menuItemRefs.current.get(id);
      if (selectedItem) {
        const menuRect = menuRef.current.getBoundingClientRect();
        const rect = selectedItem.getBoundingClientRect();
        menuItemPosition.current = {
          left: rect.left - menuRect.left,
          width: rect.width,
          top: rect.top - menuRect.top,
          height: rect.height,
        };
        if (indicator) {
          indicator.style.left = `${menuItemPosition.current.left}px`;
          indicator.style.width = `${menuItemPosition.current.width}px`;
          indicator.style.top = `${menuItemPosition.current.top}px`;
          indicator.style.height = `${menuItemPosition.current.height}px`;
          indicator.style.opacity = "1";
        }
      } else if (indicator) {
        indicator.style.opacity = "0";
      }
    } else if (indicator) {
      indicator.style.opacity = "0";
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const path = url.pathname;
    let potential: string | null = null;
    if (searchParams.has("component")) potential = searchParams.get("component");
    else {
      const segs = path.split("/").filter(Boolean);
      if (segs.length > 0) potential = segs[segs.length - 1];
    }
    setActiveMenuItem(potential);
  }, []);

  React.useLayoutEffect(() => {
    updateIndicatorPosition(activeMenuItem);
  }, [activeMenuItem, menuRefsVersion, updateIndicatorPosition]);

  React.useEffect(() => {
    const onResize = () => { if (activeMenuItem) updateIndicatorPosition(activeMenuItem); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeMenuItem, updateIndicatorPosition]);

  return (
    <SidebarContext.Provider value={{
      expanded: actualExpanded,
      onChange: handleExpandedChange,
      activeMenuItem,
      setActiveMenuItem,
      menuItemPosition,
      menuItemRefs,
      menuRef,
      updateIndicatorPosition,
      notifyMenuItemRefChange,
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within a SidebarProvider");
  return ctx;
}

export function SidebarRoot({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded } = useSidebar();
  return (
    <div
      className={cn(
        "relative w-full h-full",
        expanded ? "" : "",
        className,
      )}
      role="complementary"
      data-collapsed={!expanded}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { expanded, onChange } = useSidebar();
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent",
        className,
      )}
      onClick={() => onChange(!expanded)}
      aria-label={expanded ? "Close sidebar" : "Open sidebar"}
      {...props}
    >
      <span className="sr-only">{expanded ? "Close sidebar" : "Open sidebar"}</span>
      {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </button>
  );
}

export function SidebarHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded } = useSidebar();
  return (
    <div className={cn("flex h-14 items-center border-b px-4", expanded ? "justify-between" : "justify-center", className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1 overflow-hidden h-[calc(100vh-3.5rem)]", className)} {...props}>
      <div className="h-full overflow-auto scrollbar-hide">
        {children}
      </div>
    </div>
  );
}

export function SidebarGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2 py-4", className)} {...props}>{children}</div>;
}

export function SidebarGroupLabel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-2 px-2 text-sm font-semibold tracking-tight", className)} {...props}>{children}</div>;
}

export function SidebarGroupContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1", className)} {...props}>{children}</div>;
}

export function SidebarFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex border-t p-4", className)} {...props}>{children}</div>;
}

export function SidebarMenu({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { menuRef } = useSidebar();
  return (
    <div ref={menuRef} className={cn("relative", className)} {...props}>
      {children}
    </div>
  );
}

type SidebarMenuItemProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"> & { value?: string };

export function SidebarMenuItem({ className, children, value, ...props }: SidebarMenuItemProps) {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const { activeMenuItem, menuItemRefs, notifyMenuItemRefChange } = useSidebar();
  const menuItemId = value || React.useId();
  const isActive = activeMenuItem === menuItemId;
  const isInView = useInView(itemRef, { once: false, amount: 0.5 });
  React.useEffect(() => {
    if (itemRef.current) {
      menuItemRefs.current.set(menuItemId, itemRef.current);
      notifyMenuItemRefChange();
    }
    return () => {
      menuItemRefs.current.delete(menuItemId);
      notifyMenuItemRefChange();
    };
  }, [menuItemId, menuItemRefs, notifyMenuItemRefChange]);
  return (
    <motion.div
      ref={itemRef}
      className={cn("mb-1 scrollbar-hide", className)}
      data-value={menuItemId}
      data-state={isActive ? "active" : "inactive"}
      initial={{ scale: 1, opacity: 0.5, x: 0 }}
      animate={{ scale: isInView ? 1 : 0.96, opacity: isInView ? 1 : 0.6, x: isInView ? 0 : -40 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...(props as HTMLMotionProps<"div">)}
    >
      {children}
    </motion.div>
  );
}

type SidebarMenuButtonProps = React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean; value?: string };

export function SidebarMenuButton({ className, children, asChild = false, value, ...props }: SidebarMenuButtonProps) {
  const { expanded, activeMenuItem, setActiveMenuItem, updateIndicatorPosition } = useSidebar();
  const menuItemId = value || React.useId();
  const isActive = activeMenuItem === menuItemId;
  const handleClick = React.useCallback(() => {
    setActiveMenuItem(menuItemId);
    updateIndicatorPosition(menuItemId);
  }, [menuItemId, setActiveMenuItem, updateIndicatorPosition]);
  const shared = "flex cursor-pointer items-center rounded-md px-3 py-2 text-sm hover:bg-white/5";
  if (!expanded) {
    return (
      <div className={cn(shared, "justify-center p-2", isActive ? "text-[var(--brand-red)] font-medium" : "", className)} onClick={handleClick} {...props}>
        {children}
      </div>
    );
  }
  if (asChild) {
    return (
      <div className={className} data-active={isActive ? "true" : "false"} onClick={handleClick} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as any, { className: cn(shared, "justify-start gap-2", isActive ? "text-[var(--brand-red)] font-medium" : "", (child as any).props?.className) });
          }
          return child;
        })}
      </div>
    );
  }
  return (
    <div className={cn(shared, "justify-start gap-2", isActive ? "text-[var(--brand-red)] font-medium" : "", className)} onClick={handleClick} {...props}>
      {children}
    </div>
  );
}


