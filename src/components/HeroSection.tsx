import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code2, Sparkles, Terminal, FileText, Send, ChevronRight } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

const ROLES = [
  'Full Stack Developer',
  'MERN Stack Specialist',
  'Python Game Developer',
  'Anime & UI Architect',
  'Creative Problem Solver',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect loop
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        setDisplayText((prev) =>
          isDeleting
            ? currentRole.substring(0, prev.length - 1)
            : currentRole.substring(0, prev.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const scrollToProjects = () => {
    cyberAudio.playClick();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    cyberAudio.playClick();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top Status HUD Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/50 glass-panel mb-8 text-xs font-mono-code text-cyan-300 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-gray-300">STATUS:</span>
          <span className="text-cyan-400 font-bold">READY FOR HIRE</span>
          <span className="text-purple-400">|</span>
          <span className="text-purple-300">NEO-TOKYO CORE v2.4</span>
        </motion.div>

        {/* Main Heading "Hi, I'm Yakavan" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-4"
        >
          <p className="text-xs sm:text-sm font-mono-code text-cyan-400 tracking-[0.3em] uppercase flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400" />
            WELCOMING ALL OPERATIVES
          </p>

          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase">
            Hi, I'm <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-pink-500 text-glow-purple">
              Yakavan
            </span>
          </h1>

          <h2 className="font-subheading text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-200 tracking-wide mt-2">
            Aspiring Full Stack Developer
          </h2>
        </motion.div>

        {/* Dynamic Typing Role Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 font-mono-code text-lg sm:text-xl md:text-2xl text-cyan-300 h-10 flex items-center justify-center gap-2"
        >
          <span className="text-purple-400 font-bold">&gt;</span>
          <span className="border-b-2 border-cyan-400 pb-0.5 tracking-wider text-glow-cyan min-w-[280px] text-left">
            {displayText}
          </span>
          <span className="w-2.5 h-6 bg-cyan-400 animate-pulse" />
        </motion.div>

        {/* Hero Pitch */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-gray-300 font-sans-clean leading-relaxed"
        >
          Crafting high-performance web applications and interactive gaming experiences with modern MERN Stack, Python, and immersive cyberpunk aesthetics.
        </motion.p>

        {/* Call To Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {/* Main CTA */}
          <button
            onClick={scrollToProjects}
            onMouseEnter={() => cyberAudio.playHover()}
            className="cyber-button px-8 py-4 text-sm font-mono-code font-bold tracking-wider text-white flex items-center gap-3 shadow-[0_0_25px_rgba(168,85,247,0.5)] group"
          >
            <Code2 className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
            EXPLORE PROJECTS
            <ChevronRight className="w-4 h-4 text-purple-300 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={scrollToContact}
            onMouseEnter={() => cyberAudio.playHover()}
            className="px-8 py-4 text-sm font-mono-code font-bold tracking-wider text-cyan-300 rounded-xl glass-panel border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4 text-cyan-400" />
            CONNECT WITH ME
          </button>
        </motion.div>

        {/* RPG Cyber Metrics Row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl font-mono-code text-xs"
        >
          <div className="glass-panel p-3.5 rounded-xl border border-purple-500/30 flex flex-col items-center">
            <span className="text-gray-400 text-[10px] uppercase">Specialty</span>
            <span className="text-cyan-300 font-bold text-sm mt-1">MERN Stack</span>
          </div>
          <div className="glass-panel p-3.5 rounded-xl border border-purple-500/30 flex flex-col items-center">
            <span className="text-gray-400 text-[10px] uppercase">Class</span>
            <span className="text-purple-300 font-bold text-sm mt-1">Full Stack</span>
          </div>
          <div className="glass-panel p-3.5 rounded-xl border border-purple-500/30 flex flex-col items-center">
            <span className="text-gray-400 text-[10px] uppercase">Secondary Skill</span>
            <span className="text-pink-300 font-bold text-sm mt-1">Python Dev</span>
          </div>
          <div className="glass-panel p-3.5 rounded-xl border border-purple-500/30 flex flex-col items-center">
            <span className="text-gray-400 text-[10px] uppercase">Aesthetic</span>
            <span className="text-emerald-300 font-bold text-sm mt-1">Cyber Anime</span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="mt-12 cursor-pointer text-gray-400 hover:text-cyan-300 flex flex-col items-center gap-1.5 font-mono-code text-xs"
          onClick={scrollToProjects}
        >
          <span>SCROLL DOWN</span>
          <ArrowDown className="w-4 h-4 text-cyan-400" />
        </motion.div>
      </div>
    </section>
  );
}
