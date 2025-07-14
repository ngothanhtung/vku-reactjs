import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters from URL
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const path = searchParams.get('path');
    const tag = searchParams.get('tag');

    // Check for secret to confirm this is a valid request
    if (secret !== 'nextjs-revalidate-secret') {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path: path,
        now: Date.now(),
      });
    }

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({
        revalidated: true,
        tag: tag,
        now: Date.now(),
      });
    }
    return NextResponse.json({ message: 'No path or tag provided for revalidation' }, { status: 400 });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
