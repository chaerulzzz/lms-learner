import { Link } from 'react-router-dom';
import { useLearningPaths } from '@/hooks/useLearningPaths';
import { getProgressColor, getProgressTextColor } from '@/lib/utils';

function getDueDateInfo(dueDate: string | null): { label: string; className: string } | null {
  if (!dueDate) return null;
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { label: `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`, className: 'text-status-error font-semibold' };
  }
  if (diffDays === 0) {
    return { label: 'Due today', className: 'text-status-error font-semibold' };
  }
  if (diffDays <= 7) {
    return { label: `Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}`, className: 'text-status-warning font-semibold' };
  }
  return { label: `Due in ${diffDays} days`, className: 'text-neutral-dark' };
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'completed':
      return <span className="badge bg-green-100 text-green-800">Completed</span>;
    case 'in_progress':
      return <span className="badge bg-blue-100 text-blue-800">In Progress</span>;
    case 'overdue':
      return <span className="badge bg-red-100 text-red-800">Overdue</span>;
    default:
      return <span className="badge bg-gray-100 text-gray-800">Not Started</span>;
  }
}

export default function LearningPaths() {
  const { data: paths, isLoading, isError } = useLearningPaths();

  if (isLoading) {
    return (
      <div>
        <div className="skeleton h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card">
              <div className="skeleton h-5 w-3/4 mb-3" />
              <div className="skeleton h-3 w-full mb-2" />
              <div className="skeleton h-3 w-2/3 mb-4" />
              <div className="skeleton h-2 w-full mb-3" />
              <div className="skeleton h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="card max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-status-error mb-2">Failed to load learning paths</h2>
          <p className="text-neutral-dark mb-4">Something went wrong. Please try again.</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Sort: overdue first, then by due date (earliest first), then no-date paths last
  const sorted = [...(paths || [])].sort((a, b) => {
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (b.status === 'completed' && a.status !== 'completed') return -1;
    if (!a.due_date && !b.due_date) return 0;
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-red">My Learning Paths</h1>
        <p className="text-sm text-neutral-dark">
          {paths?.length || 0} path{(paths?.length || 0) !== 1 ? 's' : ''} assigned
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((path) => {
          const dueDateInfo = getDueDateInfo(path.due_date);
          return (
            <Link
              key={path.id}
              to={`/learning-paths/${path.id}`}
              className="card hover:shadow-lg transition-shadow block"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg leading-tight">{path.title}</h3>
                <div className="flex gap-1 flex-shrink-0 ml-2">
                  {path.is_mandatory && <span className="badge-primary">MANDATORY</span>}
                </div>
              </div>

              <p className="text-sm text-neutral-dark mb-4 truncate-2-lines">
                {path.description}
              </p>

              <div className="flex items-center gap-2 mb-3 text-sm text-neutral-dark">
                {getStatusBadge(path.status)}
                <span>{path.course_count} course{path.course_count !== 1 ? 's' : ''}</span>
              </div>

              {/* Progress */}
              <div className="progress-bar mb-2">
                <div
                  className={`progress-fill ${getProgressColor(path.completion_percentage)}`}
                  style={{ width: `${path.completion_percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={getProgressTextColor(path.completion_percentage)}>
                  {path.completion_percentage}% Complete
                </span>
                <span className="text-neutral-dark">
                  {path.completed_course_count}/{path.course_count} courses
                </span>
              </div>

              {/* Due date */}
              {dueDateInfo && (
                <p className={`text-sm mt-3 ${dueDateInfo.className}`}>
                  {dueDateInfo.label}
                </p>
              )}
            </Link>
          );
        })}
      </div>

      {(!paths || paths.length === 0) && (
        <div className="text-center py-20 text-neutral-dark">
          <p className="text-lg font-medium mb-1">No learning paths assigned</p>
          <p className="text-sm">Check back later for new assignments.</p>
        </div>
      )}
    </div>
  );
}
