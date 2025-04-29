// src/app/api/use/[apiKey]/_middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { db } from '@/config/db';
import { apiModel } from '@/schema/Api';
import { ApiUsageModel } from '@/schema/ApiUsage';

export async function middleware(req) {
  const match = req.nextUrl.pathname.match(/use\/([^/]+)/);
  if (!match || !match.groups) return NextResponse.json({ message: 'Invalid path' }, { status: 400 });
  const { apiKey } = match.groups;
  await db();

  const api = await apiModel.findOne({ apiKey });
  if (!api) return NextResponse.json({ message: 'Invalid API key' }, { status: 404 });
  if (api.remainingCredits <= 0)
    return NextResponse.json({ message: 'Credits exhausted' }, { status: 429 });

  // decrement
  api.remainingCredits--;
  await api.save();

  // record usage
  const action = req.nextUrl.pathname.split('/').pop(); // upload|swap|output
  const userAgent = req.headers.get('user-agent');
  await ApiUsageModel.create({
    api: api._id,
    user: api.createdBy,
    action,
    cost: 1,
  });

  return NextResponse.next();
}

// apply only to /api/use/:apiKey/*
export const config = { matcher: '/api/use/:apiKey/*' };
