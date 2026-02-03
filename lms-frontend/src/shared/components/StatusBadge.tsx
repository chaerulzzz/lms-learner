type Status = 'completed' | 'in_progress' | 'not_started' | 'overdue' | 'enrolled';

const statusConfig: Record<Status, { label: string; className: string }> = {
  completed: { label: 'Completed', className: 'badge bg-green-100 text-green-800' },
  in_progress: { label: 'In Progress', className: 'badge bg-blue-100 text-blue-800' },
  not_started: { label: 'Not Started', className: 'badge bg-gray-100 text-gray-800' },
  overdue: { label: 'Overdue', className: 'badge bg-red-100 text-red-800' },
  enrolled: { label: 'Enrolled', className: 'badge bg-blue-100 text-blue-800' },
};

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.not_started;
  return <span className={config.className}>{config.label}</span>;
}
