import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement?.scrollTop || document.body?.scrollTop || 0;
      setShowScroll(scrollPosition > 30);
    };

    window.addEventListener('scroll', checkScrollTop, { passive: true });
    checkScrollTop();
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-[#f4f7ee]/90 backdrop-blur-md py-5 text-center border-t border-line/80">
        <div className="max-w-[1180px] mx-auto px-6 flex justify-center items-center">
          <span className="text-[13.5px] font-mono text-muted font-medium tracking-wide">
            &copy; {new Date().getFullYear()} <span className="text-ink font-bold">Zeroo<span className="text-accent-ink">Web</span></span> &mdash; Jasa Pembuatan Website
          </span>
        </div>
      </footer>

      {/* Floating Scroll-to-Top Button (outside backdrop-blur container) */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={scrollToTop}
            aria-label="Scroll to Top"
            className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full bg-accent text-[#16210a] shadow-lg shadow-accent/25 hover:shadow-accent/40 flex items-center justify-center transition-all duration-200 hover:-translate-y-1 active:scale-95 cursor-pointer border border-[#a2e635]/35"
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
