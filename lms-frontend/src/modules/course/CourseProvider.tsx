import React, { createContext, useContext, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryClient';
import { mockCourseDetails, USE_MOCK } from '@/lib/mockData';
import type { ApiResponse } from '@/types/api';
import type { CourseDetail, CourseModule, CourseLesson, CourseMaterialItem, LessonProgressDetail } from './types';

// API shapes
interface ApiCourseMaterial {
  id: number;
  type: string;
  title: string;
  url: string;
  duration_seconds?: number;
}

interface ApiLesson {
  id: number;
  title: string;
  order: number;
  materials: ApiCourseMaterial[];
}

interface ApiCourseDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnail_url?: string;
  duration_minutes: number;
  difficulty_level: string;
  passing_score: number;
  is_mandatory: boolean;
  is_published: boolean;
  enrollment_count: number;
  completion_count: number;
  average_rating: number;
  coins_reward: number;
  created_at: string;
  lessons?: ApiLesson[];
}

interface ApiLessonProgress {
  id: number;
  title: string;
  order: number;
  is_completed: boolean;
  watched_percentage: number;
}

interface ApiCourseProgress {
  course_id: number;
  course_title: string;
  total_lessons: number;
  completed_lessons: number;
  overall_percentage: number;
  lessons: ApiLessonProgress[];
}

interface ApiEnrollment {
  id: number;
  course_id: number;
  completion_status: string;
  overall_progress: number;
  enrolled_at: string;
  completed_at: string | null;
}

function mapLessonsToModules(
  lessons: ApiLesson[],
  progressMap: Map<number, ApiLessonProgress>
): CourseModule[] {
  if (!lessons || lessons.length === 0) return [];

  const courseLessons: CourseLesson[] = lessons
    .sort((a, b) => a.order - b.order)
    .map((lesson) => {
      const progress = progressMap.get(lesson.id);
      const videoMaterial = lesson.materials?.find((m) => m.type === 'video');
      return {
        id: lesson.id,
        title: lesson.title,
        type: videoMaterial ? 'video' as const : 'document' as const,
        duration: videoMaterial ? Math.round((videoMaterial.duration_seconds || 0) / 60) : 5,
        order: lesson.order,
        is_completed: progress?.is_completed ?? false,
        video_url: videoMaterial?.url,
      };
    });

  return [
    {
      id: 1,
      title: 'Course Content',
      order: 1,
      lessons: courseLessons,
    },
  ];
}

function extractMaterials(lessons: ApiLesson[]): CourseMaterialItem[] {
  if (!lessons) return [];
  const materials: CourseMaterialItem[] = [];
  for (const lesson of lessons) {
    if (!lesson.materials) continue;
    for (const mat of lesson.materials) {
      if (mat.type !== 'video') {
        materials.push({
          id: mat.id,
          name: mat.title,
          type: (mat.type as CourseMaterialItem['type']) || 'other',
          size: 0,
          url: mat.url,
        });
      }
    }
  }
  return materials;
}

