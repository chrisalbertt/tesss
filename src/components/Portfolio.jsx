import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Portfolio() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 18 },
    },
  };

  const projectData = [
    {
      num: '#01',
      title: 'Landing Page Company Profile',
      type: 'Landing Page + Admin',
      status: 'Dalam proses',
      delay: 0,
    },
  ];

  return (
    <section className="bg-paper py-16 md:py-24 relative overflow-hidden" id="portofolio">
      {/* Background Tech Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#14161f 1.2px, transparent 1.2px)`,
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute right-[-6%] top-[15%] w-[400px] h-[400px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />

      <div className="max-w-[1180px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-left mb-16 max-w-[700px]">
          <span className="font-mono text-[12.5px] font-semibold tracking-widest text-accent-ink bg-accent/15 px-3 py-1.5 rounded-full inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            PORTOFOLIO
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight tracking-tight mt-2 text-ink">
            Beberapa proyek yang telah kami kerjakan.
          </h2>
        </div>

        {/* Portfolio Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectData.map((project, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="border border-line rounded-[14px] overflow-hidden bg-white shadow-sm flex flex-col group relative"
            >
              {/* Mock Browser Header */}
              <div className="flex gap-1.5 p-3.5 border-b border-line bg-paper-dim/40">
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
              </div>

              {/* Shimmer Visual Body */}
              <div className="h-[200px] relative overflow-hidden bg-paper-dim flex items-center justify-center">
                {/* Shimmer skeleton background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />

                {/* Loader tag */}
                <div className="bg-white border border-line rounded-full py-2 px-4 shadow-sm font-mono text-[11px] text-muted-2 flex items-center gap-2.5 relative z-10 transition-transform duration-300 group-hover:scale-105">
                  <Loader2 size={13} className="animate-spin text-accent-ink" />
                  <span>{project.status}</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 text-left border-t border-line">
                <h3 className="font-display font-semibold text-base text-ink group-hover:text-accent-ink transition-colors duration-250 mb-1">
                  {project.title}
                </h3>
                <span className="font-mono text-[12px] text-muted-2">
                  {project.type}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
}
