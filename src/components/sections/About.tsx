import React from 'react';
import { motion } from 'motion/react';
import { Award, Briefcase, Users, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

const stats = [
  { icon: Award, label: 'Years Experience', value: '5+' },
  { icon: CheckCircle, label: 'Projects Completed', value: '150+' },
  { icon: Users, label: 'Happy Clients', value: '120+' },
  { icon: Briefcase, label: 'Awards Won', value: '12+' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
          {/* Grid Layout inspired by image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-serif leading-[1.1] tracking-tight uppercase text-white">
                BUILDING <span className="italic text-primary">SCALABLE</span> & INTUITIVE WEBSITES
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <p className="text-xl font-serif text-slate-200 leading-relaxed italic">
                I'm Fuad, a specialized web designer focused on creating high-performance, aesthetically dominant digital platforms.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
                With 4 years of dedicated experience in the digital space, I blend structural architecture with modern UI engineering. My goal is to build sites that don't just look good, but drive real growth and engagement. From custom landing pages to complex e-commerce structures, every project is a masterclass in pixel-perfection.
              </p>
            </motion.div>
          </div>
      </div>
    </section>
  );
}
