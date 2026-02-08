import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { USE_MOCK } from '@/lib/mockData';
import type { ApiResponse } from '@/types/api';
import type { Certificate } from './types';

// Mock certificates
const mockCertificates: Certificate[] = [
  {
    id: 1,
    certificate_number: 'CERT-2026-001234',
    user_id: 1,
    user_name: 'John Doe',
    course_id: 1,
    course_title: 'React Fundamentals',
    completion_date: '2026-01-15T10:30:00Z',
    issued_date: '2026-01-15T10:35:00Z',
    score: 92,
    duration_hours: 8,
    verification_url: '/verify/CERT-2026-001234',
  },
  {
    id: 2,
    certificate_number: 'CERT-2026-001456',
    user_id: 1,
    user_name: 'John Doe',
    course_id: 2,
    course_title: 'TypeScript Essentials',
    completion_date: '2026-01-20T14:00:00Z',
    issued_date: '2026-01-20T14:05:00Z',
    score: 88,
    duration_hours: 6,
    verification_url: '/verify/CERT-2026-001456',
  },
  {
    id: 3,
    certificate_number: 'CERT-2026-001789',
    user_id: 1,
    user_name: 'John Doe',
    course_id: 3,
    course_title: 'Advanced CSS & Tailwind',
    completion_date: '2026-02-01T09:00:00Z',
    issued_date: '2026-02-01T09:10:00Z',
    score: 95,
    duration_hours: 10,
    verification_url: '/verify/CERT-2026-001789',
  },
];

async function fetchCertificates(): Promise<Certificate[]> {
  if (USE_MOCK) {
    return mockCertificates;
  }
  const response = await api.get<ApiResponse<Certificate[]>>('/certificates');
  return response.data;
}

async function fetchCertificate(id: string): Promise<Certificate> {
  if (USE_MOCK) {
    const cert = mockCertificates.find((c) => c.id === Number(id));
    if (!cert) throw new Error('Certificate not found');
    return cert;
  }
  const response = await api.get<ApiResponse<Certificate>>(`/certificates/${id}`);
  return response.data;
}

interface CertificateContextType {
  certificates: Certificate[];
  certificatesLoading: boolean;
  certificatesError: boolean;
  totalCertificates: number;
}

const CertificateContext = createContext<CertificateContextType | undefined>(undefined);

export function CertificateProvider({ children }: { children: React.ReactNode }) {
  const {
    data: certificates = [],
    isLoading: certificatesLoading,
    isError: certificatesError,
  } = useQuery({
    queryKey: ['certificates'],
    queryFn: fetchCertificates,
  });

  return (
    <CertificateContext.Provider
      value={{
        certificates,
        certificatesLoading,
        certificatesError,
        totalCertificates: certificates.length,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
}

export { fetchCertificate };

export function useCertificates() {
  const context = useContext(CertificateContext);
  if (context === undefined) {
    throw new Error('useCertificates must be used within a CertificateProvider');
  }
  return context;
}
