import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Clock, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    paket: 'Landing Page (Rp1–2 Juta)',
    pesan: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nama, email, paket, pesan } = formData;
    const subject = encodeURIComponent('Konsultasi Website — ' + nama);
    const body = encodeURIComponent(
      `Nama: ${nama}\nEmail: ${email}\nPaket yang diminati: ${paket}\n\nPesan:\n${pesan}`
    );
    window.location.href = `mailto:zeroowebs@gmail.com?subject=${subject}&body=${body}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    },
  };

  return (
    <section className="bg-navy text-white py-12 md:py-16 relative overflow-hidden" id="kontak">
      {/* Background decorations */}
      <div className="absolute top-0 right-[-10%] w-[40%] aspect-square rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] aspect-square rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-[1180px] mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start"
        >
          {/* Left Content */}
          <div className="flex flex-col text-left">
            <motion.div variants={itemVariants}>
              <span className="font-mono text-[12.5px] font-semibold tracking-widest text-accent bg-accent/10 px-3 py-1.5 rounded-full inline-flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                KONTAK
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="font-display font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight tracking-tight mt-2 mb-6 text-white"
            >
              Ceritakan bisnis kamu,<br />
              kami bantu wujudkan.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-white/70 leading-relaxed max-w-[48ch] mb-10"
            >
              Cukup ceritakan usahamu dan apa yang kamu butuhkan dan kami akan rekomendasikan pilihan yang paling sesuai.
            </motion.p>

            {/* Contact Info List */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <a href="mailto:zeroowebs@gmail.com" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:scale-105 transition-all duration-300">
                  <Mail size={18} className="text-accent" />
                </div>
                <div>
                  <div className="font-mono text-[11.5px] font-bold tracking-widest text-muted-2 uppercase mb-1">
                    Email
                  </div>
                  <div className="text-[15.5px] font-medium text-white group-hover:text-accent-ink transition-colors duration-200">
                    zeroowebs@gmail.com
                  </div>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-accent" />
                </div>
                <div>
                  <div className="font-mono text-[11.5px] font-bold tracking-widest text-muted-2 uppercase mb-1">
                    Waktu Respon
                  </div>
                  <div className="text-[15.5px] font-medium text-white">
                    Dibalas dalam 1×24 jam
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Form */}
          <motion.div
            variants={itemVariants}
            className="bg-navy-soft border border-line-dark rounded-[22px] p-8 sm:p-10 shadow-2xl relative"
          >
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-accent/5 to-accent/0 rounded-[22px] pointer-events-none" />

            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nama" className="text-[13px] font-medium text-white/60">Nama</label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Nama kamu"
                    required
                    className="w-full bg-navy border border-line-dark rounded-xl px-4 py-3.5 text-[14.5px] text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[13px] font-medium text-white/60">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    required
                    className="w-full bg-navy border border-line-dark rounded-xl px-4 py-3.5 text-[14.5px] text-white placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="paket" className="text-[13px] font-medium text-white/60">Paket yang diminati</label>
                <div className="relative">
                  <select
                    id="paket"
                    name="paket"
                    value={formData.paket}
                    onChange={handleChange}
                    className="w-full bg-navy border border-line-dark rounded-xl px-4 py-3.5 text-[14.5px] text-white appearance-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
                  >
                    <option value="Landing Page (Rp1–2 Juta)">Landing Page (Rp1–2 Juta)</option>
                    <option value="Landing Page + Admin Panel (Rp2–3 Juta)">Landing Page + Admin Panel (Rp2–3 Juta)</option>
                    <option value="Custom System (mulai Rp3 Juta)">Custom System (mulai Rp3 Juta)</option>
                    <option value="Belum tahu, mau konsultasi dulu">Belum tahu, mau konsultasi dulu</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="pesan" className="text-[13px] font-medium text-white/60">Ceritakan usahamu</label>
                <textarea
                  id="pesan"
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  placeholder="Usaha apa, kebutuhannya seperti apa, dan kapan targetnya online?"
                  required
                  rows={4}
                  className="w-full bg-navy border border-line-dark rounded-xl px-4 py-3.5 text-[14.5px] text-white placeholder-white/30 resize-y min-h-[120px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-4 rounded-xl bg-accent text-[#16210a] font-semibold text-[15px] hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Kirim Pesan</span>
                <Send size={16} className="transform transition-transform duration-250 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <p className="text-[12px] text-white/40 leading-relaxed mt-2 text-center">
                Pesan akan terkirim langsung ke zeroowebs@gmail.com
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
