export type AssessmentStatus =
  | 'Completed'
  | 'In-Progress'
  | 'Not started yet';

export type AssessmentCategory = 'Aptitude' | 'Domain';

export type AssessmentPerformanceRow = {
  assessmentName: string;
  category: AssessmentCategory;
  attempt: number;
  duration: string;
  score: number;
  scorePercent: number;
  status: AssessmentStatus;
};
