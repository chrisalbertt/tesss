import React from 'react';
import { motion } from 'framer-motion';

export default function Philosophy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  const pointVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 15 },
    },
  };

  return (
    <section className="bg-navy text-white py-20 md:py-28 relative overflow-hidden" id="tentang">
      {/* Background elements */}
      <div className="absolute right-[-10%] top-[-10%] w-[35%] aspect-square rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-[1180px] mx-auto px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center"
        >
          {/* Left Text Column */}
          <div className="flex flex-col text-left">
            <motion.div variants={textVariants}>
              <span className="font-mono text-[12.5px] font-semibold tracking-widest text-accent bg-accent/10 px-3 py-1.5 rounded-full inline-flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                KENAPA "ZEROO"?
              </span>
            </motion.div>

            <motion.h2 
              variants={textVariants}
              className="font-display font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight tracking-tight mt-2 mb-6"
            >
              Bukan lingkaran sempurna. <br className="hidden sm:inline" />
              Sengaja.
            </motion.h2>

            <motion.p 
              variants={textVariants}
              className="text-base sm:text-lg text-white/70 leading-relaxed max-w-[60ch] mb-8"
            >
              "ZerooWeb" berasal dari kata <em className="not-italic text-accent font-semibold">zero</em> — karena kami percaya setiap bisnis bisa memulai dari nol. Filosofi ini kami bawa langsung ke dalam logo kami.
            </motion.p>

            {/* Philosophy Points */}
            <div className="flex flex-col gap-6 mt-4">
              <motion.div 
                variants={pointVariants}
                className="flex gap-4 items-start p-4 rounded-2xl hover:bg-white/5 transition-all duration-300"
              >
                <span className="font-mono text-[11px] font-bold text-accent border border-accent/25 px-2.5 py-1 rounded-lg h-fit select-none bg-accent/5">
                  Celah
                </span>
                <div>
                  <h3 className="font-display font-semibold text-white text-base sm:text-lg mb-1">
                    Perjalanan yang masih berjalan
                  </h3>
                  <p className="text-white/60 text-sm sm:text-[14.5px] leading-relaxed">
                    Lingkaran tertutup penuh melambangkan sesuatu yang selesai. ZerooWeb soal bisnis yang baru mulai dan terus berkembang — celah itu artinya "masih berproses", bukan statis.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={pointVariants}
                className="flex gap-4 items-start p-4 rounded-2xl hover:bg-white/5 transition-all duration-300"
              >
                <span className="font-mono text-[11px] font-bold text-accent border border-accent/25 px-2.5 py-1 rounded-lg h-fit select-none bg-accent/5">
                  Titik
                </span>
                <div>
                  <h3 className="font-display font-semibold text-white text-base sm:text-lg mb-1">
                    Titik nol, tempat semua dimulai
                  </h3>
                  <p className="text-white/60 text-sm sm:text-[14.5px] leading-relaxed">
                    Titik kecil di ujung lingkaran adalah langkah pertama — representasi dari usaha kecil yang baru memulai langkahnya di dunia digital.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Diagram Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center p-8 bg-navy-soft border border-line-dark rounded-[22px] shadow-2xl relative group"
          >
            {/* Visual shine card effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-accent/3 to-accent/0 rounded-[22px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="w-full max-w-[300px] flex flex-col items-center">
              <svg viewBox="0 0 300 300" className="w-full h-auto">
                {/* Background track circle */}
                <circle 
                  cx="150" 
                  cy="150" 
                  r="118" 
                  stroke="#2a2f40" 
                  strokeWidth="11" 
                  fill="none" 
                  strokeDasharray="540 200" 
                  transform="rotate(-56 150 150)"
                  opacity="0.8"
                />
                
                {/* Animated active path circle */}
                <motion.circle 
                  cx="150" 
                  cy="150" 
                  r="118" 
                  stroke="#8fd400" 
                  strokeWidth="11" 
                  fill="none" 
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 0.65 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
                  transform="rotate(-56 150 150)"
                />

                {/* Blinking Dot at the endpoint of active path */}
                <motion.circle 
                  cx="228" 
                  cy="72" 
                  r="10" 
                  fill="#f7f8fb"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.8, type: "spring", stiffness: 150 }}
                  className="shadow-xl"
                />
                
                {/* Glowing halo around the dot */}
                <motion.circle 
                  cx="228" 
                  cy="72" 
                  r="18" 
                  fill="none"
                  stroke="#8fd400"
                  strokeWidth="2"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: [1, 1.4, 1], opacity: [0, 0.4, 0] }}
                  viewport={{ once: true }}
                  transition={{ delay: 2, repeat: Infinity, duration: 2 }}
                />

                {/* Diagram helper text */}
                <text 
                  x="150" 
                  y="278" 
                  textAnchor="middle" 
                  fill="#9aa0ab" 
                  fontFamily="IBM Plex Mono" 
                  fontSize="11" 
                  fontWeight="500"
                  letterSpacing="0.05em"
                >
                  celah = proses · titik = awal
                </text>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
