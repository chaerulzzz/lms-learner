import { Navigate } from 'react-router-dom';
import { useAuth } from '@/modules/auth';
import type { UserRole } from '@/modules/auth/types';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    const defaultPath = user.role === 'admin' || user.role === 'hr_personnel'
      ? '/admin'
      : '/dashboard';
    return <Navigate to={defaultPath} replace />;
  }

  return <>{children}</>;
}
