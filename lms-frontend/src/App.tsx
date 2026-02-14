import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth, LoginView, RegisterView } from '@/modules/auth';
import { DashboardProvider, DashboardView } from '@/modules/dashboard';
import { LearningProvider, LearningPathsView, LearningPathDetailView } from '@/modules/learning';
import { CourseProvider, CourseDetailView } from '@/modules/course';
import { ProfileProvider, ProfileView, PublicProfileView } from '@/modules/profile';
import { QuizProvider, QuizView } from '@/modules/quiz';
import { CatalogProvider, CatalogView } from '@/modules/catalog';
import { GamificationProvider, GamificationView } from '@/modules/gamification';
import { NotificationProvider, NotificationListView, NotificationSettingsView } from '@/modules/notification';
import { CertificateProvider, CertificateLibraryView, CertificateDetailView } from '@/modules/certificate';
import { AdminDashboardView, UsersView, AuditLogsView } from '@/modules/admin';
import AppLayout from '@/shared/layout/AppLayout';
import AdminLayout from '@/shared/layout/AdminLayout';
import { RoleGuard } from '@/shared/components';

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

function LearnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={['learner', 'instructor']}>
        <NotificationProvider>
          <AppLayout>{children}</AppLayout>
        </NotificationProvider>
      </RoleGuard>
    </ProtectedRoute>
  );
}

function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={['admin', 'hr_personnel']}>
        <AdminLayout>{children}</AdminLayout>
      </RoleGuard>
    </ProtectedRoute>
  );
}

function RoleRedirect() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-light">
        <div className="text-neutral-dark">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'admin' || user.role === 'hr_personnel') {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />

          {/* Role-based redirect */}
          <Route path="/" element={<RoleRedirect />} />

          {/* Learner routes */}
          <Route path="/dashboard" element={
            <LearnerLayout>
              <DashboardProvider><DashboardView /></DashboardProvider>
            </LearnerLayout>
          } />
          <Route path="/learning-paths" element={
            <LearnerLayout>
              <LearningProvider><LearningPathsView /></LearningProvider>
            </LearnerLayout>
          } />
          <Route path="/learning-paths/:pathId" element={
            <LearnerLayout>
              <LearningProvider><LearningPathDetailView /></LearningProvider>
            </LearnerLayout>
          } />
          <Route path="/courses/:courseId" element={
            <LearnerLayout>
              <CourseProvider><CourseDetailView /></CourseProvider>
            </LearnerLayout>
          } />
          <Route path="/profile" element={
            <LearnerLayout>
              <ProfileProvider><ProfileView /></ProfileProvider>
            </LearnerLayout>
          } />
          <Route path="/users/:userId" element={
            <LearnerLayout>
              <PublicProfileView />
            </LearnerLayout>
          } />
          <Route path="/quizzes/:quizId" element={
            <LearnerLayout>
              <QuizProvider><QuizView /></QuizProvider>
            </LearnerLayout>
          } />
          <Route path="/catalog" element={
            <LearnerLayout>
              <CatalogProvider><CatalogView /></CatalogProvider>
            </LearnerLayout>
          } />
          <Route path="/achievements" element={
            <LearnerLayout>
              <GamificationProvider><GamificationView /></GamificationProvider>
            </LearnerLayout>
          } />
          <Route path="/notifications" element={
            <LearnerLayout>
              <NotificationListView />
            </LearnerLayout>
          } />
          <Route path="/notifications/settings" element={
            <LearnerLayout>
              <NotificationSettingsView />
            </LearnerLayout>
          } />
          <Route path="/certificates" element={
            <LearnerLayout>
              <CertificateProvider><CertificateLibraryView /></CertificateProvider>
            </LearnerLayout>
          } />
          <Route path="/certificates/:certificateId" element={
            <LearnerLayout>
              <CertificateProvider><CertificateDetailView /></CertificateProvider>
            </LearnerLayout>
          } />

          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedAdminLayout><AdminDashboardView /></ProtectedAdminLayout>
          } />
          <Route path="/admin/users" element={
            <ProtectedAdminLayout><UsersView /></ProtectedAdminLayout>
          } />
          <Route path="/admin/audit-logs" element={
            <ProtectedAdminLayout><AuditLogsView /></ProtectedAdminLayout>
          } />

          {/* Catch-all */}
          <Route path="*" element={<RoleRedirect />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
