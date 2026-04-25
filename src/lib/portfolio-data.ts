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
      stack: ["Python", "LiveKit", "WebRTC", "Mistral AI", "Deepgram", "FastAPI"],
      github: "https://github.com/Chaitanya299/Livekit_voiceAgent.git",
      span: "wide",
      deepDive: {
        architecture:
          "WebRTC (LiveKit) → VAD + turn detection → streaming STT → streaming LLM → streaming TTS → audio response. Orchestrated via LiveKit Agents with stateless workers and session-based context.",
        performance:
          "~300–500ms end-to-end latency via fully streaming pipeline (overlapping STT, LLM, TTS instead of sequential execution).",
        challenge:
          "Real-time interruption (barge-in): detecting intent mid-speech and cancelling in-flight generation without breaking audio continuity.",
      },
    },
    {
      id: "rag-llm",
      title: "RAG-LLM",
      tagline: "Custom RAG with LlamaIndex + Google Gemini",
      description:
        "A focused Retrieval-Augmented Generation system using LlamaIndex to process and index PDF documents for grounded, intelligent Q&A powered by Google's Generative AI.",
      stack: ["Python", "LlamaIndex", "Google Gemini", "PyPDF"],
      github: "https://github.com/Chaitanya299/RAG-LLM/tree/master",
      span: "tall",
      deepDive: {
        architecture:
          "Document ingestion via PyPDF → Semantic indexing via LlamaIndex → Query engine integration with Google Gemini Pro for grounded response synthesis.",
        performance:
          "Optimized retrieval precision by utilizing LlamaIndex's vector store index. Minimalist pipeline designed for high-fidelity extraction from complex PDF structures.",
        challenge:
          "Managing context window efficiency when querying multiple long-form documents while maintaining response latency within production-grade thresholds.",
      },
    },
    {
      id: "devops-calci",
      title: "Devops-Calci",
      tagline: "Hands-on DevOps learning platform with Node.js",
      description:
        "A Node.js calculator engineered for DevOps mastery, featuring a 6-phase implementation journey from local development to production-grade GitOps orchestration.",
      stack: ["Node.js", "Docker", "GitHub Actions", "Kubernetes", "Argo CD", "KinD"],
      github: "https://github.com/Chaitanya299/DevOps-calci.git",
      span: "square",
      deepDive: {
        architecture:
          "Node.js runtime → Multi-stage Dockerization → GitHub Actions CI (parallel matrix testing) → Kubernetes (KinD) manifests → Argo CD GitOps synchronization.",
        performance:
          "Achieved ~75% reduction in artifact size (50MB vs 200MB) via multi-stage builds. CI pipeline optimized for sub-minute execution across Node.js 18.x/20.x environments.",
        challenge:
          "Bridging the gap between manual K8s deployments and automated GitOps: configuring Argo CD for self-healing and automatic drift correction from the Git source.",
      },
    },
  ] satisfies Project[],
  upcoming: [
    {
      id: "industrial-deploy",
      title: "Industrial-Grade Deploy Pipeline",
      tagline: "AWS · GitHub Actions · Scalable Infrastructure : industrial-grade rollout",
      description:
        "Migrating this Portfolio OS to industrial-grade infrastructure using AWS to demonstrate production-level engineering. Implementing a GitHub-triggered automated project sync system and advanced cinematic animations for a high-end, scalable user experience.",
      stack: ["AWS", "GitHub Actions", "Docker", "Kubernetes", "Terraform", "ArgoCD"],
      status: "In Progress",
      eta: "Q2 2026",
    },
    {
      id: "domain-rag-builder",
      title: "Domain-Aware RAG Builder",
      tagline: "Enterprise RAG builder + domain-specific AI templates",
      description:
        "A comprehensive RAG Chatbot Builder that empowers SMEs to deploy domain-specific AI agents in under an hour. Features pre-built templates for hospitality, healthcare, and software sectors, engineered with industry-level security and data privacy protocols.",
      stack: ["Convex", "Next.js", "OpenAI", "Vector DB", "TypeScript", "Tailwind"],
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
      issuer: "",
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
      issuer: "Microsoft / upGrad",
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
