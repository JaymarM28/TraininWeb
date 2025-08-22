import { apiClient } from '@/infrastructure/http/api-client';
import { RoutinesPage as RoutinesClientPage } from '@/presentation/pages/routines-page';

type Routine = {
  id: string;
  name: string;
  description?: string;
  duration?: number;
};

async function getRoutines() {
  try {
    // ✅ DESPUÉS: Usar apiClient en lugar de fetch directo
    const response = await apiClient.getAllRoutines();
    
    // Manejar la respuesta del apiClient
    if (response.success && response.data) {
      return response.data as Routine[];
    }
    
    return [] as Routine[];
  } catch (error) {
    console.error('Error fetching routines:', error);
    return [] as Routine[];
  }
}

export default async function RoutinesPage() {
  const routines = await getRoutines();
  return <RoutinesClientPage routines={routines} />;
}