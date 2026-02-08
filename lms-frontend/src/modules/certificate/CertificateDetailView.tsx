import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCertificate } from './CertificateProvider';
import { Skeleton, Breadcrumb } from '@/shared/components';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function CertificateDetailView() {
  const { certificateId } = useParams<{ certificateId: string }>();

  const {
    data: certificate,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['certificate', certificateId],
    queryFn: () => fetchCertificate(certificateId!),
    enabled: !!certificateId,
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-6 w-48" />
        <div className="card p-8">
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (isError || !certificate) {
    return (
      <div className="card text-center py-12 max-w-3xl mx-auto">
        <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-semibold mb-2">Certificate not found</h3>
        <p className="text-neutral-dark mb-4">This certificate could not be loaded.</p>
        <Link to="/certificates" className="btn-primary">
          Back to Certificates
        </Link>
      </div>
    );
  }

  const handleDownload = () => {
    // In a real app, this would trigger PDF generation/download
    alert('PDF download would start here. Certificate ID: ' + certificate.certificate_number);
  };

  const handleShare = (platform: 'linkedin' | 'twitter' | 'copy') => {
    const shareUrl = window.location.origin + certificate.verification_url;
    const shareText = `I just earned a certificate for "${certificate.course_title}"!`;

    switch (platform) {
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        break;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Breadcrumb
        items={[
          { label: 'Certificates', href: '/certificates' },
          { label: certificate.course_title },
        ]}
      />

      {/* Certificate Display */}
      <div className="card p-0 overflow-hidden">
        {/* Certificate Header */}
        <div className="bg-gradient-to-br from-primary-red to-red-800 text-white p-8 text-center relative">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <p className="text-sm uppercase tracking-widest opacity-80 mb-2">Certificate of Completion</p>
            <p className="text-lg opacity-90">This is to certify that</p>
            <h2 className="text-3xl font-bold my-3">{certificate.user_name}</h2>
            <p className="text-lg opacity-90">has successfully completed</p>
            <h3 className="text-2xl font-semibold mt-3">{certificate.course_title}</h3>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="p-8 bg-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Date Completed</p>
              <p className="font-semibold">{formatDate(certificate.completion_date)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Date Issued</p>
              <p className="font-semibold">{formatDate(certificate.issued_date)}</p>
            </div>
            {certificate.score && (
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Final Score</p>
                <p className="font-semibold text-green-600">{certificate.score}%</p>
              </div>
            )}
            {certificate.duration_hours && (
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Duration</p>
                <p className="font-semibold">{certificate.duration_hours} hours</p>
              </div>
            )}
          </div>

          <div className="text-center border-t border-gray-200 pt-6">
            <p className="text-xs text-gray-400 font-mono">{certificate.certificate_number}</p>
            <p className="text-xs text-gray-400 mt-1">
              Verify at: {window.location.origin}{certificate.verification_url}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="card">
        <h3 className="font-semibold mb-4">Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={handleDownload} className="btn-primary flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="btn-secondary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Share on LinkedIn
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="btn-secondary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            Share on Twitter
          </button>
          <button
            onClick={() => handleShare('copy')}
            className="btn-secondary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}
