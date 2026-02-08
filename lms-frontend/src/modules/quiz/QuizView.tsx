import { useQuiz } from './QuizProvider';
import { Breadcrumb } from '@/shared/components';
import QuizStartView from './QuizStartView';
import QuizTakingView from './QuizTakingView';
import QuizResultsView from './QuizResultsView';

export default function QuizView() {
  const { phase, quizInfo } = useQuiz();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Courses', href: '/learning-paths' },
    { label: quizInfo?.title || 'Quiz' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - only show when not taking quiz */}
      {phase !== 'taking' && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-2xl font-bold mt-2">{quizInfo?.title || 'Quiz'}</h1>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {phase === 'start' && <QuizStartView />}
        {phase === 'taking' && <QuizTakingView />}
        {phase === 'results' && <QuizResultsView />}
      </div>
    </div>
  );
}
