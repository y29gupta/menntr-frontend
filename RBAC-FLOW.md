# RBAC Flow Documentation

## 1. How Auth Data Flows from Backend to Frontend

```
User opens app
    │
    ▼
AuthProvider (src/app/providers/AuthProvider.tsx)
    │  fetches GET /auth/me/context (with httpOnly JWT cookie)
    ▼
Backend: meContextHandler (src/auth/me.context.handler.ts)
    │  1. Validates JWT → extracts userId, institutionId
    │  2. Fetches user record (checks status === 'active')
    │  3. Calls resolveAccessContext(prisma, userId, institutionId)
    ▼
Backend: resolveAccessContext (src/auth/permission.resolver.ts)
    │  1. Fetches user's roles (institution-scoped)
    │  2. Gets institution plan code
    │  3. Collects base permissions from role_permissions table
    │  4. Applies user_permission_overrides (grant/revoke, with expiry)
    │  5. Computes: finalPermissions = (base - revoked) ∪ granted
    │  6. Extracts modules from permission → feature → module chain
    │  7. Returns { plan_code, permissions: string[], modules: { code, name, icon }[] }
    ▼
Frontend: AuthProvider caches response (React Query, 5min stale)
    │  - Builds Set<string> for O(1) permission lookups
    │  - Builds Set<string> for module lookups
    │  - Detects Super Admin (bypasses all checks)
    │  - Exposes: hasPermission(), hasAnyPermission(), hasModule()
    ▼
UI Components use guards
    - <ModuleRoute module="organization"> → page-level protection
    - <PermissionGate permission="org:categories:create"> → button/section level
    - usePermission(code) / useModule(code) → conditional logic in code
```

### Response shape from `/auth/me/context`

```json
{
  "user": { "id": "123", "email": "...", "first_name": "...", "last_name": "..." },
  "institution": { "id": 1, "name": "...", "code": "..." },
  "plan": { "code": "basic" },
  "roles": [{ "id": 5, "name": "Faculty" }],
  "permissions": ["dashboard:view", "organization:categories:view", "..."],
  "modules": [{ "code": "dashboard", "name": "Dashboard", "icon": "LayoutDashboard" }]
}
```

---

## 2. How Permissions Are Resolved

### Permission format

```
module_code:feature_code:action
```

Examples: `organization:categories:view`, `user-management:users:create`

### Resolution algorithm (in `resolveAccessContext`)

1. **Role permissions** — From `role_permissions` table for all of the user's roles
2. **User overrides** — From `user_permission_overrides` table:
   - `override_type = 'revoke'` → removes from base set
   - `override_type = 'grant'` (not expired, not revoked) → adds to base set
3. **Final set** = `(rolePermissions - revoked) ∪ granted`

### Super Admin

If the user has the system role "Super Admin", the backend returns `['*']` as the permissions array. The frontend AuthProvider detects this and makes all `hasPermission()` calls return `true`.

### Role hierarchy levels

| Level | Name                    | Default scope          |
|-------|-------------------------|------------------------|
| 1     | Institution Admin       | All permissions        |
| 2     | Category Admin          | Org + student + assess |
| 3     | Department Admin (HOD)  | View-only              |
| 4     | Faculty                 | Dashboard + view       |

---

## 3. How to Add a New Module

### Step 1: Backend — Add to seed script

Edit `menntr-backend/prisma/seed/seed-permissions.ts`:

```ts
// Add to the modules array
{
  code: 'my-new-module',
  name: 'My New Module',
  description: 'Description here',
  icon: 'LucideIconName',
  category: 'management',       // or 'academic', 'analytics', etc.
  is_core: false,
  is_system_module: false,
  sort_order: 70,               // pick a number for ordering
  features: [
    {
      code: 'my-feature',
      name: 'My Feature',
      description: 'Feature description',
      permissions: [
        { code: 'my-new-module:my-feature:view',   name: 'View My Feature',   action_type: 'view' },
        { code: 'my-new-module:my-feature:create', name: 'Create My Feature', action_type: 'create' },
        { code: 'my-new-module:my-feature:edit',   name: 'Edit My Feature',   action_type: 'edit' },
        { code: 'my-new-module:my-feature:delete', name: 'Delete My Feature', action_type: 'delete' },
      ],
    },
  ],
}
```

