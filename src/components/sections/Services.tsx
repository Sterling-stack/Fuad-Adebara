import React from 'react';
import { motion } from 'motion/react';
import { Layout, Code, TrendingUp, BarChart3, Palette, Search, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

const services = [
  { 
    icon: Layout, 
    title: 'Web Design', 
    desc: 'Creating visually stunning and user-centric website designs that convert visitors into loyal customers.' 
  },
  { 
    icon: Code, 
    title: 'Frontend Development', 
    desc: 'Building responsive, fast, and scalable web applications using the latest technologies like React and Tailwind.' 
  },
  { 
    icon: TrendingUp, 
    title: 'Digital Marketing', 
    desc: 'Strategic data-driven marketing campaigns designed to scale your business and increase brand awareness.' 
  },
  { 
    icon: BarChart3, 
    title: 'Trading Consultation', 
    desc: 'Professional insights and strategies for navigating the financial markets with precision and confidence.' 
  },
  { 
    icon: Palette, 
    title: 'Brand Strategy', 
    desc: 'Developing comprehensive brand identities that resonate with your audience and stand out in the market.' 
  },
  { 
    icon: Search, 
    title: 'SEO & Optimization', 
    desc: 'Maximizing your online visibility through advanced search engine optimization and performance tuning.' 
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-background relative border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-serif leading-tight uppercase tracking-tight text-white">Digital <br/> Mastery</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-end"
          >
            <p className="text-slate-400 max-w-sm text-sm font-medium leading-relaxed">
              I provide specialized web design services that combine high-performance code with avant-garde aesthetics.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {[
            { title: 'Web Architecture', desc: 'Building the skeletal structure of high-performance websites.' },
            { title: 'Responsive Design', desc: 'Crafting interfaces that adapt beautifully to every single device.' },
            { title: 'UI Engineering', desc: 'Implementing pixel-perfect components with smooth interactions.' },
            { title: 'SEO Strategy', desc: 'Optimizing sites for maximum visibility and search performance.' },
            { title: 'Brand Deployment', desc: 'Translating visual identities into compelling web experiences.' },
            { title: 'Maintenance', desc: 'Regular updates and speed optimizations to keep sites at peak performance.' },
          ].map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-6"
            >
              <div className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
                0{idx + 1} &mdash; {service.title}
              </div>
              <h3 className="text-2xl font-serif hover:italic transition-all cursor-default text-white">
                {service.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed max-w-xs uppercase tracking-wider font-medium">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
