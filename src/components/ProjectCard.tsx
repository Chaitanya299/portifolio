"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Code2, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  deepDive: {
    architecture: string;
    performance: string;
    challenge: string;
  };
}

export function ProjectCard({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-lg dark:bg-zinc-900/50">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href={`https://github.com/Chaitanya299/${project.github}`} target="_blank" rel="noopener noreferrer">
                <Code2 className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <CardDescription className="text-sm text-zinc-500 dark:text-zinc-400">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t} variant="secondary" className="bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
              {t}
            </Badge>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          Technical Deep Dive
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4 text-sm border-t border-zinc-100 dark:border-zinc-800">
                <div>
                  <h4 className="font-semibold mb-1 text-zinc-900 dark:text-zinc-100">Architecture</h4>
                  <p className="text-zinc-600 dark:text-zinc-400">{project.deepDive.architecture}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-zinc-900 dark:text-zinc-100">Performance</h4>
                  <p className="text-zinc-600 dark:text-zinc-400">{project.deepDive.performance}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-zinc-900 dark:text-zinc-100">Key Challenge</h4>
                  <p className="text-zinc-600 dark:text-zinc-400">{project.deepDive.challenge}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
