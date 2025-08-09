import { HomePage } from '@/presentation/pages/home-page';
type Exercise = {
  id: string;
  name: string;
  description?: string;
  category?: string;
};

type Routine = {
  id: string;
  name: string;
  description?: string;
  duration?: number;
};

async function getData() {
  try {
    const [exercisesRes, routinesRes] = await Promise.all([
      fetch("/api/exercises", { cache: "no-store" }),
      fetch("/api/routines", { cache: "no-store" }),
    ]);

    const [exercises, routines] = await Promise.all([
      exercisesRes.ok ? exercisesRes.json() : Promise.resolve([]),
      routinesRes.ok ? routinesRes.json() : Promise.resolve([]),
    ]);

    return { exercises: exercises as Exercise[], routines: routines as Routine[] };
  } catch (error) {
    return { exercises: [], routines: [] };
  }
}

export default async function Home() {
  const { exercises, routines } = await getData();
  return <HomePage exercises={exercises} routines={routines} />;
}
