import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CyberBackground from './components/CyberBackground';
import CyberCursor from './components/CyberCursor';
import CyberHUDControl from './components/CyberHUDControl';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './components/SocialIcons';
import { Terminal, Heart, ArrowUp } from 'lucide-react';
import { cyberAudio } from './utils/cyberAudio';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [colorTheme, setColorTheme] = useState<'purple' | 'cyan' | 'green' | 'red'>('purple');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    cyberAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#070913] text-gray-100 font-subheading antialiased selection:bg-purple-500 selection:text-white overflow-x-hidden">
      {/* 1. Loading Screen Intro */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <>
          {/* 2. Custom Glowing Cyber Cursor */}
          <CyberCursor />

          {/* 3. 3D WebGL Three.js Particle & Grid Background */}
          <CyberBackground colorTheme={colorTheme} />

          {/* 4. Cyber HUD Controls (Audio, Palette, Clock) */}
          <CyberHUDControl colorTheme={colorTheme} setColorTheme={setColorTheme} />

          {/* 5. Main Sticky Header Navigation */}
          <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

          {/* 6. Main Application Sections */}
          <main className="relative z-10 space-y-12">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>

          {/* 7. Cyberpunk Footer */}
          <footer className="relative z-10 border-t border-purple-500/30 bg-[#070913]/90 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 mt-24">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono-code text-xs text-gray-400">
              {/* Left Brand info */}
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="font-heading font-black text-base text-white tracking-widest">
                  YAKAVAN<span className="text-cyan-400">.DEV</span>
                </span>
                <p className="text-[11px] text-gray-400">
                  Built with React, Vite, Tailwind CSS, Three.js, Framer Motion & Node.js/Express
                </p>
              </div>

              {/* Center Copyright & Anime Quote */}
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-cyan-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-purple-400" />
                  CYBERNETIC ARCHITECTURE v2.04
                </span>
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  Crafted with <Heart className="w-3 h-3 text-pink-500 fill-pink-500 animate-pulse" /> & Anime Passion © {new Date().getFullYear()} Yakavan
                </span>
              </div>

              {/* Right Action Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/yakavan"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  className="p-2 rounded-xl bg-slate-900 border border-gray-800 hover:border-cyan-400 text-gray-400 hover:text-cyan-300 transition"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/yakavan"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  className="p-2 rounded-xl bg-slate-900 border border-gray-800 hover:border-cyan-400 text-gray-400 hover:text-cyan-300 transition"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/yakavan_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  className="p-2 rounded-xl bg-slate-900 border border-gray-800 hover:border-cyan-400 text-gray-400 hover:text-cyan-300 transition"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>

                {/* Back to top button */}
                <button
                  onClick={scrollToTop}
                  onMouseEnter={() => cyberAudio.playHover()}
                  className="p-2.5 rounded-xl bg-purple-950 border border-purple-500/50 hover:border-cyan-400 text-cyan-300 hover:shadow-[0_0_15px_#06b6d4] transition flex items-center gap-1 font-bold"
                  title="Return to top"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
