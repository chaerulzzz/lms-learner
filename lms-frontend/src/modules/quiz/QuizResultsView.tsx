import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from './QuizProvider';

export default function QuizResultsView() {
  const navigate = useNavigate();
  const { results, restartQuiz, questions } = useQuiz();
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  if (!results) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-neutral-dark">Loading results...</p>
      </div>
    );
  }

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedQuestions(new Set(results.answerResults.map((r) => r.question_id)));
  };

  const collapseAll = () => {
    setExpandedQuestions(new Set());
  };

  const correctCount = results.answerResults.filter((r) => r.is_correct).length;
  const incorrectCount = results.answerResults.length - correctCount;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Results Header */}
      <div className="card mb-6 text-center">
        {/* Pass/Fail Badge */}
        <div className="mb-4">
          {results.passed ? (
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-lg font-bold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quiz Passed!
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-lg font-bold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quiz Failed
            </span>
          )}
        </div>

        {/* Score Circle */}
        <div className="mb-6">
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-8 ${
            results.passed ? 'border-green-500' : 'border-red-500'
          }`}>
            <div className="text-center">
              <div className={`text-3xl font-bold ${results.passed ? 'text-green-600' : 'text-red-600'}`}>
                {results.percentage}%
              </div>
              <div className="text-sm text-neutral-dark">
                {results.score}/{results.totalMarks}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{correctCount}</div>
            <div className="text-sm text-neutral-dark">Correct</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{incorrectCount}</div>
            <div className="text-sm text-neutral-dark">Incorrect</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neutral-dark">{questions.length}</div>
            <div className="text-sm text-neutral-dark">Total</div>
          </div>
        </div>

        {/* Coins Awarded */}
        {results.coinsAwarded > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-lg">
            <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span className="text-yellow-800 font-medium">
              +{results.coinsAwarded} coins earned!
            </span>
          </div>
        )}
      </div>

      {/* Answer Review Section */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Answer Review</h3>
          <div className="flex gap-2">
            <button
              onClick={expandAll}
              className="text-sm text-primary-red hover:underline"
            >
              Expand All
            </button>
            <span className="text-neutral-dark">|</span>
            <button
              onClick={collapseAll}
              className="text-sm text-primary-red hover:underline"
            >
              Collapse All
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {results.answerResults.map((result, index) => {
            const isExpanded = expandedQuestions.has(result.question_id);
            return (
              <div
                key={result.question_id}
                className={`border rounded-lg overflow-hidden ${
                  result.is_correct ? 'border-green-200' : 'border-red-200'
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleQuestion(result.question_id)}
                  className={`w-full flex items-center justify-between p-4 text-left ${
                    result.is_correct ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {result.is_correct ? (
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className="font-medium">
                      Question {index + 1}: {result.question.length > 60 ? result.question.slice(0, 60) + '...' : result.question}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-neutral-dark transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="p-4 bg-white border-t">
                    <p className="mb-4 text-neutral-dark">{result.question}</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-medium text-neutral-dark w-24">Your answer:</span>
                        <span className={result.is_correct ? 'text-green-700' : 'text-red-700'}>
                          {result.user_answer || '(No answer)'}
                        </span>
                      </div>
                      {!result.is_correct && (
                        <div className="flex items-start gap-2">
                          <span className="text-sm font-medium text-neutral-dark w-24">Correct answer:</span>
                          <span className="text-green-700">{result.correct_answer}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={restartQuiz}
          className="btn-primary flex-1 py-3"
        >
          Retake Quiz
        </button>
        <button
          onClick={() => navigate(-1)}
          className="btn-secondary flex-1 py-3"
        >
          Back to Course
        </button>
      </div>
    </div>
  );
}
