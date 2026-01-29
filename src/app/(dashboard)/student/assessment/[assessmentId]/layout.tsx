// app/(dashboard)/student/assessments/[assessmentId]/layout.tsx

export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#F7F6FB]">{children}</div>;
}
