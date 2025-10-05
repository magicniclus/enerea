import { NextResponse } from 'next/server';
import { config } from '@/lib/config';

export async function GET() {
  try {
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error reading site config:', error);
    return NextResponse.json(
      { error: 'Failed to read site config' },
      { status: 500 }
    );
  }
}
