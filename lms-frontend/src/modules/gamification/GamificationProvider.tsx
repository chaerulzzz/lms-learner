import React, { createContext, useContext, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { USE_MOCK } from '@/lib/mockData';
import type { ApiResponse } from '@/types/api';
import type {
  LeaderboardEntry,
  LeaderboardOrderBy,
  UserBadge,
  CoinBalance,
  CoinTransaction,
  UserStats,
  GamificationTab,
  PaginationInfo,
} from './types';

// Mock data
const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user_id: 5,
    full_name: 'Alice Johnson',
    department: 'Engineering',
    gmfc_coins: 850,
    total_learning_hours: 120,
    current_badge_level: 'gold',
    current_streak: 15,
  },
  {
    rank: 2,
    user_id: 1,
    full_name: 'John Doe',
    department: 'Engineering',
    gmfc_coins: 450,
    total_learning_hours: 45,
    current_badge_level: 'silver',
    current_streak: 7,
  },
  {
    rank: 3,
    user_id: 3,
    full_name: 'Bob Smith',
    department: 'Product',
    gmfc_coins: 380,
    total_learning_hours: 38,
    current_badge_level: 'silver',
    current_streak: 5,
  },
  {
    rank: 4,
    user_id: 4,
    full_name: 'Carol White',
    department: 'Design',
    gmfc_coins: 320,
    total_learning_hours: 32,
    current_badge_level: 'bronze',
    current_streak: 3,
  },
  {
    rank: 5,
    user_id: 6,
    full_name: 'David Lee',
    department: 'Sales',
    gmfc_coins: 280,
    total_learning_hours: 28,
    current_badge_level: 'bronze',
    current_streak: 2,
  },
  {
    rank: 6,
    user_id: 7,
    full_name: 'Emma Wilson',
    department: 'Marketing',
    gmfc_coins: 250,
    total_learning_hours: 25,
    current_badge_level: 'bronze',
    current_streak: 4,
  },
  {
    rank: 7,
    user_id: 8,
    full_name: 'Frank Brown',
    department: 'Engineering',
    gmfc_coins: 220,
    total_learning_hours: 22,
    current_badge_level: 'bronze',
    current_streak: 1,
  },
  {
    rank: 8,
    user_id: 9,
    full_name: 'Grace Taylor',
    department: 'HR',
    gmfc_coins: 180,
    total_learning_hours: 18,
    current_badge_level: 'bronze',
    current_streak: 6,
  },
  {
    rank: 9,
    user_id: 10,
    full_name: 'Henry Davis',
    department: 'Finance',
    gmfc_coins: 150,
    total_learning_hours: 15,
    current_badge_level: 'bronze',
    current_streak: 0,
  },
  {
    rank: 10,
    user_id: 11,
    full_name: 'Ivy Martinez',
    department: 'Operations',
    gmfc_coins: 120,
    total_learning_hours: 12,
    current_badge_level: 'bronze',
    current_streak: 2,
  },
];

const mockBadges: UserBadge[] = [
  {
    id: 1,
    badge_id: 1,
    badge_name: 'First Steps',
    badge_description: 'Complete your first course',
    level: 'bronze',
    earned_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    badge_id: 2,
    badge_name: 'Course Master',
    badge_description: 'Complete 5 courses',
    level: 'silver',
    earned_at: '2024-01-20T12:00:00Z',
  },
  {
    id: 3,
    badge_id: 5,
    badge_name: 'Consistent Learner',
    badge_description: '7-day learning streak',
    level: 'gold',
    earned_at: '2024-01-25T10:00:00Z',
  },
  {
    id: 4,
    badge_id: 3,
    badge_name: 'Quiz Ace',
    badge_description: 'Score 100% on 3 quizzes',
    level: 'silver',
    earned_at: '2024-01-22T14:00:00Z',
  },
];

const mockCoinBalance: CoinBalance = {
  user_id: 1,
  total_coins: 450,
  coins_earned: 500,
  coins_spent: 50,
};

