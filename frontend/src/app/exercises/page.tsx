import { ExercisesPage as ExercisesClientPage } from '@/presentation/pages/exercises-page';
type Exercise = {
  id: string;
  name: string;
  description?: string;
  category?: string;
};

async function getExercises() {
  try {
    const res = await fetch('/api/exercises', { cache: 'no-store' });
    if (!res.ok) return [] as Exercise[];
    return (await res.json()) as Exercise[];
  } catch {
    return [] as Exercise[];
  }
}

export default async function ExercisesPage() {
  const exercises = await getExercises();
  return <ExercisesClientPage exercises={exercises} />;
}


