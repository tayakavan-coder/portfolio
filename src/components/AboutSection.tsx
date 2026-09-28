import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Shield, Zap, Sparkles, Award, Terminal, Heart } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

export default function AboutSection() {
  const stats = [
    { label: 'POWER LEVEL', value: 'OVER 9000', color: 'text-purple-400' },
    { label: 'CODE CLASS', value: 'FULL STACK S-RANK', color: 'text-cyan-300' },
    { label: 'PASSSION', value: 'ANIME & TECH', color: 'text-pink-400' },
    { label: 'STATUS', value: 'ACTIVE OPERATIVE', color: 'text-emerald-400' },
  ];

  const milestones = [
    {
      year: 'PRESENT',
      title: 'Full Stack Developer',
      desc: 'Building modern web applications with React, Node.js, Express, MongoDB, and Tailwind CSS.',
      icon: Terminal,
    },
    {
      year: 'PROJECTS',
      title: 'Kids Academy & Python Arcade',
      desc: 'Developed interactive learning web platforms and Python-powered game engines with custom physics.',
      icon: Cpu,
    },
    {
      year: 'PHILOSOPHY',
      title: 'Anime Aesthetic + Clean Code',
      desc: 'Merging futuristic cyber design, smooth animations, and solid backend architecture.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/40 text-purple-300 text-xs font-mono-code mb-3"
        >
          <User className="w-3.5 h-3.5 text-cyan-400" />
          SYSTEM PROFILE
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
        >
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 text-glow-purple">Yakavan</span>
        </motion.h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mt-4 rounded-full shadow-[0_0_10px_#06b6d4]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Anime Avatar Graphic Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group w-full max-w-sm">
            {/* Outer Neon Glow Aura */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 opacity-60 blur-xl group-hover:opacity-100 transition duration-500 animate-pulse" />

            {/* Avatar Frame Box */}
            <div className="relative glass-panel p-6 rounded-3xl border border-purple-500/50 flex flex-col items-center text-center overflow-hidden">
              {/* Anime Cyber Avatar Illustration */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden mb-6 border-2 border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.6)]">
                {/* SVG/Styled Cyberpunk Anime Developer Visual */}
                <div className="w-full h-full bg-gradient-to-br from-purple-950 via-slate-900 to-cyan-950 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.3),transparent_70%)]" />

                  {/* Character Silhouette with Neon VR Headset & Headphones */}
                  <svg className="w-36 h-36 text-purple-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="35" r="22" fill="#2e1065" stroke="#a855f7" strokeWidth="2" />
                    {/* Hair spike outlines */}
                    <path d="M30 30 C 25 15, 40 10, 50 12 C 60 10, 75 15, 70 30 C 80 20, 65 5, 50 5 C 35 5, 20 20, 30 30 Z" fill="#7e22ce" />
                    {/* Cyber Visor / Glasses */}
                    <rect x="36" y="30" width="28" height="10" rx="3" fill="#06b6d4" className="animate-pulse" />
                    <line x1="36" y1="35" x2="64" y2="35" stroke="#ffffff" strokeWidth="1.5" />
                    {/* Headphones */}
                    <rect x="24" y="28" width="6" height="14" rx="2" fill="#ec4899" />
                    <rect x="70" y="28" width="6" height="14" rx="2" fill="#ec4899" />
                    <path d="M 27 28 A 24 24 0 0 1 73 28" stroke="#ec4899" strokeWidth="3" fill="none" />
                    {/* Hoodie / Body */}
                    <path d="M 22 75 C 22 55, 35 50, 50 50 C 65 50, 78 55, 78 75 L 85 95 L 15 95 Z" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M 42 50 L 50 70 L 58 50" stroke="#a855f7" strokeWidth="2" fill="none" />
                  </svg>

                  {/* Cyber Scan line effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-glitch" />
                </div>

                {/* Level 99 Badge */}
                <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded bg-purple-900/90 border border-purple-400 text-[10px] font-mono-code text-cyan-300 font-bold">
                  LVL. 99
                </div>
              </div>

              <h3 className="font-heading text-xl font-bold text-white tracking-wide">YAKAVAN</h3>
              <p className="text-xs font-mono-code text-cyan-400 mt-1">Aspiring Full Stack Developer</p>

              <div className="mt-4 pt-4 border-t border-purple-500/30 w-full flex items-center justify-between text-xs font-mono-code">
                <span className="text-gray-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-purple-400" /> PASSION
                </span>
                <span className="text-purple-300 font-bold">Web & Games</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Bio + Glass RPG Cards + Milestones */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Main Glass Intro Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-purple-500/40 relative">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              CYBERNETIC ARCHITECT BRIEF
            </h3>
            <p className="text-gray-300 font-sans-clean leading-relaxed text-base">
              I am an aspiring Full Stack Developer with a deep passion for building interactive, user-centric web applications and creative software. I specialize in combining robust backend systems (Node.js, Express, MongoDB) with stunning, responsive frontends (React, Tailwind CSS, Framer Motion).
            </p>
            <p className="text-gray-300 font-sans-clean leading-relaxed text-base mt-3">
              Inspired by futuristic anime visuals and sci-fi technology, my goal is to craft digital experiences that are not only powerful and efficient under the hood, but also visually captivating at first glance.
            </p>
          </div>

          {/* RPG Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-code">
            {stats.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                onMouseEnter={() => cyberAudio.playHover()}
                className="glass-panel p-3.5 rounded-xl border border-purple-500/30 text-center"
              >
                <span className="text-[10px] text-gray-400 block uppercase">{item.label}</span>
                <span className={`font-bold text-xs sm:text-sm mt-1 block ${item.color}`}>
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Experience & Vision Cards */}
          <div className="space-y-3">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-4 rounded-xl border border-purple-500/30 flex items-start gap-4 hover:border-cyan-400/60 transition-all duration-300"
                >
                  <div className="p-2.5 rounded-lg bg-purple-950/80 border border-purple-500/50 text-cyan-300 shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                        {m.year}
                      </span>
                      <h4 className="font-heading text-sm font-bold text-white">{m.title}</h4>
                    </div>
                    <p className="text-xs text-gray-300 font-sans-clean mt-1.5">{m.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
