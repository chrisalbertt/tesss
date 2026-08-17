import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const steps = [
    {
      num: '01',
      title: 'Konsultasi',
      desc: 'Ceritakan bisnismu dan fitur website impianmu tanpa pusing urusan teknis.',
    },
    {
      num: '02',
      title: 'Rancang & Desain',
      desc: 'Penyusunan blueprint visual dan navigasi modern yang berfokus pada kenyamanan pengguna.',
    },
    {
      num: '03',
      title: 'Bangun & Uji',
      desc: 'Website dikembangkan dengan performa tinggi dan diuji menyeluruh di semua gadget.',
    },
    {
      num: '04',
      title: 'Luncurkan',
      desc: 'Website siap diakses lengkap dengan cara kelola yang mudah.',
    },
  ];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden" id="proses" style={{ background: '#0f1219' }}>
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Section Title */}
        <div className="text-left mb-14 sm:mb-16">
          <span className="font-mono text-[12.5px] font-semibold tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            PROSES
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight tracking-tight mt-2 text-white">
            Dari obrolan santai, menjadi website yang jalan.
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line behind the steps on Desktop */}
          <div className="hidden lg:block absolute top-[18px] left-[18px] right-[18px] h-[2px] bg-white/10 z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              style={{ originX: 0 }}
              className="h-full bg-accent w-full"
            />
          </div>

          {/* Connecting Line behind the steps on Mobile */}
          <div className="block lg:hidden absolute left-[17px] top-[18px] bottom-[0px] w-[2px] bg-white/10 z-0">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ originY: 0 }}
              className="w-full bg-accent h-full"
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8 relative z-10"
          >
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <motion.div
                  key={idx}
                  variants={stepVariants}
                  onClick={() => setActiveStep(idx)}
                  className="relative flex flex-col items-start text-left group cursor-pointer select-none pl-14 lg:pl-0"
                >
                  {/* Step Circle Bead */}
                  <div className="absolute left-0 top-0 lg:relative lg:left-auto lg:top-auto lg:mb-6 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: isActive ? 1.15 : 1 }}
                      className={`w-9 h-9 rounded-full border-[2.5px] flex items-center justify-center shadow-lg relative z-10 transition-colors duration-300 ${
                        isActive
                          ? 'bg-accent border-accent text-[#16210a]'
                          : 'bg-[#1a2030] border-accent text-accent group-hover:bg-accent/20'
                      }`}
                    >
                      {isActive ? (
                        <div className="w-3 h-3 rounded-full bg-[#16210a]" />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-accent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </motion.div>

                    {/* Glowing background ring */}
                    <div
                      className={`absolute w-12 h-12 rounded-full bg-accent/20 transition-all duration-300 z-0 ${
                        isActive ? 'scale-125 opacity-100' : 'scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100'
                      }`}
                      style={{ filter: 'blur(6px)' }}
                    />
                  </div>

                  {/* Step Number */}
                  <span
                    className={`font-mono text-[12.5px] font-bold tracking-wider mb-1.5 transition-colors duration-200 ${
                      isActive ? 'text-accent' : 'text-accent/80'
                    }`}
                  >
                    {step.num}
                  </span>

                  {/* Step Title */}
                  <h3
                    className={`font-display font-semibold text-lg sm:text-xl mb-2.5 transition-colors duration-200 ${
                      isActive ? 'text-accent font-bold' : 'text-white group-hover:text-accent'
                    }`}
                  >
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-slate-300 text-sm sm:text-[14px] leading-relaxed max-w-[34ch]">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
