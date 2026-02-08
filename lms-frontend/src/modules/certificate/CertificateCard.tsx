import { Link } from 'react-router-dom';
import type { Certificate } from './types';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function CertificateCard({ certificate }: { certificate: Certificate }) {
  return (
    <div className="card p-0 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Certificate Preview */}
      <div className="bg-gradient-to-br from-primary-red to-red-700 text-white p-6 relative">
        <div className="absolute top-2 right-2 opacity-20">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Certificate of Completion</p>
          <h3 className="font-bold text-lg line-clamp-2">{certificate.course_title}</h3>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-neutral-dark mb-3">
          <span>Issued: {formatDate(certificate.issued_date)}</span>
          {certificate.score && (
            <span className="font-semibold text-green-600">Score: {certificate.score}%</span>
          )}
        </div>

        <p className="text-xs text-gray-400 mb-4 font-mono">
          {certificate.certificate_number}
        </p>

        <div className="flex gap-2">
          <Link
            to={`/certificates/${certificate.id}`}
            className="flex-1 btn-primary text-sm text-center py-2"
          >
            View
          </Link>
          <button
            onClick={() => {
              // In real app, this would trigger PDF download
              alert('PDF download would start here');
            }}
            className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
