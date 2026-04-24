import { NextRequest, NextResponse } from 'next/server';
import { PORTFOLIO } from '@/lib/portfolio-data';

export async function GET(req: NextRequest) {
  const userAgent = req.headers.get('user-agent') || '';
  const isCurl = userAgent.toLowerCase().includes('curl');

  const data = {
    name: PORTFOLIO.name,
    role: PORTFOLIO.role,
    bio: PORTFOLIO.bio,
    location: PORTFOLIO.location,
    email: PORTFOLIO.email,
    socials: PORTFOLIO.socials,
    projects: PORTFOLIO.projects.map(p => ({
      title: p.title,
      tagline: p.tagline,
      stack: p.stack,
      github: p.github
    })),
    upcoming: PORTFOLIO.upcoming,
    certificates: PORTFOLIO.certificates.map(c => ({
      title: c.title,
      issuer: c.issuer
    })),
    timestamp: new Date().toISOString()
  };

  const protocol = req.headers.get('x-forwarded-proto') || 'http';
  const host = req.headers.get('host') || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;

  if (isCurl) {
    const asciiArt = `
   _____       _    _____ _           _ _                            _____  _____
  / ____|     (_)  / ____| |         (_) |                          / __  \\/ __  \\
 | (___   __ _ _  | |    | |__   __ _ _| |_ __ _ _ __  _   _  __ _ | |  | | |  | |
  \\___ \\ / _\` | | | |    | '_ \\ / _\` | | __/ _\` | '_ \\| | | |/ _\` || |  | | |  | |
  ____) | (_| | | | |____| | | | (_| | | || (_| | | | | |_| | (_| || |__| | |__| |
 |_____/ \\__,_|_|  \\_____|_| |_|\\__,_|_|\\__\\__,_|_| |_|\\__, |\\__,_| \\____/ \\____/
                                                        __/ |
                                                       |___/
    `;

    const textResponse = `
${asciiArt}
> System: Sai's Portfolio OS [Version 1.0.4]
> Status: Online & Available for Hire

[PROFILE]
Name:     ${data.name}
Role:     ${data.role}
Location: ${data.location}
Email:    ${data.email}

[BIO]
${data.bio}

[CORE PROJECTS]
${data.projects.map(p => `- ${p.title}: ${p.tagline} [${p.stack.join(', ')}]`).join('\n')}

[SOCIALS]
${data.socials.map(s => `- ${s.label}: ${s.url}`).join('\n')}

[TIPS]
- Run 'curl ${baseUrl}/api/contact' for usage instructions
- Visit ${baseUrl} for the full cinematic experience
    `;

    return new NextResponse(textResponse, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  return NextResponse.json(data);
}
