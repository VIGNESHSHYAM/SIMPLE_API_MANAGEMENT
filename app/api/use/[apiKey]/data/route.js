
import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import {apiModel }from '@/schema/Api';
import { ApiUsageModel } from '@/schema/ApiUsage';

export async function GET(req, { params }) {
  await db();
  const api = await apiModel.findOne({ apiKey: params.apiKey });
  if (!api) {
    return NextResponse.json({ message: 'Invalid API key' }, { status: 404 });
  }
  if (!api.active) {
    return NextResponse.json({ message: 'API revoked' }, { status: 403 });
  }
  if (api.remainingCredits <= 0) {
    return NextResponse.json({ message: 'Credits exhausted' }, { status: 429 });
  }

  api.remainingCredits--;
  await api.save();                             

  await ApiUsageModel.create({
    api: api._id,
    user: api.createdBy,
    action: 'data',
    cost: 1,
    calledAt: new Date(),
  });

  // Proxy to Flask
  const flaskRes = await fetch(`${api.endpoint}/data`, {
    method: 'GET',
  });

  const data = await flaskRes.json().catch(() => null);
  if (!flaskRes.ok) {
    return new Response(JSON.stringify({ message: 'failed response', detail: data }), { status: flaskRes.status });
  }
  return new Response(JSON.stringify(data), { status: 200 });
}
