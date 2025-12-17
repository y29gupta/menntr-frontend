import { notFound } from 'next/navigation';
import { superAdminSections } from '@/app/constants/superAdminSections';
import Dashboard from '../components/Dashboard';

const pageMap: Record<string, React.FC> = {
  dashboard: Dashboard,
  // Add more components as you build them:
  // 'manage-institutions': ManageInstitutions,
  // 'upcoming-features': UpcomingFeatures,
  // etc.
};

export function generateStaticParams() {
  return superAdminSections.map((section: any) => ({ section }));
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;

  // Check if section exists in our valid sections
  if (!superAdminSections.includes(section)) {
    notFound();
  }

  const PageComponent = pageMap[section];

  if (!PageComponent) {
    // Section exists in menu but page not built yet
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {section
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </h2>
          <p className="text-gray-500">This page is coming soon...</p>
        </div>
      </div>
    );
  }

  return <PageComponent />;
}
