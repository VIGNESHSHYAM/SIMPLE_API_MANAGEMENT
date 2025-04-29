// src/app/api/list/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import { apiModel } from '@/schema/Api';

export async function GET() {
  await db();
  const apis = await apiModel.find().select(); // hide keys
  return NextResponse.json({ apis });
}
