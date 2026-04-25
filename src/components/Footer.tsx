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
    <footer className="bg-slate-50 dark:bg-slate-950 pt-24 pb-12 border-t border-slate-100 dark:border-slate-800 mt-auto relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 blur-[80px] -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="text-3xl font-serif font-bold tracking-tighter text-slate-900 dark:text-white">
              Fuad<span className="text-primary">.</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Crafting premium digital experiences through innovative design and cutting-edge technology. Based in Nigeria, serving the world.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Linkedin, Instagram, Github, Dribbble].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary hover:border-primary/20 transition-all shadow-sm"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Portfolio', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">Services</h4>
            <ul className="space-y-4">
              {['Web Design', 'Development', 'Marketing', 'Trading', 'Branding'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold font-serif text-slate-900 dark:text-white uppercase tracking-wider">Newsletter</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Subscribe to get latest updates and news about design and development.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white dark:bg-slate-900 border border-border dark:border-slate-800 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-primary transition-colors dark:text-white"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white">Join</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-border dark:border-slate-800 gap-6">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            © {currentYear} Fuad Adebara. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-3 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white hover:text-primary transition-colors"
          >
            <span>Back To Top</span>
            <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
