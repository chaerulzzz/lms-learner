import { useState, useEffect } from 'react';
import { useCourse } from './CourseProvider';
import { Skeleton, Alert } from '@/shared/components';

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClasses[size]} ${
            star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function InteractiveStarRating({
  rating,
  onChange,
  disabled = false,
}: {
  rating: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
}) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className={`transition-transform ${disabled ? 'cursor-not-allowed' : 'hover:scale-110'}`}
        >
          <svg
            className={`w-8 h-8 ${
              star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function RatingDistribution({
  distribution,
  totalReviews,
}: {
  distribution: { 5: number; 4: number; 3: number; 2: number; 1: number };
  totalReviews: number;
}) {
  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((rating) => {
        const count = distribution[rating as keyof typeof distribution];
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

        return (
          <div key={rating} className="flex items-center gap-2">
            <span className="text-sm text-neutral-dark w-8">{rating} ★</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-sm text-neutral-dark w-8 text-right">{count}</span>
          </div>
        );
      })}
    </div>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function CourseReviewSection() {
  const {
    course,
    reviews,
    reviewStats,
    reviewsLoading,
    submitReview,
    isSubmittingReview,
    submitReviewSuccess,
    submitReviewError,
    resetReviewState,
  } = useCourse();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Check if user can review (must be enrolled and have made progress)
  const canReview = course?.status === 'in_progress' || course?.status === 'completed';

  // Reset form on success
  useEffect(() => {
    if (submitReviewSuccess) {
      setRating(0);
      setComment('');
      setShowReviewForm(false);
      // Reset the success state after a delay
      const timer = setTimeout(() => {
        resetReviewState();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitReviewSuccess, resetReviewState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    submitReview({ rating, comment });
  };

  if (reviewsLoading) {
    return (
      <div className="card">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32" />
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6">Reviews & Ratings</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rating Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-gray-900">
              {reviewStats?.average_rating.toFixed(1) || '0.0'}
            </div>
            <StarRating rating={reviewStats?.average_rating || 0} size="lg" />
            <p className="text-sm text-neutral-dark mt-1">
              {reviewStats?.total_reviews || 0} reviews
            </p>
          </div>
          <RatingDistribution
            distribution={reviewStats?.rating_distribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }}
            totalReviews={reviewStats?.total_reviews || 0}
          />
        </div>

        {/* Reviews List & Form */}
        <div className="md:col-span-2">
          {/* Write Review Button / Form */}
          {canReview && !showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="btn-primary mb-4 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Write a Review
            </button>
          )}

          {submitReviewSuccess && (
            <div className="mb-4">
              <Alert variant="success">
                Your review has been submitted successfully!
              </Alert>
            </div>
          )}

          {submitReviewError && (
            <div className="mb-4">
              <Alert variant="error">
                Failed to submit review. Please try again.
              </Alert>
            </div>
          )}

          {/* Review Form */}
          {showReviewForm && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-3">Write Your Review</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Rating</label>
                  <InteractiveStarRating
                    rating={rating}
                    onChange={setRating}
                    disabled={isSubmittingReview}
                  />
                  {rating === 0 && (
                    <p className="text-xs text-red-500 mt-1">Please select a rating</p>
                  )}
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium mb-2">
                    Your Review (Optional)
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="input-field w-full"
                    placeholder="Share your experience with this course..."
                    disabled={isSubmittingReview}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmittingReview || rating === 0}
                  >
                    {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowReviewForm(false);
                      setRating(0);
                      setComment('');
                    }}
                    className="btn-secondary"
                    disabled={isSubmittingReview}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-neutral-dark">No reviews yet</p>
              {canReview && (
                <p className="text-sm text-neutral-dark mt-1">
                  Be the first to review this course!
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-red text-white flex items-center justify-center font-semibold flex-shrink-0">
                      {review.user_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{review.user_name}</span>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <p className="text-xs text-neutral-dark mt-0.5">
                        {formatDate(review.created_at)}
                      </p>
                      {review.comment && (
                        <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
