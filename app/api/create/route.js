// src/app/api/create/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import { verifyJWT } from '@/lib/jwt';
import User from '@/schema/User';
import { v4 as uuidv4 } from 'uuid';
import { apiModel } from '@/schema/Api';
import { RoleModel } from '@/schema/Role';

export async function POST(req) {
  // 1. Read token
  const token = req.cookies.get("auth-token")?.value;
  console.log(token)
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  // 2. Verify JWT
  let decoded;
  try {
    decoded = await verifyJWT(token); 
    console.log(decoded)
  } catch {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  // 3. Extract email (handle nested payload if needed)
  const userEmail = decoded.payload?.email;
  console.log(userEmail)
  await db();
  const user = await User.findOne({ email: userEmail }).populate('Role');
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // 4. Role check, create API, etc...
  if (user.Role[0]?.name !== 'developer') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
 const endpoint ='https://json-data-three.vercel.app';

  const { name } = await req.json();
  const api = await apiModel.create({
    name,
    endpoint: endpoint,
    apiKey: uuidv4(),
    createdBy: user._id,
    initialCredits: 40,
    remainingCredits: 40,
  });

  return NextResponse.json({ api }, { status: 201 });
}
