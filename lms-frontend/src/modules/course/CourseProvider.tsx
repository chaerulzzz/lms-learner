import React, { createContext, useContext, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryClient';
import { mockCourseDetails, USE_MOCK } from '@/lib/mockData';
import type { ApiResponse } from '@/types/api';
import type { CourseDetail, CourseModule, CourseLesson, CourseMaterialItem, LessonProgressDetail, CourseReview, SubmitReviewData, CourseReviewStats } from './types';

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

interface TrackProgressPayload {
  course_id: number;
  lesson_id: number;
  watched_duration: number;
  total_duration: number;
}

interface TrackProgressResponse {
  id: number;
  user_id: number;
  course_id: number;
  lesson_id: number;
  watched_percentage: number;
  watched_duration: number;
  total_duration: number;
  is_completed: boolean;
  updated_at: string;
}

async function trackVideoProgress(payload: TrackProgressPayload): Promise<TrackProgressResponse> {
  if (USE_MOCK) {
    const watchedPercentage = Math.round((payload.watched_duration / payload.total_duration) * 100);
    return {
      id: 1,
      user_id: 1,
      course_id: payload.course_id,
      lesson_id: payload.lesson_id,
      watched_percentage: watchedPercentage,
      watched_duration: payload.watched_duration,
      total_duration: payload.total_duration,
      is_completed: watchedPercentage >= 90,
      updated_at: new Date().toISOString(),
    };
  }
  const response = await api.post<ApiResponse<TrackProgressResponse>>('/progress/track', payload);
  return response.data;
}

// Mock reviews data
const mockReviews: Record<number, CourseReview[]> = {
  1: [
    {
      id: 1,
      course_id: 1,
      user_id: 5,
      user_name: 'Alice Johnson',
      rating: 5,
      comment: 'Excellent course! The Go programming fundamentals were explained very clearly. Highly recommended for beginners.',
      created_at: '2024-01-25T10:00:00Z',
    },
    {
      id: 2,
      course_id: 1,
      user_id: 3,
      user_name: 'Bob Smith',
      rating: 4,
      comment: 'Great content and well-structured lessons. Would have liked more advanced examples.',
      created_at: '2024-01-20T14:30:00Z',
    },
    {
      id: 3,
      course_id: 1,
      user_id: 6,
      user_name: 'Carol White',
      rating: 5,
      comment: 'Perfect introduction to Go. The instructor explains concepts in a way that is easy to understand.',
      created_at: '2024-01-18T09:15:00Z',
    },
  ],
  2: [
    {
      id: 4,
      course_id: 2,
      user_id: 4,
      user_name: 'David Lee',
      rating: 5,
      comment: 'Amazing React patterns course! I learned so much about advanced component design.',
      created_at: '2024-01-22T11:00:00Z',
    },
    {
      id: 5,
      course_id: 2,
      user_id: 7,
      user_name: 'Emma Wilson',
      rating: 4,
      comment: 'Very informative. The custom hooks section was particularly useful for my daily work.',
      created_at: '2024-01-19T16:45:00Z',
    },
  ],
};

function calculateReviewStats(reviews: CourseReview[]): CourseReviewStats {
  if (reviews.length === 0) {
    return {
      average_rating: 0,
      total_reviews: 0,
      rating_distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalRating = 0;
  for (const review of reviews) {
    totalRating += review.rating;
    distribution[review.rating as keyof typeof distribution]++;
  }
  return {
    average_rating: totalRating / reviews.length,
    total_reviews: reviews.length,
    rating_distribution: distribution,
  };
}

async function fetchCourseReviews(courseId: string): Promise<{ reviews: CourseReview[]; stats: CourseReviewStats }> {
  if (USE_MOCK) {
    const reviews = mockReviews[Number(courseId)] || [];
    return { reviews, stats: calculateReviewStats(reviews) };
  }
  // In real API, reviews might come from the course endpoint or a dedicated reviews endpoint
  // For now, we'll use a hypothetical endpoint
  try {
    const response = await api.get<ApiResponse<CourseReview[]>>(`/courses/${courseId}/reviews`);
    const reviews = response.data || [];
    return { reviews, stats: calculateReviewStats(reviews) };
  } catch {
    return { reviews: [], stats: calculateReviewStats([]) };
  }
}

interface SubmitReviewResponse {
  id: number;
  course_id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: string;
}

async function submitCourseReview(courseId: number, data: SubmitReviewData): Promise<SubmitReviewResponse> {
  if (USE_MOCK) {
    return {
      id: Date.now(),
      course_id: courseId,
      user_id: 1,
      rating: data.rating,
      comment: data.comment,
      created_at: new Date().toISOString(),
    };
  }
  const response = await api.post<ApiResponse<SubmitReviewResponse>>(`/courses/${courseId}/review`, data);
  return response.data;
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
  // Video progress tracking
  trackProgress: (lessonId: number, watchedDuration: number, totalDuration: number) => void;
  isTrackingProgress: boolean;
  // Module expand/collapse
  expandedModules: Set<number>;
  toggleModule: (id: number) => void;
  expandAll: () => void;
  collapseAll: () => void;
  // Reviews
  reviews: CourseReview[];
  reviewStats: CourseReviewStats | null;
  reviewsLoading: boolean;
  submitReview: (data: SubmitReviewData) => void;
  isSubmittingReview: boolean;
  submitReviewSuccess: boolean;
  submitReviewError: boolean;
  resetReviewState: () => void;
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

  const trackProgressMutation = useMutation({
    mutationFn: (payload: TrackProgressPayload) => trackVideoProgress(payload),
    onSuccess: (data) => {
      if (data.is_completed) {
        qc.invalidateQueries({ queryKey: queryKeys.course(id) });
        qc.invalidateQueries({ queryKey: queryKeys.dashboard });
      }
    },
  });

  const trackProgress = useCallback((lessonId: number, watchedDuration: number, totalDuration: number) => {
    if (!id) return;
    trackProgressMutation.mutate({
      course_id: Number(id),
      lesson_id: lessonId,
      watched_duration: watchedDuration,
      total_duration: totalDuration,
    });
  }, [id, trackProgressMutation]);

  // Reviews
  const { data: reviewsData, isLoading: reviewsLoading } = useQuery({
    queryKey: ['course', id, 'reviews'],
    queryFn: () => fetchCourseReviews(id),
    enabled: !!id,
  });

  const submitReviewMutation = useMutation({
    mutationFn: (data: SubmitReviewData) => submitCourseReview(Number(id), data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['course', id, 'reviews'] });
    },
  });

  const resetReviewState = useCallback(() => {
    submitReviewMutation.reset();
  }, [submitReviewMutation]);

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
        trackProgress,
        isTrackingProgress: trackProgressMutation.isPending,
        expandedModules,
        toggleModule,
        expandAll,
        collapseAll,
        reviews: reviewsData?.reviews ?? [],
        reviewStats: reviewsData?.stats ?? null,
        reviewsLoading,
        submitReview: (data) => submitReviewMutation.mutate(data),
        isSubmittingReview: submitReviewMutation.isPending,
        submitReviewSuccess: submitReviewMutation.isSuccess,
        submitReviewError: submitReviewMutation.isError,
        resetReviewState,
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