const mockCoinTransactions: CoinTransaction[] = [
  {
    id: 1,
    user_id: 1,
    amount: 100,
    type: 'earn',
    reason: 'Course Completed: Go Programming Basics',
    source_type: 'course',
    source_id: 1,
    created_at: '2024-01-28T12:00:00Z',
  },
  {
    id: 2,
    user_id: 1,
    amount: 50,
    type: 'earn',
    reason: 'Quiz Passed: Go Fundamentals Quiz',
    source_type: 'quiz',
    source_id: 3,
    created_at: '2024-01-27T15:30:00Z',
  },
  {
    id: 3,
    user_id: 1,
    amount: 50,
    type: 'spend',
    reason: 'Certificate Download',
    source_type: 'certificate',
    source_id: 5,
    created_at: '2024-01-26T10:00:00Z',
  },
  {
    id: 4,
    user_id: 1,
    amount: 200,
    type: 'earn',
    reason: '7-Day Streak Bonus',
    source_type: 'streak',
    created_at: '2024-01-25T08:00:00Z',
  },
  {
    id: 5,
    user_id: 1,
    amount: 50,
    type: 'earn',
    reason: 'Course Completed: Web Development Basics',
    source_type: 'course',
    source_id: 2,
    created_at: '2024-01-24T16:00:00Z',
  },
  {
    id: 6,
    user_id: 1,
    amount: 25,
    type: 'earn',
    reason: 'Perfect Quiz Score Bonus',
    source_type: 'quiz',
    source_id: 4,
    created_at: '2024-01-23T14:00:00Z',
  },
  {
    id: 7,
    user_id: 1,
    amount: 5,
    type: 'earn',
    reason: 'Daily Login Bonus',
    source_type: 'login',
    created_at: '2024-01-22T09:00:00Z',
  },
  {
    id: 8,
    user_id: 1,
    amount: 20,
    type: 'earn',
    reason: 'Achievement Unlocked: Quiz Ace',
    source_type: 'achievement',
    created_at: '2024-01-21T11:00:00Z',
  },
];

const mockUserStats: UserStats = {
  total_courses_enrolled: 8,
  total_courses_completed: 3,
  total_learning_hours: 45,
  average_quiz_score: 87.5,
  total_coins_earned: 500,
  total_coins_spent: 50,
  current_coin_balance: 450,
  badges_earned: 4,
  certificates_earned: 3,
  current_streak: 7,
  longest_streak: 15,
};

// API Functions
async function fetchLeaderboard(orderBy: LeaderboardOrderBy, limit: number): Promise<LeaderboardEntry[]> {
  if (USE_MOCK) {
    // Sort mock data based on orderBy
    const sorted = [...mockLeaderboard].sort((a, b) => {
      switch (orderBy) {
        case 'coins':
          return b.gmfc_coins - a.gmfc_coins;
        case 'learning_hours':
          return b.total_learning_hours - a.total_learning_hours;
        case 'streak':
          return b.current_streak - a.current_streak;
        default:
          return b.gmfc_coins - a.gmfc_coins;
      }
    });
    // Re-rank after sorting
    return sorted.slice(0, limit).map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
  }
  const response = await api.get<ApiResponse<LeaderboardEntry[]>>(
    `/user/leaderboard?order_by=${orderBy}&limit=${limit}`
  );
  return response.data;
}

async function fetchBadges(): Promise<UserBadge[]> {
  if (USE_MOCK) {
    return mockBadges;
  }
  const response = await api.get<ApiResponse<UserBadge[]>>('/user/badges');
  return response.data;
}

async function fetchCoinBalance(): Promise<CoinBalance> {
  if (USE_MOCK) {
    return mockCoinBalance;
  }
  const response = await api.get<ApiResponse<CoinBalance>>('/user/coins');
  return response.data;
}

async function fetchCoinTransactions(
  page: number,
  pageSize: number
): Promise<{ transactions: CoinTransaction[]; pagination: PaginationInfo }> {
  if (USE_MOCK) {
    const start = (page - 1) * pageSize;
    const paged = mockCoinTransactions.slice(start, start + pageSize);
    return {
      transactions: paged,
      pagination: {
        page,
        page_size: pageSize,
        total: mockCoinTransactions.length,
        total_page: Math.ceil(mockCoinTransactions.length / pageSize),
      },
    };
  }
  const response = await api.get<ApiResponse<CoinTransaction[]> & { pagination: PaginationInfo }>(
    `/user/coins/transactions?page=${page}&page_size=${pageSize}`
  );
  return {
    transactions: response.data || [],
    pagination: response.pagination || { page, page_size: pageSize, total: 0, total_page: 1 },
  };
}

