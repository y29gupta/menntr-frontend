export const PERMISSIONS = {
  DASHBOARD: {
    MODULE: 'dashboard',
    VIEW: 'dashboard:view',
  },
  ORGANIZATION: {
    MODULE: 'organization',
    CATEGORIES: {
      VIEW: 'organization:categories:view',
      CREATE: 'organization:categories:create',
      EDIT: 'organization:categories:edit',
      DELETE: 'organization:categories:delete',
    },
    DEPARTMENTS: {
      VIEW: 'organization:departments:view',
      CREATE: 'organization:departments:create',
      EDIT: 'organization:departments:edit',
      DELETE: 'organization:departments:delete',
    },
    BATCHES: {
      VIEW: 'organization:batches:view',
      CREATE: 'organization:batches:create',
      EDIT: 'organization:batches:edit',
      DELETE: 'organization:batches:delete',
    },
    HIERARCHY: {
      VIEW: 'organization:hierarchy:view',
      MANAGE: 'organization:hierarchy:manage',
    },
  },
  USER_MANAGEMENT: {
    MODULE: 'user-management',
    USERS: {
      VIEW: 'user-management:users:view',
      CREATE: 'user-management:users:create',
      EDIT: 'user-management:users:edit',
      DELETE: 'user-management:users:delete',
      BULK_UPLOAD: 'user-management:users:bulk_upload',
    },
    ROLES: {
      ASSIGN: 'user-management:roles:assign',
    },
    PERMISSIONS: {
      ASSIGN: 'user-management:permissions:assign',
    },
  },
  STUDENT_MANAGEMENT: {
    MODULE: 'student-management',
    STUDENTS: {
      VIEW: 'student-management:students:view',
      CREATE: 'student-management:students:create',
      EDIT: 'student-management:students:edit',
      DELETE: 'student-management:students:delete',
      BULK_UPLOAD: 'student-management:students:bulk_upload',
    },
    PERFORMANCE: {
      VIEW: 'student-management:performance:view',
    },
  },
  ASSESSMENT: {
    MODULE: 'assessment',
    ASSESSMENTS: {
      VIEW: 'assessment:assessments:view',
      CREATE: 'assessment:assessments:create',
      EDIT: 'assessment:assessments:edit',
      DELETE: 'assessment:assessments:delete',
      PUBLISH: 'assessment:assessments:publish',
    },
    PERFORMANCE: {
      VIEW: 'assessment:performance:view',
    },
    QUESTIONS: {
      MANAGE: 'assessment:questions:manage',
    },
  },
} as const;
