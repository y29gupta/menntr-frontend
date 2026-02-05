export const buildAssessmentMetricsBackend = (overview: any) => {
  if (!overview) return [];

  const { metrics, totalStudents } = overview;

  return [
    {
      label: 'ATTEMPT_RATE',
      value: metrics.attemptRate / 100,
      delta: 0,
      history: [],
      attempted: Math.round((metrics.attemptRate / 100) * totalStudents),
      totalStudents,
    },
    {
      label: 'AVG_SCORE',
      value: metrics.averageScore / 100,
      delta: 0,
      history: [],
    },
    {
      label: 'AVG_TIME',
      value: metrics.averageTimeMinutes,
      delta: 0,
      history: [],
      maxTime: metrics.averageTimeMinutes,
    },
  ];
};
