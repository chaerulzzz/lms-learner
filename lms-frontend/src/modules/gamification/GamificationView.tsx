import { useGamification } from './GamificationProvider';
import LeaderboardView from './LeaderboardView';
import BadgesView from './BadgesView';
import CoinsView from './CoinsView';
import AnalyticsView from './AnalyticsView';
import type { GamificationTab } from './types';

const tabs: { id: GamificationTab; label: string; icon: string }[] = [
  { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
  { id: 'badges', label: 'Badges', icon: '🎖️' },
  { id: 'coins', label: 'Coins', icon: '🪙' },
  { id: 'analytics', label: 'Analytics', icon: '📊' },
];

export default function GamificationView() {
  const { activeTab, setActiveTab, coinBalance, currentUserRank } = useGamification();

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Achievements & Rewards</h1>
        <p className="text-neutral-dark">
          Track your progress, earn coins, and compete with other learners
        </p>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card p-4 text-center">
          <span className="text-2xl">🏆</span>
          <p className="text-xl font-bold mt-1">
            {currentUserRank !== null ? `#${currentUserRank}` : '-'}
          </p>
          <p className="text-xs text-neutral-dark">Your Rank</p>
        </div>
        <div className="card p-4 text-center">
          <span className="text-2xl">🪙</span>
          <p className="text-xl font-bold mt-1">
            {(coinBalance?.total_coins ?? 0).toLocaleString()}
          </p>
          <p className="text-xs text-neutral-dark">GMFC Coins</p>
        </div>
        <div className="card p-4 text-center">
          <span className="text-2xl">🎖️</span>
          <p className="text-xl font-bold mt-1">4</p>
          <p className="text-xs text-neutral-dark">Badges Earned</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-1 -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-red text-primary-red'
                  : 'border-transparent text-neutral-dark hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'leaderboard' && <LeaderboardView />}
        {activeTab === 'badges' && <BadgesView />}
        {activeTab === 'coins' && <CoinsView />}
        {activeTab === 'analytics' && <AnalyticsView />}
      </div>
    </div>
  );
}
