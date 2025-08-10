import { ProtectedRoute } from '@/presentation/components/auth/protected-route';
import { DashboardPage } from '@/presentation/pages/dashboard-page';

export default function Dashboard() {
  return (
    <ProtectedRoute requireAuth={true}>
      <DashboardPage />
    </ProtectedRoute>
  );
}