import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Zap, ShieldAlert } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface LoadingScreenProps {
  onComplete: () => void;
}

const INITIALIZING_LOGS = [
  'BOOTING CYBER CORE MATRIX v2.04...',
  'CONNECTING TO NEURO-LINK PROTOCOL...',
  'LOADING ANIME AESTHETIC ENGINE...',
  'SYNCHRONIZING MERN STACK SERVICES...',
  'OPTIMIZING THREE.JS SHADER NODES...',
  'INITIALIZING YAKAVAN PORTFOLIO SYSTEM...',
  'SYSTEM READY. WELCOME OPERATIVE.',
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsFinished(true);
          cyberAudio.playSuccess();
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return Math.min(next, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentLogIndex((prev) => (prev + 1) % INITIALIZING_LOGS.length);
    }, 320);
    return () => clearInterval(logInterval);
  }, []);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-[#070913] flex flex-col items-center justify-center font-mono-code px-4 overflow-hidden"
        >
          {/* Cyber grid background effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_70%)]" />
          <div className="absolute inset-0 scanlines opacity-30" />

          {/* Central Logo & Tech Crest */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center mb-8"
          >
            <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                className="absolute inset-2 rounded-full border border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              />

              {/* Inner Crest Icon */}
              <div className="w-14 h-14 bg-purple-950/80 rounded-xl border border-purple-400 flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.8)]">
                <Cpu className="w-8 h-8 text-cyan-300 animate-pulse" />
              </div>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-pink-500 text-glow-purple">
              YAKAVAN // SYSTEM
            </h1>
            <p className="text-xs text-cyan-400/80 tracking-widest mt-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-purple-400 animate-bounce" /> NEURAL INTERFACE INIT
            </p>
          </motion.div>

          {/* Progress Bar Container */}
          <div className="relative z-10 w-full max-w-md bg-slate-900/80 p-5 rounded-xl border border-purple-500/40 glass-panel shadow-2xl">
            <div className="flex justify-between items-center mb-2 text-xs">
              <span className="text-purple-300 flex items-center gap-1.5 font-bold">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                LOAD MATRIX
              </span>
              <span className="text-cyan-400 font-bold tracking-wider">{progress}%</span>
            </div>

            {/* Glowing Bar */}
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-purple-900">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 via-cyan-400 to-pink-500 rounded-full shadow-[0_0_15px_#06b6d4]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Terminal Live Command Log */}
            <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
              <span className="text-cyan-400/90 truncate max-w-[280px]">
                {'> '} {INITIALIZING_LOGS[currentLogIndex]}
              </span>
              <ShieldAlert className="w-3.5 h-3.5 text-purple-400 animate-pulse shrink-0 ml-2" />
            </div>
          </div>

          {/* Skip Intro Button */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              onComplete();
            }}
            className="relative z-10 mt-6 text-xs text-gray-400 hover:text-cyan-300 border border-gray-700 hover:border-cyan-400/80 px-4 py-1.5 rounded-full transition-all duration-200 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            SKIP INITIALIZATION [ESC]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
