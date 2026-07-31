import { NextResponse } from 'next/server';

const MC4WP_FORM_ID = '102861';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown };
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    const params = new URLSearchParams({
      EMAIL: email,
      _mc4wp_form_id: MC4WP_FORM_ID,
      _mc4wp_form_element_id: 'mc4wp-form-1',
      _mc4wp_timestamp: String(Math.floor(Date.now() / 1000)),
    });

    const upstream = await fetch(
      'https://www.annabelkarmel.com/wp-admin/admin-ajax.php?action=mc4wp-form',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      },
    );

    const data = (await upstream.json().catch(() => null)) as {
      success?: boolean;
      data?: { message?: string };
    } | null;

    if (!upstream.ok || data?.success === false) {
      return NextResponse.json(
        {
          error:
            data?.data?.message ??
            'Something went wrong. Please try again later.',
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    );
  }
}
