import React from 'react';
import { motion } from 'motion/react';
import { Progress } from '@/components/ui/progress';

const skills = [
  { name: 'HTML/CSS', level: 95 },
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 88 },
  { name: 'UI/UX Design', level: 85 },
  { name: 'Digital Marketing', level: 82 },
  { name: 'Trading', level: 80 },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-background relative border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-serif leading-tight uppercase tracking-tight text-white">Experience <br/> & Magic</h2>
          </motion.div>
          
          <div className="space-y-12">
            {skills.map((skill, idx) => (
              <motion.div 
                key={skill.name} 
                className="group border-b border-white/5 pb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-serif group-hover:italic transition-all text-white">{skill.name}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{skill.level}%</span>
                    <div className="w-32 h-[1px] bg-white/10 relative overflow-hidden">
                      <motion.div 
                        className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_10px_#a855f7]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.1 + 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
