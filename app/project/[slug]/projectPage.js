"use client";

import { DATA } from "../../data";
import { useParams } from "next/navigation";
import Reveal from "../../components/Reveal";
import { ArrowLeft, Cpu, Target, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ProjectPage() {
  const { slug } = useParams();

  // This finds the project in your data.js projects array that matches the URL slug
  const project = DATA.projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#131314] flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Project Not Found</h1>
          <Link href="/" className="text-blue-400 hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131314] text-slate-300 pb-20">
      {/* SIMPLE NAV */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#131314]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} /> Back to Research
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32">
        <Reveal>
          <div className="space-y-12">
            {/* HEADER */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-mono border border-blue-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CONTENT PLACEHOLDERS (We will fill these later) */}
            <div className="grid gap-16 pt-10 border-t border-white/5">
              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white font-bold text-2xl">
                  <Target className="text-blue-500" size={28} />
                  Research Problem
                </div>
                <p className="text-lg leading-relaxed text-zinc-400">
                  {/* This is where you will add your "Problem" text later */}
                  Investigating the challenges and limitations addressed by{" "}
                  {project.title}.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white font-bold text-2xl">
                  <Cpu className="text-blue-500" size={28} />
                  Architecture & Methodology
                </div>
                <p className="text-lg leading-relaxed text-zinc-400">
                  {/* This is where you will add your "Method" text later */}
                  Detailed breakdown of the algorithms and architectural
                  choices.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3 text-white font-bold text-2xl">
                  <CheckCircle2 className="text-blue-500" size={28} />
                  Key Results
                </div>
                <p className="text-lg leading-relaxed text-zinc-400">
                  {/* This is where you will add your "Results" text later */}
                  Quantitative performance metrics and real-world impact.
                </p>
              </section>
            </div>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
