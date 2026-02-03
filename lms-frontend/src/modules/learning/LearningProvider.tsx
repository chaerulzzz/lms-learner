import React, { createContext, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys, queryConfigs } from '@/lib/queryClient';
import { mockLearningPaths, mockLearningPathDetails, USE_MOCK } from '@/lib/mockData';
import type { ApiResponse } from '@/types/api';
import type { LearningPathSummary, LearningPathDetail, LearningPathCourse } from './types';

// Backend API shapes
interface ApiEnrollment {
  id: number;
  user_id: number;
  course_id: number;
  completion_status: string;
  overall_progress: number;
  final_score: number;
  is_passed: boolean;
  enrolled_at: string;
  completed_at: string | null;
}

interface ApiCourse {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnail_url?: string;
  duration_minutes: number;
  difficulty_level: string;
  passing_score: number;
  is_mandatory: boolean;
  mandatory_due_date?: string | null;
  is_published: boolean;
  coins_reward: number;
  created_at: string;
}

async function fetchLearningPaths(): Promise<LearningPathSummary[]> {
  if (USE_MOCK) {
    return mockLearningPaths;
  }

  const [coursesRes, mandatoryRes, inProgressRes, completedRes] = await Promise.all([
    api.get<ApiResponse<ApiCourse[]> & { pagination: unknown }>('/public/courses?page_size=100'),
    api.get<ApiResponse<ApiEnrollment[]>>('/courses/mandatory'),
    api.get<ApiResponse<ApiEnrollment[]>>('/courses/in-progress'),
    api.get<ApiResponse<ApiEnrollment[]>>('/courses/completed').catch(() => ({ data: [] })),
  ]);

  const allCourses: ApiCourse[] = coursesRes.data || [];
  const mandatoryEnrollments: ApiEnrollment[] = mandatoryRes.data || [];
  const inProgressEnrollments: ApiEnrollment[] = inProgressRes.data || [];
  const completedEnrollments: ApiEnrollment[] = completedRes.data || [];

  const courseMap = new Map(allCourses.map((c) => [c.id, c]));
  const enrollmentMap = new Map([
    ...mandatoryEnrollments.map((e) => [e.course_id, e] as const),
    ...inProgressEnrollments.map((e) => [e.course_id, e] as const),
    ...completedEnrollments.map((e) => [e.course_id, e] as const),
  ]);

  const mandatoryCourses = allCourses.filter((c) => c.is_mandatory);
  const mandatoryCompleted = mandatoryCourses.filter((c) => {
    const enrollment = enrollmentMap.get(c.id);
    return enrollment?.completion_status === 'completed';
  }).length;
  const mandatoryProgress = mandatoryCourses.length > 0
    ? Math.round((mandatoryCompleted / mandatoryCourses.length) * 100)
    : 0;

  const dueDates = mandatoryCourses
    .map((c) => c.mandatory_due_date)
    .filter((d): d is string => !!d);
  const earliestDue = dueDates.length > 0
    ? dueDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())[0]
    : null;

  const mandatoryPath: LearningPathSummary = {
    id: 1,
    title: 'Mandatory Learning Path',
    description: 'Required courses assigned to you. Complete all courses before the due date.',
    is_mandatory: true,
    due_date: earliestDue,
    course_count: mandatoryCourses.length,
    completed_course_count: mandatoryCompleted,
    completion_percentage: mandatoryProgress,
    status: mandatoryProgress === 100 ? 'completed' : mandatoryProgress > 0 ? 'in_progress' : 'not_started',
    assigned_at: mandatoryCourses[0]?.created_at || new Date().toISOString(),
  };

  const electiveEnrollments = inProgressEnrollments.filter((e) => {
    const course = courseMap.get(e.course_id);
    return course && !course.is_mandatory;
  });

  const paths: LearningPathSummary[] = [mandatoryPath];

  if (electiveEnrollments.length > 0) {
    const electiveCompleted = electiveEnrollments.filter(
      (e) => e.completion_status === 'completed'
    ).length;
    const electiveProgress = Math.round(
      (electiveCompleted / electiveEnrollments.length) * 100
    );

    paths.push({
      id: 2,
      title: 'Elective Courses',
      description: 'Optional courses you have enrolled in for professional development.',
      is_mandatory: false,
      due_date: null,
      course_count: electiveEnrollments.length,
      completed_course_count: electiveCompleted,
      completion_percentage: electiveProgress,
      status: electiveProgress === 100 ? 'completed' : electiveProgress > 0 ? 'in_progress' : 'not_started',
      assigned_at: electiveEnrollments[0]?.enrolled_at || new Date().toISOString(),
    });
  }

  return paths;
}

