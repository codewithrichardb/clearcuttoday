import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function useRequireAuth(redirectUrl = '/login') {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push(`${redirectUrl}?redirect=${encodeURIComponent(router.asPath)}`);
    }
  }, [currentUser, loading, router, redirectUrl]);

  return { currentUser, loading };
}
