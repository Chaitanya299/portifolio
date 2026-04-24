# System Architecture: Sai's Portfolio OS

This document outlines the technical decisions and architectural patterns used to build this high-end developer portfolio.

## 1. The Frontend Stack
- **Framework**: Next.js 16 (App Router). We leverage React Server Components (RSC) to minimize client-side JavaScript and optimize SEO.
- **Styling**: Tailwind CSS v4. A custom theme was built using **OKLCH** color spaces for precise golden/amber cinematic lighting.
- **Animations**: Framer Motion. Used for staggered layout entries and interactive "technical deep dive" transitions.

## 2. The Real-time Backend (Convex)
Instead of a traditional database, we use **Convex** for:
- **Reactivity**: Every piece of data on the site is live. If the owner updates a project description in the dashboard, the site updates instantly for all visitors.
- **RAG Readiness**: The `documents` schema is designed for vector embeddings, enabling a domain-aware RAG chatbot to answer recruiter questions about the owner's experience.

## 3. DevOps & Deployment
- **Containerization**: A multi-stage `Dockerfile` separates the build environment from the production runtime, leveraging Next.js's `standalone` output for minimal image size.
- **Orchestration**: Kubernetes manifests include:
    - **Liveness/Readiness Probes**: Wired to `/api/health`.
    - **Secrets Management**: Patterned for GITHUB_TOKEN and CONVEX_URL integration.
- **Cloud Readiness**: Optimized for AWS EKS or Vercel Edge.

## 4. High-Signal "Easter Eggs"
- **Public API**: The `/api/me` route serves a structured JSON response. It signals to recruiters that the site is not just a UI, but a well-designed technical system.
- **Command Palette**: Implemented using `cmdk`, providing a "power-user" navigation experience common in professional IDEs and tools.

## 5. Data Flow
```ascii
[ User ] <--> [ Next.js Frontend ] <--> [ Convex Edge Functions ]
                    ^                         ^
                    |                         |
              [ GitHub API ]            [ Portfolio DB ]
```
