export const UserRole = {
  LEARNER: 'LEARNER',
  HC_ADMIN: 'HC_ADMIN',
  REPORTING_VIEWER: 'REPORTING_VIEWER',
  DEPARTMENT_MANAGER: 'DEPARTMENT_MANAGER',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  profilePhoto?: string;
  createdAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
