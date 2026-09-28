import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, FolderGit2, X, Play, Code, Eye, Layers } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { cyberAudio } from '../utils/cyberAudio';

export interface Project {
  id: string;
  title: string;
  category: 'web' | 'python' | 'mern';
  description: string;
  fullDetails: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  imageBg: string;
  features: string[];
  featured?: boolean;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'learn-n-laugh',
    title: 'Kids Academy Website (Learn N Laugh)',
    category: 'web',
    featured: true,
    description:
      'An engaging, gamified educational platform built for kids featuring vibrant UI, interactive quiz modules, audio rewards, and parent progress dashboard.',
    fullDetails:
      'Learn N Laugh is a full-featured web portal designed to make learning math, reading, and science fun for young children. It features animated lessons, voice narration, interactive badges, progress tracking, and an intuitive dashboard for parents to monitor learning milestones.',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'Web Audio API', 'Node.js'],
    liveUrl: 'https://example.com/learn-n-laugh',
    githubUrl: 'https://github.com/yakavan/learn-n-laugh-kids-academy',
    imageBg: 'from-amber-600/30 via-purple-900/40 to-cyan-900/40',
    features: [
      'Interactive gamified quizzes with instant sound feedback',
      'Parent portal with detailed learning analytics',
      'Custom colorful character animations and badges',
      'Fully responsive & kid-friendly touch interface',
    ],
  },
  {
    id: 'python-cyber-game',
    title: 'Python Cyber Arcade Game',
    category: 'python',
    featured: true,
    description:
      'A high-action retro-futuristic arcade game developed in Python using Pygame with custom particle physics, enemy AI paths, and high score leaderboards.',
    fullDetails:
      'Built purely in Python, this game puts players inside a neon matrix grid battling waves of rogue cyber-drones. It includes vector particle collisions, custom sound synthesizer, weapon powerups, and persistent high score save states.',
    techStack: ['Python', 'Pygame', 'Math Physics', 'JSON Storage', 'OO Architecture'],
    liveUrl: 'https://example.com/python-cyber-game',
    githubUrl: 'https://github.com/yakavan/python-cyber-arcade-game',
    imageBg: 'from-emerald-600/30 via-slate-900/40 to-blue-900/40',
    features: [
      'Custom particle collision & vector physics engine',
      'Multi-stage boss fights and enemy wave AI',
      'Chiptune sound effects and retro neon UI',
      'Persistent local and online high-score system',
    ],
  },
  {
    id: 'mern-cyber-drive',
    title: 'MERN Cyber Cloud Vault',
    category: 'mern',
    featured: true,
    description:
      'Secure full stack cloud storage application with user authentication, encrypted file management, real-time upload progress, and dark anime aesthetic.',
    fullDetails:
      'A complete MERN stack web app providing encrypted cloud storage. Features JWT authentication, MongoDB document management, Express API routes, file tag filtering, and a sleek glassmorphism cyberpunk dashboard.',
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Multer'],
    liveUrl: 'https://example.com/mern-cyber-drive',
    githubUrl: 'https://github.com/yakavan/mern-cyber-cloud-vault',
    imageBg: 'from-purple-600/30 via-indigo-950/40 to-pink-900/40',
    features: [
      'JWT Authentication & Password Encryption',
      'MongoDB Mongoose schema with file metadata indexing',
      'Drag-and-drop file upload with live percentage bar',
      'RESTful API architecture with structured controllers',
    ],
  },
  {
    id: 'anime-dex-pulse',
    title: 'Otaku Pulse - Anime Discovery Hub',
    category: 'web',
    description:
      'Real-time anime database portal powered by Jikan REST API featuring anime recommendations, watchlists, character bios, and trailer video player.',
    fullDetails:
      'An anime lover’s dream web app! Search thousands of anime series, view trending seasonal shows, filter by genre, save custom watchlists in browser storage, and watch high-definition trailers directly in app.',
    techStack: ['React', 'REST API', 'Tailwind CSS', 'Framer Motion', 'LocalStorage'],
    liveUrl: 'https://example.com/otaku-pulse',
    githubUrl: 'https://github.com/yakavan/otaku-pulse-anime-hub',
    imageBg: 'from-pink-600/30 via-purple-900/40 to-cyan-900/40',
    features: [
      'Live Jikan anime API integration with debounced search',
      'Custom watchlist & favorite character collection',
      'Embedded video trailer player with theater mode',
      'Cyberpunk anime glow visual theme',
    ],
  },
];

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'mern' | 'web' | 'python'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS_DATA.filter((p) =>
    activeTab === 'all' ? true : p.category === activeTab
  );

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/40 text-purple-300 text-xs font-mono-code mb-3"
        >
          <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
          FEATURED PORTFOLIO
        </motion.div>

        <h2 className="font-heading text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          CYBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 text-glow-purple">PROJECTS ARCHIVE</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mt-4 rounded-full shadow-[0_0_10px_#06b6d4]" />
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-12">
        <div className="glass-panel p-1.5 rounded-full border border-purple-500/40 flex flex-wrap justify-center gap-2 font-mono-code text-xs">
          {[
            { id: 'all', label: 'ALL PROJECTS' },
            { id: 'mern', label: 'MERN STACK' },
            { id: 'web', label: 'WEB APPS' },
            { id: 'python', label: 'PYTHON & GAMES' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                cyberAudio.playClick();
                setActiveTab(tab.id as unknown as typeof activeTab);
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className={`px-5 py-2 rounded-full font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -6 }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="glass-panel rounded-3xl border border-purple-500/40 overflow-hidden box-glow-hover transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Card Banner Background Visual */}
              <div className={`h-48 bg-gradient-to-br ${project.imageBg} p-6 flex flex-col justify-between relative overflow-hidden`}>
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
                <div className="absolute inset-0 scanlines opacity-30" />

                {/* Top Badge Row */}
                <div className="relative z-10 flex justify-between items-center font-mono-code text-xs">
                  <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400 text-cyan-300 font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-1 rounded-full bg-pink-950/80 border border-pink-500 text-pink-300 flex items-center gap-1 font-bold">
                      <Sparkles className="w-3 h-3 text-pink-400 animate-spin" /> FEATURED
                    </span>
                  )}
                </div>

                {/* Project Title Graphic on Banner */}
                <div className="relative z-10">
                  <h3 className="font-heading text-2xl font-black text-white text-shadow-purple group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-gray-300 text-sm font-sans-clean leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 font-mono-code text-[11px]">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-purple-500/30 text-cyan-300 hover:border-cyan-400 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links Row */}
                <div className="pt-4 border-t border-purple-500/30 flex items-center justify-between">
                  <button
                    onClick={() => {
                      cyberAudio.playClick();
                      setSelectedProject(project);
                    }}
                    className="text-xs font-mono-code text-purple-300 hover:text-cyan-300 flex items-center gap-1.5 font-bold transition-colors"
                  >
                    <Eye className="w-4 h-4 text-cyan-400" />
                    VIEW DETAILS
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => cyberAudio.playClick()}
                      className="p-2 rounded-xl bg-slate-900 border border-gray-700 hover:border-cyan-400 text-gray-300 hover:text-cyan-300 transition-all"
                      title="GitHub Source Code"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => cyberAudio.playClick()}
                      className="p-2 rounded-xl bg-purple-950 border border-purple-400 hover:border-cyan-400 text-cyan-300 hover:shadow-[0_0_12px_#06b6d4] transition-all"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Expanded Modal Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-panel w-full max-w-2xl rounded-3xl border border-cyan-400/80 p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.3)] relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => {
                  cyberAudio.playClick();
                  setSelectedProject(null);
                }}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-purple-400 text-gray-300 hover:text-white hover:border-cyan-400 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 mb-2">
                <Layers className="w-4 h-4 text-purple-400" />
                PROJECT ARCHIVE FILE // {selectedProject.id.toUpperCase()}
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-black text-white mb-4">
                {selectedProject.title}
              </h3>

              <p className="text-gray-300 text-sm font-sans-clean leading-relaxed mb-6">
                {selectedProject.fullDetails}
              </p>

              <div className="mb-6">
                <h4 className="font-heading text-sm font-bold text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4 text-purple-400" /> KEY CAPABILITIES
                </h4>
                <ul className="space-y-2 font-sans-clean text-xs text-gray-300">
                  {selectedProject.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-mono-code font-bold">▶</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h4 className="font-heading text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  TECHNOLOGY MATRIX
                </h4>
                <div className="flex flex-wrap gap-2 font-mono-code text-xs">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-purple-950/80 border border-purple-400 text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t border-purple-500/30">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-button px-6 py-3 text-xs font-mono-code font-bold text-white flex items-center gap-2"
                >
                  <Play className="w-4 h-4 text-cyan-300" /> LAUNCH DEMO
                </a>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-xs font-mono-code font-bold text-gray-300 rounded-xl glass-panel border border-gray-700 hover:border-cyan-400 transition flex items-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" /> REPOSITORY
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
