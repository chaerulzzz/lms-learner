// ============================================
// API Response Types (matching backend schema)
// ============================================

export interface QuizOption {
  id: number;
  option: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'multiple_choice' | 'true_false';
  options: QuizOption[];
}

export interface QuizStartResponse {
  attempt_id: number;
  quiz_id: number;
  questions: QuizQuestion[];
  started_at: string;
  time_limit_seconds: number;
}

export interface QuizAnswerResult {
  question_id: number;
  question: string;
  user_answer: string;
  correct_answer: string;
  is_correct: boolean;
}

export interface QuizSubmitResponse {
  attempt_id: number;
  quiz_id: number;
  score: number;
  total_marks: number;
  percentage: number;
  passed: boolean;
  coins_awarded: number;
  submitted_at: string;
  answers: QuizAnswerResult[];
}

export interface QuizAttempt {
  attempt_id: number;
  quiz_id: number;
  attempt_number: number;
  score: number;
  percentage: number;
  passed: boolean;
  submitted_at: string;
}

// ============================================
// Quiz Metadata (for start screen)
// ============================================

export interface QuizInfo {
  id: number;
  title: string;
  description?: string;
  questionCount: number;
  timeLimitMinutes: number;
  passingScore: number;
  maxAttempts?: number;
}

// ============================================
// Internal State Types
// ============================================

export type QuizPhase = 'start' | 'taking' | 'results';

export interface QuizResults {
  attemptId: number;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  coinsAwarded: number;
  answerResults: QuizAnswerResult[];
}
