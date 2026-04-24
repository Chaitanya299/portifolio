import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import {
  Mail,
  Sun,
  Moon,
  ArrowRight,
  User,
  Send,
  Rocket,
  Terminal,
  Code2,
  Award,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PORTFOLIO } from "@/lib/portfolio-data";
import { toast } from "sonner";
import { getBaseUrl } from "@/lib/utils";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    toast.success(`Navigated to ${id.charAt(0).toUpperCase() + id.slice(1)}`);
  }
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const { theme, setTheme } = useTheme();

  const run = useCallback(
    (fn: () => void) => {
      onOpenChange(false);
      setTimeout(fn, 80);
    },
    [onOpenChange],
  );

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    toast.success(`Theme switched to ${nextTheme} mode`);
  };

  const copyMeUrl = () => {
    const baseUrl = getBaseUrl();
    navigator.clipboard.writeText(`curl ${baseUrl}/api/me.json`);
    toast.success("Command copied to clipboard!");
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${PORTFOLIO.email}`;
    toast.info("Opening your email client...");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]"
      onClick={() => onOpenChange(false)}
    >
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-zinc-900/90 shadow-2xl backdrop-blur-xl ring-1 ring-primary/10"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="[&_[cmdk-input-wrapper]]:flex [&_[cmdk-input-wrapper]]:items-center [&_[cmdk-input-wrapper]]:border-b [&_[cmdk-input-wrapper]]:border-white/5 [&_[cmdk-input-wrapper]]:px-4">
          <div cmdk-input-wrapper="">
            <Terminal className="mr-3 h-4 w-4 text-zinc-500" />
            <Command.Input
              placeholder="Type a command or search…"
              className="font-mono flex h-12 w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
            />
            <kbd className="ml-2 hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 sm:inline">
              ESC
            </kbd>
          </div>
          <Command.List className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
            <Command.Empty className="py-6 text-center text-sm text-zinc-600">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Navigate"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-zinc-600"
            >
              <Item icon={<User className="h-4 w-4" />} onSelect={() => run(() => scrollToId("about"))}>
                About
              </Item>
              <Item icon={<Code2 className="h-4 w-4" />} onSelect={() => run(() => scrollToId("projects"))}>
                Projects
              </Item>
              <Item icon={<Rocket className="h-4 w-4" />} onSelect={() => run(() => scrollToId("upcoming"))}>
                Upcoming
              </Item>
              <Item icon={<Award className="h-4 w-4" />} onSelect={() => run(() => scrollToId("achievements"))}>
                Achievements
              </Item>
              <Item icon={<Send className="h-4 w-4" />} onSelect={() => run(() => scrollToId("contact"))}>
                Contact
              </Item>
            </Command.Group>

            <Command.Group
              heading="Theme"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-zinc-600"
            >
              <Item icon={<Sun className="h-4 w-4" />} onSelect={() => run(toggleTheme)}>
                Toggle theme (light / dark)
                <Moon className="ml-2 h-3.5 w-3.5 text-zinc-600" />
              </Item>
            </Command.Group>

            <Command.Group
              heading="Links"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-zinc-600"
            >
              <Item
                icon={<GithubIcon className="h-4 w-4" />}
                onSelect={() => run(() => window.open(PORTFOLIO.socials[0].url, "_blank"))}
              >
                GitHub
                <ArrowRight className="ml-auto h-3.5 w-3.5 text-zinc-600" />
              </Item>
              <Item
                icon={<LinkedinIcon className="h-4 w-4" />}
                onSelect={() => run(() => window.open(PORTFOLIO.socials[1].url, "_blank"))}
              >
                LinkedIn
                <ArrowRight className="ml-auto h-3.5 w-3.5 text-zinc-600" />
              </Item>
              <Item
                icon={<Mail className="h-4 w-4" />}
                onSelect={() => run(handleEmailClick)}
              >
                Email
                <ArrowRight className="ml-auto h-3.5 w-3.5 text-zinc-600" />
              </Item>
              <Item
                icon={<Terminal className="h-4 w-4" />}
                onSelect={() => run(copyMeUrl)}
              >
                <span className="font-mono text-xs">curl /api/me.json</span>
              </Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

function Item({
  children,
  onSelect,
  icon,
}: {
  children: React.ReactNode;
  onSelect: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-zinc-400 outline-none aria-selected:bg-white/5 aria-selected:text-white"
    >
      <span className="text-zinc-500">{icon}</span>
      {children}
    </Command.Item>
  );
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return { open, setOpen };
}
