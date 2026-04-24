"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, CheckCircle2, Trophy, Star, ChevronDown, ChevronUp, Terminal } from "lucide-react";
import { PORTFOLIO, type Certificate } from "@/lib/portfolio-data";

function CertificateCard({ cert }: { cert: Certificate }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group relative flex flex-col rounded-2xl border border-white/5 bg-zinc-900/20 p-8 transition-all hover:border-primary/40 hover:bg-zinc-900/40"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="h-12 w-12 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all">
          <Award className="h-6 w-6" />
        </div>
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full border border-white/5 bg-white/5 text-zinc-500 hover:text-primary hover:border-primary/30 transition-all"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
        {cert.title}
      </h3>
      <p className="text-sm font-mono text-zinc-500 mb-6 uppercase tracking-wider italic">
        Issued by {cert.issuer}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="group/btn mb-0 flex w-full items-center justify-between gap-2 rounded-md border border-white/5 bg-white/5 px-3 py-2 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:bg-white/10"
      >
        <span className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-zinc-400 group-hover/btn:text-white transition-colors">./view-learnings --show</span>
        </span>
        {expanded ? <ChevronUp className="h-3.5 w-3.5 text-primary" /> : <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="space-y-3 pt-6 border-t border-white/5 mt-4">
              {cert.learnings.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5 opacity-60" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="relative scroll-mt-24 px-4 py-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <div className="mb-3 font-mono text-sm font-bold uppercase tracking-[0.3em] text-primary">
            / 04 — Achievements
          </div>
          <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Certifications & <span className="text-primary">Global Recognition.</span>
          </h2>
          <p className="mt-4 max-w-xl text-zinc-400">
            Validated expertise through industry-standard certifications and consistent excellence in extracurricular pursuits.
          </p>
        </div>

        {/* Certificates Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
        >
          {PORTFOLIO.certificates.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </motion.div>

        {/* Activities & Hobbies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5"
        >
          {PORTFOLIO.activities.map((activity, idx) => {
            const icons = [<Star key="star" className="h-4 w-4 text-primary" />, <Trophy key="trophy" className="h-4 w-4 text-primary" />, <SparklesIcon key="sparkles" className="h-4 w-4 text-primary" />];
            return (
              <div key={idx} className="bg-background/40 p-8 hover:bg-zinc-900/40 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  {icons[idx % icons.length]}
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    {activity.title}
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-zinc-300">
                  {activity.description}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}
