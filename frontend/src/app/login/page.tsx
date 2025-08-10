import { ProtectedRoute } from '@/presentation/components/auth/protected-route';
import { LoginPage } from '@/presentation/pages/login-page';

export default function Login() {
  return (
    <ProtectedRoute requireAuth={false}>
      <LoginPage />
    </ProtectedRoute>
  );
}