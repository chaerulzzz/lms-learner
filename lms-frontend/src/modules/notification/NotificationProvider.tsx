import React, { createContext, useContext, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { USE_MOCK } from '@/lib/mockData';
import type { ApiResponse } from '@/types/api';
import type { Notification, NotificationSettings } from './types';

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'achievement',
    title: 'Badge Unlocked!',
    message: 'Congratulations! You earned the Silver badge for reaching 500 GMFC coins.',
    is_read: false,
    action_url: '/achievements',
    action_label: 'View Badges',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    id: 2,
    type: 'coins_earned',
    title: '+50 GMFC Coins',
    message: 'You earned 50 coins for completing "Introduction to React".',
    is_read: false,
    action_url: '/achievements',
    action_label: 'View Balance',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 3,
    type: 'course_reminder',
    title: 'Continue Learning',
    message: 'You haven\'t finished "Advanced TypeScript". Continue where you left off!',
    is_read: false,
    action_url: '/courses/2',
    action_label: 'Continue Course',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: 4,
    type: 'new_course',
    title: 'New Course Available',
    message: 'A new mandatory course "Security Best Practices" has been assigned to you.',
    is_read: true,
    action_url: '/courses/3',
    action_label: 'View Course',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
  {
    id: 5,
    type: 'certificate',
    title: 'Certificate Ready',
    message: 'Your certificate for "React Fundamentals" is ready for download.',
    is_read: true,
    action_url: '/certificates',
    action_label: 'Download',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
  },
  {
    id: 6,
    type: 'streak',
    title: '7-Day Streak!',
    message: 'Amazing! You\'ve maintained a 7-day learning streak. Keep it up!',
    is_read: true,
    action_url: '/achievements',
    action_label: 'View Stats',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
  },
  {
    id: 7,
    type: 'quiz_reminder',
    title: 'Quiz Due Soon',
    message: 'The quiz for "JavaScript Essentials" is due in 2 days.',
    is_read: true,
    action_url: '/quizzes/1',
    action_label: 'Take Quiz',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(), // 6 days ago
  },
  {
    id: 8,
    type: 'badge_earned',
    title: 'New Badge Earned',
    message: 'You earned the "Quick Learner" badge for completing a course in record time!',
    is_read: true,
    action_url: '/achievements',
    action_label: 'View Badge',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
  },
];

const mockSettings: NotificationSettings = {
  course_reminders: true,
  new_courses: true,
  achievements: true,
  quiz_reminders: true,
  certificates: true,
  email_notifications: true,
  email_frequency: 'daily',
  quiet_hours_enabled: false,
  quiet_hours_start: '22:00',
  quiet_hours_end: '08:00',
  do_not_disturb: false,
};

async function fetchNotifications(): Promise<Notification[]> {
  if (USE_MOCK) {
    return mockNotifications;
  }
  const response = await api.get<ApiResponse<Notification[]>>('/notifications');
  return response.data;
}

async function fetchUnreadCount(): Promise<number> {
  if (USE_MOCK) {
    return mockNotifications.filter((n) => !n.is_read).length;
  }
  const response = await api.get<ApiResponse<{ count: number }>>('/notifications/unread-count');
  return response.data.count;
}

async function markAsRead(notificationId: number): Promise<void> {
  if (USE_MOCK) {
    const notification = mockNotifications.find((n) => n.id === notificationId);
    if (notification) notification.is_read = true;
    return;
  }
  await api.post(`/notifications/${notificationId}/read`);
}

async function markAllAsRead(): Promise<void> {
  if (USE_MOCK) {
    mockNotifications.forEach((n) => (n.is_read = true));
    return;
  }
  await api.post('/notifications/read-all');
}

async function fetchNotificationSettings(): Promise<NotificationSettings> {
  if (USE_MOCK) {
    return mockSettings;
  }
  const response = await api.get<ApiResponse<NotificationSettings>>('/notifications/settings');
  return response.data;
}

async function updateNotificationSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
  if (USE_MOCK) {
    Object.assign(mockSettings, settings);
    return mockSettings;
  }
  const response = await api.put<ApiResponse<NotificationSettings>>('/notifications/settings', settings);
  return response.data;
}

interface NotificationContextType {
  notifications: Notification[];
  notificationsLoading: boolean;
  notificationsError: boolean;
  unreadCount: number;
  unreadCountLoading: boolean;
  markNotificationAsRead: (id: number) => void;
  markAllNotificationsAsRead: () => void;
  isMarkingRead: boolean;
  settings: NotificationSettings | null;
  settingsLoading: boolean;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
  isUpdatingSettings: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  // Notifications query
  const {
    data: notifications = [],
    isLoading: notificationsLoading,
    isError: notificationsError,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    refetchInterval: 60000, // Refetch every minute
  });

  // Unread count query
  const {
    data: unreadCount = 0,
    isLoading: unreadCountLoading,
  } = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: fetchUnreadCount,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Settings query
  const {
    data: settings,
    isLoading: settingsLoading,
  } = useQuery({
    queryKey: ['notifications', 'settings'],
    queryFn: fetchNotificationSettings,
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  // Mark all as read mutation
  const markAllAsReadMutation = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: updateNotificationSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'settings'] });
    },
  });

  const markNotificationAsRead = useCallback((id: number) => {
    markAsReadMutation.mutate(id);
  }, [markAsReadMutation]);

  const markAllNotificationsAsRead = useCallback(() => {
    markAllAsReadMutation.mutate();
  }, [markAllAsReadMutation]);

  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    updateSettingsMutation.mutate(newSettings);
  }, [updateSettingsMutation]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notificationsLoading,
        notificationsError,
        unreadCount,
        unreadCountLoading,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        isMarkingRead: markAsReadMutation.isPending || markAllAsReadMutation.isPending,
        settings: settings ?? null,
        settingsLoading,
        updateSettings,
        isUpdatingSettings: updateSettingsMutation.isPending,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
