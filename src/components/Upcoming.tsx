import { Rocket, Clock } from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio-data";

const statusColor: Record<string, string> = {
  Planning: "bg-zinc-800 text-zinc-400",
  "In Progress": "bg-primary/10 text-primary border border-primary/20",
  Beta: "bg-primary/20 text-primary border border-primary/30",
  Soon: "bg-zinc-800 text-zinc-400",
};

export function Upcoming() {
  return (
    <section id="upcoming" className="relative scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <div className="mb-3 font-mono text-sm font-bold uppercase tracking-[0.3em] text-primary">
            / 03 : On the Roadmap
          </div>
          <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl">
            What I&apos;m <span className="text-primary">shipping next.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            In-flight work: production deploy pipelines and a domain-aware RAG builder.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PORTFOLIO.upcoming.map((p) => (
            <article
              key={p.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/30 p-8 transition-all hover:border-primary/30"
            >
              {/* glow */}
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/5 blur-[80px]" />
              </div>

              <div className="mb-6 flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-primary shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                  <Rocket className="h-5 w-5 animate-pulse" />
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${statusColor[p.status]}`}
                  >
                    {p.status}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    <Clock className="h-3 w-3" />
                    {p.eta}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white">
                {p.title}
              </h3>
              <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary/80">
                {p.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                {p.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-white/5 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-500"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