async function fetchUserStats(): Promise<UserStats> {
  if (USE_MOCK) {
    return mockUserStats;
  }
  const response = await api.get<ApiResponse<UserStats>>('/user/stats');
  return response.data;
}

// Context
interface GamificationContextType {
  // Current tab
  activeTab: GamificationTab;
  setActiveTab: (tab: GamificationTab) => void;

  // Leaderboard
  leaderboard: LeaderboardEntry[];
  leaderboardLoading: boolean;
  leaderboardError: boolean;
  leaderboardOrderBy: LeaderboardOrderBy;
  setLeaderboardOrderBy: (orderBy: LeaderboardOrderBy) => void;
  currentUserRank: number | null;

  // Badges
  badges: UserBadge[];
  badgesLoading: boolean;
  badgesError: boolean;

  // Coins
  coinBalance: CoinBalance | null;
  coinBalanceLoading: boolean;
  coinTransactions: CoinTransaction[];
  transactionsLoading: boolean;
  transactionsPagination: PaginationInfo | null;
  transactionsPage: number;
  setTransactionsPage: (page: number) => void;

  // User Stats
  userStats: UserStats | null;
  userStatsLoading: boolean;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<GamificationTab>('leaderboard');
  const [leaderboardOrderBy, setLeaderboardOrderBy] = useState<LeaderboardOrderBy>('coins');
  const [transactionsPage, setTransactionsPage] = useState(1);
  const transactionsPageSize = 10;

  // Leaderboard query
  const {
    data: leaderboard = [],
    isLoading: leaderboardLoading,
    isError: leaderboardError,
  } = useQuery({
    queryKey: ['gamification', 'leaderboard', leaderboardOrderBy],
    queryFn: () => fetchLeaderboard(leaderboardOrderBy, 100),
  });

  // Badges query
  const {
    data: badges = [],
    isLoading: badgesLoading,
    isError: badgesError,
  } = useQuery({
    queryKey: ['gamification', 'badges'],
    queryFn: fetchBadges,
  });

  // Coin balance query
  const {
    data: coinBalance,
    isLoading: coinBalanceLoading,
  } = useQuery({
    queryKey: ['gamification', 'coins', 'balance'],
    queryFn: fetchCoinBalance,
  });

  // Coin transactions query
  const {
    data: transactionsData,
    isLoading: transactionsLoading,
  } = useQuery({
    queryKey: ['gamification', 'coins', 'transactions', transactionsPage],
    queryFn: () => fetchCoinTransactions(transactionsPage, transactionsPageSize),
  });

  // User stats query
  const {
    data: userStats,
    isLoading: userStatsLoading,
  } = useQuery({
    queryKey: ['gamification', 'stats'],
    queryFn: fetchUserStats,
  });

  // Find current user's rank (assuming user_id 1 for mock, or from auth context in real)
  const currentUserRank = leaderboard.find((entry) => entry.user_id === 1)?.rank ?? null;

  const handleSetLeaderboardOrderBy = useCallback((orderBy: LeaderboardOrderBy) => {
    setLeaderboardOrderBy(orderBy);
  }, []);

  const handleSetTransactionsPage = useCallback((page: number) => {
    setTransactionsPage(page);
  }, []);

  return (
    <GamificationContext.Provider
      value={{
        activeTab,
        setActiveTab,
        leaderboard,
        leaderboardLoading,
        leaderboardError,
        leaderboardOrderBy,
        setLeaderboardOrderBy: handleSetLeaderboardOrderBy,
        currentUserRank,
        badges,
        badgesLoading,
        badgesError,
        coinBalance: coinBalance ?? null,
        coinBalanceLoading,
        coinTransactions: transactionsData?.transactions ?? [],
        transactionsLoading,
        transactionsPagination: transactionsData?.pagination ?? null,
        transactionsPage,
        setTransactionsPage: handleSetTransactionsPage,
        userStats: userStats ?? null,
        userStatsLoading,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}
