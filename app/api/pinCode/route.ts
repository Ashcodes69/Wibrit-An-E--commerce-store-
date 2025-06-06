
import { NextResponse } from 'next/server';

export async function GET() {
  const pinCodes = [110001, 560001, 834005, 400001];

  return NextResponse.json({ pinCodes });
}

