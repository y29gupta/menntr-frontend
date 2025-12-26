import { DepartmentMetric } from '@/app/components/graphs/DepartmentBarGraph';

export type Status = 'critical' | 'warning' | 'good';

export interface RequirementItem {
  status: Status;
  text: string;
}

export const getStatus = (value: number, min = 70): Status => {
  if (value < min - 10) return 'critical';
  if (value < min) return 'warning';
  return 'good';
};

export const buildRequirementItems = (
  data: DepartmentMetric[],
  minScore = 70
): RequirementItem[] => {
  const map: Record<Status, string[]> = {
    critical: [],
    warning: [],
    good: [],
  };

  data.forEach((d) => {
    map[getStatus(d.percentage, minScore)].push(d.department);
  });

  const items: RequirementItem[] = [];

  if (map.critical.length) {
    items.push({
      status: 'critical',
      text: `${map.critical.join(', ')} need academic intervention`,
    });
  }

  if (map.warning.length) {
    items.push({
      status: 'warning',
      text: `${map.warning.join(', ')} is borderline`,
    });
  }

  if (map.good.length) {
    items.push({
      status: 'good',
      text: `${map.good.join(', ')} are consistently above minimum requirement`,
    });
  }

  return items;
};
