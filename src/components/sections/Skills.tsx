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
    <section id="skills" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">Skills</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-white">Expertise & Proficiency</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Over the years, I've honed my skills in various domains of the digital space to provide comprehensive solutions.
            </p>
          </div>

          <div className="space-y-8">
            {skills.map((skill, idx) => (
              <div key={skill.name} className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-medium text-foreground">{skill.name}</span>
                  <span className="text-sm font-bold text-primary">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.1 }}
                    className="h-full bg-gradient-primary rounded-full shadow-elegant"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
