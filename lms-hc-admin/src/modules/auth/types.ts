export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: 'learner' | 'admin' | 'instructor';
  department?: string;
  gmfc_coins?: number;
  current_badge_level?: string;
  total_learning_hours?: number;
  current_streak?: number;
}

export interface AdminUser extends User {
  role: 'admin';
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AdminUser;
}

export interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isMockMode: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}
