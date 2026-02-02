import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCourse } from '@/hooks/useCourse';
import { getProgressColor, getProgressTextColor, formatDuration } from '@/lib/utils';

function getLessonIcon(type: string) {
  switch (type) {
    case 'video':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'document':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'quiz':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      );
    default:
      return null;
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: course, isLoading, isError } = useCourse(courseId || '');
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  const expandAll = () => {
    if (course) {
      setExpandedModules(new Set(course.modules.map((m) => m.id)));
    }
  };

  const collapseAll = () => {
    setExpandedModules(new Set());
  };

  if (isLoading) {
    return (
      <div>
        <div className="skeleton h-4 w-40 mb-4" />
        <div className="skeleton h-8 w-96 mb-2" />
        <div className="skeleton h-4 w-full mb-6" />
        <div className="skeleton h-2 w-full mb-8" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card">
              <div className="skeleton h-5 w-1/2 mb-2" />
              <div className="skeleton h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="card max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-status-error mb-2">Course not found</h2>
          <p className="text-neutral-dark mb-4">This course could not be loaded.</p>
          <Link to="/learning-paths" className="btn-primary inline-block">
            Back to Learning Paths
          </Link>
        </div>
      </div>
    );
  }

  const allExpanded = course.modules.length > 0 && expandedModules.size === course.modules.length;

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-dark mb-4">
        <Link to="/learning-paths" className="hover:text-primary-red transition-colors">
          Learning Paths
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-900">{course.title}</span>
      </nav>

      {/* Course Header */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{course.title}</h1>
              {course.is_mandatory && <span className="badge-primary">MANDATORY</span>}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="badge bg-gray-100 text-gray-700">{course.category}</span>
              <span className="text-sm text-neutral-dark">{formatDuration(course.duration)}</span>
              <span className="text-sm text-neutral-dark">{course.lessons_count} lessons</span>
            </div>
            <p className="text-neutral-dark">{course.description}</p>
          </div>
        </div>

        <div className="progress-bar mt-4 mb-2">
          <div
            className={`progress-fill ${getProgressColor(course.completion_percentage)}`}
            style={{ width: `${course.completion_percentage}%` }}
          />
        </div>
        <p className={`text-sm ${getProgressTextColor(course.completion_percentage)}`}>
          {course.completion_percentage}% Complete — {course.completed_lessons} of {course.lessons_count} lessons finished
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Modules & Lessons */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Course Content</h2>
            <button
              onClick={allExpanded ? collapseAll : expandAll}
              className="text-sm text-primary-red hover:underline"
            >
              {allExpanded ? 'Collapse all' : 'Expand all'}
            </button>
          </div>

          <div className="space-y-3">
            {course.modules
              .sort((a, b) => a.order - b.order)
              .map((module) => {
                const isExpanded = expandedModules.has(module.id);
                const completedCount = module.lessons.filter((l) => l.is_completed).length;
                const totalCount = module.lessons.length;

                return (
                  <div key={module.id} className="card p-0 overflow-hidden">
                    {/* Module header (clickable) */}
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <svg
                          className={`w-4 h-4 text-neutral-dark transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <div>
                          <h3 className="font-semibold">{module.title}</h3>
                          <p className="text-xs text-neutral-dark">
                            {completedCount}/{totalCount} lessons
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-neutral-dark">
                        {formatDuration(module.lessons.reduce((sum, l) => sum + l.duration, 0))}
                      </span>
                    </button>

                    {/* Lessons (expanded) */}
                    {isExpanded && (
                      <div className="border-t border-gray-100">
                        {module.lessons
                          .sort((a, b) => a.order - b.order)
                          .map((lesson) => (
                            <div
                              key={lesson.id}
                              className="px-6 py-3 flex items-center gap-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-50"
                            >
                              {/* Completion check */}
                              {lesson.is_completed ? (
                                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
                              )}

                              {/* Lesson type icon */}
                              <span className="text-neutral-dark flex-shrink-0">
                                {getLessonIcon(lesson.type)}
                              </span>

                              {/* Lesson info */}
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm ${lesson.is_completed ? 'text-neutral-dark line-through' : 'text-gray-900'}`}>
                                  {lesson.title}
                                </p>
                              </div>

                              {/* Duration */}
                              <span className="text-xs text-neutral-dark flex-shrink-0">
                                {lesson.duration}m
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Sidebar: Materials */}
        <div>
          <h2 className="text-xl font-bold mb-4">Materials</h2>
          {course.materials.length > 0 ? (
            <div className="card p-0">
              {course.materials.map((material, index) => (
                <div
                  key={material.id}
                  className={`px-4 py-3 flex items-center gap-3 hover:bg-gray-50 ${
                    index < course.materials.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <svg className="w-5 h-5 text-primary-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{material.name}</p>
                    <p className="text-xs text-neutral-dark">
                      {material.type.toUpperCase()} - {formatFileSize(material.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center text-neutral-dark text-sm">
              No materials available
            </div>
          )}

          {/* Course info card */}
          <div className="card mt-4">
            <h3 className="font-semibold mb-3">Course Info</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-neutral-dark">Status</dt>
                <dd className="font-medium capitalize">{course.status.replace('_', ' ')}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-dark">Duration</dt>
                <dd className="font-medium">{formatDuration(course.duration)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-dark">Lessons</dt>
                <dd className="font-medium">{course.lessons_count}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-dark">Materials</dt>
                <dd className="font-medium">{course.materials.length} files</dd>
              </div>
              {course.enrolled_at && (
                <div className="flex justify-between">
                  <dt className="text-neutral-dark">Enrolled</dt>
                  <dd className="font-medium">
                    {new Date(course.enrolled_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
