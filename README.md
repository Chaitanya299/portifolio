# Sai's Portfolio OS

A high-end technical portfolio built for Big Tech visibility, featuring real-time AI capabilities, a hardened communication layer, and a cinematic "OS-inspired" interface.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Backend:** Convex (Real-time DB & Serverless Functions)
- **Styling:** Tailwind CSS 4 (OKLCH Color Space)
- **Animations:** Framer Motion
- **Components:** Radix UI + Lucide Icons
- **Email:** Resend (Verified Forwarding)
- **Monitoring:** Sonner (Global Toast System)

## 🛡️ Reliability & Security (Guard Rails)

The inquiry system is hardened with industry-standard protection layers:

1.  **DDoS Prevention:** Platform-level protection via Convex + Application-layer rate limiting.
2.  **Strict Input Validation:** Client-side Zod schemas matched with server-side Regex and type enforcement.
3.  **Rate Limiting:** Submissions are capped at 3 inquiries per hour per email address.
4.  **Bot Protection (Honeypot):** Low-friction hidden field detection to block automated spam without impacting UX.
5.  **Sanitization:** Complete input trimming and character slicing to prevent injection attacks.
6.  **Email Abuse Protection:** Fixed templates and verified sender logic to prevent mail relay abuse.
7.  **Error Handling:** Production-safe error boundaries that don't leak internal stack traces or server state.
8.  **Payload Size Limits:** Hard 5KB limit on incoming request bodies to prevent memory exhaustion.
9.  **CORS & Method Guard:** Strict enforcement of authorized origin and mutation methods.
10. **UX Guard Rails:**
    - Instant button disabling on submit to prevent double-click race conditions.
    - Cinematic loading states for real-time feedback.
    - Form auto-reset only upon verified success.
    - Persistent success notifications via Sonner.

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- A Convex account (`npx convex dev`)
- A Resend API key (for email forwarding)

### Installation
```bash
npm install
npx convex dev
npm run dev
```

## 🏗️ Architecture

This project follows **Domain-Driven Design (DDD)** principles with bounded contexts for UI modules (Hero, Projects, Contact, etc.). All data is centralized in `src/lib/portfolio-data.ts` and synchronized with the Convex cloud for real-time interactivity.

---

🤖 *Powered by the Sai Portfolio OS Core*
