import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys, queryConfigs } from '@/lib/queryClient';
import { mockDashboardData, USE_MOCK } from '@/lib/mockData';
import type { ApiResponse } from '@/types/api';
import type { DashboardData, DashboardCourse } from '@/types/dashboard';

// Shape returned by the real backend API
interface ApiEnrollment {
  id: number;
  course_id: number;
  completion_status: string;
  overall_progress: number;
  enrolled_at: string;
  Course: {
    id: number;
    title: string;
    description: string;
    category: string;
    thumbnail_url: string;
    duration_minutes: number;
    is_mandatory: boolean;
  };
}

interface ApiDashboardResponse {
  mandatory_courses: ApiEnrollment[];
  in_progress_courses: ApiEnrollment[];
  completed_courses: number;
  certificates: number;
  gmfc_coins: number;
  current_badge_level: string;
  earned_badges: number;
  total_learning_hours: number;
  current_streak: number;
  leaderboard_rank: number;
  recent_transactions: unknown[];
}

function mapEnrollmentToCourse(enrollment: ApiEnrollment): DashboardCourse {
  return {
    id: enrollment.Course.id,
    title: enrollment.Course.title,
    description: enrollment.Course.description,
    category: enrollment.Course.category,
    thumbnail: enrollment.Course.thumbnail_url || '',
    is_mandatory: enrollment.Course.is_mandatory,
    duration: enrollment.Course.duration_minutes,
    completion_percentage: enrollment.overall_progress,
    status: enrollment.completion_status as DashboardCourse['status'],
    enrolled_at: enrollment.enrolled_at,
  };
}

function transformDashboardResponse(raw: ApiDashboardResponse): DashboardData {
  return {
    user: null as unknown as DashboardData['user'], // user comes from AuthContext, not dashboard
    mandatory_courses: (raw.mandatory_courses || []).map(mapEnrollmentToCourse),
    in_progress_courses: (raw.in_progress_courses || []).map(mapEnrollmentToCourse),
    completed_courses_count: raw.completed_courses || 0,
    certificates: [],
    gmfc_coins: raw.gmfc_coins || 0,
    current_badge_level: raw.current_badge_level || 'none',
    leaderboard_rank: raw.leaderboard_rank || 0,
    badges: [],
    total_learning_hours: raw.total_learning_hours || 0,
    current_streak: raw.current_streak || 0,
  };
}

async function fetchDashboard(): Promise<DashboardData> {
  if (USE_MOCK) {
    return mockDashboardData;
  }
  const response = await api.get<ApiResponse<ApiDashboardResponse>>('/dashboard');
  return transformDashboardResponse(response.data);
}

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: queryKeys.dashboard,
    queryFn: fetchDashboard,
    ...queryConfigs.dashboard,
  });
}
