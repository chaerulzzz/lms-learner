import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryClient';
import { USE_MOCK, mockQuizData } from '@/lib/mockData';
import type { ApiResponse } from '@/types/api';
import type {
  QuizPhase,
  QuizQuestion,
  QuizStartResponse,
  QuizSubmitResponse,
  QuizAttempt,
  QuizResults,
  QuizInfo,
} from './types';

// ============================================
// API Functions
// ============================================

async function startQuizApi(quizId: number): Promise<QuizStartResponse> {
  if (USE_MOCK) {
    return mockQuizData.startQuiz(quizId);
  }
  const response = await api.post<ApiResponse<QuizStartResponse>>('/quiz/start', { quiz_id: quizId });
  return response.data;
}

async function submitQuizApi(
  attemptId: number,
  quizId: number,
  answers: Record<string, string>,
  timeSpent: number
): Promise<QuizSubmitResponse> {
  if (USE_MOCK) {
    return mockQuizData.submitQuiz(attemptId, quizId, answers);
  }
  const response = await api.post<ApiResponse<QuizSubmitResponse>>(`/quiz/submit/${attemptId}`, {
    quiz_id: quizId,
    answers,
    time_spent: timeSpent,
  });
  return response.data;
}

async function fetchQuizAttempts(quizId: string): Promise<QuizAttempt[]> {
  if (USE_MOCK) {
    return mockQuizData.getAttempts(Number(quizId));
  }
  const response = await api.get<ApiResponse<QuizAttempt[]>>(`/quiz/${quizId}/attempts`);
  return response.data || [];
}

// ============================================
// Context Type
// ============================================

interface QuizContextType {
  quizId: string;
  quizInfo: QuizInfo | null;
  phase: QuizPhase;
  attemptId: number | null;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: Map<number, number>;
  timeRemaining: number;
  timeLimitSeconds: number;
  results: QuizResults | null;
  attempts: QuizAttempt[];
  attemptsLoading: boolean;
  startQuizAttempt: () => void;
  selectAnswer: (questionId: number, answerId: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  submitQuizAttempt: () => void;
  restartQuiz: () => void;
  isStarting: boolean;
  isSubmitting: boolean;
  startError: string | null;
  submitError: string | null;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

// ============================================
// Provider Component
// ============================================

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const { quizId } = useParams<{ quizId: string }>();
  const qc = useQueryClient();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const id = quizId || '';

  // State
  const [phase, setPhase] = useState<QuizPhase>('start');
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timeLimitSeconds, setTimeLimitSeconds] = useState(0);
  const [results, setResults] = useState<QuizResults | null>(null);
  const [startError, setStartError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch past attempts
  const { data: attempts = [], isLoading: attemptsLoading } = useQuery<QuizAttempt[]>({
    queryKey: queryKeys.quizAttempts(id),
    queryFn: () => fetchQuizAttempts(id),
    enabled: !!id,
  });

  // Quiz info (from mock data)
  const quizInfo: QuizInfo | null = USE_MOCK ? mockQuizData.getQuizInfo(Number(id)) : null;

  // Timer effect
  useEffect(() => {
    if (phase === 'taking' && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [phase, timeRemaining]);

  // Auto-submit when timer hits 0
  useEffect(() => {
    if (phase === 'taking' && timeRemaining === 0 && attemptId) {
      submitMutation.mutate();
    }
  }, [timeRemaining, phase, attemptId]);

  // Start quiz mutation
  const startMutation = useMutation({
    mutationFn: () => startQuizApi(Number(id)),
    onSuccess: (data) => {
      setAttemptId(data.attempt_id);
      setQuestions(data.questions);
      setTimeLimitSeconds(data.time_limit_seconds);
      setTimeRemaining(data.time_limit_seconds);
      setAnswers(new Map());
      setCurrentQuestionIndex(0);
      setPhase('taking');
      setStartError(null);
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      setStartError(err?.response?.data?.message || 'Failed to start quiz');
    },
  });

  // Submit quiz mutation
  const submitMutation = useMutation({
    mutationFn: () => {
      const answersObj: Record<string, string> = {};
      answers.forEach((answerId, questionId) => {
        answersObj[String(questionId)] = String(answerId);
      });
      const timeSpent = timeLimitSeconds - timeRemaining;
      return submitQuizApi(attemptId!, Number(id), answersObj, timeSpent);
    },
    onSuccess: (data) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setResults({
        attemptId: data.attempt_id,
        score: data.score,
        totalMarks: data.total_marks,
        percentage: data.percentage,
        passed: data.passed,
        coinsAwarded: data.coins_awarded,
        answerResults: data.answers,
      });
      setPhase('results');
      setSubmitError(null);
      // Invalidate attempts query to refresh history
      qc.invalidateQueries({ queryKey: queryKeys.quizAttempts(id) });
      // Invalidate course progress
      qc.invalidateQueries({ queryKey: queryKeys.courses });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      setSubmitError(err?.response?.data?.message || 'Failed to submit quiz');
    },
  });

  // Actions
  const startQuizAttempt = useCallback(() => {
    startMutation.mutate();
  }, [startMutation]);

  const selectAnswer = useCallback((questionId: number, answerId: number) => {
    setAnswers((prev) => {
      const next = new Map(prev);
      next.set(questionId, answerId);
      return next;
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  }, [questions.length]);

  const previousQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToQuestion = useCallback((index: number) => {
    setCurrentQuestionIndex(Math.max(0, Math.min(index, questions.length - 1)));
  }, [questions.length]);

  const submitQuizAttempt = useCallback(() => {
    submitMutation.mutate();
  }, [submitMutation]);

  const restartQuiz = useCallback(() => {
    setPhase('start');
    setAttemptId(null);
    setQuestions([]);
    setAnswers(new Map());
    setCurrentQuestionIndex(0);
    setResults(null);
    setTimeRemaining(0);
    setStartError(null);
    setSubmitError(null);
  }, []);

  return (
    <QuizContext.Provider
      value={{
        quizId: id,
        quizInfo,
        phase,
        attemptId,
        questions,
        currentQuestionIndex,
        answers,
        timeRemaining,
        timeLimitSeconds,
        results,
        attempts,
        attemptsLoading,
        startQuizAttempt,
        selectAnswer,
        nextQuestion,
        previousQuestion,
        goToQuestion,
        submitQuizAttempt,
        restartQuiz,
        isStarting: startMutation.isPending,
        isSubmitting: submitMutation.isPending,
        startError,
        submitError,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
