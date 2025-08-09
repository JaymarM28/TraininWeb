import { RoutinesPage as RoutinesClientPage } from '@/presentation/pages/routines-page';
type Routine = {
  id: string;
  name: string;
  description?: string;
  duration?: number;
};

async function getRoutines() {
  try {
    const res = await fetch('/api/routines', { cache: 'no-store' });
    if (!res.ok) return [] as Routine[];
    return (await res.json()) as Routine[];
  } catch {
    return [] as Routine[];
  }
}

export default async function RoutinesPage() {
  const routines = await getRoutines();
  return <RoutinesClientPage routines={routines} />;
}


