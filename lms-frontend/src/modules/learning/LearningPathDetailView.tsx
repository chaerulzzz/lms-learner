import { Link } from 'react-router-dom';
import { useLearning } from './LearningProvider';
import { ErrorState, Breadcrumb, StatusBadge, ProgressBar, DetailPageSkeleton } from '@/shared/components';
import { formatDuration } from '@/lib/utils';

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

export default function LearningPathDetailView() {
  const { pathDetail: path, isDetailLoading, isDetailError } = useLearning();

  if (isDetailLoading) {
    return <DetailPageSkeleton />;
  }

  if (isDetailError || !path) {
    return (
      <ErrorState
        title="Learning path not found"
        message="This learning path could not be loaded."
        actionLabel="Back to Learning Paths"
        actionHref="/learning-paths"
      />
    );
  }

  const dueDateStr = path.due_date
    ? new Date(path.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Learning Paths', href: '/learning-paths' },
          { label: path.title },
        ]}
      />

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

        <ProgressBar
          percentage={path.completion_percentage}
          showText
          textSuffix={`${path.completed_course_count} of ${path.course_count} courses finished`}
        />
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
                  <StatusBadge status={course.status} />
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-neutral-dark mb-2">
                  <span className="badge bg-gray-100 text-gray-700">{course.category}</span>
                  <span>{formatDuration(course.duration)}</span>
                  <span>{course.completed_lessons}/{course.lessons_count} lessons</span>
                </div>
                <ProgressBar percentage={course.completion_percentage} />
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
