import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

/* ── Canvas animated background with floating orbs ────────── */
function AnimatedBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let W, H;

    const orbs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: 200 + Math.random() * 200,
      alpha: 0.04 + Math.random() * 0.05,
      hue: i % 2 === 0 ? '143, 212, 0' : '100, 180, 0',
    }));

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Moving gradient mesh orbs
      orbs.forEach(o => {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < 0 || o.x > 1) o.vx *= -1;
        if (o.y < 0 || o.y > 1) o.vy *= -1;

        const grd = ctx.createRadialGradient(
          o.x * W, o.y * H, 0,
          o.x * W, o.y * H, o.r * (W / 1200)
        );
        grd.addColorStop(0, `rgba(${o.hue}, ${o.alpha})`);
        grd.addColorStop(1, `rgba(${o.hue}, 0)`);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      });

      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}

/* ── Animated flowing grid lines ──────────────────────────── */
function GridLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Horizontal scan line — more visible */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        style={{ boxShadow: '0 0 12px 3px rgba(143,212,0,0.35)' }}
        animate={{ top: ['5%', '95%', '5%'] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />
      {/* Static grid — more visible */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(#4a6030 1px, transparent 1px), linear-gradient(90deg, #4a6030 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }}
      />
    </div>
  );
}

/* ── Floating mini particle ───────────────────────────────── */
function Particle({ x, y, size, delay, color = '#8fd400' }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.3, 0.6, 0],
        scale: [0, 1, 0.8, 1, 0],
        y: [0, -40, -30, -60, -80],
        x: [0, 10, -5, 8, 5],
      }}
      transition={{ repeat: Infinity, duration: 6 + delay, ease: 'easeOut', delay, repeatDelay: 2 }}
    />
  );
}

