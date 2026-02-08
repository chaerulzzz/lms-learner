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
