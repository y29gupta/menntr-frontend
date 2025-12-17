import React from 'react';

const layouts: Record<string, React.FC<{ children: React.ReactNode }>> = {
  dashboard: ({ children }) => <section className="p-6">{children}</section>,
};

export default async function SectionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const Layout = layouts[section];

  if (!Layout) {
    return <section className="p-6">{children}</section>;
  }

  return <Layout>{children}</Layout>;
}
