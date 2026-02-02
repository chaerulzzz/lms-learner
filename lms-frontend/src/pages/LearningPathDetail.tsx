import { Link, useParams } from 'react-router-dom';
import { useLearningPath } from '@/hooks/useLearningPaths';
import { getProgressColor, getProgressTextColor, formatDuration } from '@/lib/utils';

function getCourseStatusLabel(status: string) {
  switch (status) {
    case 'completed':
      return <span className="badge bg-green-100 text-green-800">Completed</span>;
    case 'in_progress':
      return <span className="badge bg-blue-100 text-blue-800">In Progress</span>;
    default:
      return <span className="badge bg-gray-100 text-gray-800">Not Started</span>;
  }
}

function getCourseAction(status: string) {
  switch (status) {
    case 'completed':
      return 'Review';
    case 'in_progress':
      return 'Continue';
    default:
      return 'Start';
  }
}

export default function LearningPathDetail() {
  const { pathId } = useParams<{ pathId: string }>();
  const { data: path, isLoading, isError } = useLearningPath(pathId || '');

  if (isLoading) {
    return (
      <div>
        <div className="skeleton h-4 w-40 mb-4" />
        <div className="skeleton h-8 w-96 mb-2" />
        <div className="skeleton h-4 w-full mb-6" />
        <div className="skeleton h-2 w-full mb-8" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card">
              <div className="skeleton h-5 w-3/4 mb-2" />
              <div className="skeleton h-3 w-1/2 mb-3" />
              <div className="skeleton h-2 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !path) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="card max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-status-error mb-2">Learning path not found</h2>
          <p className="text-neutral-dark mb-4">This learning path could not be loaded.</p>
          <Link to="/learning-paths" className="btn-primary inline-block">
            Back to Learning Paths
          </Link>
        </div>
      </div>
    );
  }

  const dueDateStr = path.due_date
    ? new Date(path.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-dark mb-4">
        <Link to="/learning-paths" className="hover:text-primary-red transition-colors">
          Learning Paths
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-900">{path.title}</span>
      </nav>

      {/* Path Header */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{path.title}</h1>
              {path.is_mandatory && <span className="badge-primary">MANDATORY</span>}
            </div>
            <p className="text-neutral-dark">{path.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-neutral-dark mb-4">
          <span>{path.course_count} course{path.course_count !== 1 ? 's' : ''}</span>
          <span>{formatDuration(path.estimated_duration)}</span>
          {dueDateStr && <span>Due: {dueDateStr}</span>}
        </div>

        <div className="progress-bar mb-2">
          <div
            className={`progress-fill ${getProgressColor(path.completion_percentage)}`}
            style={{ width: `${path.completion_percentage}%` }}
          />
        </div>
        <p className={`text-sm ${getProgressTextColor(path.completion_percentage)}`}>
          {path.completion_percentage}% Complete — {path.completed_course_count} of {path.course_count} courses finished
        </p>
      </div>

      {/* Courses List */}
      <h2 className="text-xl font-bold mb-4">Courses</h2>
      <div className="space-y-4">
        {path.courses
          .sort((a, b) => a.order - b.order)
          .map((course, index) => (
            <div key={course.id} className="card flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Order number */}
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-neutral-dark flex-shrink-0">
                {index + 1}
              </div>

              {/* Course info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{course.title}</h3>
                  {getCourseStatusLabel(course.status)}
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-neutral-dark mb-2">
                  <span className="badge bg-gray-100 text-gray-700">{course.category}</span>
                  <span>{formatDuration(course.duration)}</span>
                  <span>{course.completed_lessons}/{course.lessons_count} lessons</span>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-fill ${getProgressColor(course.completion_percentage)}`}
                    style={{ width: `${course.completion_percentage}%` }}
                  />
                </div>
                <p className="text-xs text-neutral-dark mt-1">
                  {course.completion_percentage}%
                </p>
              </div>

              {/* Action button */}
              <Link
                to={`/courses/${course.id}`}
                className={`btn-primary text-sm px-4 py-2 flex-shrink-0 text-center ${
                  course.status === 'completed' ? 'bg-green-600 hover:bg-green-700' : ''
                }`}
              >
                {getCourseAction(course.status)}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
