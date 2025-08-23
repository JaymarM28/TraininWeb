import { RoleBasedRedirect } from '@/presentation/components/auth/role-based-redirect';
import { CoachDashboardPage } from '@/presentation/pages/coach-dashboard-page';

export default function CoachPage() {
  return (
    <RoleBasedRedirect allowedRoles={['COACH']}>
      <CoachDashboardPage />
    </RoleBasedRedirect>
  );
}