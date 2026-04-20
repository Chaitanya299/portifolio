import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'src/data/projects.json');
    const projects = JSON.parse(await fs.readFile(dataPath, 'utf8'));

    return NextResponse.json({
      name: "Sai Chaitanya Parasana",
      role: "Full Stack & AI Engineer",
      projects: projects,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 });
  }
}
