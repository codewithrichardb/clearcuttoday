import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from './common/LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAdmin = false, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push(`${redirectTo}?redirect=${encodeURIComponent(router.asPath)}`);
    }
  }, [currentUser, loading, router, redirectTo]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  // Optional: Check for admin role if required
  if (requireAdmin && currentUser.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
    router.push('/unauthorized');
    return null;
  }

  return <>{children}</>;
}
