import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Cpu, Database, Layout, Terminal, Sparkles, Zap, Flame } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'languages';
  level: number; // percentage
  rank: 'S' | 'A+' | 'A';
  icon: string;
  color: string;
  glow: string;
  description: string;
}

const SKILLS_DATA: SkillItem[] = [
  {
    name: 'HTML5',
    category: 'frontend',
    level: 95,
    rank: 'S',
    icon: '🌐',
    color: 'from-orange-500 to-amber-400',
    glow: 'rgba(249,115,22,0.6)',
    description: 'Semantic markup, accessibility compliance, and SEO-optimised structural web architecture.',
  },
  {
    name: 'CSS3 / Tailwind',
    category: 'frontend',
    level: 92,
    rank: 'S',
    icon: '🎨',
    color: 'from-cyan-400 to-blue-500',
    glow: 'rgba(6,182,212,0.6)',
    description: 'Cyberpunk glassmorphism, responsive grid layouts, custom keyframes, and utility-first styling.',
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'languages',
    level: 90,
    rank: 'S',
    icon: '⚡',
    color: 'from-yellow-400 to-amber-500',
    glow: 'rgba(234,179,8,0.6)',
    description: 'Asynchronous event loops, functional programming, DOM manipulation, and modern ES features.',
  },
  {
    name: 'React.js',
    category: 'frontend',
    level: 88,
    rank: 'S',
    icon: '⚛️',
    color: 'from-cyan-400 to-purple-500',
    glow: 'rgba(168,85,247,0.6)',
    description: 'Component architecture, custom hooks, Framer Motion transitions, and state management.',
  },
  {
    name: 'Python',
    category: 'languages',
    level: 85,
    rank: 'A+',
    icon: '🐍',
    color: 'from-blue-400 to-emerald-400',
    glow: 'rgba(59,130,246,0.6)',
    description: 'Data structures, Pygame game engine development, algorithms, and backend scripting.',
  },
  {
    name: 'Node.js',
    category: 'backend',
    level: 84,
    rank: 'A+',
    icon: '🟢',
    color: 'from-emerald-400 to-green-600',
    glow: 'rgba(16,185,129,0.6)',
    description: 'Event-driven server runtime, non-blocking I/O, NPM package ecosystem, and file system management.',
  },
  {
    name: 'Express.js',
    category: 'backend',
    level: 86,
    rank: 'A+',
    icon: '🚂',
    color: 'from-gray-300 to-cyan-400',
    glow: 'rgba(226,232,240,0.6)',
    description: 'RESTful API endpoints, middleware pipelines, CORS, and request routing.',
  },
  {
    name: 'MongoDB (Mongoose)',
    category: 'backend',
    level: 82,
    rank: 'A',
    icon: '🍃',
    color: 'from-emerald-500 to-teal-400',
    glow: 'rgba(16,185,129,0.6)',
    description: 'NoSQL document schemas, Mongoose models, aggregation pipelines, and CRUD operations.',
  },
  {
    name: 'TypeScript',
    category: 'languages',
    level: 80,
    rank: 'A',
    icon: '📘',
    color: 'from-blue-500 to-cyan-400',
    glow: 'rgba(59,130,246,0.6)',
    description: 'Strong static typing, interface contracts, generics, and compile-time error prevention.',
  },
  {
    name: 'Three.js / Visuals',
    category: 'frontend',
    level: 78,
    rank: 'A',
    icon: '🌌',
    color: 'from-purple-500 to-pink-500',
    glow: 'rgba(236,72,153,0.6)',
    description: '3D WebGL particle canvases, lighting, matrix shaders, and interactive camera controls.',
  },
  {
    name: 'Git & GitHub',
    category: 'languages',
    level: 88,
    rank: 'S',
    icon: '🐙',
    color: 'from-orange-500 to-red-500',
    glow: 'rgba(249,115,22,0.6)',
    description: 'Branch workflows, pull requests, version control, and collaborative repository management.',
  },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'languages'>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(SKILLS_DATA[3]); // React default

  const filteredSkills = SKILLS_DATA.filter((s) =>
    activeCategory === 'all' ? true : s.category === activeCategory
  );

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/40 text-purple-300 text-xs font-mono-code mb-3"
        >
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          TECHNICAL ABILITIES
        </motion.div>

        <h2 className="font-heading text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          CYBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 text-glow-purple">SKILLS MATRIX</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mt-4 rounded-full shadow-[0_0_10px_#06b6d4]" />
      </div>

      {/* Category Tabs Filter */}
      <div className="flex justify-center mb-10">
        <div className="glass-panel p-1.5 rounded-full border border-purple-500/40 flex flex-wrap justify-center gap-2 font-mono-code text-xs">
          {[
            { id: 'all', label: 'ALL SKILLS', icon: Sparkles },
            { id: 'frontend', label: 'FRONTEND', icon: Layout },
            { id: 'backend', label: 'BACKEND', icon: Database },
            { id: 'languages', label: 'LANGUAGES & TOOLS', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  cyberAudio.playClick();
                  setActiveCategory(tab.id as unknown as typeof activeCategory);
                }}
                onMouseEnter={() => cyberAudio.playHover()}
                className={`px-4 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Progress Bars & Cards List */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill?.name === skill.name;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    cyberAudio.playClick();
                    setSelectedSkill(skill);
                  }}
                  onMouseEnter={() => cyberAudio.playHover()}
                  className={`glass-panel p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative group ${
                    isSelected
                      ? 'border-cyan-400 bg-purple-950/40 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                      : 'border-purple-500/30 hover:border-purple-400/80 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <div>
                        <h4 className="font-heading font-bold text-white text-base">{skill.name}</h4>
                        <span className="text-[10px] font-mono-code text-cyan-400 uppercase">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-purple-900/80 border border-purple-400 text-cyan-300 font-mono-code text-xs font-bold shadow-[0_0_8px_#a855f7]">
                      RANK {skill.rank}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono-code text-gray-300">
                      <span>MASTERY</span>
                      <span className="text-cyan-300 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-purple-900/80">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        style={{ width: `${skill.level}%`, boxShadow: `0 0 10px ${skill.glow}` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right Column: Detailed Skill Node Inspector Display */}
        <div className="lg:col-span-4 sticky top-28">
          {selectedSkill ? (
            <motion.div
              key={selectedSkill.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.25)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-l from-cyan-500 to-purple-600 text-white font-mono-code text-[10px] font-bold tracking-widest rounded-bl-xl uppercase">
                NODE INSPECTOR
              </div>

              <div className="flex items-center gap-4 mb-6 pt-2">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-cyan-400 flex items-center justify-center text-3xl shadow-[0_0_15px_#06b6d4]">
                  {selectedSkill.icon}
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-black text-white">{selectedSkill.name}</h3>
                  <span className="text-xs font-mono-code text-purple-400 flex items-center gap-1 mt-0.5">
                    <Flame className="w-3.5 h-3.5 text-pink-400" />
                    RANK {selectedSkill.rank} PROFICIENCY
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-300 font-sans-clean leading-relaxed mb-6">
                {selectedSkill.description}
              </p>

              {/* Radial Meter / Mastery Dial */}
              <div className="glass-panel p-4 rounded-xl border border-purple-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
                  <div className="flex flex-col">
                    <span className="text-xs font-mono-code text-gray-400">SYNAPSE LEVEL</span>
                    <span className="text-lg font-heading font-black text-cyan-300">
                      {selectedSkill.level} / 100
                    </span>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full border-2 border-cyan-400/80 flex items-center justify-center font-mono-code text-xs font-bold text-white shadow-[0_0_10px_#06b6d4]">
                  {selectedSkill.rank}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="glass-panel p-8 rounded-3xl border border-purple-500/30 text-center text-gray-400 font-mono-code text-xs">
              SELECT A SKILL NODE TO INSPECT NEURAL DATA
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
