import { Request, Response } from 'express';
import Project from '../models/Project';

const DEFAULT_PROJECTS = [
  {
    title: 'Kids Academy Website (Learn N Laugh)',
    category: 'web',
    description: 'Gamified web application for children’s learning with interactive modules and parent tracking dashboard.',
    fullDetails: 'Learn N Laugh is an interactive educational platform designed to make math, reading, and science fun for children.',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'Web Audio API', 'Node.js'],
    liveUrl: 'https://example.com/learn-n-laugh',
    githubUrl: 'https://github.com/yakavan/learn-n-laugh-kids-academy',
    featured: true,
  },
  {
    title: 'Python Cyber Arcade Game',
    category: 'python',
    description: 'Retro-futuristic arcade game developed in Python using Pygame with particle collisions and leaderboards.',
    fullDetails: 'Custom particle collision engine, weapon powerups, and persistent high score save states.',
    techStack: ['Python', 'Pygame', 'Math Physics', 'JSON Storage'],
    liveUrl: 'https://example.com/python-cyber-game',
    githubUrl: 'https://github.com/yakavan/python-cyber-arcade-game',
    featured: true,
  },
  {
    title: 'MERN Cyber Cloud Vault',
    category: 'mern',
    description: 'Full stack cloud storage application with JWT authentication, file uploads, and encrypted MongoDB schema.',
    fullDetails: 'Complete MERN stack web app providing encrypted cloud storage and glassmorphism cyberpunk dashboard.',
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT'],
    liveUrl: 'https://example.com/mern-cyber-drive',
    githubUrl: 'https://github.com/yakavan/mern-cyber-cloud-vault',
    featured: true,
  },
  {
    title: 'Otaku Pulse - Anime Discovery Hub',
    category: 'web',
    description: 'Real-time anime database portal powered by Jikan REST API featuring recommendations and watchlists.',
    fullDetails: 'Search thousands of anime series, view trending shows, and save custom watchlists.',
    techStack: ['React', 'REST API', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://example.com/otaku-pulse',
    githubUrl: 'https://github.com/yakavan/otaku-pulse-anime-hub',
    featured: false,
  },
];

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().exec();
    if (projects && projects.length > 0) {
      res.status(200).json({ success: true, data: projects });
      return;
    }
    // Fallback if DB empty
    res.status(200).json({ success: true, data: DEFAULT_PROJECTS });
  } catch {
    // If Mongo not connected
    res.status(200).json({ success: true, data: DEFAULT_PROJECTS });
  }
};
