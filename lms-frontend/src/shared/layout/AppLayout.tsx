import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/modules/auth';
import { NotificationBell } from '@/modules/notification';
import { Avatar } from '@/shared/components';

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Learning Paths', path: '/learning-paths' },
  { label: 'Catalog', path: '/catalog' },
  { label: 'Certificates', path: '/certificates' },
  { label: 'Achievements', path: '/achievements' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isMockMode } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Mock Mode Banner */}
      {isMockMode && (
        <div className="bg-status-warning text-white text-center py-2 text-sm">
          Local Mock Mode — Using dummy data. Backend is offline.
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-neutral-dark"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <Link to="/dashboard" className="text-2xl font-bold text-primary-red">
              LMS Platform
            </Link>
            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-red text-white'
                        : 'text-neutral-dark hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell />
            <Link to="/profile" className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Avatar name={user?.first_name || 'U'} size="sm" />
              <span className="text-sm text-neutral-dark">
                {user?.first_name || 'User'}
              </span>
            </Link>
            <button onClick={logout} className="btn-secondary text-sm px-3 py-1">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg pt-20 px-4">
            <nav className="flex flex-col gap-1">
              <Link
                to="/profile"
                onClick={() => setSidebarOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/profile'
                    ? 'bg-primary-red text-white'
                    : 'text-neutral-dark hover:bg-gray-100'
                }`}
              >
                Profile
              </Link>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-red text-white'
                        : 'text-neutral-dark hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
