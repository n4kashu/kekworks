import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const files = fs.readdirSync(publicDir)
      .filter(file => file.startsWith('report_') && (file.endsWith('.html') || file.endsWith('.txt')));
    
    return NextResponse.json(files);
  } catch {
    return NextResponse.json({ error: 'Failed to list reports' }, { status: 500 });
  }
}
