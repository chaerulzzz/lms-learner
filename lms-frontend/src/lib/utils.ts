import { type ClassValue, clsx } from 'clsx';

/**
 * Merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Debounce function to limit execution rate
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string, format: 'short' | 'long' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (format === 'short') {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get progress color based on percentage
 */
export function getProgressColor(percentage: number): string {
  if (percentage === 0) return 'bg-gray-300';
  if (percentage <= 30) return 'bg-progress-low'; // Red
  if (percentage <= 70) return 'bg-progress-medium'; // Orange
  if (percentage < 100) return 'bg-progress-high'; // Yellow
  return 'bg-progress-complete'; // Green
}

/**
 * Get progress text color based on percentage
 */
export function getProgressTextColor(percentage: number): string {
  if (percentage === 0) return 'text-gray-600';
  if (percentage <= 30) return 'text-progress-low';
  if (percentage <= 70) return 'text-progress-medium';
  if (percentage < 100) return 'text-progress-high';
  return 'text-progress-complete';
}

/**
 * Format duration in minutes to readable string
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  }

  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
}

/**
 * Calculate percentage
 */
export function calculatePercentage(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
