import { useState } from 'react';
import { useQuiz } from './QuizProvider';
import { Alert } from '@/shared/components';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function QuizTakingView() {
  const {
    questions,
    currentQuestionIndex,
    answers,
    timeRemaining,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitQuizAttempt,
    isSubmitting,
    submitError,
  } = useQuiz();

  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswerId = currentQuestion ? answers.get(currentQuestion.id) : undefined;
  const answeredCount = answers.size;
  const unansweredCount = questions.length - answeredCount;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLowTime = timeRemaining <= 300; // 5 minutes

  const handleSubmit = () => {
    if (unansweredCount > 0) {
      setShowConfirmSubmit(true);
    } else {
      submitQuizAttempt();
    }
  };

  if (!currentQuestion) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-neutral-dark">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Top Bar: Timer, Progress, Submit */}
      <div className="bg-white shadow-sm rounded-lg p-4 mb-6 flex items-center justify-between">
        {/* Timer */}
        <div className={`flex items-center gap-2 ${isLowTime ? 'text-status-error' : 'text-neutral-dark'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className={`font-mono text-lg font-bold ${isLowTime ? 'animate-pulse' : ''}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>

        {/* Question Counter */}
        <span className="text-neutral-dark">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="btn-primary px-4 py-2"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
        </button>
      </div>

      {submitError && (
        <div className="mb-4">
          <Alert variant="error">{submitError}</Alert>
        </div>
      )}

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-2">Submit Quiz?</h3>
            <p className="text-neutral-dark mb-4">
              You have {unansweredCount} unanswered question{unansweredCount !== 1 ? 's' : ''}.
              Are you sure you want to submit?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="btn-secondary flex-1"
              >
                Go Back
              </button>
              <button
                onClick={() => {
                  setShowConfirmSubmit(false);
                  submitQuizAttempt();
                }}
                disabled={isSubmitting}
                className="btn-primary flex-1"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Anyway'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question Card */}
      <div className="card mb-6">
        {/* Question Type Badge */}
        <div className="mb-4">
          <span className="badge bg-gray-100 text-gray-700">
            {currentQuestion.type === 'true_false' ? 'True/False' : 'Multiple Choice'}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-xl font-medium mb-6">{currentQuestion.question}</h2>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswerId === option.id;
            return (
              <button
                key={option.id}
                onClick={() => selectAnswer(currentQuestion.id, option.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                  isSelected
                    ? 'border-primary-red bg-red-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-primary-red' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-3 h-3 rounded-full bg-primary-red" />
                    )}
                  </div>
                  <span className={isSelected ? 'font-medium' : ''}>{option.option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousQuestion}
          disabled={isFirstQuestion}
          className={`btn-secondary px-4 py-2 ${isFirstQuestion ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>

        <button
          onClick={nextQuestion}
          disabled={isLastQuestion}
          className={`btn-primary px-4 py-2 ${isLastQuestion ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>

      {/* Question Dots Navigation */}
      <div className="card">
        <p className="text-sm text-neutral-dark mb-3">
          Jump to question ({answeredCount}/{questions.length} answered)
        </p>
        <div className="flex flex-wrap gap-2">
          {questions.map((q, index) => {
            const isAnswered = answers.has(q.id);
            const isCurrent = index === currentQuestionIndex;
            return (
              <button
                key={q.id}
                onClick={() => goToQuestion(index)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  isCurrent
                    ? 'bg-primary-red text-white'
                    : isAnswered
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
