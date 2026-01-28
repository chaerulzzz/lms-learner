import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys, queryConfigs } from '@/lib/queryClient';
import { mockDashboardData, USE_MOCK } from '@/lib/mockData';
import type { ApiResponse } from '@/types/api';
import type { DashboardData } from '@/types/dashboard';

async function fetchDashboard(): Promise<DashboardData> {
  if (USE_MOCK) {
    return mockDashboardData;
  }
  const response = await api.get<ApiResponse<DashboardData>>('/dashboard');
  return response.data;
}

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: queryKeys.dashboard,
    queryFn: fetchDashboard,
    ...queryConfigs.dashboard,
  });
}
