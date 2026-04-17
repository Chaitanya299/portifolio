# Quality Standards

## Code Quality
- **TypeScript**: Strict mode enabled. No `any` types.
- **Components**: Functional components with clean prop types.
- **Linting**: Follow Next.js default ESLint configuration.
- **Formatting**: Standard Prettier settings.

## Architecture
- **Server Components**: Use React Server Components (RSC) by default for better performance.
- **Security**: GitHub tokens and other secrets MUST stay on the server. Never expose via client-side environment variables.
- **API**: Use Next.js Route Handlers for the `/api/me` proxy.

## UI/UX
- **Performance**: Target 100/100 Lighthouse scores.
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation (Cmd+K).
- **Responsiveness**: Mobile-first design using Tailwind CSS breakpoints.
- **Interactions**: Subtle Framer Motion animations with `prefers-reduced-motion` respect.
