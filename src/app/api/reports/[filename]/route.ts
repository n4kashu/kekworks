import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const { filename } = params;
    const filePath = path.join(process.cwd(), 'public', filename);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Report ${filename} not found` },
        { status: 404 }
      );
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Strip HTML tags if it's an HTML file
    if (filename.toLowerCase().endsWith('.html')) {
      const strippedContent = content.replace(/<[^>]*>/g, '')
        .split('\n')
        .filter(line => line.trim() !== '')
        .join('\n');
      return new NextResponse(strippedContent);
    }

    return new NextResponse(content);
  } catch {
    return NextResponse.json(
      { error: 'Failed to read report' },
      { status: 500 }
    );
  }
}
