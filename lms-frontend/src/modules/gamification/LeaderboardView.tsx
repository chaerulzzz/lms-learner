import { Link } from 'react-router-dom';
import { useGamification } from './GamificationProvider';
import { Skeleton } from '@/shared/components';
import type { BadgeLevel, LeaderboardOrderBy } from './types';

function getBadgeLevelStyle(level: BadgeLevel): { bg: string; text: string; border: string } {
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

function getRankStyle(rank: number): string {
  switch (rank) {
    case 1:
      return 'bg-yellow-400 text-yellow-900';
    case 2:
      return 'bg-gray-300 text-gray-800';
    case 3:
      return 'bg-orange-400 text-orange-900';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

function getRankIcon(rank: number): string | null {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return null;
  }
}

const orderByOptions: { value: LeaderboardOrderBy; label: string }[] = [
  { value: 'coins', label: 'GMFC Coins' },
  { value: 'learning_hours', label: 'Learning Hours' },
  { value: 'streak', label: 'Current Streak' },
];

export default function LeaderboardView() {
  const {
    leaderboard,
    leaderboardLoading,
    leaderboardError,
    leaderboardOrderBy,
    setLeaderboardOrderBy,
    currentUserRank,
  } = useGamification();

  if (leaderboardError) {
    return (
      <div className="card text-center py-12">
        <svg
          className="w-16 h-16 mx-auto text-red-400 mb-4"
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
        <h3 className="text-lg font-semibold mb-2">Failed to load leaderboard</h3>
        <p className="text-neutral-dark">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Leaderboard</h2>
          <p className="text-sm text-neutral-dark">
            See how you rank against other learners
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="orderBy" className="text-sm text-neutral-dark">
            Rank by:
          </label>
          <select
            id="orderBy"
            value={leaderboardOrderBy}
            onChange={(e) => setLeaderboardOrderBy(e.target.value as LeaderboardOrderBy)}
            className="input-field min-w-[160px]"
          >
            {orderByOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Current user rank banner */}
      {currentUserRank !== null && (
        <div className="card bg-gradient-to-r from-primary-red to-red-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Your Current Rank</p>
              <p className="text-3xl font-bold">#{currentUserRank}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">out of {leaderboard.length} learners</p>
              <p className="text-sm opacity-75">
                Keep learning to climb the ranks!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard table */}
      <div className="card p-0 overflow-hidden">
        {leaderboardLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Learner
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Badge
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {leaderboardOrderBy === 'coins' && 'Coins'}
                    {leaderboardOrderBy === 'learning_hours' && 'Hours'}
                    {leaderboardOrderBy === 'streak' && 'Streak'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leaderboard.map((entry) => {
                  const isCurrentUser = entry.user_id === 1;
                  const rankIcon = getRankIcon(entry.rank);
                  const badgeStyle = getBadgeLevelStyle(entry.current_badge_level);

                  return (
                    <tr
                      key={entry.user_id}
                      className={`${
                        isCurrentUser
                          ? 'bg-red-50 border-l-4 border-l-primary-red'
                          : 'hover:bg-gray-50'
                      } transition-colors`}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {rankIcon ? (
                            <span className="text-2xl">{rankIcon}</span>
                          ) : (
                            <span
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${getRankStyle(
                                entry.rank
                              )}`}
                            >
                              {entry.rank}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/users/${entry.user_id}`}
                            className="w-10 h-10 rounded-full bg-primary-red text-white flex items-center justify-center font-semibold hover:ring-2 hover:ring-primary-red hover:ring-offset-2 transition-all"
                          >
                            {entry.full_name.charAt(0)}
                          </Link>
                          <div>
                            <Link
                              to={`/users/${entry.user_id}`}
                              className="font-medium text-gray-900 hover:text-primary-red transition-colors"
                            >
                              {entry.full_name}
                              {isCurrentUser && (
                                <span className="ml-2 text-xs text-primary-red">(You)</span>
                              )}
                            </Link>
                            <p className="text-sm text-gray-500 sm:hidden">
                              {entry.department}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                        <span className="text-sm text-gray-600">{entry.department}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                        >
                          {entry.current_badge_level}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <span className="text-lg font-semibold text-gray-900">
                          {leaderboardOrderBy === 'coins' && (
                            <>
                              <span className="text-yellow-500 mr-1">🪙</span>
                              {entry.gmfc_coins.toLocaleString()}
                            </>
                          )}
                          {leaderboardOrderBy === 'learning_hours' && (
                            <>
                              {entry.total_learning_hours}
                              <span className="text-sm font-normal text-gray-500 ml-1">hrs</span>
                            </>
                          )}
                          {leaderboardOrderBy === 'streak' && (
                            <>
                              <span className="text-orange-500 mr-1">🔥</span>
                              {entry.current_streak}
                              <span className="text-sm font-normal text-gray-500 ml-1">days</span>
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
