import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { USE_MOCK } from '@/lib/mockData';
import { Skeleton } from '@/shared/components';
import { adminMockApi } from './adminMockData';
import type { AuditLogEntry } from './types';

export default function AuditLogsView() {
  const [actionFilter, setActionFilter] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['admin-audit-logs', page, actionFilter],
    queryFn: async () => {
      if (USE_MOCK) {
        return adminMockApi.getAuditLogs(page, pageSize, actionFilter || undefined);
      }

      const params = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString(),
      });
      if (actionFilter) params.append('action', actionFilter);

      // lms-frontend's api auto-unwraps response.data
      const result = await api.get(`/admin/audit-logs?${params}`);
      return result;
    },
  });

  const logs: AuditLogEntry[] = data?.data || [];
  const pagination = data?.pagination;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login':
        return '🔐';
      case 'logout':
        return '🚪';
      case 'course_complete':
        return '✅';
      case 'quiz_submit':
        return '📝';
      case 'certificate_download':
        return '📜';
      default:
        return '📋';
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'success' ? 'badge badge-success' : 'badge badge-error';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-dark">Audit Logs</h1>
          <p className="text-gray-500">Track all system activities and user actions</p>
        </div>
        <button className="btn-secondary">
          <span className="mr-2">📥</span> Export Logs
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
            className="input w-full sm:w-48"
          >
            <option value="">All Actions</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
            <option value="course_complete">Course Complete</option>
            <option value="quiz_submit">Quiz Submit</option>
            <option value="certificate_download">Certificate Download</option>
          </select>
          <input
            type="date"
            className="input w-full sm:w-48"
            placeholder="Start Date"
          />
          <input
            type="date"
            className="input w-full sm:w-48"
            placeholder="End Date"
          />
        </div>
      </div>

      {/* Logs Table */}
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
                <th>Timestamp</th>
                <th>User</th>
                <th>Action</th>
                <th>Resource</th>
                <th>Description</th>
                <th>IP Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-medium">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No audit logs found
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id}>
                    <td className="whitespace-nowrap">
                      <span className="text-sm">{formatDate(log.created_at)}</span>
                    </td>
                    <td>
                      <span className="text-sm">{log.user_email}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span>{getActionIcon(log.action)}</span>
                        <span className="text-sm capitalize">{log.action.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-sm capitalize">{log.resource}</span>
                    </td>
                    <td>
                      <span className="text-sm text-gray-600">{log.description}</span>
                    </td>
                    <td>
                      <span className="text-sm font-mono text-gray-500">{log.ip_address}</span>
                    </td>
                    <td>
                      <span className={getStatusBadge(log.status)}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
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
            {pagination.total} logs
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
