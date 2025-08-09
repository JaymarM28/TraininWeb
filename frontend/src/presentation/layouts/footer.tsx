export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--muted-2)]/70">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm opacity-80">
        © {new Date().getFullYear()} JSC Entrenamiento Diferencial. Todos los derechos reservados.
      </div>
    </footer>
  );
}


