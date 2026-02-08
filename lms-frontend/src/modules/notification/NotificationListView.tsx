import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from './NotificationProvider';
import { Skeleton } from '@/shared/components';
import type { Notification, NotificationType } from './types';

function getNotificationIcon(type: NotificationType): string {
  switch (type) {
    case 'achievement':
      return '🏆';
    case 'coins_earned':
      return '🪙';
    case 'course_reminder':
      return '📚';
    case 'new_course':
      return '🆕';
    case 'certificate':
      return '📜';
    case 'badge_earned':
      return '🎖️';
    case 'streak':
      return '🔥';
    case 'quiz_reminder':
      return '📝';
    case 'system':
      return '⚙️';
    default:
      return '🔔';
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

type FilterType = 'all' | 'unread' | NotificationType;

const filterOptions: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'achievement', label: 'Achievements' },
  { value: 'course_reminder', label: 'Course Reminders' },
  { value: 'new_course', label: 'New Courses' },
  { value: 'certificate', label: 'Certificates' },
  { value: 'quiz_reminder', label: 'Quiz Reminders' },
];

function NotificationCard({
  notification,
  onRead,
}: {
  notification: Notification;
  onRead: (id: number) => void;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!notification.is_read) {
      onRead(notification.id);
    }
    if (notification.action_url) {
      navigate(notification.action_url);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`card p-4 cursor-pointer hover:shadow-md transition-all ${
        !notification.is_read ? 'border-l-4 border-l-primary-red bg-red-50' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-semibold ${!notification.is_read ? 'text-gray-900' : 'text-gray-700'}`}>
              {notification.title}
            </h3>
            {!notification.is_read && (
              <span className="w-2 h-2 rounded-full bg-primary-red flex-shrink-0 mt-2" />
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-400">{formatDate(notification.created_at)}</span>
            {notification.action_label && (
              <span className="text-sm text-primary-red font-medium">
                {notification.action_label} →
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NotificationListView() {
  const [filter, setFilter] = useState<FilterType>('all');
  const {
    notifications,
    notificationsLoading,
    notificationsError,
    unreadCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    isMarkingRead,
  } = useNotifications();

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.is_read;
    return notification.type === filter;
  });

  if (notificationsError) {
    return (
      <div className="card text-center py-12">
        <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-semibold mb-2">Failed to load notifications</h3>
        <p className="text-neutral-dark">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-neutral-dark">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            disabled={isMarkingRead}
            className="btn-secondary text-sm"
          >
            {isMarkingRead ? 'Marking...' : 'Mark all as read'}
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === option.value
                ? 'bg-primary-red text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
            {option.value === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {notificationsLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="card p-4">
              <div className="flex items-start gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-48 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="card text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="text-lg font-semibold mb-2">No notifications</h3>
          <p className="text-neutral-dark">
            {filter === 'unread' ? 'You\'ve read all your notifications!' : 'No notifications in this category.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onRead={markNotificationAsRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}
