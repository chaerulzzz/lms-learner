# Technical Implementation Guidelines

## Document Information
- **Document Version**: 1.0
- **Date**: January 28, 2026
- **Project Name**: Web-Based Training Platform LMS
- **Applicable Modules**: Module 2 (LMS & Reporting)
- **Technology Stack**: ReactJS, React Query, Tailwind CSS, TypeScript

---

## Table of Contents
1. [Project Structure](#1-project-structure)
2. [React Query Configuration](#2-react-query-configuration)
3. [TypeScript Configuration](#3-typescript-configuration)
4. [Tailwind Configuration](#4-tailwind-configuration)
5. [Sample Type Definitions](#5-sample-type-definitions)
6. [Sample Custom Hooks](#6-sample-custom-hooks)
7. [Styling Best Practices](#7-styling-best-practices)
8. [Performance Optimization](#8-performance-optimization)
9. [Accessibility Guidelines](#9-accessibility-guidelines)
10. [Testing Recommendations](#10-testing-recommendations)
11. [State Management Patterns](#11-state-management-patterns)
12. [API Integration Patterns](#12-api-integration-patterns)
13. [Error Handling](#13-error-handling)
14. [Code Organization Best Practices](#14-code-organization-best-practices)

---

## 1. Project Structure

```
lms-vibe/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Alert.tsx
│   │   │   └── ...
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── LearningPathCard.tsx
│   │   │   ├── OngoingCourseCard.tsx
│   │   │   ├── StatsWidget.tsx
│   │   │   └── ...
│   │   ├── course/
│   │   │   ├── CoursePlayer.tsx
│   │   │   ├── VideoPlayer.tsx
│   │   │   ├── CourseOutline.tsx
│   │   │   ├── CourseMaterials.tsx
│   │   │   └── ...
│   │   ├── quiz/
│   │   │   ├── Quiz.tsx
│   │   │   ├── QuestionTypes/
│   │   │   │   ├── MultipleChoice.tsx
│   │   │   │   ├── TrueFalse.tsx
│   │   │   │   ├── Matching.tsx
│   │   │   │   ├── ShortAnswer.tsx
│   │   │   │   ├── FillInBlanks.tsx
│   │   │   │   └── Essay.tsx
│   │   │   ├── QuizResults.tsx
│   │   │   ├── QuizTimer.tsx
│   │   │   └── ...
│   │   ├── certificate/
│   │   │   ├── Certificate.tsx
│   │   │   ├── CertificateLibrary.tsx
│   │   │   ├── CertificateTemplate.tsx
│   │   │   └── ...
│   │   ├── tracking/
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── QuizHistory.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   ├── AnalyticsDashboard.tsx
│   │   │   └── ...
│   │   ├── notifications/
│   │   │   ├── NotificationBell.tsx
│   │   │   ├── NotificationDropdown.tsx
│   │   │   ├── NotificationSettings.tsx
│   │   │   └── ...
│   │   ├── gamification/
│   │   │   ├── CoinWidget.tsx
│   │   │   ├── BadgeGallery.tsx
│   │   │   ├── AchievementModal.tsx
│   │   │   └── ...
│   │   ├── reporting/
│   │   │   ├── EmployeeProgressDashboard.tsx
│   │   │   ├── EmployeeDetail.tsx
│   │   │   ├── CourseReport.tsx
│   │   │   ├── DepartmentAnalytics.tsx
│   │   │   ├── ReportGenerator.tsx
│   │   │   ├── LiveDashboard.tsx
│   │   │   ├── FilterPanel.tsx
│   │   │   └── ...
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       ├── Sidebar.tsx
│   │       ├── Footer.tsx
│   │       ├── MainLayout.tsx
│   │       └── ...
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useDashboard.ts
│   │   ├── useCourse.ts
│   │   ├── useQuiz.ts
│   │   ├── useProgress.ts
│   │   ├── useNotifications.ts
│   │   ├── useCoins.ts
│   │   ├── useReporting.ts
│   │   ├── usePermissions.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── ...
│   ├── lib/
│   │   ├── api.ts
│   │   ├── queryClient.ts
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── ...
│   ├── types/
│   │   ├── auth.ts
│   │   ├── course.ts
│   │   ├── quiz.ts
│   │   ├── progress.ts
│   │   ├── certificate.ts
│   │   ├── notification.ts
│   │   ├── gamification.ts
│   │   ├── reporting.ts
│   │   ├── api.ts
│   │   └── ...
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── CourseDetail.tsx
│   │   ├── CoursePage.tsx
│   │   ├── QuizPage.tsx
│   │   ├── Certificates.tsx
│   │   ├── Profile.tsx
│   │   ├── Settings.tsx
│   │   ├── Reporting/
│   │   │   ├── EmployeeProgress.tsx
│   │   │   ├── CourseReports.tsx
│   │   │   ├── DepartmentAnalytics.tsx
│   │   │   ├── LiveMonitoring.tsx
│   │   │   └── ...
│   │   └── ...
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── NotificationContext.tsx
│   │   └── ...
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── public/
│   ├── images/
│   ├── icons/
│   └── ...
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts (or webpack.config.js)
├── package.json
└── README.md
```

### Folder Organization Principles

1. **Components by Feature**: Group components by feature/module (dashboard, course, quiz, reporting)
2. **Common Components**: Reusable UI components in `common/` folder
3. **Custom Hooks**: All custom hooks in dedicated `hooks/` folder
4. **Type Definitions**: Centralized types in `types/` folder
5. **Utilities**: Helper functions in `lib/` folder
6. **Pages**: Route-level components in `pages/` folder

---

## 2. React Query Configuration

### Basic Setup

```typescript
// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes (gcTime in v5)
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

### App Setup

```typescript
// App.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app components */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### Query Keys Structure

```typescript
// lib/queryKeys.ts
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

  // Reporting
  reporting: {
    employees: (filters?: any) => ['reporting', 'employees', filters] as const,
    employee: (id: string) => ['reporting', 'employees', id] as const,
    courses: ['reporting', 'courses'] as const,
    course: (id: string) => ['reporting', 'courses', id] as const,
    departments: ['reporting', 'departments'] as const,
    liveActivity: ['reporting', 'live-activity'] as const,
  },
};
```

### Query Configuration Examples

```typescript
// Different stale times for different data types
export const queryConfigs = {
  // Real-time data (1 minute)
  realTime: {
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
  },

  // Dashboard data (5 minutes)
  dashboard: {
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 30, // Auto-refresh every 30 seconds
  },

  // Static data (30 minutes)
  static: {
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60, // 1 hour
  },

  // Live monitoring (10 seconds)
  liveMonitoring: {
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 10,
  },
};
```

---

## 3. TypeScript Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",

    /* Strict Type Checking */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noImplicitAny": true,
    "strictNullChecks": true,

    /* Module Resolution */
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,

    /* Path Mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"],
      "@/lib/*": ["./src/lib/*"]
    },

    /* Output */
    "outDir": "./dist",
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### TypeScript Best Practices

1. **Use Interfaces for Object Shapes**
```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

// Avoid using 'any'
// Bad
const user: any = fetchUser();

// Good
const user: User = fetchUser();
```

2. **Use Enums for Constants**
```typescript
enum UserRole {
  LEARNER = 'LEARNER',
  HC_ADMIN = 'HC_ADMIN',
  REPORTING_VIEWER = 'REPORTING_VIEWER',
  DEPARTMENT_MANAGER = 'DEPARTMENT_MANAGER',
}

enum CourseStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  OVERDUE = 'overdue',
}
```

3. **Use Type Guards**
```typescript
function isError(response: ApiResponse): response is ErrorResponse {
  return 'error' in response;
}

if (isError(response)) {
  // TypeScript knows response is ErrorResponse here
  console.error(response.error);
} else {
  // TypeScript knows response is SuccessResponse here
  console.log(response.data);
}
```

4. **Use Generics for Reusable Functions**
```typescript
function fetchData<T>(url: string): Promise<T> {
  return fetch(url).then(res => res.json());
}

// Usage
const users = await fetchData<User[]>('/api/users');
const course = await fetchData<Course>('/api/courses/123');
```

---

## 4. Tailwind Configuration

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#DC143C', // Crimson Red
          dark: '#A01010', // Dark Red for hover
          light: '#FF6B6B', // Light Red
        },
        neutral: {
          light: '#F5F5F5',
          medium: '#E0E0E0',
          dark: '#333333',
        },
        status: {
          success: '#28A745',
          warning: '#FFA500',
          error: '#DC3545',
          info: '#17A2B8',
        },
        progress: {
          low: '#DC3545',      // Red (0-30%)
          medium: '#FFA500',   // Orange (31-70%)
          high: '#FFC107',     // Yellow (71-99%)
          complete: '#28A745', // Green (100%)
        },
      },
      fontFamily: {
        sans: ['Roboto', 'Open Sans', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

### Global Styles (styles/globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply scroll-smooth;
  }

  body {
    @apply bg-neutral-light text-neutral-dark;
    @apply font-sans antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-bold text-neutral-dark;
  }

  h1 {
    @apply text-4xl;
  }

  h2 {
    @apply text-3xl;
  }

  h3 {
    @apply text-2xl;
  }
}

@layer components {
  /* Button Components */
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-all duration-200;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .btn-primary {
    @apply btn bg-primary-red text-white;
    @apply hover:bg-primary-dark active:scale-95;
    @apply focus:ring-primary-red;
  }

  .btn-secondary {
    @apply btn bg-white text-primary-red border-2 border-primary-red;
    @apply hover:bg-primary-red hover:text-white;
    @apply focus:ring-primary-red;
  }

  .btn-tertiary {
    @apply btn bg-transparent text-primary-red;
    @apply hover:underline;
  }

  /* Card Component */
  .card {
    @apply bg-white rounded-lg shadow-card;
    @apply p-6 transition-shadow duration-200;
    @apply hover:shadow-card-hover;
  }

  /* Input Components */
  .input {
    @apply w-full px-4 py-2 border border-neutral-medium rounded-lg;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent;
    @apply transition-all duration-200;
  }

  .input-error {
    @apply input border-status-error;
    @apply focus:ring-status-error;
  }

  /* Badge Component */
  .badge {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
  }

  .badge-primary {
    @apply badge bg-primary-red text-white;
  }

  .badge-success {
    @apply badge bg-status-success text-white;
  }

  .badge-warning {
    @apply badge bg-status-warning text-white;
  }

  .badge-error {
    @apply badge bg-status-error text-white;
  }

  /* Progress Bar */
  .progress-bar {
    @apply w-full h-2 bg-neutral-medium rounded-full overflow-hidden;
  }

  .progress-fill {
    @apply h-full transition-all duration-500 ease-out rounded-full;
  }

  /* Table */
  .table {
    @apply w-full border-collapse;
  }

  .table th {
    @apply bg-neutral-light text-left px-4 py-3 font-semibold text-sm;
    @apply border-b border-neutral-medium;
  }

  .table td {
    @apply px-4 py-3 border-b border-neutral-medium;
  }

  .table tbody tr:hover {
    @apply bg-neutral-light cursor-pointer;
  }
}

@layer utilities {
  /* Custom Scrollbar */
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .scrollbar-thin::-webkit-scrollbar-track {
    @apply bg-neutral-light rounded-full;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb {
    @apply bg-neutral-medium rounded-full;
    @apply hover:bg-neutral-dark;
  }

  /* Loading Skeleton */
  .skeleton {
    @apply animate-pulse bg-neutral-medium rounded;
  }

  /* Truncate Text */
  .truncate-2-lines {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .truncate-3-lines {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

---

## 5. Sample Type Definitions

### types/course.ts

```typescript
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  isMandatory: boolean;
  duration: number; // in minutes
  modules: Module[];
  quiz?: Quiz;
  materials: CourseMaterial[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  videoUrl?: string;
  documentUrl?: string;
  duration: number;
  order: number;
  isCompleted?: boolean;
}

export enum LessonType {
  VIDEO = 'video',
  DOCUMENT = 'document',
  QUIZ = 'quiz',
}

export interface CourseMaterial {
  id: string;
  name: string;
  type: 'pdf' | 'ppt' | 'doc' | 'other';
  url: string;
  size: number; // in bytes
  isLocked: boolean;
}

export interface CourseProgress {
  courseId: string;
  userId: string;
  completionPercentage: number;
  lessonsCompleted: string[];
  lastAccessedAt: Date;
  timeSpent: number; // in minutes
  status: CourseStatus;
  currentLessonId?: string;
}

export enum CourseStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  OVERDUE = 'overdue',
}
```

### types/quiz.ts

```typescript
export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  passingScore: number; // percentage
  maxAttempts: number;
  timeLimit?: number; // in minutes
  questions: Question[];
  shuffleQuestions: boolean;
  showCorrectAnswers: boolean;
}

export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | MatchingQuestion
  | ShortAnswerQuestion
  | FillInBlanksQuestion
  | EssayQuestion;

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  points: number;
  explanation?: string;
  order: number;
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  MATCHING = 'matching',
  SHORT_ANSWER = 'short_answer',
  FILL_BLANKS = 'fill_blanks',
  ESSAY = 'essay',
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: QuestionType.MULTIPLE_CHOICE;
  options: string[];
  correctAnswers: number[]; // indices
  multipleCorrect: boolean;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: QuestionType.TRUE_FALSE;
  correctAnswer: boolean;
}

export interface MatchingQuestion extends BaseQuestion {
  type: QuestionType.MATCHING;
  pairs: Array<{ left: string; right: string }>;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: QuestionType.SHORT_ANSWER;
  correctAnswers: string[];
  caseSensitive: boolean;
  maxLength: number;
}

export interface FillInBlanksQuestion extends BaseQuestion {
  type: QuestionType.FILL_BLANKS;
  template: string;
  blanks: Array<{
    index: number;
    correctAnswers: string[];
    caseSensitive: boolean;
  }>;
}

export interface EssayQuestion extends BaseQuestion {
  type: QuestionType.ESSAY;
  minWords?: number;
  maxWords?: number;
  allowFileUpload: boolean;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  attemptNumber: number;
  answers: QuizAnswer[];
  score: number;
  percentage: number;
  passed: boolean;
  startedAt: Date;
  submittedAt: Date;
  timeSpent: number; // in seconds
}

export interface QuizAnswer {
  questionId: string;
  answer: any; // type depends on question type
  isCorrect?: boolean;
  pointsEarned: number;
}
```

### types/reporting.ts

```typescript
export interface EmployeeProgress {
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  department: string;
  role: string;
  manager?: string;
  coursesAssigned: number;
  coursesInProgress: number;
  coursesCompleted: number;
  completionPercentage: number;
  totalLearningHours: number;
  lastActivityDate: Date;
  gmfcCoins: number;
  badgeLevel: string;
  status: EmployeeStatus;
  enrollmentDate: Date;
}

export enum EmployeeStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ON_TRACK = 'on_track',
  BEHIND = 'behind',
  OVERDUE = 'overdue',
}

export interface CourseReport {
  courseId: string;
  courseName: string;
  courseCategory: string;
  totalAssigned: number;
  started: number;
  inProgress: number;
  completed: number;
  notStarted: number;
  completionRate: number; // percentage
  dropoutRate: number; // percentage
  averageScore: number;
  passRate: number; // percentage
  averageTimeSpent: number; // hours
  averageTimeToComplete: number; // hours
  averageAttempts: number;
}

export interface DepartmentMetrics {
  departmentId: string;
  departmentName: string;
  employeeCount: number;
  coursesAssigned: number;
  completionRate: number;
  averageScore: number;
  totalLearningHours: number;
  avgLearningHoursPerEmployee: number;
  coinsEarned: number;
  ranking: number;
}

export interface FilterCriteria {
  departments?: string[];
  roles?: string[];
  status?: EmployeeStatus[];
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
  completionRange?: {
    min: number;
    max: number;
  };
  isOverdue?: boolean;
  mandatoryOnly?: boolean;
}
```

### types/api.ts

```typescript
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
  timestamp: Date;
}
```

---

## 6. Sample Custom Hooks

### hooks/useDashboard.ts

```typescript
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys, queryConfigs } from '@/lib/queryClient';
import type { DashboardData } from '@/types/dashboard';

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: queryKeys.dashboard,
    queryFn: () => api.get('/dashboard'),
    ...queryConfigs.dashboard,
  });
}
```

### hooks/useVideoProgress.ts

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryClient';
import { debounce } from '@/lib/utils';

interface SaveProgressParams {
  currentTime: number;
  duration: number;
}

export function useVideoProgress(courseId: string, videoId: string) {
  const queryClient = useQueryClient();

  const saveProgressMutation = useMutation({
    mutationFn: (progress: SaveProgressParams) =>
      api.post(`/courses/${courseId}/videos/${videoId}/progress`, progress),
    onSuccess: () => {
      // Invalidate course progress query
      queryClient.invalidateQueries({
        queryKey: queryKeys.courseProgress(courseId),
      });
    },
  });

  // Debounced save function (waits 3 seconds after last call)
  const debouncedSave = useCallback(
    debounce((progress: SaveProgressParams) => {
      saveProgressMutation.mutate(progress);
    }, 3000),
    [courseId, videoId]
  );

  return {
    saveProgress: debouncedSave,
    isLoading: saveProgressMutation.isPending,
    error: saveProgressMutation.error,
  };
}
```

### hooks/useEmployeeProgress.ts

```typescript
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryClient';
import type { EmployeeProgress, FilterCriteria, PaginatedResponse } from '@/types';

interface UseEmployeeProgressParams {
  filters?: FilterCriteria;
  search?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export function useEmployeeProgress(params: UseEmployeeProgressParams) {
  return useQuery<PaginatedResponse<EmployeeProgress>>({
    queryKey: queryKeys.reporting.employees(params),
    queryFn: () => api.get('/reporting/employees', { params }),
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: 1000 * 60, // auto-refresh every minute
    keepPreviousData: true, // Keep previous data while fetching new
  });
}
```

### hooks/useDebounce.ts

```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### hooks/usePermissions.ts

```typescript
import { useAuth } from './useAuth';
import { UserRole } from '@/types/auth';

interface Permissions {
  canViewAllEmployees: boolean;
  canSendReminders: boolean;
  canAssignCourses: boolean;
  canDownloadReports: boolean;
  canViewAllDepartments: boolean;
  canPerformActions: boolean;
}

export function usePermissions(): Permissions {
  const { user } = useAuth();

  const isHCAdmin = user?.role === UserRole.HC_ADMIN;
  const isDepartmentManager = user?.role === UserRole.DEPARTMENT_MANAGER;
  const isReportingViewer = user?.role === UserRole.REPORTING_VIEWER;

  return {
    canViewAllEmployees: isHCAdmin || isReportingViewer,
    canSendReminders: isHCAdmin || isDepartmentManager,
    canAssignCourses: isHCAdmin,
    canDownloadReports: isHCAdmin || isDepartmentManager,
    canViewAllDepartments: isHCAdmin || isReportingViewer,
    canPerformActions: isHCAdmin || isDepartmentManager,
  };
}
```

---

## 7. Styling Best Practices

### Consistent Color Usage

Always use Tailwind color classes instead of hardcoded colors:

```tsx
// Good
<div className="bg-primary-red text-white hover:bg-primary-dark">
  Click me
</div>

// Bad
<div style={{ backgroundColor: '#DC143C', color: '#FFFFFF' }}>
  Click me
</div>
```

### Progress Indicators

Use consistent color coding:

```tsx
function getProgressColor(percentage: number): string {
  if (percentage === 0) return 'bg-gray-300';
  if (percentage <= 30) return 'bg-progress-low'; // Red
  if (percentage <= 70) return 'bg-progress-medium'; // Orange
  if (percentage < 100) return 'bg-progress-high'; // Yellow
  return 'bg-progress-complete'; // Green
}

// Usage
<div className="progress-bar">
  <div
    className={`progress-fill ${getProgressColor(progress)}`}
    style={{ width: `${progress}%` }}
  />
</div>
```

### Responsive Design

Always use mobile-first approach:

```tsx
// Good - Mobile first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {/* Cards */}
</div>

// Good - Responsive spacing
<div className="p-4 md:p-6 lg:p-8">
  {/* Content */}
</div>

// Good - Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Title
</h1>
```

### Component Design

```tsx
// Consistent card design
<div className="card">
  <h3 className="text-lg font-semibold mb-2">{title}</h3>
  <p className="text-neutral-dark">{description}</p>
</div>

// Hover effects
<button className="btn-primary transform hover:scale-105 transition-transform">
  Click me
</button>
```

---

## 8. Performance Optimization

### React Query Strategies

```typescript
// 1. Use staleTime and cacheTime appropriately
const { data } = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});

// 2. Prefetch for anticipated actions
const queryClient = useQueryClient();

// Prefetch on hover
<div
  onMouseEnter={() => {
    queryClient.prefetchQuery({
      queryKey: ['course', courseId],
      queryFn: () => fetchCourse(courseId),
    });
  }}
>
  {/* Course card */}
</div>

// 3. Optimistic updates
const mutation = useMutation({
  mutationFn: updateProgress,
  onMutate: async (newProgress) => {
    // Cancel ongoing queries
    await queryClient.cancelQueries({ queryKey: ['progress'] });

    // Snapshot previous value
    const previousProgress = queryClient.getQueryData(['progress']);

    // Optimistically update
    queryClient.setQueryData(['progress'], newProgress);

    // Return context
    return { previousProgress };
  },
  onError: (err, newProgress, context) => {
    // Rollback on error
    queryClient.setQueryData(['progress'], context.previousProgress);
  },
  onSettled: () => {
    // Refetch after error or success
    queryClient.invalidateQueries({ queryKey: ['progress'] });
  },
});

// 4. Parallel queries
const results = useQueries({
  queries: [
    { queryKey: ['courses'], queryFn: fetchCourses },
    { queryKey: ['progress'], queryFn: fetchProgress },
    { queryKey: ['certificates'], queryFn: fetchCertificates },
  ],
});

// 5. Pagination
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['employees'],
  queryFn: ({ pageParam = 1 }) => fetchEmployees(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextPage,
});
```

### React Optimizations

```typescript
// 1. React.memo for expensive components
export const ExpensiveComponent = React.memo(({ data }) => {
  // Expensive rendering logic
  return <div>{/* ... */}</div>;
});

// 2. useMemo for expensive calculations
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.name.localeCompare(b.name));
}, [data]);

// 3. useCallback for functions passed as props
const handleClick = useCallback(() => {
  // Handle click
}, [dependencies]);

// 4. Code splitting with React.lazy
const ReportingModule = React.lazy(() => import('./pages/Reporting'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ReportingModule />
    </Suspense>
  );
}

// 5. Virtual scrolling for long lists
import { useVirtualizer } from '@tanstack/react-virtual';

function EmployeeList({ employees }) {
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtualizer({
    count: employees.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div key={virtualRow.index}>
            {employees[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Asset Optimization

```tsx
// 1. Lazy load images
<img
  src={imageUrl}
  alt={alt}
  loading="lazy"
  className="w-full h-auto"
/>

// 2. Responsive images
<img
  src={imageUrl}
  srcSet={`
    ${imageUrl}?w=400 400w,
    ${imageUrl}?w=800 800w,
    ${imageUrl}?w=1200 1200w
  `}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  alt={alt}
/>

// 3. Video optimization
<video
  preload="metadata"
  poster={thumbnailUrl}
  className="w-full"
>
  <source src={videoUrl} type="video/mp4" />
</video>
```

---

## 9. Accessibility Guidelines

### Semantic HTML

```tsx
// Good - Semantic HTML
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Course Title</h1>
    <section>
      <h2>Module 1</h2>
      {/* Content */}
    </section>
  </article>
</main>

<footer>
  {/* Footer content */}
</footer>

// Bad - Div soup
<div>
  <div>
    <div><a href="/">Home</a></div>
  </div>
</div>
```

### ARIA Labels and Roles

```tsx
// Icon-only buttons
<button aria-label="Close dialog" onClick={onClose}>
  <XIcon aria-hidden="true" />
</button>

// Decorative images
<img src={decorativeUrl} alt="" aria-hidden="true" />

// Meaningful images
<img src={courseImage} alt="Introduction to React course thumbnail" />

// Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {notification && <p>{notification}</p>}
</div>

// Dialog
<div role="dialog" aria-labelledby="dialog-title" aria-modal="true">
  <h2 id="dialog-title">Confirm Action</h2>
  {/* Dialog content */}
</div>
```

### Keyboard Navigation

```tsx
// Keyboard event handlers
function SearchBar() {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      clearSearch();
    }
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <input
      type="text"
      onKeyDown={handleKeyDown}
      aria-label="Search courses"
    />
  );
}

// Focus management in modals
function Modal({ isOpen, onClose }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div role="dialog" aria-modal="true">
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
      {/* Modal content */}
    </div>
  );
}
```

### Form Accessibility

```tsx
// Proper label association
<div>
  <label htmlFor="email">Email Address</label>
  <input
    id="email"
    type="email"
    name="email"
    required
    aria-describedby="email-error"
  />
  {error && (
    <p id="email-error" role="alert" className="text-status-error">
      {error}
    </p>
  )}
</div>

// Fieldset for grouped inputs
<fieldset>
  <legend>Select notification preferences</legend>
  <label>
    <input type="checkbox" name="email" /> Email notifications
  </label>
  <label>
    <input type="checkbox" name="push" /> Push notifications
  </label>
</fieldset>
```

---

## 10. Testing Recommendations

### Unit Testing (Vitest + Testing Library)

```typescript
// Example: Testing a custom hook
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDashboard } from '@/hooks/useDashboard';

describe('useDashboard', () => {
  it('fetches dashboard data', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useDashboard(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
  });
});
```

### Component Testing

```typescript
// Example: Testing a button component
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/common/Button';

describe('Button', () => {
  it('renders button text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

### E2E Testing (Playwright)

```typescript
// Example: Testing course completion flow
import { test, expect } from '@playwright/test';

test('complete a course', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[name="email"]', 'learner@example.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');

  // Navigate to course
  await page.click('text=Introduction to React');

  // Watch video
  await page.click('button[aria-label="Play video"]');
  await page.waitForTimeout(5000); // Wait 5 seconds

  // Complete quiz
  await page.click('text=Take Quiz');
  await page.click('input[value="option1"]');
  await page.click('button:has-text("Submit Quiz")');

  // Verify completion
  await expect(page.locator('text=Course Completed')).toBeVisible();
  await expect(page.locator('text=Download Certificate')).toBeVisible();
});
```

---

## 11. State Management Patterns

### Context for Global State

```typescript
// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token and validate
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const user = await validateToken(token);
          setUser(user);
        }
      } catch (error) {
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { user, token } = await loginAPI(email, password);
    localStorage.setItem('authToken', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### URL State with React Router

```typescript
// For filters, pagination, etc.
import { useSearchParams } from 'react-router-dom';

function EmployeeList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const department = searchParams.get('department') || '';

  const updateFilters = (newFilters: Record<string, string>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      return newParams;
    });
  };

  return (
    <div>
      <FilterPanel onFilterChange={updateFilters} />
      <EmployeeTable page={page} department={department} />
    </div>
  );
}
```

---

## 12. API Integration Patterns

### API Client Setup

```typescript
// lib/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (add auth token)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle errors, refresh token)
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      try {
        const newToken = await refreshToken();
        localStorage.setItem('authToken', newToken);
        // Retry original request
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return apiClient.request(error.config);
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API methods
export const api = {
  get: <T>(url: string, config?: any) =>
    apiClient.get<T>(url, config),

  post: <T>(url: string, data?: any, config?: any) =>
    apiClient.post<T>(url, data, config),

  put: <T>(url: string, data?: any, config?: any) =>
    apiClient.put<T>(url, data, config),

  delete: <T>(url: string, config?: any) =>
    apiClient.delete<T>(url, config),
};
```

---

## 13. Error Handling

### Error Boundary

```typescript
// components/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-status-error mb-4">
              Something went wrong
            </h1>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Query Error Handling

```typescript
// Example: Handling errors in queries
function CourseList() {
  const { data, error, isError, refetch } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
    retry: 1,
  });

  if (isError) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <p className="text-status-error mb-2">
          Failed to load courses: {error.message}
        </p>
        <button onClick={() => refetch()} className="btn-secondary">
          Try Again
        </button>
      </div>
    );
  }

  return <div>{/* Course list */}</div>;
}
```

---

## 14. Code Organization Best Practices

### File Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `CourseCard.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useAuth.ts`, `useDashboard.ts`)
- **Utils**: camelCase (e.g., `formatDate.ts`, `validation.ts`)
- **Types**: camelCase (e.g., `course.ts`, `reporting.ts`)
- **Constants**: UPPER_SNAKE_CASE in constants file

### Component Structure

```typescript
// Good component structure
import React, { useState, useEffect } from 'react';
import type { Course } from '@/types/course';

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
}

export function CourseCard({ course, onEnroll }: CourseCardProps) {
  // 1. Hooks
  const [isExpanded, setIsExpanded] = useState(false);

  // 2. Effects
  useEffect(() => {
    // Side effects
  }, []);

  // 3. Event handlers
  const handleEnroll = () => {
    onEnroll?.(course.id);
  };

  // 4. Render
  return (
    <div className="card">
      {/* Component JSX */}
    </div>
  );
}
```

### Import Order

```typescript
// 1. External libraries
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal modules (absolute imports)
import { Button } from '@/components/common/Button';
import { useCourse } from '@/hooks/useCourse';
import type { Course } from '@/types/course';

// 3. Relative imports
import { CourseCard } from './CourseCard';
import styles from './Course.module.css';
```

---

**Document End**

This comprehensive technical implementation guide provides all the necessary patterns, examples, and best practices for building the LMS and Reporting modules with ReactJS, React Query, Tailwind CSS, and TypeScript.
