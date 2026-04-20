import { ProjectCard } from "@/components/ProjectCard";
import { CommandPalette } from "@/components/CommandPalette";
import { InquiryForm } from "@/components/InquiryForm";
import { Code2, Terminal, Mail, ArrowUpRight } from "lucide-react";
import projectsData from "@/data/projects.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <CommandPalette />

      {/* Hero Section */}
      <section className="container max-w-5xl mx-auto pt-24 pb-16 px-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Sai Chaitanya Parasana
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl">
              Full Stack & AI Engineer specializing in Backend, DevOps, and Scalable Systems.
            </p>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/Chaitanya299" target="_blank" rel="noopener" className="flex items-center gap-1.5 text-sm font-medium hover:text-zinc-500 transition-colors">
              <Code2 className="h-4 w-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/saichaitanyaparasana" target="_blank" rel="noopener" className="flex items-center gap-1.5 text-sm font-medium hover:text-zinc-500 transition-colors">
              <Terminal className="h-4 w-4" /> LinkedIn
            </a>
            <a href="mailto:chaitany.sai311@gmail.com" className="flex items-center gap-1.5 text-sm font-medium hover:text-zinc-500 transition-colors">
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
        </div>
      </section>

      {/* Bento Grid Projects */}
      <section id="projects" className="container max-w-5xl mx-auto py-16 px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          <span className="text-sm text-zinc-500 flex items-center gap-1">
            Fetched via GitHub API <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, idx) => (
            <div key={project.id} className={idx === 0 ? "md:col-span-2" : ""}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="contact" className="container max-w-5xl mx-auto py-24 px-6 border-t border-zinc-100 dark:border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Let&apos;s talk shop</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
              Whether you&apos;re looking for a technical lead for your next startup,
              an engineer for a Big Tech team, or have a freelance project in mind,
              I&apos;m always open to new opportunities.
            </p>
            <div className="pt-4 text-xs font-mono text-zinc-400">
              Try <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-600 dark:text-zinc-300">curl your-domain.com/api/me</code>
            </div>
          </div>
          <InquiryForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="container max-w-5xl mx-auto py-8 px-6 text-center text-zinc-400 text-sm">
        <p>© {new Date().getFullYear()} • Built with Next.js & Framer Motion</p>
      </footer>
    </main>
  );
}
