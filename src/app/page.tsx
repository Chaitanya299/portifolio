"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Achievements } from "@/components/Achievements";
import { Upcoming } from "@/components/Upcoming";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MeshBackground } from "@/components/MeshBackground";
import { CommandPalette, useCommandPalette } from "@/components/CommandPalette";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function Home() {
  const { open, setOpen } = useCommandPalette();

  return (
    <div className="relative min-h-screen text-white selection:bg-amber-500/30">
      <MeshBackground />
      <Header onOpenPalette={() => setOpen(true)} />
      <main className="relative z-10 flex flex-col overflow-x-hidden">
        <Hero onOpenPalette={() => setOpen(true)} />
        <About />
        <Projects />
        <Upcoming />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <CommandPalette open={open} onOpenChange={setOpen} />
      <ScrollToTop />
    </div>
  );
}
