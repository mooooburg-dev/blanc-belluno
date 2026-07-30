import { NextRequest, NextResponse } from 'next/server';
import { refreshLongLivedToken, saveAccessToken } from '@/lib/instagram';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const newToken = await refreshLongLivedToken();

  if (!newToken) {
    return NextResponse.json(
      { success: false, message: '토큰 갱신 실패 — 새 토큰을 발급받아야 합니다.' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: '토큰 갱신 완료',
    tokenPrefix: newToken.slice(0, 10) + '...',
  });
}

export async function POST(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { token } = await request.json();
    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: '토큰이 필요합니다.' }, { status: 400 });
    }

    const saved = await saveAccessToken(token);
    if (!saved) {
      return NextResponse.json({ error: 'Supabase 저장 실패' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: '토큰 저장 완료',
      tokenPrefix: token.slice(0, 10) + '...',
    });
  } catch {
    return NextResponse.json({ error: '잘못된 요청' }, { status: 400 });
  }
}
