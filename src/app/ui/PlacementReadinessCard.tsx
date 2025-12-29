'use client';

import ProgressGraph from '../components/graphs/ProgressGraph';

/* backend-style data */
const placementReadinessData = {
  ready: {
    label: 'Ready for placement',
    count: 300,
    total: 430,
    supportCount: 245,
  },
  notReady: {
    label: 'Not ready',
    count: 800,
    total: 1450,
    supportCount: 158,
  },
};

/* UI config */
const PLACEMENT_UI = {
  ready: {
    gradientId: 'readyGradient',
    trackColor: '#E7FFED',
    description: (v: number) => `${v} students scoring above the required threshold`,
  },
  notReady: {
    gradientId: 'notReadyGradient',
    trackColor: '#FFF1E1',
    description: (v: number) => `${v} students requiring significant support`,
  },
};

export default function PlacementReadinessCard() {
  const { ready, notReady } = placementReadinessData;

  return (
    <div className="w-full lg:min-w-fit bg-white rounded-2xl p-4 sm:p-6 shadow-[0px_4px_24px_rgba(15,23,42,0.08)]">
      <h2 className="text-sm sm:text-base font-semibold text-slate-800 mb-4">
        Placement Readiness Overview
      </h2>

      {/* READY */}
      <div>
        <h3 className="text-xs sm:text-sm text-slate-500">{ready.label}</h3>
        <p className="text-lg sm:text-xl font-semibold text-slate-800">{ready.count} students</p>

        <ProgressGraph
          value={ready.count}
          total={ready.total}
          gradientId={PLACEMENT_UI.ready.gradientId}
          trackColor={PLACEMENT_UI.ready.trackColor}
        />

        <p className="text-xs text-slate-500">
          {PLACEMENT_UI.ready.description(ready.supportCount)}
        </p>
      </div>

      <div className="h-px bg-slate-100 my-4" />

      {/* NOT READY */}
      <div>
        <h3 className="text-xs sm:text-sm text-slate-500">{notReady.label}</h3>
        <p className="text-lg sm:text-xl font-semibold text-slate-800">{notReady.count} students</p>

        <ProgressGraph
          value={notReady.count}
          total={notReady.total}
          gradientId={PLACEMENT_UI.notReady.gradientId}
          trackColor={PLACEMENT_UI.notReady.trackColor}
        />

        <p className="text-xs text-slate-500">
          {PLACEMENT_UI.notReady.description(notReady.supportCount)}
        </p>
      </div>
    </div>
  );
}
