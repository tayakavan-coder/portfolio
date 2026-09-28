import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Palette, Sparkles, Activity, Clock } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface CyberHUDControlProps {
  colorTheme: 'purple' | 'cyan' | 'green' | 'red';
  setColorTheme: (theme: 'purple' | 'cyan' | 'green' | 'red') => void;
}

export default function CyberHUDControl({ colorTheme, setColorTheme }: CyberHUDControlProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [time, setTime] = useState('');
  const [showPalette, setShowPalette] = useState(false);

  useEffect(() => {
    const updateTokyoTime = () => {
      const now = new Date();
      // Format as JST/Neo-Tokyo time
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTokyoTime();
    const interval = setInterval(updateTokyoTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    cyberAudio.enabled = nextState;
    if (nextState) {
      cyberAudio.playSuccess();
    }
  };

  const handleThemeChange = (theme: 'purple' | 'cyan' | 'green' | 'red') => {
    setColorTheme(theme);
    setShowPalette(false);
    cyberAudio.playClick();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 font-mono-code text-xs">
      {/* Theme Picker Dropdown */}
      {showPalette && (
        <div className="glass-panel p-3 rounded-lg flex flex-col gap-2 border border-purple-500/40 shadow-xl animate-fade-in">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> MATRIX COLOR SHIFT
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleThemeChange('purple')}
              className={`px-3 py-1.5 rounded flex items-center gap-2 border transition ${
                colorTheme === 'purple'
                  ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                  : 'border-gray-800 bg-slate-900/50 text-gray-400 hover:text-white'
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
              CYBER PURPLE
            </button>
            <button
              onClick={() => handleThemeChange('cyan')}
              className={`px-3 py-1.5 rounded flex items-center gap-2 border transition ${
                colorTheme === 'cyan'
                  ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                  : 'border-gray-800 bg-slate-900/50 text-gray-400 hover:text-white'
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
              NEON CYAN
            </button>
            <button
              onClick={() => handleThemeChange('green')}
              className={`px-3 py-1.5 rounded flex items-center gap-2 border transition ${
                colorTheme === 'green'
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                  : 'border-gray-800 bg-slate-900/50 text-gray-400 hover:text-white'
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
              MATRIX GREEN
            </button>
            <button
              onClick={() => handleThemeChange('red')}
              className={`px-3 py-1.5 rounded flex items-center gap-2 border transition ${
                colorTheme === 'red'
                  ? 'border-pink-500 bg-pink-500/20 text-pink-300'
                  : 'border-gray-800 bg-slate-900/50 text-gray-400 hover:text-white'
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
              SUNSET RED
            </button>
          </div>
        </div>
      )}

      {/* Main HUD Toolbar */}
      <div className="glass-panel px-4 py-2.5 rounded-full flex items-center gap-4 border border-purple-500/30 text-gray-300 shadow-2xl backdrop-blur-md">
        {/* Tokyo Time */}
        <div className="hidden sm:flex items-center gap-1.5 text-cyan-400 border-r border-gray-700/60 pr-3">
          <Clock className="w-3.5 h-3.5 animate-pulse text-purple-400" />
          <span className="tracking-widest font-semibold">{time} JST</span>
        </div>

        {/* System Ping */}
        <div className="hidden md:flex items-center gap-1.5 text-emerald-400 border-r border-gray-700/60 pr-3">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] text-gray-400">FPS: 60 | ONLINE</span>
        </div>

        {/* Theme Picker Button */}
        <button
          onClick={() => {
            setShowPalette(!showPalette);
            cyberAudio.playHover();
          }}
          className="p-1.5 hover:text-cyan-400 transition text-gray-400 flex items-center gap-1"
          title="Change Color Theme"
        >
          <Palette className="w-4 h-4" />
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          onMouseEnter={() => cyberAudio.playHover()}
          className={`p-1.5 rounded-full transition flex items-center gap-1.5 ${
            soundEnabled
              ? 'text-cyan-400 bg-cyan-500/10 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
              : 'text-gray-400 hover:text-white'
          }`}
          title={soundEnabled ? 'Disable Cyber Audio SFX' : 'Enable Cyber Audio SFX'}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 animate-bounce" />
              <span className="text-[10px] text-cyan-300 font-bold hidden sm:inline">SFX ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4" />
              <span className="text-[10px] text-gray-500 hidden sm:inline">SFX OFF</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
