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
      <NotificationProvider>
        <AppLayout>{children}</AppLayout>
      </NotificationProvider>
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
          <Route path="/users/:userId" element={
            <ProtectedLayout>
              <PublicProfileView />
            </ProtectedLayout>
          } />
          <Route path="/quizzes/:quizId" element={
            <ProtectedLayout>
              <QuizProvider><QuizView /></QuizProvider>
            </ProtectedLayout>
          } />
          <Route path="/catalog" element={
            <ProtectedLayout>
              <CatalogProvider><CatalogView /></CatalogProvider>
            </ProtectedLayout>
          } />
          <Route path="/achievements" element={
            <ProtectedLayout>
              <GamificationProvider><GamificationView /></GamificationProvider>
            </ProtectedLayout>
          } />
          <Route path="/notifications" element={
            <ProtectedLayout>
              <NotificationListView />
            </ProtectedLayout>
          } />
          <Route path="/notifications/settings" element={
            <ProtectedLayout>
              <NotificationSettingsView />
            </ProtectedLayout>
          } />
          <Route path="/certificates" element={
            <ProtectedLayout>
              <CertificateProvider><CertificateLibraryView /></CertificateProvider>
            </ProtectedLayout>
          } />
          <Route path="/certificates/:certificateId" element={
            <ProtectedLayout>
              <CertificateProvider><CertificateDetailView /></CertificateProvider>
            </ProtectedLayout>
          } />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
