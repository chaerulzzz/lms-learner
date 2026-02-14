import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor (add auth token)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor (handle errors, refresh token)
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const requestUrl = error.config?.url || '';
    const isLoginRequest = requestUrl.includes('/auth/login');

    if (error.response?.status === 401 && !isLoginRequest) {
      // Token expired or invalid (skip for login requests — let them handle their own errors)
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

// API methods with type safety
export const api = {
  get: <T = any>(url: string, config?: any) =>
    apiClient.get<T>(url, config) as Promise<T>,

  post: <T = any>(url: string, data?: any, config?: any) =>
    apiClient.post<T>(url, data, config) as Promise<T>,

  put: <T = any>(url: string, data?: any, config?: any) =>
    apiClient.put<T>(url, data, config) as Promise<T>,

  patch: <T = any>(url: string, data?: any, config?: any) =>
    apiClient.patch<T>(url, data, config) as Promise<T>,

  delete: <T = any>(url: string, config?: any) =>
    apiClient.delete<T>(url, config) as Promise<T>,
};
