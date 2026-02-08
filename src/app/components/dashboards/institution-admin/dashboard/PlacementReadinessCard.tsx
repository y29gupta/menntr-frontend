'use client';

import { Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProgressGraph from '../../../graphs/ProgressGraph';
import { fetchDashboardData } from '@/app/lib/api/dashboardApi';

/**
 * Backend response shape
 */
type PlacementReadinessResponse = {
  threshold: number;
  ready: {
    totalStudents: number;
    description: string;
  };
  notReady: {
    totalStudents: number;
    description: string;
  };
};

/**
 * UI config (UNCHANGED)
 */
const PLACEMENT_UI = {
  ready: {
    gradientId: 'readyGradient',
    trackColor: '#E7FFED',
  },
  notReady: {
    gradientId: 'notReadyGradient',
    trackColor: '#FFF1E1',
  },
};

export default function PlacementReadinessCard() {
  // ─────────────────────────────
  // Hooks (order NEVER changes)
  // ─────────────────────────────
  const [data, setData] = useState<PlacementReadinessResponse | null>(null);

  // ─────────────────────────────
  // Fetch backend data
  // ─────────────────────────────
  useEffect(() => {
    async function load() {
      const res = await fetchDashboardData<PlacementReadinessResponse>(
        '/dashboard/placement-readiness'
      );
      setData(res);
    }
    load();
  }, []);

  // ─────────────────────────────
  // Render guard AFTER hooks
  // ─────────────────────────────
  if (!data) return null;

  const { ready, notReady } = data;

  const totalStudents = ready.totalStudents + notReady.totalStudents;

  return (
    <div className="w-full lg:min-w-fit bg-white rounded-2xl p-4 sm:p-6 shadow-[0px_4px_24px_rgba(15,23,42,0.08)]">
      <div className="flex gap-2">
        <Target className="text-gray-500" />
        <h2 className="text-sm sm:text-base font-semibold text-slate-800 mb-4">
          Placement Readiness Overview
        </h2>
      </div>

      {/* READY */}
      <div>
        <h3 className="text-xs sm:text-sm text-slate-500">Ready for placement</h3>
        <p className="text-lg sm:text-xl font-semibold text-slate-800">
          {ready.totalStudents} students
        </p>

        <ProgressGraph
          value={ready.totalStudents}
          total={totalStudents}
          gradientId={PLACEMENT_UI.ready.gradientId}
          trackColor={PLACEMENT_UI.ready.trackColor}
        />

        <p className="text-xs text-slate-500">{ready.description}</p>
      </div>

      <div className="h-px bg-slate-100 my-4" />

      {/* NOT READY */}
      <div>
        <h3 className="text-xs sm:text-sm text-slate-500">Not ready</h3>
        <p className="text-lg sm:text-xl font-semibold text-slate-800">
          {notReady.totalStudents} students
        </p>

        <ProgressGraph
          value={notReady.totalStudents}
          total={totalStudents}
          gradientId={PLACEMENT_UI.notReady.gradientId}
          trackColor={PLACEMENT_UI.notReady.trackColor}
        />

        <p className="text-xs text-slate-500">{notReady.description}</p>
      </div>
    </div>
  );
}
