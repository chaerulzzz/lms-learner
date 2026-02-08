import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from './CatalogProvider';
import { Skeleton } from '@/shared/components';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-neutral-dark ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-800';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default function CatalogView() {
  const {
    courses,
    isLoading,
    pagination,
    filters,
    categories,
    setSearch,
    setCategory,
    setDifficulty,
    setPage,
    clearFilters,
  } = useCatalog();

  const [searchInput, setSearchInput] = useState(filters.search);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const hasActiveFilters = filters.search || filters.category || filters.difficulty;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Course Catalog</h1>
        <p className="text-neutral-dark">Browse and discover courses to enhance your skills</p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-6">
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search courses..."
                className="input-field w-full pl-10"
              />
            </div>
            <button type="submit" className="btn-primary px-6">
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-3">
          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field min-w-[180px]"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={filters.difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="input-field min-w-[150px]"
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-red hover:underline flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      {pagination && (
        <p className="text-sm text-neutral-dark mb-4">
          Showing {courses.length} of {pagination.total} courses
        </p>
      )}

      {/* Course Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card">
              <Skeleton className="h-40 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="card text-center py-12">
          <svg
            className="w-16 h-16 mx-auto text-neutral-dark mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold mb-2">No courses found</h3>
          <p className="text-neutral-dark mb-4">Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="btn-secondary">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="card hover:shadow-lg transition-shadow"
            >
              {/* Course Thumbnail */}
              <div className="h-40 bg-gradient-to-br from-primary-red to-red-700 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              {/* Course Info */}
              <div className="flex items-start gap-2 mb-2">
                <h3 className="font-semibold flex-1 line-clamp-2">{course.title}</h3>
                {course.is_mandatory && (
                  <span className="badge-primary text-xs flex-shrink-0">MANDATORY</span>
                )}
              </div>

              <p className="text-sm text-neutral-dark line-clamp-2 mb-3">{course.description}</p>

              {/* Meta */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge bg-gray-100 text-gray-700">{course.category}</span>
                <span className={`badge ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <StarRating rating={course.average_rating} />
                <span className="text-neutral-dark">{course.duration_hours}h</span>
              </div>

              {/* Instructor & Enrollment */}
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
                <span className="text-neutral-dark">{course.instructor_name}</span>
                <span className="text-neutral-dark">{course.enrollment_count} enrolled</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.total_page > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage(pagination.page - 1)}
            disabled={pagination.page === 1}
            className={`btn-secondary px-4 py-2 ${pagination.page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: pagination.total_page }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  p === pagination.page
                    ? 'bg-primary-red text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage(pagination.page + 1)}
            disabled={pagination.page === pagination.total_page}
            className={`btn-secondary px-4 py-2 ${
              pagination.page === pagination.total_page ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
