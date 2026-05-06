import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Skills', href: '#skills' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-6',
        scrolled ? 'bg-black/98 backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2 text-sm font-bold uppercase tracking-[0.2em] text-white"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>FUAD ADEBARA</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors focus:outline-none cursor-pointer"
            >
              {link.name}
            </button>
          ))}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('#contact')}
              className="flex items-center space-x-3 bg-primary text-white px-6 py-2.5 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-primary/80 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              <span>GET IN TOUCH</span>
              <Menu className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="flex items-center space-x-2 bg-primary text-white px-5 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            aria-label="Toggle menu"
          >
            <span>{isOpen ? 'CLOSE' : 'MENU'}</span>
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glassmorphism absolute top-full left-0 right-0 overflow-hidden border-t border-border"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-lg font-medium hover:text-primary transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <Button
                className="bg-gradient-primary w-full shadow-elegant"
                onClick={() => scrollToSection('#contact')}
              >
                Let's Talk
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
