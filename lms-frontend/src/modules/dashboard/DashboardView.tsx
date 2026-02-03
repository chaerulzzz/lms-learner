import { Link } from 'react-router-dom';
import { useAuth } from '@/modules/auth';
import { useDashboard } from './DashboardProvider';
import { Avatar, ErrorState, ProgressBar, StatCardSkeleton, CardSkeleton } from '@/shared/components';
import { getProgressColor, getProgressTextColor } from '@/lib/utils';

export default function DashboardView() {
  const { user } = useAuth();
  const { dashboard, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorState title="Failed to load dashboard" />;
  }

  return (
    <div>
      {/* Welcome */}
      <h1 className="text-2xl font-bold text-primary-red mb-6">
        Welcome back, {user?.first_name || 'User'}
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <h3 className="text-sm font-medium text-neutral-dark mb-1">In Progress</h3>
          <p className="text-3xl font-bold text-status-warning">
            {dashboard?.in_progress_courses.length || 0}
          </p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-neutral-dark mb-1">Completed</h3>
          <p className="text-3xl font-bold text-status-success">
            {dashboard?.completed_courses_count || 0}
          </p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-neutral-dark mb-1">GMFC Coins</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {dashboard?.gmfc_coins || 0}
          </p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-neutral-dark mb-1">Learning Hours</h3>
          <p className="text-3xl font-bold text-primary-red">
            {dashboard?.total_learning_hours || 0}h
          </p>
        </div>
      </div>

      {/* User Profile Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card flex items-center gap-4">
          <Avatar name={user?.first_name || 'U'} size="lg" />
          <div>
            <p className="font-semibold">{user?.full_name || 'User'}</p>
            <p className="text-sm text-neutral-dark">{user?.department || 'No department'}</p>
          </div>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-neutral-dark mb-1">Badge Level</h3>
          <p className="text-lg font-bold capitalize">{dashboard?.current_badge_level || 'None'}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-neutral-dark mb-1">Leaderboard Rank</h3>
          <p className="text-lg font-bold text-primary-red">#{dashboard?.leaderboard_rank || '-'}</p>
        </div>
      </div>

      {/* Mandatory Courses */}
      {dashboard?.mandatory_courses && dashboard.mandatory_courses.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Mandatory Courses</h2>
            <Link to="/learning-paths" className="text-sm text-primary-red hover:underline">
              View Learning Paths
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboard.mandatory_courses.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} className="card hover:shadow-lg transition-shadow block">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold">{course.title}</h3>
                  <span className="badge-primary">MANDATORY</span>
                </div>
                <p className="text-sm text-neutral-dark mb-4 truncate-2-lines">
                  {course.description}
                </p>
                <div className="progress-bar mb-2">
                  <div
                    className={`progress-fill ${getProgressColor(course.completion_percentage)}`}
                    style={{ width: `${course.completion_percentage}%` }}
                  />
                </div>
                <p className={`text-sm ${getProgressTextColor(course.completion_percentage)}`}>
                  {course.completion_percentage}% Complete
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Continue Learning */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboard?.in_progress_courses.map((course) => (
            <div key={course.id} className="card">
              <div className="bg-gray-200 h-40 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-gray-400">Course Thumbnail</span>
              </div>
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold">{course.title}</h3>
                {!course.is_mandatory && (
                  <span className="badge bg-blue-100 text-blue-800">OPTIONAL</span>
                )}
              </div>
              <p className="text-sm text-neutral-dark mb-3 truncate-2-lines">
                {course.description}
              </p>
              <ProgressBar percentage={course.completion_percentage} className="mb-2" />
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-neutral-dark">{course.completion_percentage}%</p>
                <Link to={`/courses/${course.id}`} className="btn-primary text-sm px-3 py-1">
                  Continue
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earned Badges */}
      {dashboard?.badges && dashboard.badges.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Earned Badges</h2>
          <div className="flex flex-wrap gap-4">
            {dashboard.badges.map((badge) => (
              <div key={badge.id} className="card flex items-center gap-3 p-4">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{badge.name}</p>
                  <p className="text-xs text-neutral-dark">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
