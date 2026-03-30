"use client";

import { DATA } from "./data";
import Reveal from "./components/Reveal";
import SpotlightCard from "./components/SpotlightCard";
import TechGrid from "./components/TechGrid";
import AvatarSignal from "./components/AvatarSignal";
import Link from "next/link";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Code,
  BookOpen,
  Cpu,
  Mail,
  Phone,
  X,
  Target,
  CheckCircle2,
  Brain,
} from "lucide-react";

export default function Page() {
  const [activeSection, setActiveSection] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const { scrollY } = useScroll();
  const gridOpacity = useTransform(scrollY, [0, 300, 700], [1, 1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "achievements",
        "research", // Added here
        "projects",
        "experience",
        "skills",
        "contact",
      ];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (
          element &&
          element.offsetTop <= scrollPosition &&
          element.offsetTop + element.offsetHeight > scrollPosition
        ) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen text-slate-300 selection:bg-blue-500/30 relative bg-[#131314] ${selectedProject ? "overflow-hidden" : ""}`}
    >
      {/* 0. BACKGROUND GRID */}
      <motion.div
        style={{ opacity: gridOpacity }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <TechGrid />
      </motion.div>

      {/* 1. NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-[#131314]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-white text-xl font-bold tracking-tight hover:text-blue-400 transition-colors"
          >
            <span className="text-blue-500">Blue</span>
            <span className="text-white">Mind</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {/* Added "research" to the map array below */}
            {[
              "achievements",
              "research",
              "projects",
              "experience",
              "skills",
            ].map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                className={`text-sm font-medium capitalize transition-all duration-300 relative group ${
                  activeSection === section
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {section}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-blue-500 transition-all duration-300 ${
                    activeSection === section
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          <Link
            href={DATA.contact.resumeUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-200 transition-colors"
          >
            Resume <ArrowUpRight size={16} />
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <div className="relative z-10 pt-40 pb-32">
        <header className="relative text-center max-w-6xl mx-auto px-6 animate-in fade-in zoom-in duration-700">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#131314] blur-[70px] rounded-full -z-10 opacity-80 pointer-events-none"></div>

          <div className="relative mx-auto w-[400px] h-[200px] flex items-center justify-center mb-8 z-20">
            <AvatarSignal />
            <div className="relative w-32 h-32 group cursor-pointer">
              <div className="absolute inset-0 bg-blue-500 blur-[40px] opacity-20 rounded-full"></div>
              <div className="relative w-full h-full rounded-full border border-white/10 overflow-hidden bg-[#131314] flex items-center justify-center shadow-2xl">
                {DATA.avatarUrl ? (
                  <Image
                    src={DATA.avatarUrl}
                    alt={DATA.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                ) : (
                  <span>{DATA.name[0]}</span>
                )}
              </div>
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full z-30 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
          </div>

          <div className="space-y-4 relative z-20">
            <h1 className="text-5xl md:text-5xl font-bold tracking-tight text-white">
              {DATA.name}
            </h1>

            <p className="text-xl md:text-2xl text-blue-400 max-w-2xl mx-auto font-light h-8 flex items-center justify-center gap-2">
              <Typewriter
                words={DATA.roles}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={30}
                deleteSpeed={30}
                delaySpeed={2000}
              />
            </p>

            <p className="text-base text-zinc-400 max-w-lg mx-auto leading-relaxed">
              {DATA.tagline}
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-4 relative z-20">
            {DATA.contact.social?.map((s) => (
              <Link
                key={s.name}
                href={s.url}
                className="p-2.5 rounded-full bg-[#1E1F20] border border-white/5 text-zinc-400 hover:text-white hover:bg-[#2a2b2c] hover:border-blue-500/30 transition-all hover:-translate-y-1"
              >
                <s.icon size={20} />
              </Link>
            ))}
          </div>

          {DATA.stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 py-6 border-y border-white/5 bg-[#1E1F20]/50 rounded-2xl backdrop-blur-sm relative z-20 shadow-2xl">
              {DATA.stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center border-r border-white/5 last:border-0"
                >
                  <span className="text-2xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </header>
      </div>

      {/* 3. MAIN CONTENT */}
      <div className="relative z-20 bg-[#131314]">
        <div className="absolute -top-40 left-0 right-0 h-40 bg-gradient-to-t from-[#131314] to-transparent pointer-events-none"></div>

        <main className="max-w-6xl mx-auto px-6 pt-10 pb-20">
          {/* ACHIEVEMENTS */}
          <Reveal>
            <section id="achievements" className="mb-32">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                  <Award size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">Achievements</h2>
              </div>

              <div className="grid gap-8">
                {DATA.achievements?.map((cat, i) => (
                  <div key={i} className="space-y-4">
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest pl-2 border-l-2 border-blue-500">
                      {cat.category}
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cat.items.map((item, idx) => (
                        <SpotlightCard key={idx} className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-[#131314] rounded-lg text-zinc-400">
                              <Award size={24} />
                            </div>
                            <span className="text-xs font-bold bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">
                              {item.rank}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-100 mb-2 text-lg">
                            {item.title}
                          </h4>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            {item.desc}
                          </p>
                        </SpotlightCard>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* RESEARCH INTERESTS */}
          <Reveal>
            <section id="research" className="mb-32">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                  <Brain size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Research Interests
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {DATA.researchInterests?.map((item, i) => (
                  <SpotlightCard
                    key={i}
                    className="p-6 flex flex-col group transition-all duration-300 hover:border-blue-500/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-150 transition-transform duration-300 shrink-0"></div>
                      <div>
                        <h3 className="font-bold text-white text-lg mb-2 group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </section>
          </Reveal>

          {/* PROJECTS */}
          <Reveal>
            <section id="projects" className="mb-32">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                  <Code size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  FYP and International Hackathons
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DATA.projects?.map((project, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedProject(project)}
                    className="cursor-pointer h-full group"
                  >
                    <SpotlightCard className="h-full flex flex-col transition-all duration-300 group-hover:border-blue-500/30">
                      <div className="h-32 bg-[#131314] relative flex items-center justify-center overflow-hidden border-b border-white/5">
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                        <span className="text-5xl font-black text-white/5 group-hover:text-blue-500/20 transition-colors duration-500">
                          {project.title[0]}
                        </span>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h3>
                          <ArrowUpRight
                            size={16}
                            className="text-zinc-600 group-hover:text-white transition-colors"
                          />
                        </div>
                        <p className="text-sm text-zinc-400 mb-6 leading-relaxed line-clamp-2">
                          {project.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/5 rounded border border-blue-500/10"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </SpotlightCard>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* EXPERIENCE */}
          <Reveal>
            <section id="experience" className="mb-32">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                  <Briefcase size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Work and Teaching Experience
                </h2>
              </div>

              <div className="relative border-l border-white/10 ml-3 space-y-12 pb-4">
                {DATA.experience?.map((exp, i) => (
                  <div key={i} className="relative pl-12 group">
                    <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-600 group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors shadow-[0_0_0_4px_#131314]" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="font-bold text-xl text-slate-200">
                        {exp.role}
                      </h3>
                      <span className="text-sm font-mono text-zinc-500 bg-[#1E1F20] px-2 py-1 rounded border border-white/5 mt-2 sm:mt-0">
                        {exp.date}
                      </span>
                    </div>
                    <div className="text-base font-medium text-blue-400 mb-4">
                      {exp.company}
                    </div>

                    <ul className="text-sm font-medium text-zinc-400 max-w-2xl leading-relaxed space-y-2">
                      {Array.isArray(exp.desc) ? (
                        exp.desc.map((point, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-3 text-blue-500 mt-[2px] text-sm">
                              ▹
                            </span>
                            <span>{point}</span>
                          </li>
                        ))
                      ) : (
                        <p>{exp.desc}</p>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* SKILLS */}
          <Reveal>
            <section id="skills" className="mb-32">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                  <Cpu size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Technical Arsenal
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(DATA.skills).map(([category, items], i) => (
                  <div key={i}>
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <div
                          key={skill}
                          className="px-3 py-1.5 bg-[#1E1F20] border border-white/5 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-default"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* EDUCATION */}
          <Reveal>
            <section id="education" className="mb-32">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                  <BookOpen size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">Education</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {DATA.education?.map((edu, i) => (
                  <SpotlightCard key={i} className="p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white text-lg">
                        {edu.school}
                      </h3>
                      <span className="text-sm font-mono text-zinc-500 bg-[#131314] px-2 py-1 rounded border border-white/5 shrink-0 ml-4">
                        {edu.start} - {edu.end}
                      </span>
                    </div>
                    <p className="text-base text-blue-400 font-medium mb-4">
                      {edu.degree}
                    </p>
                    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                      <p className="text-sm text-zinc-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span>
                        {edu.address}
                      </p>
                      {edu.score && (
                        <p className="text-sm font-bold text-zinc-400">
                          {edu.score}
                        </p>
                      )}
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </section>
          </Reveal>

          {/* CONTACT */}
          <Reveal>
            <section id="contact" className=" relative py-10">
              <div className="absolute inset-0 -z-10 h-full w-full">
                <div
                  className="absolute inset-0 opacity-[0.3]"
                  style={{
                    backgroundImage:
                      "radial-gradient(#71717a 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                    maskImage:
                      "radial-gradient(ellipse at center, black 50%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at center, black 50%, transparent 100%)",
                  }}
                />
              </div>

              <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                  <h2 className="text-4xl md:text-4xl font-bold text-white tracking-tight">
                    Get In <span className="text-blue-500">Touch</span>
                  </h2>
                  <p className="text-base text-zinc-400 max-w-lg mx-auto">
                    Open for research collaborations, hackathons, and coffee
                    chats about Deep Learning.
                  </p>
                </div>

                <div className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <a
                      href={`mailto:${DATA.contact.email}`}
                      className="group flex flex-col items-center justify-center p-8 rounded-2xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm hover:bg-zinc-900/60 hover:border-blue-500/50 transition-all duration-300"
                    >
                      <div className="p-4 bg-zinc-800/50 rounded-full text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors mb-4">
                        <Mail size={32} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        Email
                      </h3>
                      <p className="text-base text-zinc-400 font-mono group-hover:text-blue-300 transition-colors">
                        {DATA.contact.email}
                      </p>
                    </a>

                    <div className="group flex flex-col items-center justify-center p-8 rounded-2xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm hover:bg-zinc-900/60 hover:border-blue-500/50 transition-all duration-300">
                      <div className="p-4 bg-zinc-800/50 rounded-full text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors mb-4">
                        <Phone size={32} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        Phone
                      </h3>
                      <p className="text-base text-zinc-400 font-mono group-hover:text-blue-300 transition-colors">
                        {DATA.contact.tel || "+92 310-6426-100"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {DATA.contact.social.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm hover:bg-zinc-900/60 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="p-3 bg-zinc-800/50 rounded-full text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-colors mb-3">
                          <social.icon size={24} />
                        </div>
                        <span className="text-zinc-300 font-medium group-hover:text-white transition-colors">
                          {social.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </Reveal>
        </main>

        <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-white/5 text-center flex flex-col items-center gap-4">
          <p className="text-zinc-400 text-sm">
            © {new Date().getFullYear()} {DATA.name}.
          </p>
        </footer>
      </div>

      {/* --- POPUP / MODAL COMPONENT --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#1E1F20] border border-white/10 rounded-2xl shadow-2xl p-8 md:p-12 text-slate-300"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    {selectedProject.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-mono border border-blue-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-10">
                  <section className="space-y-3">
                    <div className="flex items-center gap-2 text-white font-bold text-lg">
                      <Target className="text-blue-500" size={20} /> Research
                      Problem
                    </div>
                    <p className="text-base leading-relaxed text-zinc-400">
                      {selectedProject.content?.problem ||
                        "Details coming soon..."}
                    </p>
                  </section>

                  <section className="space-y-3">
                    <div className="flex items-center gap-2 text-white font-bold text-lg">
                      <Cpu className="text-blue-500" size={20} /> Methodology
                    </div>
                    <p className="text-base leading-relaxed text-zinc-400">
                      {selectedProject.content?.solution ||
                        "Details coming soon..."}
                    </p>
                  </section>

                  <section className="space-y-3">
                    <div className="flex items-center gap-2 text-white font-bold text-lg">
                      <CheckCircle2 className="text-blue-500" size={20} /> Key
                      Results
                    </div>
                    <p className="text-base leading-relaxed text-zinc-400">
                      {selectedProject.content?.results ||
                        "Details coming soon..."}
                    </p>
                  </section>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
