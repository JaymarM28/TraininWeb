import { apiClient } from '@/infrastructure/http/api-client';
import { ExercisesPage as ExercisesClientPage } from '@/presentation/pages/exercises-page';

type Exercise = {
  id: string;
  name: string;
  description?: string;
  category?: string;
};

async function getExercises() {
  try {
    const response = await apiClient.getAllExercises();
    
    if (response.success && response.data) {
      return response.data as Exercise[];
    }
    
    return [] as Exercise[];
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [] as Exercise[];
  }
}

export default async function ExercisesPage() {
  const exercises = await getExercises();
  return <ExercisesClientPage exercises={exercises} />;
}
