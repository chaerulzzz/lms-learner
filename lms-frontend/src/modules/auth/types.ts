export const UserRole = {
  LEARNER: 'learner',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
  HR_PERSONNEL: 'hr_personnel',
  REPORTING_VIEWER: 'reporting_viewer',
  DEPARTMENT_MANAGER: 'department_manager',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: UserRole;
  department?: string;
  profile_photo?: string;
  gmfc_coins: number;
  current_badge_level: string;
  total_learning_hours: number;
  current_streak: number;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  department?: string;
}

export interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  department?: string;
  profile_photo?: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
}
