import { apiClient } from '@/infrastructure/http/api-client';
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
      apiClient.getAllExercises(),
      apiClient.getAllRoutines(),
    ]);

    return { 
      exercises: exercisesRes.success ? exercisesRes.data || [] : [],
      routines: routinesRes.success ? routinesRes.data || [] : []
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { exercises: [], routines: [] };
  }
}

export default async function Home() {
  const { exercises, routines } = await getData();
  return <HomePage exercises={exercises} routines={routines} />;
}