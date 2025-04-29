// src/app/api/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import { getUserFromRequest, requireRole } from '@/lib/auth';
import { apiModel } from '@/schema/Api';

export async function DELETE(req, { params }) {
  try {
    await db();
    const user = await getUserFromRequest(req);
    requireRole(user, 'developer');

    const api = await apiModel.findById(params.id);
    console.log(api)
    if (!api || api.createdBy.toString() !== user._id.toString()) {
      return NextResponse.json({ message: 'Not found or unauthorized' }, { status: 404 });
    }

    await api.deleteOne();
    api.active = false;
    await api.save();                
    return NextResponse.json({ message: 'Deleted', api });
  } catch (err) {
    if (err.message === 'NO_TOKEN' || err.message === 'NO_USER')
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    if (err.message === 'FORBIDDEN')
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    console.error(err);
    return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
  }
}
