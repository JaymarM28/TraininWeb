type Props = {
  id: string;
  name: string;
  description?: string;
  category?: string;
};

export function ExerciseCard({ name, description, category }: Props) {
  return (
    <div className="card p-4">
      <div className="font-medium">{name}</div>
      {description && (
        <p className="text-sm opacity-80 mt-1">{description}</p>
      )}
      {category && (
        <span className="mt-3 inline-block text-xs px-2 py-1 rounded border border-[var(--color-border)] opacity-90">
          {category}
        </span>
      )}
    </div>
  );
}



