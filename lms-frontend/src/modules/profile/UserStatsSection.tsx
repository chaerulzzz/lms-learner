import { useProfile } from './ProfileProvider';
import { Skeleton } from '@/shared/components';
import { Link } from 'react-router-dom';

function StatCard({
  icon,
  label,
  value,
  suffix,
  color = 'text-gray-900',
}: {
  icon: string;
  label: string;
  value: number | string;
  suffix?: string;
  color?: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <span className="text-2xl">{icon}</span>
      <p className={`text-2xl font-bold mt-1 ${color}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
        {suffix && <span className="text-sm font-normal text-neutral-dark ml-1">{suffix}</span>}
      </p>
      <p className="text-xs text-neutral-dark">{label}</p>
    </div>
  );
}

export default function UserStatsSection() {
  const { userStats, userStatsLoading, userStatsError } = useProfile();

  if (userStatsError) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <svg
            className="w-12 h-12 mx-auto text-red-400 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-neutral-dark">Failed to load statistics</p>
        </div>
      </div>
    );
  }

  if (userStatsLoading) {
    return (
      <div className="card">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  if (!userStats) {
    return null;
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Your Learning Statistics</h2>
        <Link
          to="/achievements"
          className="text-sm text-primary-red hover:underline flex items-center gap-1"
        >
          View Achievements
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon="📚"
          label="Courses Completed"
          value={userStats.total_courses_completed}
          suffix={`/ ${userStats.total_courses_enrolled}`}
        />
        <StatCard
          icon="⏱️"
          label="Learning Hours"
          value={userStats.total_learning_hours}
          suffix="hrs"
        />
        <StatCard
          icon="📊"
          label="Avg Quiz Score"
          value={`${userStats.average_quiz_score.toFixed(1)}%`}
          color={userStats.average_quiz_score >= 80 ? 'text-green-600' : 'text-gray-900'}
        />
        <StatCard
          icon="🔥"
          label="Current Streak"
          value={userStats.current_streak}
          suffix="days"
          color="text-orange-500"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <span className="text-xl">🪙</span>
          <p className="text-lg font-semibold text-yellow-700">{userStats.current_coin_balance}</p>
          <p className="text-xs text-neutral-dark">Coins</p>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <span className="text-xl">🎖️</span>
          <p className="text-lg font-semibold text-purple-700">{userStats.badges_earned}</p>
          <p className="text-xs text-neutral-dark">Badges</p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <span className="text-xl">📜</span>
          <p className="text-lg font-semibold text-blue-700">{userStats.certificates_earned}</p>
          <p className="text-xs text-neutral-dark">Certificates</p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <span className="text-xl">💰</span>
          <p className="text-lg font-semibold text-green-700">{userStats.total_coins_earned}</p>
          <p className="text-xs text-neutral-dark">Total Earned</p>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <span className="text-xl">🛒</span>
          <p className="text-lg font-semibold text-red-700">{userStats.total_coins_spent}</p>
          <p className="text-xs text-neutral-dark">Total Spent</p>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <span className="text-xl">🏆</span>
          <p className="text-lg font-semibold text-orange-700">{userStats.longest_streak}</p>
          <p className="text-xs text-neutral-dark">Best Streak</p>
        </div>
      </div>
    </div>
  );
}
