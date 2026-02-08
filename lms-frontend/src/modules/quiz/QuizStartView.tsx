import { Link } from 'react-router-dom';
import { useQuiz } from './QuizProvider';
import { Alert, Skeleton } from '@/shared/components';
import { formatDate } from '@/lib/utils';

export default function QuizStartView() {
  const {
    quizId,
    quizInfo,
    attempts,
    attemptsLoading,
    startQuizAttempt,
    isStarting,
    startError,
  } = useQuiz();

  const maxAttemptsReached = quizInfo?.maxAttempts
    ? attempts.length >= quizInfo.maxAttempts
    : false;

  const bestAttempt = attempts.length > 0
    ? attempts.reduce((best, current) =>
        current.percentage > best.percentage ? current : best
      )
    : null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {quizInfo?.title || `Quiz #${quizId}`}
        </h1>
        {quizInfo?.description && (
          <p className="text-neutral-dark mb-6">{quizInfo.description}</p>
        )}

        {/* Quiz Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary-red">
              {quizInfo?.questionCount || '?'}
            </p>
            <p className="text-sm text-neutral-dark">Questions</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary-red">
              {quizInfo?.timeLimitMinutes || '?'}
            </p>
            <p className="text-sm text-neutral-dark">Minutes</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary-red">
              {quizInfo?.passingScore || 70}%
            </p>
            <p className="text-sm text-neutral-dark">To Pass</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary-red">
              {quizInfo?.maxAttempts || '∞'}
            </p>
            <p className="text-sm text-neutral-dark">Max Attempts</p>
          </div>
        </div>

        {startError && (
          <Alert variant="error">{startError}</Alert>
        )}

        {maxAttemptsReached ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 font-medium">
              You've reached the maximum number of attempts for this quiz.
            </p>
          </div>
        ) : (
          <button
            onClick={startQuizAttempt}
            disabled={isStarting}
            className="btn-primary w-full py-3 text-lg"
          >
            {isStarting ? 'Starting...' : 'Start Quiz'}
          </button>
        )}
      </div>

      {/* Past Attempts */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Your Attempts</h2>

        {attemptsLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : attempts.length === 0 ? (
          <p className="text-neutral-dark text-center py-6">
            No attempts yet. Start the quiz to begin!
          </p>
        ) : (
          <>
            {bestAttempt && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-green-700">
                  Best Score: <span className="font-bold">{bestAttempt.percentage}%</span>
                  {bestAttempt.passed && ' (Passed)'}
                </p>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 font-medium text-neutral-dark">#</th>
                    <th className="text-left py-2 px-2 font-medium text-neutral-dark">Score</th>
                    <th className="text-left py-2 px-2 font-medium text-neutral-dark">Result</th>
                    <th className="text-left py-2 px-2 font-medium text-neutral-dark">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((attempt) => (
                    <tr key={attempt.attempt_id} className="border-b border-gray-100">
                      <td className="py-3 px-2">{attempt.attempt_number}</td>
                      <td className="py-3 px-2 font-medium">{attempt.percentage}%</td>
                      <td className="py-3 px-2">
                        {attempt.passed ? (
                          <span className="badge bg-green-100 text-green-800">Passed</span>
                        ) : (
                          <span className="badge bg-red-100 text-red-800">Failed</span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-neutral-dark">
                        {formatDate(attempt.submitted_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 text-center">
        <Link to="/learning-paths" className="text-primary-red hover:underline">
          Back to Learning Paths
        </Link>
      </div>
    </div>
  );
}
