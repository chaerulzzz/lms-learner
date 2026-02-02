import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryClient';
import { mockCourseDetails, USE_MOCK } from '@/lib/mockData';
import type { ApiResponse } from '@/types/api';
import type { CourseDetail, CourseModule, CourseLesson, CourseMaterialItem } from '@/types/courseDetail';

// API shape per API_REFERENCE.md: GET /public/courses/:id
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

// API shape per API_REFERENCE.md: GET /progress/course/:id
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

// API shape for enrollment endpoints
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

  // Group lessons into a single module (API doesn't have module concept)
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

  // Fetch course detail, progress, and enrollment data in parallel
  const [courseRes, progressRes, mandatoryRes, inProgressRes] = await Promise.all([
    api.get<ApiResponse<ApiCourseDetail>>(`/public/courses/${id}`),
    api.get<ApiResponse<ApiCourseProgress | ApiLessonProgress[]>>(`/progress/course/${id}`).catch(() => null),
    api.get<ApiResponse<ApiEnrollment[]>>('/courses/mandatory'),
    api.get<ApiResponse<ApiEnrollment[]>>('/courses/in-progress'),
  ]);

  const course = courseRes.data;
  if (!course) throw new Error('Course not found');

  // Find enrollment for this course
  const allEnrollments = [...(mandatoryRes.data || []), ...(inProgressRes.data || [])];
  const enrollment = allEnrollments.find((e) => e.course_id === course.id);

  // Parse progress — API may return object with lessons array or flat array
  let progressData: ApiCourseProgress | null = null;
  const progressMap = new Map<number, ApiLessonProgress>();

  if (progressRes?.data) {
    const raw = progressRes.data;
    if (Array.isArray(raw)) {
      // Flat array of lesson progress (or empty)
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

export function useCourse(id: string) {
  return useQuery<CourseDetail>({
    queryKey: queryKeys.course(id),
    queryFn: () => fetchCourse(id),
    enabled: !!id,
  });
}
