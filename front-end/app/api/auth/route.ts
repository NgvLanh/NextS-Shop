import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { accessToken } = await request.json();

    const cookie = await cookies();
    cookie.set('token', accessToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 1,
    });
    return NextResponse.json({
      success: true,
      message: 'Lưu thành công token vào cookie FE',
    });
  } catch (error) {
    return NextResponse.json({
      sussess: false,
      message: 'Lỗi lưu token vào cookie FE',
    });
  }
}
