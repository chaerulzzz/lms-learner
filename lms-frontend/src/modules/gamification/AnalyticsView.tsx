import { useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useGamification } from './GamificationProvider';
import { Skeleton } from '@/shared/components';

// Mock data for charts - in real app, this would come from API
const mockProgressData = [
  { week: 'Week 1', courses: 1, hours: 5, quizScore: 75 },
  { week: 'Week 2', courses: 1, hours: 8, quizScore: 80 },
  { week: 'Week 3', courses: 2, hours: 12, quizScore: 78 },
  { week: 'Week 4', courses: 2, hours: 10, quizScore: 85 },
  { week: 'Week 5', courses: 3, hours: 15, quizScore: 88 },
  { week: 'Week 6', courses: 3, hours: 11, quizScore: 92 },
];

const mockQuizScores = [
  { name: 'React Fundamentals', score: 92 },
  { name: 'TypeScript Basics', score: 88 },
  { name: 'CSS Mastery', score: 95 },
  { name: 'JavaScript ES6+', score: 78 },
  { name: 'Node.js Intro', score: 85 },
];

const mockCourseDistribution = [
  { name: 'Completed', value: 3, color: '#22c55e' },
  { name: 'In Progress', value: 5, color: '#f59e0b' },
  { name: 'Not Started', value: 2, color: '#ef4444' },
];

const mockCoinsBySource = [
  { source: 'Course Completion', coins: 250 },
  { source: 'Quiz Bonuses', coins: 120 },
  { source: 'Streak Rewards', coins: 80 },
  { source: 'Achievements', coins: 50 },
];

const COLORS = ['#DC143C', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6'];

function StatCard({
  icon,
  label,
  value,
  change,
  changeLabel,
}: {
  icon: string;
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
}) {
  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-sm text-neutral-dark">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          {change !== undefined && (
            <p className={`text-xs ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% {changeLabel}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsView() {
  const { userStats, userStatsLoading } = useGamification();

  const totalHours = useMemo(() => {
    return mockProgressData.reduce((sum, week) => sum + week.hours, 0);
  }, []);

  const avgQuizScore = useMemo(() => {
    const scores = mockQuizScores.map((q) => q.score);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, []);

  if (userStatsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon="📚"
          label="Courses Completed"
          value={userStats?.total_courses_completed || 3}
          change={25}
          changeLabel="this month"
        />
        <StatCard
          icon="⏱️"
          label="Learning Hours"
          value={`${totalHours}h`}
          change={15}
          changeLabel="vs last month"
        />
        <StatCard
          icon="📊"
          label="Avg Quiz Score"
          value={`${avgQuizScore}%`}
          change={8}
          changeLabel="improvement"
        />
        <StatCard
          icon="🔥"
          label="Current Streak"
          value={`${userStats?.current_streak || 7} days`}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Learning Progress Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="hours"
                name="Hours"
                stroke="#DC143C"
                strokeWidth={2}
                dot={{ fill: '#DC143C', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="courses"
                name="Courses"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quiz Scores */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Quiz Performance by Course</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockQuizScores} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11 }}
                width={120}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value) => [`${value}%`, 'Score']}
              />
              <Bar dataKey="score" fill="#DC143C" radius={[0, 4, 4, 0]}>
                {mockQuizScores.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.score >= 90 ? '#22c55e' : entry.score >= 80 ? '#DC143C' : '#f59e0b'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Course Completion Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockCourseDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={{ stroke: '#666', strokeWidth: 1 }}
              >
                {mockCourseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Coins by Source */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Coins Earned by Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockCoinsBySource}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="source" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value) => [`${value} coins`, 'Earned']}
              />
              <Bar dataKey="coins" radius={[4, 4, 0, 0]}>
                {mockCoinsBySource.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600 text-lg">💪</span>
              <h4 className="font-medium text-green-800">Strengths</h4>
            </div>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Strong in CSS & Styling topics</li>
              <li>• Consistent daily learning habit</li>
              <li>• High quiz completion rate</li>
            </ul>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-600 text-lg">📈</span>
              <h4 className="font-medium text-yellow-800">Areas to Improve</h4>
            </div>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• JavaScript advanced concepts</li>
              <li>• Spending more time on videos</li>
              <li>• Completing optional courses</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-600 text-lg">🎯</span>
              <h4 className="font-medium text-blue-800">Recommended Next Steps</h4>
            </div>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Complete "Advanced JavaScript"</li>
              <li>• Take the Node.js certification</li>
              <li>• Join the weekly study group</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
