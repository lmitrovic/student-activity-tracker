export interface Test {
  testName: string;
  testDate: string;
  subjectShortName: string;
  testType: string | null;
}

export interface Submission {
  id: number;
  firstName: string;
  lastName: string;
  indexNumber: number;
  startYear: string;
  studyProgramShort: string;
  studentGroup: string;
  taskStartedTime: string;
  taskSubmitted: boolean;
  taskSubmittedTime: string | null;
  testName: string;
  term: string;
  groupLabel: string;
  classroom: string;
}

export interface ExamConfig {
  subject: string;
  examName: string;
  totalStudents: number;
  startedAt: Date;
  durationMinutes: number;
}
