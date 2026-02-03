import { getProgressColor, getProgressTextColor } from '@/lib/utils';

interface ProgressBarProps {
  percentage: number;
  showText?: boolean;
  textSuffix?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function ProgressBar({
  percentage,
  showText = false,
  textSuffix,
  className = '',
}: ProgressBarProps) {
  return (
    <div className={className}>
      <div className="progress-bar">
        <div
          className={`progress-fill ${getProgressColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <p className={`text-sm mt-1 ${getProgressTextColor(percentage)}`}>
          {percentage}% Complete{textSuffix ? ` — ${textSuffix}` : ''}
        </p>
      )}
    </div>
  );
}
