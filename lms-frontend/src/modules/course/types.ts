export interface CourseLesson {
  id: number;
  title: string;
  type: 'video' | 'document' | 'quiz';
  duration: number; // in minutes
  order: number;
  is_completed: boolean;
  video_url?: string;
}

export interface CourseModule {
  id: number;
  title: string;
  order: number;
  lessons: CourseLesson[];
}

export interface CourseMaterialItem {
  id: number;
  name: string;
  type: 'pdf' | 'ppt' | 'doc' | 'other';
  size: number; // in bytes
  url: string;
}

export interface CourseDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  duration: number; // in minutes
  is_mandatory: boolean;
  modules: CourseModule[];
  materials: CourseMaterialItem[];
  completion_percentage: number;
  status: 'not_started' | 'in_progress' | 'completed';
  enrolled_at: string | null;
  lessons_count: number;
  completed_lessons: number;
}

export interface LessonProgressDetail {
  lesson_id: number;
  lesson_title: string;
  watched_percentage: number;
  watched_duration: number;
  total_duration: number;
  is_completed: boolean;
  materials: {
    id: number;
    type: string;
    title: string;
    url: string;
    duration: number;
  }[];
}
