import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { USE_MOCK } from '@/lib/mockData';
import type { ApiResponse } from '@/types/api';
import { Alert, FormField } from '@/shared/components';

export default function RegisterView() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    department: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirm_password) {
      setError('Passwords do not match.');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (USE_MOCK) {
        navigate('/login', { state: { registered: true } });
        return;
      }

      await api.post<ApiResponse<unknown>>('/public/auth/register', {
        email: form.email,
        password: form.password,
        first_name: form.first_name,
        last_name: form.last_name,
        department: form.department || undefined,
      });

      navigate('/login', { state: { registered: true } });
    } catch {
      setError('Registration failed. The email may already be in use.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-light py-8">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary-red mb-2">LMS Platform</h1>
          <p className="text-neutral-dark">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="first_name"
              label="First Name"
              value={form.first_name}
              onChange={(v) => updateField('first_name', v)}
              placeholder="First name"
              required
              disabled={isSubmitting}
            />
            <FormField
              id="last_name"
              label="Last Name"
              value={form.last_name}
              onChange={(v) => updateField('last_name', v)}
              placeholder="Last name"
              required
              disabled={isSubmitting}
            />
          </div>

          <FormField
            id="email"
            label="Email Address"
            type="email"
            value={form.email}
            onChange={(v) => updateField('email', v)}
            placeholder="Enter your email"
            required
            disabled={isSubmitting}
          />

          <FormField
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={(v) => updateField('password', v)}
            placeholder="At least 8 characters"
            required
            disabled={isSubmitting}
          />

          <FormField
            id="confirm_password"
            label="Confirm Password"
            type="password"
            value={form.confirm_password}
            onChange={(v) => updateField('confirm_password', v)}
            placeholder="Confirm your password"
            required
            disabled={isSubmitting}
          />

          <FormField
            id="department"
            label="Department"
            value={form.department}
            onChange={(v) => updateField('department', v)}
            placeholder="e.g. Engineering"
            disabled={isSubmitting}
            hint="(optional)"
          />

          {error && <Alert variant="error">{error}</Alert>}

          <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-neutral-medium text-center">
          <p className="text-sm text-neutral-dark">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-red hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
