export interface CatalogCourse {
  id: number;
  title: string;
  description: string;
  category: string;
  duration_hours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructor_name: string;
  is_mandatory: boolean;
  enrollment_count: number;
  completion_count: number;
  average_rating: number;
  thumbnail_url?: string;
}

export interface CatalogFilters {
  search: string;
  category: string;
  difficulty: string;
}

export interface PaginationInfo {
  page: number;
  page_size: number;
  total: number;
  total_page: number;
}
