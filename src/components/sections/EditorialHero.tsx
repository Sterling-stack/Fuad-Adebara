import React from 'react';
import { motion } from 'motion/react';

export default function EditorialHero() {
  const stats = [
    { label: 'Years Experience', value: '4+' },
    { label: 'Websites Launched', value: '120+' },
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Global Reaches', value: '15' },
  ];

  return (
    <section className="min-h-screen pt-32 pb-16 bg-background relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/10 blur-[100px] rounded-full -z-10" />

      <div className="container mx-auto px-6 h-full flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <p className="text-sm font-medium tracking-[0.3em] text-primary uppercase">Modern Web Solutions</p>
              <h1 className="text-5xl md:text-8xl font-serif leading-[1.0] tracking-tighter text-white">
                CRAFTING <br />
                <span className="italic text-primary">High-End</span> <br />
                WEBSITES.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-slate-400 max-w-sm leading-relaxed"
            >
              Fuad Adebara &mdash; A web designer dedicated to building immersive, pixel-perfect, and high-performance digital platforms.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group flex items-center space-x-3 bg-primary text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary/80 transition-all border border-primary/20 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              <span>CONNECT WITH US</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                →
              </span>
            </motion.button>
          </div>

          {/* Center: Image Container */}
          <div className="lg:col-span-4 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full aspect-[4/5] max-w-md rounded-[100px] overflow-hidden bg-secondary border border-primary/20"
            >
              <img
                src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&q=80&w=600&h=800"
                alt="Web Design Workspace"
                className="w-full h-full object-cover grayscale opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* Right: Stats */}
          <div className="lg:col-span-3 lg:pl-12 flex flex-col justify-center space-y-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
                className="text-right space-y-1"
              >
                <div className="text-4xl font-serif text-white">{stat.value}</div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-primary">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer of Hero */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-t border-white/10">
          {[
            { title: 'MODERN WEB DESIGN', desc: 'Sleek, minimal, and conversion-focused websites.' },
            { title: 'RESPONSIVE DEVELOPMENT', desc: 'Seamless experiences across every possible screen size.' },
            { title: 'PERFORMANCE OPTIMIZATION', desc: 'Lightning-fast load times for better SEO and retention.' },
            { title: 'AI-POWERED WORKFLOW', desc: 'Utilizing next-gen tools for efficient and creative builds.' },
          ].map((item, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary">{item.title}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
