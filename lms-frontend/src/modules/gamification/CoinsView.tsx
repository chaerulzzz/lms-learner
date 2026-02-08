import { useGamification } from './GamificationProvider';
import { Skeleton } from '@/shared/components';
import type { CoinSourceType } from './types';

function getSourceIcon(sourceType: CoinSourceType): string {
  switch (sourceType) {
    case 'course':
      return '📚';
    case 'quiz':
      return '📝';
    case 'streak':
      return '🔥';
    case 'achievement':
      return '🏆';
    case 'certificate':
      return '📜';
    case 'login':
      return '👋';
    default:
      return '🪙';
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export default function CoinsView() {
  const {
    coinBalance,
    coinBalanceLoading,
    coinTransactions,
    transactionsLoading,
    transactionsPagination,
    transactionsPage,
    setTransactionsPage,
    userStats,
    userStatsLoading,
  } = useGamification();

  return (
    <div className="space-y-6">
      {/* Coin Balance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Balance */}
        <div className="card bg-gradient-to-br from-yellow-400 to-yellow-600 text-white">
          {coinBalanceLoading ? (
            <Skeleton className="h-24 w-full bg-yellow-300/30" />
          ) : (
            <div className="text-center">
              <p className="text-sm opacity-90 mb-1">Total Balance</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl">🪙</span>
                <span className="text-4xl font-bold">
                  {(coinBalance?.total_coins ?? 0).toLocaleString()}
                </span>
              </div>
              <p className="text-sm opacity-75 mt-2">GMFC Coins</p>
            </div>
          )}
        </div>

        {/* Coins Earned */}
        <div className="card">
          {coinBalanceLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <div className="text-center">
              <p className="text-sm text-neutral-dark mb-1">Total Earned</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl text-green-500">+</span>
                <span className="text-3xl font-bold text-green-600">
                  {(coinBalance?.coins_earned ?? 0).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-neutral-dark mt-2">coins earned all time</p>
            </div>
          )}
        </div>

        {/* Coins Spent */}
        <div className="card">
          {coinBalanceLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <div className="text-center">
              <p className="text-sm text-neutral-dark mb-1">Total Spent</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl text-red-500">-</span>
                <span className="text-3xl font-bold text-red-600">
                  {(coinBalance?.coins_spent ?? 0).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-neutral-dark mt-2">coins spent all time</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      {!userStatsLoading && userStats && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Earning Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl">📚</p>
              <p className="text-xl font-bold mt-1">{userStats.total_courses_completed}</p>
              <p className="text-xs text-neutral-dark">Courses Completed</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl">📜</p>
              <p className="text-xl font-bold mt-1">{userStats.certificates_earned}</p>
              <p className="text-xs text-neutral-dark">Certificates</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl">🔥</p>
              <p className="text-xl font-bold mt-1">{userStats.current_streak} days</p>
              <p className="text-xs text-neutral-dark">Current Streak</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl">📊</p>
              <p className="text-xl font-bold mt-1">{userStats.average_quiz_score.toFixed(1)}%</p>
              <p className="text-xs text-neutral-dark">Avg Quiz Score</p>
            </div>
          </div>
        </div>
      )}

      {/* How to Earn */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">How to Earn Coins</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { icon: '📚', title: 'Complete Courses', coins: '50-100', desc: 'Base reward per course' },
            { icon: '📝', title: 'Pass Quizzes', coins: '25-50', desc: 'Bonus for high scores' },
            { icon: '💯', title: 'Perfect Score', coins: '25', desc: 'Score 100% on any quiz' },
            { icon: '🔥', title: '7-Day Streak', coins: '50', desc: 'Learn for 7 days in a row' },
            { icon: '👋', title: 'Daily Login', coins: '5', desc: 'First activity each day' },
            { icon: '🏆', title: 'Achievements', coins: '20-100', desc: 'Unlock special achievements' },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-yellow-600 font-semibold">+{item.coins} coins</p>
                <p className="text-xs text-neutral-dark">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Transaction History</h2>
          {transactionsPagination && (
            <span className="text-sm text-neutral-dark">
              {transactionsPagination.total} transactions
            </span>
          )}
        </div>

        {transactionsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : coinTransactions.length === 0 ? (
          <div className="text-center py-8">
            <span className="text-5xl">📭</span>
            <p className="text-lg font-medium mt-4">No transactions yet</p>
            <p className="text-sm text-neutral-dark mt-1">
              Start learning to earn your first coins!
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {coinTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className={`flex items-center gap-4 p-3 rounded-lg border ${
                    tx.type === 'earn'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                      tx.type === 'earn' ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    {getSourceIcon(tx.source_type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{tx.reason}</p>
                    <p className="text-xs text-neutral-dark">
                      {formatDate(tx.created_at)} at {formatTime(tx.created_at)}
                    </p>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      tx.type === 'earn' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {tx.type === 'earn' ? '+' : '-'}
                    {tx.amount}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {transactionsPagination && transactionsPagination.total_page > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <button
                  onClick={() => setTransactionsPage(transactionsPage - 1)}
                  disabled={transactionsPage === 1}
                  className={`btn-secondary px-4 py-2 ${
                    transactionsPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Previous
                </button>
                <span className="text-sm text-neutral-dark">
                  Page {transactionsPage} of {transactionsPagination.total_page}
                </span>
                <button
                  onClick={() => setTransactionsPage(transactionsPage + 1)}
                  disabled={transactionsPage === transactionsPagination.total_page}
                  className={`btn-secondary px-4 py-2 ${
                    transactionsPage === transactionsPagination.total_page
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
