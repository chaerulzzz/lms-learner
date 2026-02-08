import { useGamification } from './GamificationProvider';
import { Skeleton } from '@/shared/components';
import type { BadgeLevel, BadgeLevelInfo } from './types';

const badgeLevels: BadgeLevelInfo[] = [
  {
    level: 'bronze',
    name: 'Bronze',
    minCoins: 0,
    maxCoins: 499,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-300',
  },
  {
    level: 'silver',
    name: 'Silver',
    minCoins: 500,
    maxCoins: 999,
    color: 'text-gray-600',
    bgColor: 'bg-gray-200',
    borderColor: 'border-gray-400',
  },
  {
    level: 'gold',
    name: 'Gold',
    minCoins: 1000,
    maxCoins: 2499,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-400',
  },
  {
    level: 'platinum',
    name: 'Platinum',
    minCoins: 2500,
    maxCoins: 4999,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-400',
  },
  {
    level: 'diamond',
    name: 'Diamond',
    minCoins: 5000,
    maxCoins: Infinity,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100',
    borderColor: 'border-cyan-400',
  },
];

function getBadgeLevelInfo(level: BadgeLevel): BadgeLevelInfo | undefined {
  return badgeLevels.find((b) => b.level === level);
}

function getBadgeIcon(level: BadgeLevel): string {
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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BadgesView() {
  const { badges, badgesLoading, badgesError, coinBalance, userStats } = useGamification();

  const currentCoins = coinBalance?.total_coins ?? 0;

  // Determine current badge level based on coins
  const currentBadgeLevel = badgeLevels.find(
    (b) => currentCoins >= b.minCoins && currentCoins <= b.maxCoins
  );
  const currentBadgeLevelIndex = currentBadgeLevel
    ? badgeLevels.indexOf(currentBadgeLevel)
    : 0;
  const nextBadgeLevel = badgeLevels[currentBadgeLevelIndex + 1];

  // Calculate progress to next level
  const progressToNext = nextBadgeLevel
    ? Math.min(
        100,
        ((currentCoins - currentBadgeLevel!.minCoins) /
          (nextBadgeLevel.minCoins - currentBadgeLevel!.minCoins)) *
          100
      )
    : 100;
  const coinsToNext = nextBadgeLevel ? nextBadgeLevel.minCoins - currentCoins : 0;

  if (badgesError) {
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
        <h3 className="text-lg font-semibold mb-2">Failed to load badges</h3>
        <p className="text-neutral-dark">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Level & Progress */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Your Badge Level</h2>
        {badgesLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <div>
            {/* Current Level Display */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${
                  currentBadgeLevel?.bgColor || 'bg-gray-100'
                } border-4 ${currentBadgeLevel?.borderColor || 'border-gray-200'}`}
              >
                {getBadgeIcon(currentBadgeLevel?.level || 'bronze')}
              </div>
              <div>
                <p className="text-sm text-neutral-dark">Current Level</p>
                <p
                  className={`text-2xl font-bold ${
                    currentBadgeLevel?.color || 'text-gray-600'
                  }`}
                >
                  {currentBadgeLevel?.name || 'Bronze'}
                </p>
                <p className="text-sm text-neutral-dark">
                  🪙 {currentCoins.toLocaleString()} coins
                </p>
              </div>
            </div>

            {/* Progress to Next Level */}
            {nextBadgeLevel && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-neutral-dark">Progress to {nextBadgeLevel.name}</span>
                  <span className="text-sm font-medium">
                    {coinsToNext.toLocaleString()} coins needed
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${nextBadgeLevel.bgColor.replace('bg-', 'bg-')} transition-all duration-500`}
                    style={{
                      width: `${progressToNext}%`,
                      background:
                        nextBadgeLevel.level === 'gold'
                          ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                          : nextBadgeLevel.level === 'platinum'
                          ? 'linear-gradient(90deg, #a78bfa, #8b5cf6)'
                          : nextBadgeLevel.level === 'diamond'
                          ? 'linear-gradient(90deg, #22d3ee, #06b6d4)'
                          : nextBadgeLevel.level === 'silver'
                          ? 'linear-gradient(90deg, #9ca3af, #6b7280)'
                          : 'linear-gradient(90deg, #fb923c, #f97316)',
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-neutral-dark mt-1">
                  <span>{currentBadgeLevel?.name}</span>
                  <span>{nextBadgeLevel.name} ({nextBadgeLevel.minCoins.toLocaleString()} coins)</span>
                </div>
              </div>
            )}

            {!nextBadgeLevel && (
              <div className="bg-cyan-50 rounded-lg p-4 text-center">
                <span className="text-3xl">💎</span>
                <p className="font-semibold text-cyan-800 mt-2">
                  You've reached the highest level!
                </p>
                <p className="text-sm text-cyan-600">
                  Congratulations on achieving Diamond status!
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Badge Level Guide */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Badge Levels</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {badgeLevels.map((level, index) => {
            const isCurrentLevel = currentBadgeLevel?.level === level.level;
            const isUnlocked = currentBadgeLevelIndex >= index;

            return (
              <div
                key={level.level}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  isCurrentLevel
                    ? `${level.bgColor} ${level.borderColor} ring-2 ring-offset-2 ring-${level.level === 'gold' ? 'yellow' : level.level === 'silver' ? 'gray' : level.level === 'platinum' ? 'purple' : level.level === 'diamond' ? 'cyan' : 'orange'}-400`
                    : isUnlocked
                    ? `${level.bgColor} ${level.borderColor}`
                    : 'bg-gray-50 border-gray-200 opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">{getBadgeIcon(level.level)}</div>
                <p className={`font-semibold ${level.color}`}>{level.name}</p>
                <p className="text-xs text-neutral-dark mt-1">
                  {level.maxCoins === Infinity
                    ? `${level.minCoins.toLocaleString()}+ coins`
                    : `${level.minCoins.toLocaleString()} - ${level.maxCoins.toLocaleString()}`}
                </p>
                {isCurrentLevel && (
                  <span className="inline-block mt-2 px-2 py-0.5 bg-white rounded-full text-xs font-medium text-primary-red">
                    Current
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Earned Badges */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Earned Badges</h2>
          {userStats && (
            <span className="text-sm text-neutral-dark">
              {userStats.badges_earned} badges earned
            </span>
          )}
        </div>

        {badgesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : badges.length === 0 ? (
          <div className="text-center py-8">
            <span className="text-5xl">🎯</span>
            <p className="text-lg font-medium mt-4">No badges earned yet</p>
            <p className="text-sm text-neutral-dark mt-1">
              Complete courses and achievements to earn badges!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {badges.map((badge) => {
              const levelInfo = getBadgeLevelInfo(badge.level);
              return (
                <div
                  key={badge.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 ${
                    levelInfo?.bgColor || 'bg-gray-50'
                  } ${levelInfo?.borderColor || 'border-gray-200'}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-white border-2 ${
                      levelInfo?.borderColor || 'border-gray-200'
                    }`}
                  >
                    {getBadgeIcon(badge.level)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{badge.badge_name}</p>
                    <p className="text-sm text-neutral-dark truncate">
                      {badge.badge_description}
                    </p>
                    <p className="text-xs text-neutral-dark mt-1">
                      Earned on {formatDate(badge.earned_at)}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      levelInfo?.bgColor || 'bg-gray-100'
                    } ${levelInfo?.color || 'text-gray-600'}`}
                  >
                    {badge.level}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
