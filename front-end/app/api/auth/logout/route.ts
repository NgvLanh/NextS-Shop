import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookie = await cookies();
  cookie.set('token', '', {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({
    success: true,
    message: 'Đã xoá token khỏi cookie (logout)',
  });
}
