import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Alert, FormField } from '@/shared/components';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, isAdmin, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: string })?.from;
      if (from) {
        navigate(from);
      } else if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, isAdmin, navigate, location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login({ email, password });
    } catch {
      // Error handled by AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-light">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary-red mb-2">LMS Platform</h1>
          <p className="text-neutral-dark">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
            required
            disabled={isSubmitting}
          />

          <FormField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            required
            disabled={isSubmitting}
          />

          {error && <Alert variant="error">{error}</Alert>}

          <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-neutral-medium text-center space-y-3">
          <p className="text-sm text-neutral-dark">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-red hover:underline font-medium">
              Register
            </Link>
          </p>
          <div>
            <p className="text-xs text-neutral-dark mb-2">
              Local testing (backend offline):
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn-secondary flex-1 text-sm"
                onClick={() => {
                  setEmail('learner1@lms.com');
                  setPassword('learner@123');
                }}
              >
                Learner
              </button>
              <button
                type="button"
                className="btn-secondary flex-1 text-sm"
                onClick={() => {
                  setEmail('admin@lms.com');
                  setPassword('admin123');
                }}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
