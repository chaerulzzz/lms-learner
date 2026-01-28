export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  isMandatory: boolean;
  duration: number; // in minutes
  modules: Module[];
  quiz?: string; // quiz ID
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

export const LessonType = {
  VIDEO: 'video',
  DOCUMENT: 'document',
  QUIZ: 'quiz',
} as const;

export type LessonType = typeof LessonType[keyof typeof LessonType];

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

export const CourseStatus = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  OVERDUE: 'overdue',
} as const;

export type CourseStatus = typeof CourseStatus[keyof typeof CourseStatus];

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: Course[];
  isMandatory: boolean;
  dueDate?: Date;
  completionPercentage: number;
  status: CourseStatus;
}
