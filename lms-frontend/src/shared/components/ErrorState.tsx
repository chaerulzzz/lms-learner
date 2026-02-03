import { Link } from 'react-router-dom';

interface ErrorStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onRetry?: () => void;
  actionHref?: string;
}

export function ErrorState({
  title,
  message = 'Something went wrong. Please try again.',
  actionLabel = 'Retry',
  onRetry,
  actionHref,
}: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="card max-w-md w-full text-center">
        <h2 className="text-xl font-bold text-status-error mb-2">{title}</h2>
        <p className="text-neutral-dark mb-4">{message}</p>
        {actionHref ? (
          <Link to={actionHref} className="btn-primary inline-block">
            {actionLabel}
          </Link>
        ) : (
          <button
            className="btn-primary"
            onClick={onRetry || (() => window.location.reload())}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
