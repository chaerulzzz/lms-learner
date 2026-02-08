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

export interface PublicProfile {
  id: number;
  full_name: string;
  department: string;
  role: string;
  total_learning_hours: number;
  gmfc_coins: number;
  current_badge_level: string;
  courses_completed: number;
  certificates: number;
}
