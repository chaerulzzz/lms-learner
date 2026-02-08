import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { USE_MOCK } from '@/lib/mockData';
import type { ApiResponse } from '@/types/api';
import type { CatalogCourse, CatalogFilters, PaginationInfo } from './types';

// Mock catalog data
const mockCatalogCourses: CatalogCourse[] = [
  {
    id: 1,
    title: 'Introduction to Go Programming',
    description: 'Learn the fundamentals of Go programming language including syntax, data types, and control structures.',
    category: 'Programming',
    duration_hours: 20,
    difficulty: 'beginner',
    instructor_name: 'Jane Smith',
    is_mandatory: true,
    enrollment_count: 150,
    completion_count: 45,
    average_rating: 4.5,
  },
  {
    id: 2,
    title: 'Advanced React Patterns',
    description: 'Master advanced React patterns including compound components, render props, and custom hooks.',
    category: 'Web Development',
    duration_hours: 15,
    difficulty: 'advanced',
    instructor_name: 'John Doe',
    is_mandatory: false,
    enrollment_count: 89,
    completion_count: 34,
    average_rating: 4.8,
  },
  {
    id: 3,
    title: 'Cloud Infrastructure with AWS',
    description: 'Learn to design and deploy scalable cloud infrastructure using Amazon Web Services.',
    category: 'Cloud Computing',
    duration_hours: 25,
    difficulty: 'intermediate',
    instructor_name: 'Sarah Johnson',
    is_mandatory: true,
    enrollment_count: 120,
    completion_count: 56,
    average_rating: 4.6,
  },
  {
    id: 4,
    title: 'Data Structures and Algorithms',
    description: 'Master fundamental data structures and algorithms for technical interviews and efficient programming.',
    category: 'Computer Science',
    duration_hours: 30,
    difficulty: 'intermediate',
    instructor_name: 'Mike Chen',
    is_mandatory: false,
    enrollment_count: 200,
    completion_count: 78,
    average_rating: 4.7,
  },
  {
    id: 5,
    title: 'UI/UX Design Principles',
    description: 'Learn user-centered design principles to create intuitive and beautiful user interfaces.',
    category: 'Design',
    duration_hours: 18,
    difficulty: 'beginner',
    instructor_name: 'Emily Davis',
    is_mandatory: false,
    enrollment_count: 95,
    completion_count: 42,
    average_rating: 4.4,
  },
  {
    id: 6,
    title: 'DevOps Fundamentals',
    description: 'Introduction to DevOps practices including CI/CD, containerization, and infrastructure as code.',
    category: 'DevOps',
    duration_hours: 22,
    difficulty: 'intermediate',
    instructor_name: 'Alex Kumar',
    is_mandatory: true,
    enrollment_count: 110,
    completion_count: 38,
    average_rating: 4.5,
  },
];

const mockCategories = [
  'Programming',
  'Web Development',
  'Cloud Computing',
  'Computer Science',
  'Design',
  'DevOps',
];

interface ApiCatalogCourse {
  id: number;
  title: string;
  description: string;
  category: string;
  duration_hours: number;
  difficulty: string;
  instructor_id: number;
  instructor_name: string;
  is_mandatory: boolean;
  enrollment_count: number;
  completion_count: number;
  average_rating: number;
  created_at: string;
}

async function fetchCatalog(
  page: number,
  pageSize: number,
  search: string,
  category: string
): Promise<{ courses: CatalogCourse[]; pagination: PaginationInfo }> {
  if (USE_MOCK) {
    let filtered = [...mockCatalogCourses];

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower)
      );
    }

    if (category) {
      filtered = filtered.filter((c) => c.category === category);
    }

    const total = filtered.length;
    const totalPage = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return {
      courses: paged,
      pagination: { page, page_size: pageSize, total, total_page: totalPage },
    };
  }

  let endpoint = '/public/courses';
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('page_size', String(pageSize));

  if (search) {
    endpoint = '/public/courses/search';
    params.set('q', search);
  } else if (category) {
    endpoint = `/public/courses/category/${encodeURIComponent(category)}`;
  }

  const url = `${endpoint}?${params.toString()}`;
  const response = await api.get<ApiResponse<ApiCatalogCourse[]> & { pagination: PaginationInfo }>(url);

  const courses: CatalogCourse[] = (response.data || []).map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    category: c.category,
    duration_hours: c.duration_hours,
    difficulty: c.difficulty as CatalogCourse['difficulty'],
    instructor_name: c.instructor_name,
    is_mandatory: c.is_mandatory,
    enrollment_count: c.enrollment_count,
    completion_count: c.completion_count,
    average_rating: c.average_rating,
  }));

  return {
    courses,
    pagination: response.pagination || { page, page_size: pageSize, total: courses.length, total_page: 1 },
  };
}

async function fetchCategories(): Promise<string[]> {
  if (USE_MOCK) {
    return mockCategories;
  }
  // In real API, categories might come from a dedicated endpoint or be extracted from courses
  return mockCategories;
}

interface CatalogContextType {
  courses: CatalogCourse[];
  isLoading: boolean;
  isError: boolean;
  pagination: PaginationInfo | null;
  filters: CatalogFilters;
  categories: string[];
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setDifficulty: (difficulty: string) => void;
  setPage: (page: number) => void;
  clearFilters: () => void;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

const defaultFilters: CatalogFilters = {
  search: '',
  category: '',
  difficulty: '',
};

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<CatalogFilters>(defaultFilters);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: categoriesData = [] } = useQuery<string[]>({
    queryKey: ['catalog', 'categories'],
    queryFn: fetchCategories,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['catalog', 'courses', page, pageSize, filters.search, filters.category],
    queryFn: () => fetchCatalog(page, pageSize, filters.search, filters.category),
  });

  const courses = useMemo(() => {
    let result = data?.courses || [];
    if (filters.difficulty) {
      result = result.filter((c) => c.difficulty === filters.difficulty);
    }
    return result;
  }, [data?.courses, filters.difficulty]);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
    setPage(1);
  }, []);

  const setCategoryFilter = useCallback((category: string) => {
    setFilters((prev) => ({ ...prev, category }));
    setPage(1);
  }, []);

  const setDifficulty = useCallback((difficulty: string) => {
    setFilters((prev) => ({ ...prev, difficulty }));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
    setPage(1);
  }, []);

  return (
    <CatalogContext.Provider
      value={{
        courses,
        isLoading,
        isError,
        pagination: data?.pagination || null,
        filters,
        categories: categoriesData,
        setSearch,
        setCategory: setCategoryFilter,
        setDifficulty,
        setPage,
        clearFilters,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (context === undefined) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
}
