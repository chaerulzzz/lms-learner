import { useProfile } from './ProfileProvider';
import UserStatsSection from './UserStatsSection';
import { Alert, FormField } from '@/shared/components';

export default function ProfileView() {
  const {
    profileForm,
    setProfileField,
    handleProfileSubmit,
    isProfileSaving,
    profileError,
    profileSuccess,
    passwordForm,
    setPasswordField,
    handlePasswordSubmit,
    isPasswordSaving,
    passwordError,
    passwordSuccess,
    email,
  } = useProfile();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-neutral-darker">Profile Settings</h1>

      {/* User Statistics Section */}
      <UserStatsSection />

      {/* Profile Info Section */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <FormField
              id="email"
              label="Email Address"
              type="email"
              value={email}
              disabled
              hint="(cannot be changed)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="first_name"
              label="First Name"
              value={profileForm.first_name}
              onChange={(v) => setProfileField('first_name', v)}
              required
              disabled={isProfileSaving}
            />
            <FormField
              id="last_name"
              label="Last Name"
              value={profileForm.last_name}
              onChange={(v) => setProfileField('last_name', v)}
              required
              disabled={isProfileSaving}
            />
          </div>

          <FormField
            id="department"
            label="Department"
            value={profileForm.department}
            onChange={(v) => setProfileField('department', v)}
            placeholder="e.g. Engineering"
            disabled={isProfileSaving}
            hint="(optional)"
          />

          {profileError && (
            <Alert variant="error">Failed to update profile. Please try again.</Alert>
          )}

          {profileSuccess && (
            <Alert variant="success">Profile updated successfully.</Alert>
          )}

          <button type="submit" className="btn-primary" disabled={isProfileSaving}>
            {isProfileSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <FormField
            id="current_password"
            label="Current Password"
            type="password"
            value={passwordForm.current_password}
            onChange={(v) => setPasswordField('current_password', v)}
            required
            disabled={isPasswordSaving}
          />

          <FormField
            id="new_password"
            label="New Password"
            type="password"
            value={passwordForm.new_password}
            onChange={(v) => setPasswordField('new_password', v)}
            placeholder="At least 8 characters"
            required
            disabled={isPasswordSaving}
          />

          <FormField
            id="confirm_password"
            label="Confirm New Password"
            type="password"
            value={passwordForm.confirm_password}
            onChange={(v) => setPasswordField('confirm_password', v)}
            placeholder="Confirm new password"
            required
            disabled={isPasswordSaving}
          />

          {passwordError && <Alert variant="error">{passwordError}</Alert>}

          {passwordSuccess && (
            <Alert variant="success">Password changed successfully.</Alert>
          )}

          <button type="submit" className="btn-primary" disabled={isPasswordSaving}>
            {isPasswordSaving ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
