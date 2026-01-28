export default function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-primary-red">My Learning Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <h3 className="text-sm font-medium text-neutral-dark mb-1">Total Courses</h3>
            <p className="text-3xl font-bold text-primary-red">12</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-medium text-neutral-dark mb-1">In Progress</h3>
            <p className="text-3xl font-bold text-status-warning">5</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-medium text-neutral-dark mb-1">Completed</h3>
            <p className="text-3xl font-bold text-status-success">7</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-medium text-neutral-dark mb-1">GMFC Coins</h3>
            <p className="text-3xl font-bold text-yellow-600">450</p>
          </div>
        </div>

        {/* Learning Paths Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">My Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Learning Path Card */}
            <div className="card">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold">Frontend Development</h3>
                <span className="badge-primary">MANDATORY</span>
              </div>
              <p className="text-sm text-neutral-dark mb-4">
                Complete foundational frontend development courses
              </p>
              <div className="progress-bar mb-2">
                <div className="progress-fill bg-progress-high" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-neutral-dark">75% Complete</p>
            </div>

            {/* Add more learning path cards as needed */}
            <div className="card">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold">React Advanced Patterns</h3>
                <span className="badge bg-blue-100 text-blue-800">OPTIONAL</span>
              </div>
              <p className="text-sm text-neutral-dark mb-4">
                Learn advanced React patterns and best practices
              </p>
              <div className="progress-bar mb-2">
                <div className="progress-fill bg-progress-medium" style={{ width: '40%' }}></div>
              </div>
              <p className="text-sm text-neutral-dark">40% Complete</p>
            </div>

            <div className="card">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold">TypeScript Fundamentals</h3>
                <span className="badge-primary">MANDATORY</span>
              </div>
              <p className="text-sm text-neutral-dark mb-4">
                Master TypeScript for type-safe development
              </p>
              <div className="progress-bar mb-2">
                <div className="progress-fill bg-progress-complete" style={{ width: '100%' }}></div>
              </div>
              <p className="text-sm text-status-success">Completed</p>
            </div>
          </div>
        </div>

        {/* Continue Learning Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <div className="bg-gray-200 h-40 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-gray-400">Course Thumbnail</span>
              </div>
              <h3 className="font-semibold mb-2">Introduction to React Query</h3>
              <p className="text-sm text-neutral-dark mb-3">Learn data fetching with React Query</p>
              <button className="btn-primary w-full">Continue</button>
            </div>

            <div className="card">
              <div className="bg-gray-200 h-40 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-gray-400">Course Thumbnail</span>
              </div>
              <h3 className="font-semibold mb-2">Tailwind CSS Mastery</h3>
              <p className="text-sm text-neutral-dark mb-3">Build beautiful UIs with Tailwind</p>
              <button className="btn-primary w-full">Continue</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
