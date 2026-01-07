'use client';

import { useEffect, useState } from 'react';
import { fetchOrganizationTree } from './organizationTree.api';
// import { InstitutionNode } from './organizationTree.types';
import { OrganizationTreeCanvas } from './OrganizationTreeCanvas';
import { InstitutionNode } from './hierarchy.types';

export function OrganizationTreeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [data, setData] = useState<InstitutionNode | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    setLoading(true);
    fetchOrganizationTree()
      .then(setData)
      .finally(() => setLoading(false));
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="absolute inset-6 bg-white rounded-lg overflow-hidden flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-600">
          ✕
        </button>

        {loading && <div className="flex items-center justify-center h-full">Loading...</div>}

        {data && <OrganizationTreeCanvas data={data} />}
      </div>
    </div>
  );
}
