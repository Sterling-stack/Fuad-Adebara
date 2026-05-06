import React from 'react';
import { motion } from 'motion/react';

const partners = [
  { name: 'Frame Blox', icon: '⬔' },
  { name: 'Supa Blox', icon: '○' },
  { name: 'Hype Blox', icon: '⧖' },
  { name: 'Ultra Blox', icon: '◐' },
  { name: 'Ship Blox', icon: '▶▶' },
  { name: 'Frame Blox', icon: '◌' },
  { name: 'Ultra Blox', icon: '◑' },
  { name: 'Ship Blox', icon: '▷▷' },
];

export default function TrustedBy() {
  return (
    <section id="trusted" className="py-24 bg-background border-y border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">TRUSTED BY</h2>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">Collaborating with visionary brands to build the future of the web.</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 border-l border-t border-white/5">
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center justify-center p-8 border-r border-b border-white/5 group hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center space-x-3 grayscale group-hover:grayscale-0 transition-all">
                <span className="text-xl text-slate-600 group-hover:text-primary">{partner.icon}</span>
                <span className="text-sm font-bold tracking-tight text-slate-600 group-hover:text-white uppercase">{partner.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
