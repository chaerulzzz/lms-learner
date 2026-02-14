import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/modules/auth';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: '📊' },
  { label: 'Users', path: '/admin/users', icon: '👥' },
  { label: 'Audit Logs', path: '/admin/audit-logs', icon: '📋' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isMockMode } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex bg-neutral-light">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-admin-sidebar">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-700">
            <h1 className="text-xl font-bold text-white">LMS Admin</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Info */}
          <div className="px-4 py-4 border-t border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-red flex items-center justify-center text-white font-semibold">
                {user?.first_name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.full_name || 'Admin'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.email || 'admin@lms.com'}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-3 w-full text-sm text-gray-400 hover:text-white text-left flex items-center gap-2"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-admin-sidebar">
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
              <h1 className="text-xl font-bold text-white">LMS Admin</h1>
              <button onClick={() => setSidebarOpen(false)} className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="px-4 py-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6 sticky top-0 z-30">
          {/* Mobile menu button */}
          <button
            className="lg:hidden mr-4 text-neutral-dark"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mock Mode Banner */}
          {isMockMode && (
            <div className="bg-status-warning text-white text-xs px-3 py-1 rounded-full mr-4">
              Mock Mode
            </div>
          )}

          <div className="flex-1" />

          {/* User info - mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-red flex items-center justify-center text-white text-sm font-semibold">
              {user?.first_name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
