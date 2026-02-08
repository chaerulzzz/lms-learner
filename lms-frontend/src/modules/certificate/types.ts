export interface Certificate {
  id: number;
  certificate_number: string;
  user_id: number;
  user_name: string;
  course_id: number;
  course_title: string;
  completion_date: string;
  issued_date: string;
  score?: number;
  duration_hours?: number;
  verification_url: string;
  download_url?: string;
}

export interface CertificateVerification {
  valid: boolean;
  certificate?: Certificate;
  message: string;
}
