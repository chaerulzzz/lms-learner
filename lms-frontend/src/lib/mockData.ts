import type { User, AuthResponse } from '@/types/auth';
import type { DashboardData } from '@/types/dashboard';

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const MOCK_TOKEN = 'mock-jwt-token-for-local-testing';

export const mockUser: User = {
  id: 1,
  email: 'learner1@lms.com',
  first_name: 'John',
  last_name: 'Doe',
  full_name: 'John Doe',
  role: 'learner',
  department: 'Engineering',
  gmfc_coins: 450,
  current_badge_level: 'silver',
  total_learning_hours: 24.5,
  current_streak: 5,
  created_at: '2024-01-15T10:00:00Z',
};

export const mockAuthResponse: AuthResponse = {
  token: MOCK_TOKEN,
  user: mockUser,
};

export const mockDashboardData: DashboardData = {
  user: mockUser,
  mandatory_courses: [
    {
      id: 1,
      title: 'Frontend Development Fundamentals',
      description: 'Learn the core concepts of modern frontend development including HTML, CSS, and JavaScript frameworks.',
      category: 'Frontend',
      thumbnail: '',
      is_mandatory: true,
      duration: 480,
      completion_percentage: 75,
      status: 'in_progress',
      enrolled_at: '2024-01-20T08:00:00Z',
    },
    {
      id: 2,
      title: 'TypeScript Mastery',
      description: 'Master TypeScript for building type-safe, scalable applications with confidence.',
      category: 'Programming',
      thumbnail: '',
      is_mandatory: true,
      duration: 360,
      completion_percentage: 0,
      status: 'enrolled',
      enrolled_at: '2024-01-25T09:00:00Z',
    },
  ],
  in_progress_courses: [
    {
      id: 1,
      title: 'Frontend Development Fundamentals',
      description: 'Learn the core concepts of modern frontend development including HTML, CSS, and JavaScript frameworks.',
      category: 'Frontend',
      thumbnail: '',
      is_mandatory: true,
      duration: 480,
      completion_percentage: 75,
      status: 'in_progress',
    },
    {
      id: 3,
      title: 'React Advanced Patterns',
      description: 'Deep dive into advanced React patterns including context, reducers, and performance optimization.',
      category: 'Frontend',
      thumbnail: '',
      is_mandatory: false,
      duration: 300,
      completion_percentage: 40,
      status: 'in_progress',
    },
    {
      id: 4,
      title: 'API Integration Best Practices',
      description: 'Learn how to build robust integrations with RESTful APIs using modern HTTP clients.',
      category: 'Backend',
      thumbnail: '',
      is_mandatory: true,
      duration: 240,
      completion_percentage: 60,
      status: 'in_progress',
    },
  ],
  completed_courses_count: 7,
  certificates: [
    {
      id: 1,
      course_id: 10,
      course_title: 'JavaScript Fundamentals',
      issued_at: '2024-01-10T14:00:00Z',
    },
    {
      id: 2,
      course_id: 11,
      course_title: 'HTML & CSS Basics',
      issued_at: '2023-12-20T10:00:00Z',
    },
  ],
  gmfc_coins: 450,
  current_badge_level: 'silver',
  leaderboard_rank: 12,
  badges: [
    {
      id: 1,
      name: 'First Course',
      description: 'Completed your first course',
      icon: '🎓',
      earned_at: '2023-12-20T10:00:00Z',
    },
    {
      id: 2,
      name: 'Quiz Master',
      description: 'Passed 5 quizzes successfully',
      icon: '🏆',
      earned_at: '2024-01-05T16:00:00Z',
    },
    {
      id: 3,
      name: 'Learning Streak',
      description: 'Maintained a 5-day learning streak',
      icon: '🔥',
      earned_at: '2024-01-22T08:00:00Z',
    },
  ],
  total_learning_hours: 24.5,
  current_streak: 5,
};