### Step 2: Backend — Run the seed

```bash
cd menntr-backend
npx prisma db seed
```

This upserts modules, features, permissions, and links them to plans.

### Step 3: Backend — Add hierarchy defaults (optional)

In the seed script, find the `hierarchyDefaults` section and add permission codes for each level that should have access by default.

### Step 4: Frontend — Add permission constants

Edit `menntr-frontend/src/app/constants/permissions.ts`:

```ts
MY_NEW_MODULE: {
  MODULE: 'my-new-module',
  MY_FEATURE: {
    VIEW: 'my-new-module:my-feature:view',
    CREATE: 'my-new-module:my-feature:create',
    EDIT: 'my-new-module:my-feature:edit',
    DELETE: 'my-new-module:my-feature:delete',
  },
},
```

### Step 5: Frontend — Create the page

Create `menntr-frontend/src/app/(dashboard)/admin/my-new-module/page.tsx`:

```tsx
import ModuleRoute from '@/app/components/auth/ModuleRoute';
import { PERMISSIONS } from '@/app/constants/permissions';

const Page = () => (
  <ModuleRoute module={PERMISSIONS.MY_NEW_MODULE.MODULE}>
    {/* Your page content */}
  </ModuleRoute>
);

export default Page;
```

### Step 6: Frontend — Sidebar

The sidebar is module-driven for admin roles. After seeding, the module will automatically appear in the sidebar if the user's resolved permissions include it (via `buildSidebarFromModules()` in `src/app/lib/roles.ts`).

---

## 4. How to Add New Features/Permissions to an Existing Module

### Step 1: Add to seed script

In `seed-permissions.ts`, find the existing module and add a new feature block:

```ts
{
  code: 'organization',
  // ... existing fields
  features: [
    // ... existing features
    {
      code: 'my-new-feature',
      name: 'My New Feature',
      description: 'Description',
      permissions: [
        { code: 'organization:my-new-feature:view',   name: 'View',   action_type: 'view' },
        { code: 'organization:my-new-feature:create', name: 'Create', action_type: 'create' },
      ],
    },
  ],
}
```

### Step 2: Run the seed

```bash
npx prisma db seed
```

### Step 3: Add to frontend constants

```ts
// In permissions.ts, under the existing module
ORGANIZATION: {
  MODULE: 'organization',
  // ... existing
  MY_NEW_FEATURE: {
    VIEW: 'organization:my-new-feature:view',
    CREATE: 'organization:my-new-feature:create',
  },
},
```

### Step 4: Use in UI

```tsx
<PermissionGate permission={PERMISSIONS.ORGANIZATION.MY_NEW_FEATURE.CREATE}>
  <button>Create Something</button>
</PermissionGate>
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `backend/src/auth/permission.resolver.ts` | Core RBAC resolution logic |
| `backend/src/auth/me.context.handler.ts` | `/auth/me/context` endpoint |
| `backend/prisma/seed/seed-permissions.ts` | Permission seed data |
| `frontend/src/app/providers/AuthProvider.tsx` | Fetches and caches auth context |
| `frontend/src/app/hooks/usePermissions.ts` | Permission check hooks |
| `frontend/src/app/components/auth/PermissionGate.tsx` | UI guard (button/section) |
| `frontend/src/app/components/auth/ModuleRoute.tsx` | UI guard (page-level) |
| `frontend/src/app/constants/permissions.ts` | Permission code registry |
| `frontend/src/app/lib/roles.ts` | Sidebar builder for module-driven roles |
