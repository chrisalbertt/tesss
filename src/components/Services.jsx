import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

/* ── Animated Particle Network Canvas Background ── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;

    const PARTICLE_COUNT = 45;
    const CONNECTION_DIST = 140;
    const COLOR = '143,212,0';

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.5 + 1.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${COLOR},${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR},0.5)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  );
}

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 18 },
    },
  };

  const servicesData = [
    {
      step: 'PAKET 01',
      title: 'Landing Page',
      price: 'Rp1.000.000 – Rp2.000.000',
      description: 'Website profesional & responsif untuk menampilkan profil bisnis, produk, dan kontak utama. Pilihan cepat untuk tampil tepercaya di internet.',
      features: [
        'Desain responsif di semua perangkat',
        'Integrasi WhatsApp, lokasi & media sosial',
        'Tampilan modern sesuai branding usahamu',
        'Performa tinggi, ringan & ramah SEO',
      ],
      progressVal: 25,
      buttonText: 'Pilih Paket Ini',
      buttonHref: '#kontak',
      featured: false,
    },
    {
      step: 'PAKET 02',
      title: 'Landing Page + Panel Admin',
      price: 'Rp2.000.000 – Rp3.000.000',
      description: 'Website interaktif lengkap dengan dashboard admin mandiri. Bebas kelola dan perbarui produk, promo, serta konten kapan saja tanpa ribet.',
      features: [
        'Semua keunggulan paket Landing Page',
        'Dashboard admin khusus yang ramah pengguna',
        'Kelola produk, galeri, & testimoni sendiri',
        'Update konten kapan saja tanpa tergantung developer',
      ],
      progressVal: 65,
      buttonText: 'Pilih Paket Ini',
      buttonHref: '#kontak',
      featured: true,
    },
    {
      step: 'PAKET 03',
      title: 'Custom System',
      price: 'Mulai dari Rp3.000.000',
      description: 'Solusi sistem web kustom yang dirancang sesuai alur kerja operasional usaha.',
      features: [
        'Arsitektur & fitur disesuaikan alur bisnismu',
        'Booking, manajemen data, atau alur kerja otomatis',
        'Integrasi API & sistem eksternal sesuai kebutuhan',
        'Dukungan fleksibel untuk pertumbuhan bisnis jangka panjang',
      ],
      progressVal: 100,
      buttonText: 'Pilih Paket Ini',
      buttonHref: '#kontak',
      featured: false,
    },
  ];

  return (
    <section className="bg-paper py-16 md:py-24 relative overflow-hidden" id="layanan">

      {/* === Particle Network Background === */}
      <ParticleCanvas />

      {/* === Extra Layered Effects === */}

      {/* Rotating dashed ring – top right */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
        className="absolute top-[-90px] right-[-90px] w-[340px] h-[340px] rounded-full pointer-events-none"
        style={{ border: '1.5px dashed rgba(143,212,0,0.18)' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
        className="absolute top-[-55px] right-[-55px] w-[220px] h-[220px] rounded-full pointer-events-none"
        style={{ border: '1px dashed rgba(143,212,0,0.12)' }}
      />

      {/* Rotating dashed ring – bottom left */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 45, ease: 'linear', delay: 3 }}
        className="absolute bottom-[-110px] left-[-110px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ border: '1.5px dashed rgba(20,22,31,0.1)' }}
      />

      {/* Floating spinning square – top left */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 90, 180, 270, 360] }}
        transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
        className="absolute top-[10%] left-[5%] w-5 h-5 pointer-events-none"
        style={{ border: '2px solid rgba(143,212,0,0.28)' }}
      />

      {/* Floating spinning square – mid right */}
      <motion.div
        animate={{ y: [0, 16, -10, 0], rotate: [0, -90, -180, -270, -360] }}
        transition={{ repeat: Infinity, duration: 26, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[42%] right-[5%] w-4 h-4 pointer-events-none"
        style={{ border: '1.5px solid rgba(143,212,0,0.22)' }}
      />

      {/* Pulsing + cross – bottom right */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[18%] right-[12%] pointer-events-none"
      >
        <div className="relative w-6 h-6">
          <div className="absolute top-1/2 left-0 w-full h-[1.5px] -translate-y-1/2 bg-accent-ink/30" />
          <div className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-accent-ink/30" />
        </div>
      </motion.div>

      {/* Pulsing + cross – mid left */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.4, 0.15] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut', delay: 3 }}
        className="absolute top-[60%] left-[7%] pointer-events-none"
      >
        <div className="relative w-5 h-5">
          <div className="absolute top-1/2 left-0 w-full h-[1.5px] -translate-y-1/2 bg-accent-ink/25" />
          <div className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-accent-ink/25" />
        </div>
      </motion.div>

      {/* Animated SVG sine wave – bottom of section */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none" style={{ height: '80px' }}>
        <motion.svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-full"
          animate={{ x: [0, -80, 0] }}
          transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
          style={{ width: '120%' }}
        >
          <path
            d="M0,40 C120,10 240,70 360,40 C480,10 600,70 720,40 C840,10 960,70 1080,40 C1200,10 1320,70 1440,40 L1440,80 L0,80 Z"
            fill="rgba(143,212,0,0.04)"
          />
          <path
            d="M0,50 C180,20 360,80 540,50 C720,20 900,80 1080,50 C1260,20 1440,70 1620,50"
            fill="none"
            stroke="rgba(143,212,0,0.12)"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>

      <div className="max-w-[1180px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 text-left">
          <div>
            <span className="font-mono text-[12.5px] font-semibold tracking-widest text-accent-ink bg-accent/15 px-3 py-1.5 rounded-full inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              LAYANAN & HARGA
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight tracking-tight mt-2 whitespace-nowrap">
              Pilih paket sesuai kebutuhan usahamu.
            </h2>
          </div>
        </div>

        {/* Pricing Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {servicesData.map((pkg, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{
                y: -10,
                boxShadow: pkg.featured
                  ? "0 30px 60px -15px rgba(143,212,0,0.18)"
                  : "0 25px 50px -12px rgba(20,22,31,0.08)"
              }}
              className={`flex flex-col rounded-[22px] p-8 border transition-all duration-300 relative ${pkg.featured
                ? 'bg-ink text-white border-accent shadow-xl shadow-accent/5'
                : 'bg-white text-ink border-line hover:border-line/80'
                }`}
            >
              {/* Featured Badge */}
              {pkg.featured && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent text-[#16210a] font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                  Rekomendasi
                </div>
              )}

              {/* Card Top */}
              <div className="flex justify-between items-center mb-6">
                <span className={`font-mono text-[12px] font-semibold tracking-wider ${pkg.featured ? 'text-white/50' : 'text-muted-2'
                  }`}>
                  {pkg.step}
                </span>

                {/* SVG Progress Ring */}
                <div className="w-9 h-9 relative">
                  <svg viewBox="0 0 32 32" className="w-full h-full transform -rotate-90">
                    <circle
                      cx="16"
                      cy="16"
                      r="13"
                      stroke={pkg.featured ? '#2a2f40' : '#e3e5ec'}
                      strokeWidth="3.5"
                      fill="none"
                    />
                    <motion.circle
                      cx="16"
                      cy="16"
                      r="13"
                      stroke="#8fd400"
                      strokeWidth="3.5"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: pkg.progressVal / 100 }}
                      viewport={{ once: false }}
                      transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold text-accent">
                    {pkg.progressVal}%
                  </span>
                </div>
              </div>

              {/* Title & Price */}
              <h3 className="font-display font-bold text-xl sm:text-2xl mb-2 text-left">
                {pkg.title}
              </h3>
              <div className={`font-mono text-[14.5px] font-semibold text-left mb-6 ${pkg.featured ? 'text-accent' : 'text-accent-ink'
                }`}>
                {pkg.price}
              </div>

              {/* Description */}
              <p className={`text-sm sm:text-[14.5px] leading-relaxed text-left mb-8 ${pkg.featured ? 'text-white/70' : 'text-muted'
                }`}>
                {pkg.description}
              </p>

              {/* Features List */}
              <ul className="flex flex-col gap-4 flex-grow mb-8 text-left">
                {pkg.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex gap-3 text-sm sm:text-[14px] items-start">
                    <span className={`p-0.5 rounded-full mt-0.5 flex-shrink-0 ${pkg.featured ? 'bg-accent/15 text-accent' : 'bg-accent/10 text-accent-ink'
                      }`}>
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className={pkg.featured ? 'text-white/80' : 'text-muted'}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button Action */}
              <a
                href={pkg.buttonHref}
                className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-200 text-center flex items-center justify-center border ${pkg.featured
                  ? 'bg-accent border-accent text-[#16210a] hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20'
                  : 'bg-transparent border-line text-ink hover:border-ink hover:bg-paper-dim/40'
                  }`}
              >
                {pkg.buttonText}
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Layanan Foot */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-[14.5px] text-muted font-medium"
        >
          Belum yakin butuh yang mana?{' '}
          <a href="#kontak" className="text-ink font-semibold underline underline-offset-4 hover:text-accent-ink transition-colors">
            Ceritakan usahamu, kami bantu tentukan titik mulainya.
          </a>
        </motion.p>
      </div>
    </section>
  );
}
