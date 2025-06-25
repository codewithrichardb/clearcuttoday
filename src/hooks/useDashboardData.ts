import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardData {
  journey: {
    track: string;
    intentions: string[];
    createdAt: string;
    updatedAt: string;
  } | null;
  stats: {
    streak: number;
    mood: number | null;
    recentJournals: Array<{
      id: string;
      title: string;
      content: string;
      createdAt: string;
      updatedAt: string;
    }>;
  };
}

export function useDashboardData() {
  const { currentUser } = useAuth();

  const fetchDashboardData = async (): Promise<DashboardData> => {
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const token = await currentUser.getIdToken();
    const response = await fetch('/api/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch dashboard data');
    }

    const { data } = await response.json();
    return data;
  };

  return useQuery<DashboardData, Error>({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
    enabled: !!currentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });
}
