import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Terminal, User, Briefcase, Mail, Sparkles, Download } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [scrolled, setScroll] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'HERO', icon: Terminal },
    { id: 'about', label: 'ABOUT', icon: User },
    { id: 'skills', label: 'SKILLS', icon: Code2 },
    { id: 'projects', label: 'PROJECTS', icon: Briefcase },
    { id: 'contact', label: 'CONTACT', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    cyberAudio.playClick();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#070913]/85 backdrop-blur-xl border-b border-purple-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          onMouseEnter={() => cyberAudio.playHover()}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-lg bg-purple-950/80 border border-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] group-hover:border-cyan-400 transition-all duration-300">
            <span className="font-heading font-black text-cyan-300 text-lg group-hover:scale-110 transition-transform">
              Y
            </span>
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading font-bold text-lg tracking-wider text-white group-hover:text-cyan-300 transition-colors">
              YAKAVAN<span className="text-purple-400">.DEV</span>
            </span>
            <span className="text-[10px] font-mono-code text-cyan-400/80 tracking-widest -mt-1">
              CYBER ARCHITECT
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-purple-500/30">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => cyberAudio.playHover()}
                className={`relative px-4 py-2 rounded-full font-mono-code text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-cyan-300 text-shadow-cyan'
                    : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-gray-500'}`} />
                {item.label}

                {/* Animated active pill glow */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/30 to-cyan-500/30 border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.4)] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button: Hire / Resume */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            onClick={() => handleNavClick('contact')}
            onMouseEnter={() => cyberAudio.playHover()}
            className="cyber-button px-5 py-2 text-xs font-mono-code font-bold tracking-wider text-cyan-300 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
            HIRE ME
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => {
            cyberAudio.playClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="md:hidden p-2 rounded-lg bg-slate-900/80 border border-purple-500/50 text-cyan-300"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-purple-500/30 px-6 py-6 mt-3 space-y-4"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full py-3 px-4 rounded-xl font-mono-code text-sm font-bold flex items-center gap-3 border transition-all ${
                    isActive
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      : 'border-gray-800 bg-slate-900/60 text-gray-400'
                  }`}
                >
                  <Icon className="w-4 h-4 text-purple-400" />
                  {item.label}
                </button>
              );
            })}

            <a
              href="#contact"
              onClick={() => handleNavClick('contact')}
              className="block w-full text-center cyber-button py-3 text-xs font-mono-code font-bold text-cyan-300"
            >
              INITIATE CONTACT
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
