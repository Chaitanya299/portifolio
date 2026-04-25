import { motion } from "framer-motion";
import { Cpu, Network, Workflow } from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio-data";

const pillars = [
  {
    icon: Cpu,
    title: "AI Engineering",
    body: "RAG, agents, fine-tuning, and inference optimization for production workloads.",
  },
  {
    icon: Network,
    title: "Realtime Systems",
    body: "Real-time streaming pipelines, WebRTC integration, and low-latency audio/video architectures for seamless AI interaction.",
  },
  {
    icon: Workflow,
    title: "Platform & Infra",
    body: "Infrastructure-as-Code, container orchestration, and automated CI/CD for secure, scalable software delivery.",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <div className="mb-3 font-mono text-sm font-bold uppercase tracking-[0.3em] text-primary">
              / 01 : About
            </div>
            <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl font-display">
              {PORTFOLIO.role} obsessed with the gap between <span className="text-primary">prototype and production.</span>
            </h2>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {pillars.map((p) => (
            <motion.div
              key={p.title}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/30 p-8 transition-all hover:border-primary/40 hover:bg-zinc-900/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.05)]"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-primary transition-all group-hover:border-primary/40 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white font-display">{p.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
