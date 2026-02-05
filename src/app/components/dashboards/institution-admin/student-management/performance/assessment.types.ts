export type AssessmentStatus = 'Completed' | 'In Progress' | 'Not Started';

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
