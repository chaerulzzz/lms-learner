import { useNotifications } from './NotificationProvider';
import { Skeleton, Alert } from '@/shared/components';

function ToggleSwitch({
  enabled,
  onChange,
  disabled = false,
}: {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-primary-red' : 'bg-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

function SettingRow({
  icon,
  title,
  description,
  enabled,
  onChange,
  disabled = false,
}: {
  icon: string;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-start gap-3">
        <span className="text-xl">{icon}</span>
        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <ToggleSwitch enabled={enabled} onChange={onChange} disabled={disabled} />
    </div>
  );
}

export default function NotificationSettingsView() {
  const { settings, settingsLoading, updateSettings, isUpdatingSettings } = useNotifications();

  if (settingsLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="card">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <Skeleton className="w-11 h-6 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <Alert variant="error">
        Failed to load notification settings. Please try again later.
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Notification Settings</h1>
        <p className="text-sm text-neutral-dark">Customize how and when you receive notifications</p>
      </div>

      {/* Notification Types */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Notification Types</h2>
        <p className="text-sm text-neutral-dark mb-4">Choose which notifications you want to receive</p>

        <div className="divide-y divide-gray-100">
          <SettingRow
            icon="📚"
            title="Course Reminders"
            description="Reminders about incomplete courses and approaching deadlines"
            enabled={settings.course_reminders}
            onChange={(v) => updateSettings({ course_reminders: v })}
            disabled={isUpdatingSettings}
          />
          <SettingRow
            icon="🆕"
            title="New Courses"
            description="Notifications when new courses are assigned to you"
            enabled={settings.new_courses}
            onChange={(v) => updateSettings({ new_courses: v })}
            disabled={isUpdatingSettings}
          />
          <SettingRow
            icon="🏆"
            title="Achievements"
            description="Celebrations for badges, streaks, and milestones"
            enabled={settings.achievements}
            onChange={(v) => updateSettings({ achievements: v })}
            disabled={isUpdatingSettings}
          />
          <SettingRow
            icon="📝"
            title="Quiz Reminders"
            description="Reminders for pending quizzes and assessment deadlines"
            enabled={settings.quiz_reminders}
            onChange={(v) => updateSettings({ quiz_reminders: v })}
            disabled={isUpdatingSettings}
          />
          <SettingRow
            icon="📜"
            title="Certificates"
            description="Notifications when your certificates are ready"
            enabled={settings.certificates}
            onChange={(v) => updateSettings({ certificates: v })}
            disabled={isUpdatingSettings}
          />
        </div>
      </div>

      {/* Email Notifications */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Email Notifications</h2>
        <p className="text-sm text-neutral-dark mb-4">Manage your email notification preferences</p>

        <div className="divide-y divide-gray-100">
          <SettingRow
            icon="📧"
            title="Email Notifications"
            description="Receive notifications via email"
            enabled={settings.email_notifications}
            onChange={(v) => updateSettings({ email_notifications: v })}
            disabled={isUpdatingSettings}
          />

          {settings.email_notifications && (
            <div className="py-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">⏰</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Email Frequency</p>
                  <p className="text-sm text-gray-500 mb-3">How often should we send email digests?</p>
                  <div className="flex flex-wrap gap-2">
                    {(['instant', 'daily', 'weekly'] as const).map((freq) => (
                      <button
                        key={freq}
                        onClick={() => updateSettings({ email_frequency: freq })}
                        disabled={isUpdatingSettings}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          settings.email_frequency === freq
                            ? 'bg-primary-red text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {freq.charAt(0).toUpperCase() + freq.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Focus Mode</h2>
        <p className="text-sm text-neutral-dark mb-4">Control when notifications can disturb you</p>

        <div className="divide-y divide-gray-100">
          <SettingRow
            icon="🌙"
            title="Quiet Hours"
            description="Pause non-critical notifications during specific hours"
            enabled={settings.quiet_hours_enabled}
            onChange={(v) => updateSettings({ quiet_hours_enabled: v })}
            disabled={isUpdatingSettings}
          />

          {settings.quiet_hours_enabled && (
            <div className="py-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">🕐</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-3">Set Quiet Hours</p>
                  <div className="flex items-center gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">From</label>
                      <input
                        type="time"
                        value={settings.quiet_hours_start}
                        onChange={(e) => updateSettings({ quiet_hours_start: e.target.value })}
                        disabled={isUpdatingSettings}
                        className="input-field"
                      />
                    </div>
                    <span className="text-gray-400 mt-5">to</span>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Until</label>
                      <input
                        type="time"
                        value={settings.quiet_hours_end}
                        onChange={(e) => updateSettings({ quiet_hours_end: e.target.value })}
                        disabled={isUpdatingSettings}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <SettingRow
            icon="🔕"
            title="Do Not Disturb"
            description="Temporarily pause all notifications"
            enabled={settings.do_not_disturb}
            onChange={(v) => updateSettings({ do_not_disturb: v })}
            disabled={isUpdatingSettings}
          />
        </div>
      </div>
    </div>
  );
}
