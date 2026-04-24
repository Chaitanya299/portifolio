import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { PORTFOLIO } from "@/lib/portfolio-data";

export function Projects() {
  const [p1, p2, p3] = PORTFOLIO.projects;

  return (
    <section id="projects" className="relative scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-3 font-mono text-sm font-bold uppercase tracking-[0.3em] text-primary">
            / 02 — Selected Work
          </div>
          <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Three systems. Each <span className="text-primary">shipped & instrumented.</span>
          </h2>
        </motion.div>

        {/* asymmetric bento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-fr"
        >
          <ProjectCard project={p1} className="md:col-span-2" />
          <ProjectCard project={p2} className="md:col-span-1 md:row-span-2" />
          <ProjectCard project={p3} className="md:col-span-2" />
        </motion.div>
      </div>
    </section>
  );
}
