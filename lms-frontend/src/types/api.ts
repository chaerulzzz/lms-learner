export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  code: number;
  message: string;
  data: T[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_page: number;
  };
}

export interface ApiError {
  code: number;
  message: string;
  error: string;
}
