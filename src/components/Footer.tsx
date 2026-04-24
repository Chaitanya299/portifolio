import { GithubIcon, LinkedinIcon } from "./Icons";
import { Mail, Terminal } from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio-data";
import { toast } from "sonner";
import { getBaseUrl } from "@/lib/utils";

export function Footer() {
  const baseUrl = getBaseUrl();
  const curlUrl = `curl ${baseUrl}/api/me.json`;

  return (
    <footer className="relative border-t border-white/10 px-4 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
        <div>
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">
            © {new Date().getFullYear()} {PORTFOLIO.name}
          </div>
          <div className="mt-2 text-sm text-zinc-400">
            Crafting technical software for high-impact teams.
          </div>
        </div>

        <div className="relative z-30 flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              navigator.clipboard.writeText(curlUrl);
              toast.success("Command copied to clipboard!");
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/50 px-4 py-2 font-mono text-[11px] text-zinc-400 transition-all hover:border-amber-500/40 hover:text-white"
          >
            <Terminal className="h-3.5 w-3.5 text-amber-500" />
            curl /api/me.json
          </button>
          <a
            href={PORTFOLIO.socials[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 bg-zinc-900/50 p-2.5 text-zinc-400 transition-all hover:border-amber-500/40 hover:text-white"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4.5 w-4.5" />
          </a>
          <a
            href={PORTFOLIO.socials[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 bg-zinc-900/50 p-2.5 text-zinc-400 transition-all hover:border-amber-500/40 hover:text-white"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-4.5 w-4.5" />
          </a>
          <a
            href={`mailto:${PORTFOLIO.email}`}
            onClick={() => toast.info("Opening your email client...")}
            className="rounded-full border border-white/10 bg-zinc-900/50 p-2.5 text-zinc-400 transition-all hover:border-amber-500/40 hover:text-white"
            aria-label="Email me"
          >
            <Mail className="h-4.5 w-4.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
