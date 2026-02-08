// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  user_id: number;
  full_name: string;
  department: string;
  gmfc_coins: number;
  total_learning_hours: number;
  current_badge_level: BadgeLevel;
  current_streak: number;
}

export type LeaderboardOrderBy = 'coins' | 'learning_hours' | 'streak';

// Badge Types
export type BadgeLevel = 'none' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface UserBadge {
  id: number;
  badge_id: number;
  badge_name: string;
  badge_description: string;
  level: BadgeLevel;
  icon_url?: string;
  earned_at: string;
}

export interface BadgeLevelInfo {
  level: BadgeLevel;
  name: string;
  minCoins: number;
  maxCoins: number;
  color: string;
  bgColor: string;
  borderColor: string;
}

// Coins Types
export interface CoinBalance {
  user_id: number;
  total_coins: number;
  coins_earned: number;
  coins_spent: number;
}

export type CoinTransactionType = 'earn' | 'spend';

export type CoinSourceType =
  | 'course'
  | 'quiz'
  | 'streak'
  | 'achievement'
  | 'certificate'
  | 'login'
  | 'other';

export interface CoinTransaction {
  id: number;
  user_id: number;
  amount: number;
  type: CoinTransactionType;
  reason: string;
  source_type: CoinSourceType;
  source_id?: number;
  created_at: string;
}

// Pagination
export interface PaginationInfo {
  page: number;
  page_size: number;
  total: number;
  total_page: number;
}

// User Stats (from /user/stats endpoint)
export interface UserStats {
  total_courses_enrolled: number;
  total_courses_completed: number;
  total_learning_hours: number;
  average_quiz_score: number;
  total_coins_earned: number;
  total_coins_spent: number;
  current_coin_balance: number;
  badges_earned: number;
  certificates_earned: number;
  current_streak: number;
  longest_streak: number;
}

// Tab types for the gamification view
export type GamificationTab = 'leaderboard' | 'badges' | 'coins' | 'analytics';
