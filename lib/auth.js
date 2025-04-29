// src/lib/auth.ts
import { RoleModel } from '@/schema/Role';
import { verifyJWT } from './jwt';
import User from '@/schema/User';

// Read & verify JWT from cookies (auth-token)
export async function getUserFromRequest(req) {
  const token = req.cookies.get('auth-token')?.value;
  if (!token) throw new Error('NO_TOKEN');
  const payload = await verifyJWT(token);
  // Lookup full user + roles
  const user = await User.findOne({ email: payload.payload.email }).populate('Role');
  if (!user) throw new Error('NO_USER');
  return user;
}

// Role guard
export function requireRole(user, ...allowed) {
  const roleName = user.Role[0]?.name;
  if (!allowed.includes(roleName)) {
    throw new Error('FORBIDDEN');
  }
}
