export interface TechTag {
  label: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
  span: "wide" | "tall" | "square";
  deepDive: {
    architecture: string;
    performance: string;
    challenge: string;
  };
}

export interface UpcomingProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  status: "Planning" | "In Progress" | "Beta" | "Soon";
  eta: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  link: string;
  learnings: string[];
}

export interface Activity {
  title: string;
  description: string;
}

export interface Social {
  label: string;
  url: string;
}

export const PORTFOLIO = {
  name: "Sai Chaitanya Parasana",
  short: "Sai Chaitanya",
  role: "Full Stack & AI Engineer",
  bio: "I design and deploy AI-native systems with a focus on real-time inference, high-throughput RAG architectures, and automated DevOps infrastructure.",
  location: "Available for high-impact technical roles & freelance",
  email: "chaitanya.sai311@gmail.com",
  socials: [
    { label: "GitHub", url: "https://github.com/Chaitanya299" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/saichaitanyaparasana" },

    { label: "Email", url: "mailto:chaitanya.sai311@gmail.com" },
  ] satisfies Social[],
  projects: [
    {
      id: "livekit-voice-agent",
      title: "Livekit_voiceAgent",
      tagline: "Real-time voice AI on WebRTC",
      description:
        "Sub-300ms voice agent built on LiveKit + WebRTC with streaming STT, LLM reasoning, and TTS pipelined for natural turn-taking.",
      stack: ["Python", "LiveKit", "WebRTC", "OpenAI", "Deepgram", "FastAPI"],
      github: "https://github.com/chaitanya299/livekit-voice-agent",
      span: "wide",
      deepDive: {
        architecture:
          "WebRTC ingress → Deepgram streaming STT → GPT-4o function-calling → ElevenLabs TTS → SFU egress. Stateless workers behind Redis-backed session store.",
        performance:
          "Median end-to-end latency 280ms by parallelizing TTS first-byte with LLM token streaming. 4× concurrency vs naive serial pipeline.",
        challenge:
          "Interruption handling: detecting barge-in within 80ms while the agent is still speaking required custom VAD on the inbound audio frame buffer.",
      },
    },
    {
      id: "rag-llm",
      title: "RAG-LLM",
      tagline: "Production RAG with LlamaIndex + FAISS",
      description:
        "Hybrid retrieval engine combining BM25, dense FAISS vectors, and re-ranking for grounded enterprise Q&A over private docs.",
      stack: ["Python", "LlamaIndex", "FAISS", "Cohere", "Postgres", "Docker"],
      github: "https://github.com/chaitanya299/rag-llm",
      span: "tall",
      deepDive: {
        architecture:
          "Chunking via semantic splitter → dual indices (BM25 + FAISS HNSW) → Cohere rerank top-50 → GPT-4o answer synthesis with citation enforcement.",
        performance:
          "Recall@10 improved from 0.71 (dense-only) to 0.93 (hybrid + rerank). p95 query latency 740ms over 2M chunks.",
        challenge:
          "Citation hallucination — solved by constrained decoding: the model can only emit chunk-IDs present in the retrieved context window.",
      },
    },
    {
      id: "devops-calci",
      title: "Devops-Calci",
      tagline: "Containerized CI/CD reference app",
      description:
        "A deceptively simple calculator wired into a full DevOps loop — multi-stage Docker, GitHub Actions, image signing, k8s rollout.",
      stack: ["Docker", "GitHub Actions", "Kubernetes", "Cosign", "Trivy"],
      github: "https://github.com/chaitanya299/devops-calci",
      span: "square",
      deepDive: {
        architecture:
          "Multi-stage Dockerfile → Trivy scan → Cosign keyless signing via OIDC → push to GHCR → ArgoCD sync to k8s with progressive rollout.",
        performance:
          "Build time cut from 3m20s to 38s via BuildKit cache mounts and dependency layer pinning. Image size 14MB on distroless base.",
        challenge:
          "Achieving SLSA Level 3 provenance without a private signing key — solved with sigstore keyless OIDC flow tied to the GHA workflow identity.",
      },
    },
  ] satisfies Project[],
  upcoming: [
    {
      id: "industrial-deploy",
      title: "Industrial-Grade Deploy Pipeline",
      tagline: "Docker · Kubernetes · AWS — production-grade rollout stack",
      description:
        "An opinionated reference deployment: multi-stage Docker images pushed to ECR, GitOps-driven rollouts on EKS, Terraform-provisioned VPC + IAM, ALB ingress with cert-manager, and full observability via CloudWatch + Prometheus + Grafana. Zero-downtime blue/green via Argo Rollouts.",
      stack: ["Docker", "Kubernetes", "AWS EKS", "Terraform", "ArgoCD", "Prometheus"],
      status: "In Progress",
      eta: "Q2 2026",
    },
    {
      id: "domain-rag-convex",
      title: "Domain-Aware RAG Chatbot",
      tagline: "Convex-backed retrieval + realtime chat over your private docs",
      description:
        "A multi-tenant RAG chatbot where each domain (workspace) owns its embeddings, source docs, and chat history in Convex. Streaming LLM responses, citation-locked answers, and a live admin dashboard for ingestion, eval runs, and per-domain analytics. Built for teams that want a private ChatGPT over their own knowledge base.",
      stack: ["Convex", "Next.js", "OpenAI", "pgvector", "TypeScript", "Tailwind"],
      status: "Beta",
      eta: "Q1 2026",
    },
  ] satisfies UpcomingProject[],
  certificates: [
    {
      id: "aws-cloud",
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      link: "https://drive.google.com/file/d/1QvxkMBhskNkW-y7IkX7a-S5FKO_5VwdQ/view",
      learnings: [
        "Mastered fundamental cloud concepts and global infrastructure.",
        "Deep understanding of security, compliance, and the shared responsibility model.",
        "Proficiency in core AWS services and billing/pricing structures."
      ],
    },
    {
      id: "azure-ai",
      title: "Azure AI Fundamentals",
      issuer: "Microsoft",
      link: "https://drive.google.com/file/d/1XSeJ27istaznc6wHCDkI-vkB5yw9XGTR/view",
      learnings: [
        "Explored AI workloads and common machine learning principles on Azure.",
        "Gained expertise in computer vision and natural language processing (NLP).",
        "Applied responsible AI practices in cloud-based solution design."
      ],
    },
    {
      id: "mastering-django",
      title: "Mastering Django",
      issuer: "Technical Training",
      link: "https://drive.google.com/file/d/1tLHtUUc0AuF4MBiPEFOtXAuEtBbmDvou/view",
      learnings: [
        "Built scalable, secure web applications using Python's primary framework.",
        "Implemented clean architectural patterns and rapid development workflows.",
        "Mastered ORM, authentication, and high-performance server-side rendering."
      ],
    },
    {
      id: "gen-ai",
      title: "Generative AI Foundations",
      issuer: "AI Research",
      link: "https://drive.google.com/file/d/10_Y8CUsY8J6t8ABM_AxVL5df1rZ3wcRa/view",
      learnings: [
        "Advanced prompt engineering techniques for high-fidelity LLM outputs.",
        "Understanding of transformer architectures and fine-tuning strategies.",
        "Explored AI ethics, safety, and system-level mitigation patterns."
      ],
    },
  ] satisfies Certificate[],
  activities: [
    {
      title: "Financial Engineering",
      description: "Keen interest in financial education and literacy. Good understanding of financial accounting and analysis."
    },
    {
      title: "International Martial Arts",
      description: "International Martial Arts winner and Brown belt holder. Disciplined in precision and focus."
    },
    {
      title: "Endeavors & Hobbies",
      description: "Actively up-skilling in modern technologies. Enthusiast of book reading, horse riding, and swimming."
    }
  ] satisfies Activity[],
} as const;

export type Portfolio = typeof PORTFOLIO;
