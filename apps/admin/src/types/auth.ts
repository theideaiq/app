import { ROLES } from '@/lib/constants';

// 'student' is included here because it is part of the ROLES constant,
// although strictly speaking RBAC usually relies on 'user', 'admin', 'superadmin'.
// By deriving it from ROLES, we ensure consistency.
export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export interface UserProfile {
  id: string;
  email?: string;
  role: UserRole;
  full_name?: string;
  avatar_url?: string;
  updated_at?: string;
  banned?: boolean;
}
