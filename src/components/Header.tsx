import { motion } from "framer-motion";
import { Command as CommandIcon, Mail } from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio-data";
import { toast } from "sonner";
import { useEmailAction } from "@/hooks/use-email";

interface HeaderProps {
  onOpenPalette: () => void;
}

export function Header({ onOpenPalette }: HeaderProps) {
  const { handleEmailClick } = useEmailAction();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-40 px-4"
    >
      <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/10 bg-zinc-900/40 px-5 py-2.5 backdrop-blur-xl sm:px-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2 w-2 items-center justify-center">
            <div className="absolute h-full w-full rounded-full bg-amber-500 opacity-70 animate-ping" />
            <div className="relative h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          </div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 whitespace-nowrap">
            SAI.CHAITANYA<span className="text-primary drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">/DEV</span>
          </span>
        </div>

        <nav className="hidden items-center gap-4 md:flex">
          {[
            { label: "About", id: "about" },
            { label: "Projects", id: "projects" },
            { label: "Upcoming", id: "upcoming" },
            { label: "Achievements", id: "achievements" },
            { label: "Contact", id: "contact" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-2 text-[11px] font-bold uppercase tracking-widest text-zinc-400 transition-all hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleEmailClick}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-400 transition-all hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-500 md:hidden"
            aria-label="Email me"
          >
            <Mail className="h-4 w-4" />
          </button>
          <button
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="group flex items-center gap-1.5 sm:gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:px-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400 transition-all hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-500"
          >
            <CommandIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[9px] text-zinc-500 group-hover:text-amber-500 sm:inline">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
