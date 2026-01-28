import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys, queryConfigs } from '@/lib/queryClient';
import { mockDashboardData } from '@/lib/mockData';
import type { ApiResponse } from '@/types/api';
import type { DashboardData } from '@/types/dashboard';

async function fetchDashboard(): Promise<DashboardData> {
  try {
    const response = await api.get<ApiResponse<DashboardData>>('/dashboard');
    return response.data;
  } catch {
    console.warn('[Mock Mode] Using mock dashboard data — backend is offline');
    return mockDashboardData;
  }
}

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: queryKeys.dashboard,
    queryFn: fetchDashboard,
    ...queryConfigs.dashboard,
  });
}
