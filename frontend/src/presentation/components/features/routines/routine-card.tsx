type Props = {
  id: string;
  name: string;
  description?: string;
  duration?: number;
};

export function RoutineCard({ name, description, duration }: Props) {
  return (
    <div className="card p-4">
      <div className="font-medium">{name}</div>
      {description && (
        <p className="text-sm opacity-80 mt-1">{description}</p>
      )}
      {typeof duration === 'number' && (
        <span className="mt-3 inline-block text-xs px-2 py-1 rounded border border-[var(--color-border)] opacity-90">
          {duration} min
        </span>
      )}
    </div>
  );
}


