import { RoleBasedRedirect } from '@/presentation/components/auth/role-based-redirect';
import { DashboardPage } from '@/presentation/pages/dashboard-page';

export default function Dashboard() {
  return (
    <RoleBasedRedirect allowedRoles={['USER']}>
      <DashboardPage />
    </RoleBasedRedirect>
  );
}