import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPublicProfile } from './ProfileProvider';
import { Skeleton, ErrorState, Breadcrumb } from '@/shared/components';
import type { PublicProfile } from './types';

function getBadgeLevelStyle(level: string): { bg: string; text: string; border: string } {
  switch (level) {
    case 'diamond':
      return { bg: 'bg-cyan-100', text: 'text-cyan-800', border: 'border-cyan-300' };
    case 'platinum':
      return { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' };
    case 'gold':
      return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' };
    case 'silver':
      return { bg: 'bg-gray-200', text: 'text-gray-700', border: 'border-gray-400' };
    case 'bronze':
      return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' };
  }
}

function getBadgeIcon(level: string): string {
  switch (level) {
    case 'diamond':
      return '💎';
    case 'platinum':
      return '⚡';
    case 'gold':
      return '🏆';
    case 'silver':
      return '🥈';
    case 'bronze':
      return '🥉';
    default:
      return '🎖️';
  }
}

export default function PublicProfileView() {
  const { userId } = useParams<{ userId: string }>();

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery<PublicProfile>({
    queryKey: ['profile', 'public', userId],
    queryFn: () => fetchPublicProfile(userId!),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div>
        <Breadcrumb
          items={[
            { label: 'Achievements', href: '/achievements' },
            { label: 'User Profile' },
          ]}
        />
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="w-20 h-20 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <ErrorState
        title="User not found"
        message="This user profile could not be loaded."
        actionLabel="Back to Leaderboard"
        actionHref="/achievements"
      />
    );
  }

  const badgeStyle = getBadgeLevelStyle(profile.current_badge_level);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Achievements', href: '/achievements' },
          { label: profile.full_name },
        ]}
      />

      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="card mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-primary-red text-white flex items-center justify-center text-4xl font-bold">
              {profile.full_name.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold">{profile.full_name}</h1>
              <p className="text-neutral-dark">{profile.department}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium capitalize border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                >
                  {getBadgeIcon(profile.current_badge_level)}
                  {profile.current_badge_level}
                </span>
              </div>
            </div>

            {/* Coins */}
            <div className="text-center">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🪙</span>
                <span className="text-3xl font-bold text-yellow-600">
                  {profile.gmfc_coins.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-neutral-dark">GMFC Coins</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <span className="text-2xl">📚</span>
              <p className="text-2xl font-bold text-blue-700 mt-1">{profile.courses_completed}</p>
              <p className="text-xs text-neutral-dark">Courses Completed</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <span className="text-2xl">⏱️</span>
              <p className="text-2xl font-bold text-green-700 mt-1">{profile.total_learning_hours}</p>
              <p className="text-xs text-neutral-dark">Learning Hours</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <span className="text-2xl">📜</span>
              <p className="text-2xl font-bold text-purple-700 mt-1">{profile.certificates}</p>
              <p className="text-xs text-neutral-dark">Certificates</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <span className="text-2xl">🪙</span>
              <p className="text-2xl font-bold text-yellow-700 mt-1">{profile.gmfc_coins}</p>
              <p className="text-xs text-neutral-dark">Coins Earned</p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            to="/achievements"
            className="text-primary-red hover:underline inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