async function fetchLearningPath(id: string): Promise<LearningPathDetail> {
  if (USE_MOCK) {
    const detail = mockLearningPathDetails[Number(id)];
    if (!detail) throw new Error('Learning path not found');
    return detail;
  }

  const [coursesRes, mandatoryRes, inProgressRes, completedRes] = await Promise.all([
    api.get<ApiResponse<ApiCourse[]> & { pagination: unknown }>('/public/courses?page_size=100'),
    api.get<ApiResponse<ApiEnrollment[]>>('/courses/mandatory'),
    api.get<ApiResponse<ApiEnrollment[]>>('/courses/in-progress'),
    api.get<ApiResponse<ApiEnrollment[]>>('/courses/completed').catch(() => ({ data: [] })),
  ]);

  const allCourses: ApiCourse[] = coursesRes.data || [];
  const mandatoryEnrollments: ApiEnrollment[] = mandatoryRes.data || [];
  const inProgressEnrollments: ApiEnrollment[] = inProgressRes.data || [];
  const completedEnrollments: ApiEnrollment[] = completedRes.data || [];

  const enrollmentMap = new Map([
    ...mandatoryEnrollments.map((e) => [e.course_id, e] as const),
    ...inProgressEnrollments.map((e) => [e.course_id, e] as const),
    ...completedEnrollments.map((e) => [e.course_id, e] as const),
  ]);

  const pathId = Number(id);
  let filteredCourses: ApiCourse[];
  let pathSummary: Omit<LearningPathSummary, 'course_count' | 'completed_course_count' | 'completion_percentage' | 'status'>;

  if (pathId === 1) {
    filteredCourses = allCourses.filter((c) => c.is_mandatory);
    const dueDates = filteredCourses
      .map((c) => c.mandatory_due_date)
      .filter((d): d is string => !!d);
    pathSummary = {
      id: 1,
      title: 'Mandatory Learning Path',
      description: 'Required courses assigned to you. Complete all courses before the due date.',
      is_mandatory: true,
      due_date: dueDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())[0] || null,
      assigned_at: filteredCourses[0]?.created_at || new Date().toISOString(),
    };
  } else if (pathId === 2) {
    filteredCourses = allCourses.filter((c) => {
      if (c.is_mandatory) return false;
      return enrollmentMap.has(c.id);
    });
    pathSummary = {
      id: 2,
      title: 'Elective Courses',
      description: 'Optional courses you have enrolled in for professional development.',
      is_mandatory: false,
      due_date: null,
      assigned_at: new Date().toISOString(),
    };
  } else {
    throw new Error('Learning path not found');
  }

  const courses: LearningPathCourse[] = filteredCourses.map((course, index) => {
    const enrollment = enrollmentMap.get(course.id);
    const progress = enrollment?.overall_progress || 0;
    let status: LearningPathCourse['status'] = 'not_started';
    if (enrollment?.completion_status === 'completed') status = 'completed';
    else if (enrollment?.completion_status === 'in_progress') status = 'in_progress';

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      category: course.category,
      thumbnail: course.thumbnail_url || '',
      duration: course.duration_minutes,
      completion_percentage: progress,
      status,
      order: index + 1,
      lessons_count: 0,
      completed_lessons: 0,
    };
  });

  const completedCount = courses.filter((c) => c.status === 'completed').length;
  const overallProgress = courses.length > 0
    ? Math.round((completedCount / courses.length) * 100)
    : 0;

  return {
    ...pathSummary,
    course_count: courses.length,
    completed_course_count: completedCount,
    completion_percentage: overallProgress,
    status: overallProgress === 100 ? 'completed' : overallProgress > 0 ? 'in_progress' : 'not_started',
    estimated_duration: courses.reduce((sum, c) => sum + c.duration, 0),
    courses,
  };
}

interface LearningContextType {
  paths: LearningPathSummary[] | undefined;
  isPathsLoading: boolean;
  isPathsError: boolean;
  pathDetail: LearningPathDetail | undefined;
  isDetailLoading: boolean;
  isDetailError: boolean;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const { pathId } = useParams<{ pathId: string }>();

  const pathsQuery = useQuery<LearningPathSummary[]>({
    queryKey: queryKeys.learningPaths,
    queryFn: fetchLearningPaths,
    ...queryConfigs.dashboard,
  });

  const detailQuery = useQuery<LearningPathDetail>({
    queryKey: queryKeys.learningPath(pathId || ''),
    queryFn: () => fetchLearningPath(pathId!),
    enabled: !!pathId,
  });

  return (
    <LearningContext.Provider
      value={{
        paths: pathsQuery.data,
        isPathsLoading: pathsQuery.isLoading,
        isPathsError: pathsQuery.isError,
        pathDetail: detailQuery.data,
        isDetailLoading: detailQuery.isLoading,
        isDetailError: detailQuery.isError,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}
