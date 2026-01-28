import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Query Keys Structure
export const queryKeys = {
  // Auth
  auth: ['auth'] as const,
  currentUser: ['auth', 'current-user'] as const,

  // Dashboard
  dashboard: ['dashboard'] as const,

  // Courses
  courses: ['courses'] as const,
  course: (id: string) => ['courses', id] as const,
  courseProgress: (id: string) => ['courses', id, 'progress'] as const,

  // Learning Paths
  learningPaths: ['learning-paths'] as const,
  learningPath: (id: string) => ['learning-paths', id] as const,

  // Quizzes
  quiz: (id: string) => ['quizzes', id] as const,
  quizAttempts: (quizId: string) => ['quizzes', quizId, 'attempts'] as const,

  // Certificates
  certificates: ['certificates'] as const,
  certificate: (id: string) => ['certificates', id] as const,

  // Progress Tracking
  progress: ['progress'] as const,
  quizHistory: ['progress', 'quiz-history'] as const,
  leaderboard: (category?: string) => ['progress', 'leaderboard', category] as const,

  // Notifications
  notifications: ['notifications'] as const,
  notificationSettings: ['notifications', 'settings'] as const,

  // Gamification
  coins: ['coins'] as const,
  coinHistory: ['coins', 'history'] as const,
  badges: ['badges'] as const,
};

// Query Configuration Presets
export const queryConfigs = {
  // Real-time data (1 minute)
  realTime: {
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
  },

  // Dashboard data (5 minutes with auto-refresh)
  dashboard: {
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 30, // Auto-refresh every 30 seconds
  },

  // Static data (30 minutes)
  static: {
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60, // 1 hour
  },
};
