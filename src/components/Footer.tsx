import React from 'react';
import { motion } from 'motion/react';
import { Twitter, Linkedin, Instagram, Github, Dribbble, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5 mt-auto relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-900/10 blur-[100px] -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="text-3xl font-serif font-bold tracking-tighter text-white">
              Fuad<span className="text-primary italic">.</span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-sm">
              Designing the future of the web with 4 years of expertise in digital craft. Serving visionaries globally.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Linkedin, Instagram, Github].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-500 hover:text-white hover:border-primary transition-all shadow-sm group"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Portfolio', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm text-slate-400 hover:text-white transition-colors font-medium hover:pl-2 transition-all">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Specialties</h4>
            <ul className="space-y-3">
              {['Web Design', 'UI Architecture', 'SEO Optimization', 'E-commerce', 'Brand Identity'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Connect</h4>
            <p className="text-slate-400 text-sm italic font-serif">
              "Let's build something iconic."
            </p>
            <div className="flex space-x-2">
               <a 
                href="#contact" 
                className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
               >
                 Book a Call
               </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
          <p className="text-slate-600 text-[10px] uppercase tracking-widest font-bold">
            © {currentYear} Fuad Adebara. All rights reserved. Nigerian Web Designer.
          </p>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors"
          >
            <span>Back To Top</span>
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary transition-all">
              <ArrowUp className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
