import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const defaultProjects = [
  { id: '01', title: 'Luxury Real Estate', category: 'Web Design', desc: 'A high-end property listing platform with immersive visuals.' },
  { id: '02', title: 'Fintech Dashboard', category: 'Frontend Dev', desc: 'Secure and scalable financial monitoring tool for traders.' },
  { id: '03', title: 'Brand Identity', category: 'Digital Marketing', desc: 'Unified branding strategy for a global tech startup.' },
  { id: '04', title: 'Crypto Exchange', category: 'Trading', desc: 'Real-time trading platform with advanced charting features.' },
  { id: '05', title: 'Modern Portfolio', category: 'Web Design', desc: 'Minimalist approach to personal branding and showcases.' },
  { id: '06', title: 'SEO Optimizer', category: 'Digital Marketing', desc: 'Data-driven tool for maximizing organic search traffic.' },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-white">Featured Projects</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-md">
            A selection of my best work across various disciplines, ranging from web development to brand strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-card border border-slate-100 dark:border-slate-800"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-50 dark:bg-slate-950">
                <div className="absolute inset-0 bg-gradient-primary opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center text-5xl font-serif font-bold text-primary/10 group-hover:scale-125 transition-transform duration-700 select-none">
                  {project.id}
                </div>
                
                {/* Overlay Links */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 backdrop-blur-[2px]">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 bg-white text-primary rounded-full shadow-elegant"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 bg-white text-primary rounded-full shadow-elegant"
                  >
                    <Github className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-primary border-primary/20 bg-orange-50 dark:bg-orange-950/20 uppercase tracking-widest text-[9px] font-bold px-3 py-1">
                    {project.category}
                  </Badge>
                  <span className="text-xs font-mono text-slate-400 font-bold">{project.id}</span>
                </div>
                <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                  {project.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
