import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-light">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary-red mb-2">LMS Platform</h1>
          <p className="text-neutral-dark">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-neutral-dark mt-4">
          Don't have an account? Contact your administrator.
        </p>
      </div>
    </div>
  );
}
