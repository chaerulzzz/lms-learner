import type { UserListItem, AuditLogEntry } from './types';

export const mockUsers: UserListItem[] = [
  {
    id: 1,
    email: 'john.doe@company.com',
    first_name: 'John',
    last_name: 'Doe',
    full_name: 'John Doe',
    role: 'learner',
    department: 'Engineering',
    gmfc_coins: 450,
    total_learning_hours: 45,
    courses_enrolled: 8,
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    email: 'jane.smith@company.com',
    first_name: 'Jane',
    last_name: 'Smith',
    full_name: 'Jane Smith',
    role: 'learner',
    department: 'Sales',
    gmfc_coins: 320,
    total_learning_hours: 32,
    courses_enrolled: 5,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: 3,
    email: 'bob.wilson@company.com',
    first_name: 'Bob',
    last_name: 'Wilson',
    full_name: 'Bob Wilson',
    role: 'learner',
    department: 'Marketing',
    gmfc_coins: 180,
    total_learning_hours: 18,
    courses_enrolled: 3,
    created_at: '2024-02-01T10:00:00Z',
  },
  {
    id: 4,
    email: 'alice.johnson@company.com',
    first_name: 'Alice',
    last_name: 'Johnson',
    full_name: 'Alice Johnson',
    role: 'learner',
    department: 'Engineering',
    gmfc_coins: 850,
    total_learning_hours: 120,
    courses_enrolled: 12,
    created_at: '2024-01-10T10:00:00Z',
  },
  {
    id: 5,
    email: 'charlie.brown@company.com',
    first_name: 'Charlie',
    last_name: 'Brown',
    full_name: 'Charlie Brown',
    role: 'learner',
    department: 'HR',
    gmfc_coins: 95,
    total_learning_hours: 10,
    courses_enrolled: 2,
    created_at: '2024-02-15T10:00:00Z',
  },
];

export const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 1,
    user_id: 1,
    user_email: 'john.doe@company.com',
    action: 'login',
    resource: 'auth',
    description: 'User logged in',
    ip_address: '192.168.1.100',
    status: 'success',
    created_at: '2024-01-28T14:30:00Z',
  },
  {
    id: 2,
    user_id: 2,
    user_email: 'jane.smith@company.com',
    action: 'course_complete',
    resource: 'course',
    description: 'Completed "Go Programming Basics"',
    ip_address: '192.168.1.101',
    status: 'success',
    created_at: '2024-01-28T13:45:00Z',
  },
  {
    id: 3,
    user_id: 3,
    user_email: 'bob.wilson@company.com',
    action: 'quiz_submit',
    resource: 'quiz',
    description: 'Submitted quiz for "React Fundamentals"',
    ip_address: '192.168.1.102',
    status: 'success',
    created_at: '2024-01-28T12:00:00Z',
  },
  {
    id: 4,
    user_id: 1,
    user_email: 'admin@lms.com',
    action: 'login',
    resource: 'auth',
    description: 'Admin logged in',
    ip_address: '192.168.1.1',
    status: 'success',
    created_at: '2024-01-28T09:00:00Z',
  },
  {
    id: 5,
    user_id: 4,
    user_email: 'alice.johnson@company.com',
    action: 'certificate_download',
    resource: 'certificate',
    description: 'Downloaded certificate for "TypeScript Mastery"',
    ip_address: '192.168.1.103',
    status: 'success',
    created_at: '2024-01-27T16:30:00Z',
  },
];

export const adminMockApi = {
  getUsers: async (page: number = 1, pageSize: number = 10, search?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    let filteredUsers = [...mockUsers];
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (u) =>
          u.full_name.toLowerCase().includes(searchLower) ||
          u.email.toLowerCase().includes(searchLower) ||
          u.department.toLowerCase().includes(searchLower)
      );
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedUsers = filteredUsers.slice(start, end);

    return {
      data: paginatedUsers,
      pagination: {
        page,
        page_size: pageSize,
        total: filteredUsers.length,
        total_page: Math.ceil(filteredUsers.length / pageSize),
      },
    };
  },

  getAuditLogs: async (page: number = 1, pageSize: number = 10, action?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    let filteredLogs = [...mockAuditLogs];
    if (action) {
      filteredLogs = filteredLogs.filter((log) => log.action === action);
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedLogs = filteredLogs.slice(start, end);

    return {
      data: paginatedLogs,
      pagination: {
        page,
        page_size: pageSize,
        total: filteredLogs.length,
        total_page: Math.ceil(filteredLogs.length / pageSize),
      },
    };
  },
};
