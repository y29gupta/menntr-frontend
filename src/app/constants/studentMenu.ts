'use client';

import DashboardIcon from '@/app/components/icons/DashboardIcon';
import ManageInstitutionIcon from '@/app/components/icons/ManageInstitutionIcon';
import UpcomingFeaturesIcon from '@/app/components/icons/UpcomingFeaturesIcon';
import LisenceManagementIcon from '@/app/components/icons/LisenceManagementIcon';
import ProcurementRequestIcon from '@/app/components/icons/ProcurementRequestIcon';
import SystemHealthIcon from '@/app/components/icons/SystemHealthIcon';
import FeatureUsageAnalyaticsIcon from '@/app/components/icons/FeatureUsageAnalyaticsIcon';
import RoleManagementIcon from '@/app/components/icons/RoleManagementIcon';
import ReportsIcon from '@/app/components/icons/ReportsIcon';
import SettingsIcon from '@/app/components/icons/SettingsIcon';

export const studentMenu = [
  { label: 'Dashboard', path: '/student/dashboard', icon: DashboardIcon },
  {
    label: 'Manage Institutions',
    path: '/student/manage-institutions',
    icon: ManageInstitutionIcon,
  },
  {
    label: 'Upcoming features',
    path: '/student/upcoming-features',
    icon: UpcomingFeaturesIcon,
  },
  {
    label: 'License Management',
    path: '/student/license-management',
    icon: LisenceManagementIcon,
  },
  {
    label: 'Procurement Requests',
    path: '/student/procurement-requests',
    icon: ProcurementRequestIcon,
  },
  { label: 'System Health', path: '/student/system-health', icon: SystemHealthIcon },
  {
    label: 'Feature Usage Analytics',
    path: '/student/feature-usage-analytics',
    icon: FeatureUsageAnalyaticsIcon,
  },
  {
    label: 'student Management (RBAC)',
    path: '/student/role-management',
    icon: RoleManagementIcon,
  },
  { label: 'Reports', path: '/student/reports', icon: ReportsIcon },
  { label: 'Settings', path: '/student/settings', icon: SettingsIcon },
];
