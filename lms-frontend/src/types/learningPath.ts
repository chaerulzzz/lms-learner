export type PathStatus = 'not_started' | 'in_progress' | 'completed' | 'overdue';

export interface LearningPathSummary {
  id: number;
  title: string;
  description: string;
  is_mandatory: boolean;
  due_date: string | null;
  course_count: number;
  completed_course_count: number;
  completion_percentage: number;
  status: PathStatus;
  assigned_at: string;
}

export interface LearningPathCourse {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  duration: number; // in minutes
  completion_percentage: number;
  status: 'not_started' | 'in_progress' | 'completed';
  order: number;
  lessons_count: number;
  completed_lessons: number;
}

export interface LearningPathDetail extends LearningPathSummary {
  courses: LearningPathCourse[];
  estimated_duration: number; // total minutes
}
