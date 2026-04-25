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
    <section id="services" className="py-24 bg-slate-50 dark:bg-slate-900/50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs">Services</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-white">How I Can Help You</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="group relative p-10 h-full border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-card overflow-hidden transition-all duration-500 hover:-translate-y-2 rounded-3xl">
                {/* Background Hover Effect */}
                <div className="absolute inset-0 bg-slate-900 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
                
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">
                    <service.icon className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-4 transition-colors duration-500 group-hover:text-white">
                    <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white group-hover:text-white">{service.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 group-hover:text-slate-300 leading-relaxed font-light">
                      {service.desc}
                    </p>
                  </div>

                  <button className="flex items-center space-x-2 text-primary font-bold uppercase tracking-widest text-[10px] group-hover:text-primary-glow transition-colors duration-500">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
