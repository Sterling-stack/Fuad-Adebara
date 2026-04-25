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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image / Visuals */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-secondary rounded-2xl overflow-hidden shadow-elegant border border-border">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent flex items-center justify-center text-muted-foreground italic font-serif text-2xl">
                 [ Portrait Placeholder ]
              </div>
            </div>
            
            {/* Floating Badge */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="absolute -bottom-6 -right-6 glassmorphism p-6 rounded-2xl shadow-elegant border border-primary/20 max-w-[180px]"
            >
              <div className="text-3xl font-bold text-primary mb-1">5+</div>
              <div className="text-sm font-medium text-muted-foreground">Years of expertise in digital craft</div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-bold tracking-widest uppercase text-sm">About Me</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
                Crafting Digital Experiences That Matter
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hello, I'm Fuad Adebara. I'm a multidisciplinary digital artist based in Nigeria. 
                With a passion for combining aesthetics with functionality, I've spent the last 5 years 
                bridging the gap between design and technology.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether it's building a high-performance web application, designing a unique brand identity, 
                or formulating a winning digital marketing strategy, my goal is always the same: 
                to create something that leaves a lasting impression and delivers real value.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-6 border-transparent bg-slate-50 dark:bg-slate-900 hover:bg-orange-50/50 dark:hover:bg-slate-800/50 transition-colors duration-300 group">
                    <stat.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-2xl font-bold text-foreground dark:text-white">{stat.value}</div>
                    <div className="text-sm text-muted-foreground dark:text-slate-400">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
