export interface UserListItem {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: 'learner' | 'admin' | 'instructor';
  department: string;
  gmfc_coins: number;
  total_learning_hours: number;
  courses_enrolled: number;
  created_at: string;
}

export interface UsersFilter {
  search?: string;
  role?: string;
  department?: string;
  page: number;
  pageSize: number;
}

export interface AuditLogEntry {
  id: number;
  user_id: number;
  user_email: string;
  action: string;
  resource: string;
  description: string;
  ip_address: string;
  status: 'success' | 'failure';
  created_at: string;
}

export interface AuditLogsFilter {
  action?: string;
  page: number;
  pageSize: number;
}
