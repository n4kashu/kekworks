import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const files = fs.readdirSync(publicDir);
    const reports = files.filter(file => file.startsWith('report_') && file.endsWith('.txt'));
    
    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to list reports' }, { status: 500 });
  }
}
