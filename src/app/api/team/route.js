import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Welcome to the StreetSense API',
    status: 'success',
    timestamp: new Date().toISOString(),
    version: '1.0'
  });
}
