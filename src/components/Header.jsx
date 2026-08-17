import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy
      const sections = ['hero', 'layanan', 'proses', 'portofolio', 'kontak'];
      const headerHeight = 100;
      let current = 'hero';
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - headerHeight <= 80 && rect.bottom - headerHeight > 80) {
            current = sec;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home',       href: '#top' },
    { name: 'Paket',      href: '#layanan' },
    { name: 'Proses',     href: '#proses' },
    { name: 'Portofolio', href: '#portofolio' },
    { name: 'Kontak',     href: '#kontak' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2 shadow-[0_4px_24px_rgba(0,0,0,0.07)] border-b border-line/80'
          : 'py-3'
      }`}
      style={{
        background: scrolled
          ? 'rgba(252,253,248,0.92)'
          : 'rgba(244,247,238,0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Thin accent line at very top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent pointer-events-none" />

      <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between">

        {/* Brand */}
        <motion.a
          href="#top"
          className="flex items-center gap-2.5 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative">
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute inset-[-3px] rounded-xl bg-accent/20 blur-[6px] pointer-events-none"
            />
            <img
              src="/assets/logo.png"
              alt="ZerooWeb Logo"
              className="w-10 h-10 rounded-xl relative z-10 shadow-sm"
            />
          </div>
          <span className="font-display font-black text-[20px] tracking-tight text-ink">
            Zeroo<em className="not-italic text-accent-ink">Web</em>
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const sectionId = link.href === '#top' ? 'hero' : link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-[14px] font-medium transition-colors duration-200 ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {link.name}
                {/* Smooth sliding line indicator via layoutId */}
                {isActive && (
                  <motion.span
                    layoutId="active-line"
                    className="absolute bottom-0.5 left-2 right-2 h-[2px] rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          <motion.a
            href="#kontak"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 rounded-full border border-ink/25 text-[13.5px] font-semibold text-ink bg-white/50 hover:bg-white hover:border-ink/50 transition-all duration-200"
          >
            Konsultasi
          </motion.a>
          <motion.a
            href="#layanan"
            whileHover={{ scale: 1.04, boxShadow: '0 6px 24px rgba(143,212,0,0.35)' }}
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-full bg-accent text-[#16210a] text-[13.5px] font-black transition-all duration-200 relative overflow-hidden"
            style={{ boxShadow: '0 4px 16px rgba(143,212,0,0.25)' }}
          >
            {/* Shine */}
            <motion.span
              className="absolute inset-0 bg-white/20 -skew-x-12"
              initial={{ x: '-120%' }}
              animate={{ x: '220%' }}
              transition={{ repeat: Infinity, repeatDelay: 4, duration: 0.6, ease: 'easeInOut', delay: 2 }}
            />
            Lihat Paket
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-ink hover:bg-white/60 border border-transparent hover:border-line/40 transition-all duration-200"
          aria-label="Toggle Menu"
        >
          <AnimatePresence mode="wait">
            {isOpen
              ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={22} /></motion.span>
              : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={22} /></motion.span>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-4 right-4 mt-2 rounded-2xl border border-line/60 shadow-xl md:hidden z-40 overflow-hidden"
            style={{ background: 'rgba(252,253,248,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="text-[15px] font-semibold text-muted hover:text-ink px-4 py-3 rounded-xl hover:bg-white/70 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-line/40">
                <a
                  href="#kontak"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 rounded-full border border-ink/25 font-semibold text-ink bg-white/60 hover:bg-white transition-colors"
                >
                  Konsultasi
                </a>
                <a
                  href="#layanan"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 rounded-full bg-accent text-[#16210a] font-black hover:bg-[#a2e635] transition-colors"
                >
                  Lihat Paket
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
