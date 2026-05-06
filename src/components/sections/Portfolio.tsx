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
    <section id="portfolio" className="py-24 bg-background relative border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6">
          <div className="space-y-4">
            <h2 className="text-6xl md:text-7xl font-serif tracking-tight uppercase text-white">RELIABLE <span className="text-primary italic">WORKS</span></h2>
          </div>
          <p className="text-slate-400 max-w-sm text-sm font-medium tracking-tight">
            Explore my latest web design launches and discover how I can transform your vision into a digital reality.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16">
          {[
            { id: '01', title: 'ECOMMERCE HUB', category: 'E-commerce', year: '2025', desc: 'Fully optimized digital marketplace', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200&h=600' },
            { id: '02', title: 'SaaS LANDING', category: 'Web Design', year: '2024', desc: 'Conversion-focused SaaS platform', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=600' },
            { id: '03', title: 'PORTFOLIO PRO', category: 'Creative Web', year: '2024', desc: 'Minimalist portfolio for creative agency', image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=1200&h=600' },
          ].map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-6"
            >
              <div className="aspect-[21/9] relative overflow-hidden rounded-3xl bg-secondary border border-white/5">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105 opacity-80 hover:opacity-100"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white">{project.title}</h3>
                  <p className="text-[11px] text-slate-500 uppercase tracking-widest">{project.desc}</p>
                </div>
                
                <div className="flex items-center space-x-8">
                  <span className="text-[11px] font-bold text-slate-600">{project.year}</span>
                  <Badge className="bg-primary text-white hover:bg-primary/80 rounded-full px-4 py-1 text-[9px] uppercase tracking-widest font-bold">
                    {project.category}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
