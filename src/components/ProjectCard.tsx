import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Code2, Terminal } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

const deepDiveSections: Array<{ key: keyof Project["deepDive"]; label: string; symbol: string }> = [
  { key: "architecture", label: "Architecture", symbol: "▲" },
  { key: "performance", label: "Performance Win", symbol: "↑" },
  { key: "challenge", label: "Key Challenge", symbol: "!" },
];

export function ProjectCard({ project, index, className = "" }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      layout
      transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/30 ${className}`}
    >
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            project<span className="text-primary">/</span>0{index}
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
        </div>
        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Code2 className="h-4 w-4" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-bold text-primary transition-all hover:bg-primary/10"
            >
              Live <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-foreground/80">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tag, idx) => (
          <span
            key={tag}
            className={`rounded-md border border-border px-2 py-0.5 font-mono text-[11px] transition-colors ${
              idx < 3
                ? "border-primary/30 bg-primary/5 text-primary shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                : "bg-muted/40 text-muted-foreground"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-5">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="group/btn flex w-full items-center justify-between gap-2 rounded-md border border-border bg-muted/30 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
          aria-expanded={expanded}
        >
          <span className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono">$ ./deep-dive --show</span>
          </span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="dive"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-3 rounded-lg border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed">
                {deepDiveSections.map((s) => (
                  <div key={s.key}>
                    <div className="mb-1 flex items-center gap-2 text-primary">
                      <span>{s.symbol}</span>
                      <span className="uppercase tracking-wider">{s.label}</span>
                    </div>
                    <p className="pl-5 text-muted-foreground">{project.deepDive[s.key]}</p>
                  </div>
                ))}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 pl-5 pt-1 text-primary hover:underline"
                  >
                    open repo <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
