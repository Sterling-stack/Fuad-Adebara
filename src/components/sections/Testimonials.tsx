import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO at TechWave',
    quote: 'Fuad is an exceptional developer who truly understands the balance between design and functionality. Our new platform has seen a 40% increase in user engagement since launch.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Marketing Director',
    quote: 'Working with Fuad was a game-changer for our digital presence. His attention to detail and ability to translate complex ideas into intuitive designs is unmatched.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'Freelance Designer',
    quote: 'The brand strategy Fuad developed for my studio was insightful and highly effective. He has a unique perspective that brings fresh energy to every project.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-20">
          <span className="text-primary font-bold tracking-widest uppercase text-xs">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-white">What Clients Say</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-10 -left-10 text-primary/10">
            <Quote className="w-32 h-32 rotate-180" />
          </div>

          <div className="relative z-10 min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center space-y-8"
              >
                <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-slate-700 dark:text-slate-300">
                  "{testimonials[current].quote}"
                </p>
                
                <div className="flex justify-center items-center space-x-1">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-bold font-serif text-slate-900 dark:text-white">{testimonials[current].name}</h4>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">{testimonials[current].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-12 space-x-6">
            <button
              onClick={prev}
              className="p-4 rounded-full border border-border hover:bg-primary hover:text-white transition-all duration-300 shadow-card"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="p-4 rounded-full border border-border hover:bg-primary hover:text-white transition-all duration-300 shadow-card"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
