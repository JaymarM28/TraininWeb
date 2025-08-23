import { RoleBasedRedirect } from '@/presentation/components/auth/role-based-redirect';
import { AdminDashboardPage } from '@/presentation/pages/admin-dashboard-page';

export default function AdminPage() {
  return (
    <RoleBasedRedirect allowedRoles={['ADMIN']}>
      <AdminDashboardPage />
    </RoleBasedRedirect>
  );
}