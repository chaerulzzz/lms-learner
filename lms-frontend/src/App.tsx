import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth, LoginView, RegisterView } from '@/modules/auth';
import { DashboardProvider, DashboardView } from '@/modules/dashboard';
import { LearningProvider, LearningPathsView, LearningPathDetailView } from '@/modules/learning';
import { CourseProvider, CourseDetailView } from '@/modules/course';
import { ProfileProvider, ProfileView } from '@/modules/profile';
import AppLayout from '@/shared/layout/AppLayout';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-light">
        <div className="text-neutral-dark">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/dashboard" element={
            <ProtectedLayout>
              <DashboardProvider><DashboardView /></DashboardProvider>
            </ProtectedLayout>
          } />
          <Route path="/learning-paths" element={
            <ProtectedLayout>
              <LearningProvider><LearningPathsView /></LearningProvider>
            </ProtectedLayout>
          } />
          <Route path="/learning-paths/:pathId" element={
            <ProtectedLayout>
              <LearningProvider><LearningPathDetailView /></LearningProvider>
            </ProtectedLayout>
          } />
          <Route path="/courses/:courseId" element={
            <ProtectedLayout>
              <CourseProvider><CourseDetailView /></CourseProvider>
            </ProtectedLayout>
          } />
          <Route path="/profile" element={
            <ProtectedLayout>
              <ProfileProvider><ProfileView /></ProfileProvider>
            </ProtectedLayout>
          } />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
