import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Mail } from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio-data";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { useEmailAction } from "@/hooks/use-email";

export function Hero({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { handleEmailClick } = useEmailAction();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-32 pb-20 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mb-12 flex justify-center">
          <button
            onClick={onOpenPalette}
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-zinc-900/50 px-5 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400 transition-all hover:border-primary/40 hover:text-primary"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span>Press</span>
            <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold">⌘K</kbd>
            <span>to navigate</span>
          </button>
        </div>

        <div className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-primary">
          Hi, my name is
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-balance text-6xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[8rem] font-display"
        >
          Sai Chaitanya
          <br />
          <span className="text-gradient drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">Parasana.</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="mt-8 text-balance text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl md:text-4xl font-display"
        >
          I build <span className="text-white">AI-native systems</span> with precision.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-3xl text-balance text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          {PORTFOLIO.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-12 flex flex-col items-center gap-10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-black transition-all hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
            >
              View projects
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/5 active:scale-95 w-full sm:w-auto"
            >
              Hire me
            </a>
          </div>

          <div className="relative z-30 flex items-center gap-6">
            <a
              href={PORTFOLIO.socials[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-zinc-500 transition-colors hover:text-white"
            >
              <GithubIcon className="h-5 w-5" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest transition-opacity group-hover:opacity-100 opacity-0 sm:opacity-0 sm:group-hover:opacity-100">GitHub</span>
            </a>
            <a
              href={PORTFOLIO.socials[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-zinc-500 transition-colors hover:text-white"
            >
              <LinkedinIcon className="h-5 w-5" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest transition-opacity group-hover:opacity-100 opacity-0 sm:opacity-0 sm:group-hover:opacity-100">LinkedIn</span>
            </a>
            <button
              onClick={handleEmailClick}
              className="group flex items-center gap-2 text-zinc-500 transition-colors hover:text-white"
            >
              <Mail className="h-5 w-5" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest transition-opacity group-hover:opacity-100 opacity-0 sm:opacity-0 sm:group-hover:opacity-100">Email</span>
            </button>
          </div>
        </motion.div>

        <div className="mx-auto mt-24 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5">
          {[
            { k: "Stack", v: "AI · Cloud · DevOps" },
            { k: "Focus", v: "End-to-End Solutions" },
            { k: "Status", v: "Available", live: true },
          ].map((s) => (
            <div key={s.k} className="bg-black/40 px-6 py-5 text-left backdrop-blur-sm relative group/stat">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                {s.k}
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                {s.live && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
                <div className="truncate text-sm font-semibold text-zinc-300">{s.v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
