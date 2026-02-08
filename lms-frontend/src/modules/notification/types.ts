export type NotificationType =
  | 'course_reminder'
  | 'new_course'
  | 'achievement'
  | 'quiz_reminder'
  | 'certificate'
  | 'badge_earned'
  | 'coins_earned'
  | 'streak'
  | 'system';

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  action_url?: string;
  action_label?: string;
  created_at: string;
  metadata?: Record<string, unknown>;
}

export interface NotificationSettings {
  course_reminders: boolean;
  new_courses: boolean;
  achievements: boolean;
  quiz_reminders: boolean;
  certificates: boolean;
  email_notifications: boolean;
  email_frequency: 'instant' | 'daily' | 'weekly';
  quiet_hours_enabled: boolean;
  quiet_hours_start: string;
  quiet_hours_end: string;
  do_not_disturb: boolean;
}
