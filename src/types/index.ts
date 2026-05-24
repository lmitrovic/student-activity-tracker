export type FileExt = 'py' | 'java' | 'cpp' | 'pdf' | 'zip' | 'txt';

export interface SubmittedFile {
  id: string;
  name: string;
  sizeKb: number;
  ext: FileExt;
}

export interface Submission {
  id: string;
  studentName: string;
  indexNumber: string;
  email: string;
  submittedAt: Date;
  files: SubmittedFile[];
  isLate: boolean;
}

export type PendingStudent = Omit<Submission, 'submittedAt'>;

export interface ExamConfig {
  subject: string;
  examName: string;
  totalStudents: number;
  startedAt: Date;
  durationMinutes: number;
}
