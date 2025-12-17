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

export const superAdminMenu = [
  { label: 'Dashboard', path: '/super-admin/dashboard', icon: DashboardIcon },
  {
    label: 'Manage Institutions',
    path: '/super-admin/manage-institutions',
    icon: ManageInstitutionIcon,
  },
  {
    label: 'Upcoming features',
    path: '/super-admin/upcoming-features',
    icon: UpcomingFeaturesIcon,
  },
  {
    label: 'License Management',
    path: '/super-admin/license-management',
    icon: LisenceManagementIcon,
  },
  {
    label: 'Procurement Requests',
    path: '/super-admin/procurement-requests',
    icon: ProcurementRequestIcon,
  },
  { label: 'System Health', path: '/super-admin/system-health', icon: SystemHealthIcon },
  {
    label: 'Feature Usage Analytics',
    path: '/super-admin/feature-usage-analytics',
    icon: FeatureUsageAnalyaticsIcon,
  },
  {
    label: 'Role Management (RBAC)',
    path: '/super-admin/role-management',
    icon: RoleManagementIcon,
  },
  { label: 'Reports', path: '/super-admin/reports', icon: ReportsIcon },
  { label: 'Settings', path: '/super-admin/settings', icon: SettingsIcon },
];

export const superAdminSections = [
  'dashboard',
  'manage-institutions',
  'upcoming-features',
  'license-management',
  'procurement-requests',
  'system-health',
  'feature-usage-analytics',
  'role-management',
  'reports',
  'settings',
];