const PARTICLES = [
  { x: 12, y: 75, size: 5, delay: 0 },
  { x: 22, y: 80, size: 3, delay: 1.5 },
  { x: 80, y: 70, size: 4, delay: 0.8 },
  { x: 88, y: 78, size: 3, delay: 2.2 },
  { x: 50, y: 85, size: 4, delay: 1.1 },
  { x: 65, y: 72, size: 3, delay: 3 },
  { x: 35, y: 82, size: 5, delay: 2.5 },
  { x: 95, y: 50, size: 3, delay: 0.4 },
  { x: 5, y: 40, size: 4, delay: 1.8 },
];

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.25 },
    },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 48, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 80, damping: 18 } },
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[92vh] flex items-center"
      style={{ background: 'linear-gradient(160deg, #f4f7ee 0%, #eef5e0 40%, #f7f9f3 100%)' }}
    >
      {/* === Layered Animated Background === */}
      <AnimatedBackground />
      <GridLines />

      {/* Big decorative accent circles */}
      <motion.div
        className="absolute top-[-20%] right-[-8%] w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(143,212,0,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-25%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(143,212,0,0.08) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.12, 1], rotate: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut', delay: 3 }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}

      {/* === Main Content === */}
      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">

        {/* LEFT COLUMN */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >

          {/* Headline */}
          <motion.h1
            variants={slideUp}
            className="font-display font-black leading-[1.04] tracking-tight text-ink mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4rem)' }}
          >
            Setiap bisnis besar<br />
            pernah ada di{' '}
            <span className="relative inline-block">
              <span className="text-accent-ink">titik nol.</span>
              {/* Underline sweep */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
                className="absolute bottom-1 left-0 right-0 h-[10px] bg-accent/20 rounded-full -z-10"
              />
            </span>
          </motion.h1>

          {/* Sub copy */}
          <motion.p
            variants={slideUp}
            className="text-[1.05rem] leading-relaxed text-muted max-w-[54ch] mb-10"
          >
            ZerooWeb membantu membangun usaha kecil tampil lebih profesional di era modern.
            Website{' '}
            <strong className="text-ink font-semibold">profesional, terjangkau, dan mudah digunakan</strong>{' '}
            untuk membawa bisnis ke level berikutnya.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={slideUp} className="flex flex-wrap gap-4">
            <motion.a
              href="#kontak"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-9 py-4 rounded-full bg-accent text-[#16210a] font-bold text-[15.5px] overflow-hidden group flex items-center gap-2.5"
              style={{ boxShadow: '0 8px 32px rgba(143,212,0,0.35)' }}
            >
              {/* Shine sweep */}
              <motion.span
                className="absolute inset-0 bg-white/25 -skew-x-12"
                initial={{ x: '-150%' }}
                animate={{ x: '250%' }}
                transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.7, ease: 'easeInOut', delay: 2 }}
              />
              Mulai dari Nol
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              >
                <ArrowRight size={18} />
              </motion.span>
            </motion.a>

            <motion.a
              href="#layanan"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-9 py-4 rounded-full border border-ink/20 text-[15.5px] font-semibold text-ink bg-white/60 backdrop-blur hover:bg-white hover:border-ink/40 transition-all duration-200"
            >
              Lihat Paket Harga
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — Ring Visual */}
        <div className="flex items-center justify-center relative py-6 sm:py-8 overflow-visible">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[400px] aspect-square mx-auto"
          >
            {/* Outer pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute inset-[-6%] rounded-full border border-accent/25 pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [0.1, 0.25, 0.1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.7 }}
              className="absolute inset-[-12%] rounded-full border border-accent/15 pointer-events-none"
            />

            {/* SVG — Main Ring */}
            <svg viewBox="0 0 320 320" className="w-full h-full" overflow="visible">
              {/* Radar dashed orbit rings */}
              <motion.circle
                cx="160" cy="160" r="85"
                stroke="#8fd400" strokeWidth="1" strokeDasharray="4 8"
                fill="none" opacity="0.3"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
                style={{ transformOrigin: '160px 160px' }}
              />
              <motion.circle
                cx="160" cy="160" r="68"
                stroke="#8fd400" strokeWidth="1" strokeDasharray="2 6"
                fill="none" opacity="0.2"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                style={{ transformOrigin: '160px 160px' }}
              />

              {/* Ghost track arc */}
              <circle
                cx="160" cy="160" r="132"
                stroke="#c8d8b0" strokeWidth="11"
                fill="none" strokeDasharray="570 259"
                transform="rotate(-75 160 160)"
              />

              {/* Main animated lime-green arc */}
              <motion.circle
                cx="160" cy="160" r="132"
                stroke="#8fd400" strokeWidth="11"
                fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.79 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                transform="rotate(-75 160 160)"
                filter="url(#glow)"
              />

              {/* Glow filter */}
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
            </svg>

            {/* Center Logo */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.7, type: 'spring', stiffness: 140, damping: 14 }}
                className="relative"
              >
                <motion.div
                  animate={{ opacity: [0.5, 0.15, 0.5], scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="absolute inset-[-10px] rounded-[28px] pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(143,212,0,0.4) 0%, transparent 70%)' }}
                />
                <img
                  src="/assets/logo.png"
                  alt="ZerooWeb Logo"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-[18px] sm:rounded-[20px] relative z-10 bg-[#12151f]"
                  style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(143,212,0,0.2)' }}
                />
              </motion.div>
              <motion.strong
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="font-mono text-[9.5px] sm:text-[10.5px] font-bold tracking-widest text-accent-ink uppercase mt-3 sm:mt-3.5"
              >
                Titik Nol · Titik Mulai
              </motion.strong>
            </div>

            {/* Floating card — Modern & Bersih */}
            <motion.div
              initial={{ opacity: 0, x: 24, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.5, type: 'spring' }}
              className="absolute top-[32%] right-[-10px] sm:right-[-32px] md:right-[-44px]"
            >
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="bg-white/95 backdrop-blur border border-line/70 rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-xl pointer-events-none"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
              >
                <div className="font-semibold text-[11px] sm:text-[12px] text-ink flex items-center gap-1.5 sm:gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent" />
                  Modern & Bersih
                </div>
                <div className="text-[9px] sm:text-[10px] text-muted mt-0.5 ml-3 sm:ml-4">Kualitas Desain</div>
              </motion.div>
            </motion.div>

            {/* Floating card — Mudah Digunakan */}
            <motion.div
              initial={{ opacity: 0, x: -24, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.7, type: 'spring' }}
              className="absolute bottom-[6%] left-[-8px] sm:left-[-20px] md:left-[-28px]"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.8 }}
                className="bg-white/95 backdrop-blur border border-line/70 rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 pointer-events-none"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
              >
                <div className="font-semibold text-[11px] sm:text-[12px] text-ink flex items-center gap-1.5 sm:gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent" />
                  Mudah Digunakan
                </div>
                <div className="text-[9px] sm:text-[10px] text-muted mt-0.5 ml-3 sm:ml-4">Ramah Pengguna</div>
              </motion.div>
            </motion.div>

            {/* Floating card — Super Cepat */}
            <motion.div
              initial={{ opacity: 0, y: -24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.9, type: 'spring' }}
              className="absolute top-[23%] left-[-10px] sm:left-[-30px] md:left-[-42px]"
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut', delay: 1.5 }}
                className="bg-white/95 backdrop-blur border border-line/70 rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-xl pointer-events-none"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
              >
                <div className="font-semibold text-[11px] sm:text-[12px] text-ink flex items-center gap-1.5 sm:gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400" />
                  Super Cepat
                </div>
                <div className="text-[9px] sm:text-[10px] text-muted mt-0.5 ml-3 sm:ml-4">Performa Tinggi</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>


    </section>
  );
}
