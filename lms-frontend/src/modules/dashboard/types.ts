import type { User } from '@/modules/auth/types';

export interface DashboardCourse {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  is_mandatory: boolean;
  duration: number; // in minutes
  completion_percentage: number;
  status: 'enrolled' | 'in_progress' | 'completed';
  enrolled_at?: string;
}

export interface DashboardCertificate {
  id: number;
  course_id: number;
  course_title: string;
  issued_at: string;
}

export interface DashboardBadge {
  id: number;
  name: string;
  description: string;
  icon: string;
  earned_at?: string;
}

export interface DashboardData {
  user: User;
  mandatory_courses: DashboardCourse[];
  in_progress_courses: DashboardCourse[];
  completed_courses_count: number;
  certificates: DashboardCertificate[];
  gmfc_coins: number;
  current_badge_level: string;
  leaderboard_rank: number;
  badges: DashboardBadge[];
  total_learning_hours: number;
  current_streak: number;
}
