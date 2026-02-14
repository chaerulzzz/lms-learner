import { useAuth } from '@/modules/auth';

export default function AdminDashboardView() {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Users', value: '1,234', icon: '👥', change: '+12%', changeType: 'positive' },
    { label: 'Active Courses', value: '45', icon: '📚', change: '+5', changeType: 'positive' },
    { label: 'Completions Today', value: '89', icon: '✅', change: '+23%', changeType: 'positive' },
    { label: 'Avg. Quiz Score', value: '85%', icon: '📊', change: '-2%', changeType: 'negative' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-dark">
          Welcome back, {user?.first_name || 'Admin'}!
        </h1>
        <p className="text-gray-500">Here's what's happening with your LMS today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-center justify-between">
              <span className="text-3xl">{stat.icon}</span>
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-neutral-dark">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-lg font-semibold text-neutral-dark mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { user: 'John Doe', action: 'completed', item: 'Go Programming Basics', time: '5 min ago' },
              { user: 'Jane Smith', action: 'started', item: 'React Fundamentals', time: '15 min ago' },
              { user: 'Bob Wilson', action: 'passed quiz', item: 'TypeScript Mastery', time: '1 hour ago' },
              { user: 'Alice Johnson', action: 'enrolled in', item: 'Node.js Advanced', time: '2 hours ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className="w-8 h-8 rounded-full bg-primary-red/10 flex items-center justify-center text-primary-red text-sm font-semibold">
                  {activity.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-dark">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-gray-500">{activity.action}</span>{' '}
                    <span className="font-medium">{activity.item}</span>
                  </p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="card">
          <h2 className="text-lg font-semibold text-neutral-dark mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="btn-secondary text-sm">
              <span className="mr-2">📤</span> Export Report
            </button>
            <button className="btn-secondary text-sm">
              <span className="mr-2">📧</span> Send Reminder
            </button>
            <button className="btn-secondary text-sm">
              <span className="mr-2">➕</span> Add Course
            </button>
            <button className="btn-secondary text-sm">
              <span className="mr-2">👤</span> Add User
            </button>
          </div>

          <h3 className="text-md font-semibold text-neutral-dark mt-6 mb-3">Top Performers</h3>
          <div className="space-y-2">
            {[
              { rank: 1, name: 'Alice Johnson', coins: 850 },
              { rank: 2, name: 'John Doe', coins: 450 },
              { rank: 3, name: 'Jane Smith', coins: 320 },
            ].map((performer) => (
              <div key={performer.rank} className="flex items-center gap-3 py-2">
                <span className="text-lg">{performer.rank === 1 ? '🥇' : performer.rank === 2 ? '🥈' : '🥉'}</span>
                <span className="flex-1 text-sm text-neutral-dark">{performer.name}</span>
                <span className="text-sm font-medium text-primary-red">{performer.coins} coins</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
