import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, isMockMode } from '@/lib/api';
import { mockApi } from '@/lib/mockData';
import { Skeleton } from '@/shared/components';
import type { UserListItem } from './types';

export default function UsersView() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const useMock = isMockMode();

  const { data, isLoading } = useQuery({
    queryKey: ['users', page, search],
    queryFn: async () => {
      if (useMock) {
        return mockApi.getUsers(page, pageSize, search);
      }

      const params = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString(),
      });
      if (search) params.append('search', search);

      const response = await api.get(`/admin/users?${params}`);
      return response.data;
    },
  });

  const users: UserListItem[] = data?.data || [];
  const pagination = data?.pagination;

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'badge badge-error';
      case 'instructor':
        return 'badge badge-info';
      default:
        return 'badge badge-success';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-dark">User Management</h1>
          <p className="text-gray-500">Manage all users in the LMS platform</p>
        </div>
        <button className="btn-primary">
          <span className="mr-2">+</span> Add User
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or department..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="input"
            />
          </div>
          <select className="input w-full sm:w-48">
            <option value="">All Roles</option>
            <option value="learner">Learner</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
          <select className="input w-full sm:w-48">
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Department</th>
                <th>Coins</th>
                <th>Learning Hours</th>
                <th>Courses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-medium">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-red/10 flex items-center justify-center text-primary-red font-semibold">
                          {user.first_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{user.full_name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={getRoleBadge(user.role)}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td>{user.department}</td>
                    <td>
                      <span className="font-medium text-yellow-600">{user.gmfc_coins}</span>
                    </td>
                    <td>{user.total_learning_hours}h</td>
                    <td>{user.courses_enrolled}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button className="text-sm text-primary-red hover:underline">View</button>
                        <button className="text-sm text-gray-500 hover:underline">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.total_page > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, pagination.total)} of{' '}
            {pagination.total} users
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="btn-ghost text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm">
              Page {page} of {pagination.total_page}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pagination.total_page}
              className="btn-ghost text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
