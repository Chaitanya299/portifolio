import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const host = req.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    // In a real Next.js environment, we would use the Convex HttpClient
    // or a server action. Since this is a portfolio OS, we'll guide the user
    // to the UI or provide a direct integration if Convex allows HTTP pushes.

    // For now, let's return a "Developer-friendly" success message
    // that points them to the verified system.

    return NextResponse.json({
      success: true,
      message: `Terminal inquiry received (Simulated). For verified delivery, please use the UI at ${baseUrl}#contact`,
      details: { name, email, length: message.length }
    });
  } catch (error) {
    console.error("API contact error:", error);
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const protocol = req.headers.get('x-forwarded-proto') || 'http';
  const host = req.headers.get('host') || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;

  return new NextResponse(`
Usage:
curl -X POST ${baseUrl}/api/contact \\
     -H "Content-Type: application/json" \\
     -d '{"name": "Your Name", "email": "you@example.com", "message": "Hello from the terminal!"}'
  `, { headers: { 'Content-Type': 'text/plain' } });
}
