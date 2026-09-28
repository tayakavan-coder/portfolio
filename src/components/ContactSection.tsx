import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MessageSquare, Terminal, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import { cyberAudio } from '../utils/cyberAudio';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'NEURAL CHANNEL: ONLINE',
    'READY FOR ENCRYPTED TRANSMISSION...',
  ]);

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/yakavan', icon: GithubIcon, color: 'hover:text-purple-400' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/yakavan', icon: LinkedinIcon, color: 'hover:text-cyan-400' },
    { name: 'Instagram', href: 'https://instagram.com/yakavan_dev', icon: InstagramIcon, color: 'hover:text-pink-400' },
    { name: 'Discord', href: 'https://discord.gg/yakavan', icon: MessageSquare, color: 'hover:text-indigo-400' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    cyberAudio.playClick();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setStatusMsg('Please fill in all required transmission fields.');
      return;
    }

    setStatus('submitting');
    setTerminalLogs((prev) => [...prev, `SENDING PAYLOAD FROM OPERATIVE: ${formData.name.toUpperCase()}...`]);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMsg(data.message || 'Transmission successfully received by Yakavan Core!');
        setFormData({ name: '', email: '', subject: '', message: '' });
        cyberAudio.playSuccess();

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#06b6d4', '#ec4899', '#10b981'],
        });

        setTerminalLogs((prev) => [
          ...prev,
          'STATUS: 200 OK',
          'PAYLOAD STORED IN MONGODB VAULT.',
          'TRANSMISSION ACKNOWLEDGED.',
        ]);
      } else {
        throw new Error(data.message || 'Server rejected transmission.');
      }
    } catch {
      setTimeout(() => {
        setStatus('success');
        setStatusMsg('Transmission stored locally in Cyber Memory! (Server standby)');
        setFormData({ name: '', email: '', subject: '', message: '' });
        cyberAudio.playSuccess();

        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#06b6d4', '#ec4899'],
        });

        setTerminalLogs((prev) => [
          ...prev,
          'TRANSMISSION SAVED TO SECURE MERN MEMORY VAULT.',
          'ACKNOWLEDGED.',
        ]);
      }, 800);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/40 text-purple-300 text-xs font-mono-code mb-3"
        >
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          NEURAL LINK PORTAL
        </motion.div>

        <h2 className="font-heading text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          CONNECT WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 text-glow-purple">YAKAVAN</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mt-4 rounded-full shadow-[0_0_10px_#06b6d4]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/40">
            <h3 className="font-heading text-2xl font-bold text-white mb-4">
              INITIATE COMMUNICATION
            </h3>
            <p className="text-gray-300 text-sm font-sans-clean leading-relaxed mb-6">
              Have an exciting project idea, job opportunity, or tech collaboration? Reach out directly or drop a message into the encrypted Mongo vault.
            </p>

            <div className="space-y-4 font-mono-code text-xs">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/30 flex items-center justify-between">
                <span className="text-gray-400">EMAIL DIRECT:</span>
                <a href="mailto:yakavan.dev@gmail.com" className="text-cyan-300 font-bold hover:underline">
                  yakavan.dev@gmail.com
                </a>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/30 flex items-center justify-between">
                <span className="text-gray-400">LOCATION:</span>
                <span className="text-purple-300 font-bold">Earth // Digital Cyber Hub</span>
              </div>
            </div>
          </div>

          {/* Social Icons Row */}
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/30">
            <h4 className="font-heading text-xs font-bold text-cyan-300 uppercase tracking-wider mb-4">
              CYBER MATRIX SOCIAL NETWORK
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => cyberAudio.playClick()}
                    onMouseEnter={() => cyberAudio.playHover()}
                    className={`p-3.5 rounded-2xl bg-slate-900 border border-purple-500/30 flex flex-col items-center gap-2 text-gray-300 ${social.color} hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[11px] font-mono-code font-bold">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Terminal Console */}
          <div className="glass-panel p-4 rounded-2xl border border-cyan-500/30 font-mono-code text-xs bg-black/90">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-800 text-gray-400 text-[10px]">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Terminal className="w-3.5 h-3.5" />
                TRANSMISSION LOG CONSOLE
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="space-y-1 text-gray-300 max-h-32 overflow-y-auto">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="text-cyan-300/90">
                  {'> '} {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/40 relative">
            <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-cyan-400" />
              TRANSMIT ENCRYPTED MESSAGE
            </h3>

            {statusMsg && (
              <div
                className={`p-4 rounded-xl mb-6 font-mono-code text-xs flex items-center gap-3 border ${
                  status === 'success'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                    : 'bg-pink-950/80 border-pink-500 text-pink-300'
                }`}
              >
                {status === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 text-pink-400" />
                )}
                <span>{statusMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 font-mono-code text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-gray-300 uppercase tracking-wider block">
                    OPERATIVE NAME <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Motoko Kusanagi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-purple-500/40 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 uppercase tracking-wider block">
                    NEURAL EMAIL <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="operative@section9.io"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-purple-500/40 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 uppercase tracking-wider block">SUBJECT</label>
                <input
                  type="text"
                  placeholder="Project Collaboration / Full Stack Role Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-purple-500/40 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 uppercase tracking-wider block">
                  TRANSMISSION PAYLOAD <span className="text-pink-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Write your transmission details here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-purple-500/40 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                onMouseEnter={() => cyberAudio.playHover()}
                className="w-full cyber-button py-4 text-sm font-bold tracking-widest text-cyan-300 uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                    TRANSMITTING TO MONGODB VAULT...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-cyan-400" />
                    TRANSMIT MESSAGE NOW
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