async function fetchCourse(id: string): Promise<CourseDetail> {
  if (USE_MOCK) {
    const detail = mockCourseDetails[Number(id)];
    if (!detail) throw new Error('Course not found');
    return detail;
  }

  const [courseRes, progressRes, mandatoryRes, inProgressRes] = await Promise.all([
    api.get<ApiResponse<ApiCourseDetail>>(`/public/courses/${id}`),
    api.get<ApiResponse<ApiCourseProgress | ApiLessonProgress[]>>(`/progress/course/${id}`).catch(() => null),
    api.get<ApiResponse<ApiEnrollment[]>>('/courses/mandatory'),
    api.get<ApiResponse<ApiEnrollment[]>>('/courses/in-progress'),
  ]);

  const course = courseRes.data;
  if (!course) throw new Error('Course not found');

  const allEnrollments = [...(mandatoryRes.data || []), ...(inProgressRes.data || [])];
  const enrollment = allEnrollments.find((e) => e.course_id === course.id);

  let progressData: ApiCourseProgress | null = null;
  const progressMap = new Map<number, ApiLessonProgress>();

  if (progressRes?.data) {
    const raw = progressRes.data;
    if (Array.isArray(raw)) {
      for (const lp of raw as ApiLessonProgress[]) {
        if (lp.id) progressMap.set(lp.id, lp);
      }
    } else if (typeof raw === 'object' && 'lessons' in raw) {
      progressData = raw as ApiCourseProgress;
      for (const lp of progressData.lessons || []) {
        progressMap.set(lp.id, lp);
      }
    }
  }

  const lessons = course.lessons || [];
  const modules = mapLessonsToModules(lessons, progressMap);
  const materials = extractMaterials(lessons);

  const totalLessons = progressData?.total_lessons ?? lessons.length;
  const completedLessons = progressData?.completed_lessons
    ?? [...progressMap.values()].filter((l) => l.is_completed).length;
  const completionPct = progressData?.overall_percentage
    ?? enrollment?.overall_progress
    ?? 0;

  let status: CourseDetail['status'] = 'not_started';
  if (enrollment?.completion_status === 'completed') status = 'completed';
  else if (enrollment?.completion_status === 'in_progress') status = 'in_progress';

  return {
    id: course.id,
    title: course.title,
    description: course.description,
    category: course.category,
    thumbnail: course.thumbnail_url || '',
    duration: course.duration_minutes,
    is_mandatory: course.is_mandatory,
    completion_percentage: completionPct,
    status,
    enrolled_at: enrollment?.enrolled_at || null,
    lessons_count: totalLessons,
    completed_lessons: completedLessons,
    modules,
    materials,
  };
}

interface EnrollResponse {
  id: number;
  user_id: number;
  course_id: number;
  completion_status: string;
  overall_progress: number;
  enrolled_at: string;
}

async function enrollInCourse(courseId: number): Promise<EnrollResponse> {
  const response = await api.post<ApiResponse<EnrollResponse>>('/courses/enroll', { course_id: courseId });
  return response.data;
}

async function fetchLessonProgress(lessonId: string): Promise<LessonProgressDetail | null> {
  if (USE_MOCK) return null;
  try {
    const response = await api.get<ApiResponse<LessonProgressDetail>>(`/progress/lesson/${lessonId}`);
    return response.data;
  } catch {
    return null;
  }
}

interface CourseContextType {
  course: CourseDetail | undefined;
  isLoading: boolean;
  isError: boolean;
  // Enrollment
  enroll: () => void;
  isEnrolling: boolean;
  enrollError: boolean;
  enrollSuccess: boolean;
  // Lesson progress
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;
  lessonProgress: LessonProgressDetail | null | undefined;
  // Module expand/collapse
  expandedModules: Set<number>;
  toggleModule: (id: number) => void;
  expandAll: () => void;
  collapseAll: () => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const { courseId } = useParams<{ courseId: string }>();
  const qc = useQueryClient();
  const id = courseId || '';

  const { data: course, isLoading, isError } = useQuery<CourseDetail>({
    queryKey: queryKeys.course(id),
    queryFn: () => fetchCourse(id),
    enabled: !!id,
  });

  const enrollMutation = useMutation({
    mutationFn: () => enrollInCourse(Number(id)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.course(id) });
      qc.invalidateQueries({ queryKey: queryKeys.learningPaths });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
  });

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const { data: lessonProgress } = useQuery<LessonProgressDetail | null>({
    queryKey: ['progress', 'lesson', selectedLessonId],
    queryFn: () => fetchLessonProgress(selectedLessonId!),
    enabled: !!selectedLessonId && !USE_MOCK,
  });

  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());

  const toggleModule = useCallback((moduleId: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    if (course) {
      setExpandedModules(new Set(course.modules.map((m) => m.id)));
    }
  }, [course]);

  const collapseAll = useCallback(() => {
    setExpandedModules(new Set());
  }, []);

  return (
    <CourseContext.Provider
      value={{
        course,
        isLoading,
        isError,
        enroll: () => enrollMutation.mutate(),
        isEnrolling: enrollMutation.isPending,
        enrollError: enrollMutation.isError,
        enrollSuccess: enrollMutation.isSuccess,
        selectedLessonId,
        setSelectedLessonId,
        lessonProgress,
        expandedModules,
        toggleModule,
        expandAll,
        collapseAll,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
}
