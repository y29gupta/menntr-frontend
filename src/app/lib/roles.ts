/**
 * Role classification is based on hierarchy level and system flags,
 * NOT hardcoded role names. Institutions create custom role names
 * (e.g., "Engineering Head", "CSE HOD") mapped to hierarchy levels.
 *
 * Only system role names are known: "Super Admin", "Student".
 * All other roles are institution-specific and identified by hierarchy_level.
 */

/** System-level role categories (not institution role names) */
export type RoleCategory = 'student' | 'admin' | 'super-admin';

/**
 * Determine the role category from a JWT role name string.
 * Since JWT only contains the role name, we can only identify system roles by name.
 * Everything else is treated as an admin role.
 */
export function getRoleCategory(roleName: string | null): RoleCategory | null {
  if (!roleName) return null;

  if (roleName === 'Super Admin') return 'super-admin';
  if (roleName === 'Student') return 'student';

  // Any other role name (institution-created) is an admin-type role
  return 'admin';
}

/**
 * Get the redirect path for a role category.
 */
export function getRedirectPath(category: RoleCategory): string {
  switch (category) {
    case 'student':
      return 'student/dashboard';
    case 'super-admin':
      return 'super-admin';
    case 'admin':
    default:
      return 'admin/dashboard';
  }
}

/**
 * Get the redirect path from a role name (convenience).
 */
export function getRedirectForRole(roleName: string | null): string {
  const category = getRoleCategory(roleName);
  return getRedirectPath(category ?? 'admin');
}

export type SidebarRole = 'student' | 'admin' | 'super-admin';

/**
 * Map a role name to sidebar key.
 */
export function getSidebarKey(roleName: string | null): SidebarRole | null {
  const category = getRoleCategory(roleName);
  if (!category) return null;
  return category; // RoleCategory and SidebarRole are the same values
}

/**
 * Check if a role (by name) uses the module-driven sidebar.
 * All admin-type roles use module-driven sidebar.
 * Super Admin and Student use static sidebars.
 */
export function isModuleDrivenRole(roleName: string | null): boolean {
  return getRoleCategory(roleName) === 'admin';
}
