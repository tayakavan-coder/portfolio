import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CyberCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if target element is clickable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('interactive'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Hide cursor on touch devices or small screens
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Central Cyber Glowing Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_12px_#06b6d4] -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isMouseDown ? 0.6 : isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? '#a855f7' : '#06b6d4',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Trailing Outer Ring with Crosshair HUD accents */}
      <motion.div
        className={`fixed top-0 left-0 w-9 h-9 rounded-full border border-purple-500/70 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-200 ${
          isHovered ? 'border-cyan-400 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.5)]' : ''
        }`}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isMouseDown ? 0.8 : isHovered ? 1.8 : 1,
          rotate: isHovered ? 90 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.2 }}
      >
        {/* Subtle Crosshair accents when hovered */}
        {isHovered && (
          <>
            <div className="absolute -top-1 w-[2px] h-2 bg-cyan-400" />
            <div className="absolute -bottom-1 w-[2px] h-2 bg-cyan-400" />
            <div className="absolute -left-1 h-[2px] w-2 bg-cyan-400" />
            <div className="absolute -right-1 h-[2px] w-2 bg-cyan-400" />
          </>
        )}
      </motion.div>
    </div>
  );
}
