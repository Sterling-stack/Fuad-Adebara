import React from 'react';

const HeroSection = () => {
  return (
    <div id="home" className="bg-black text-white w-full min-h-[90vh] flex flex-col justify-center relative max-w-screen overflow-x-hidden font-sans border-b border-white/5 pt-24">
      {/* Main Content */}
      <div className="flex flex-col items-center text-center px-10 z-10">
        <div className="flex items-center bg-purple-900/20 border border-purple-600/50 rounded-full pl-2 pr-4 py-1 text-purple-400 text-[10px] md:text-xs mb-8 tracking-[0.2em] font-light uppercase">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full mr-3 text-[10px] font-bold">2026</span>
          Expert Web Solutions
        </div>
        <h1 className="text-5xl md:text-9xl font-bold leading-none tracking-tighter mb-2">
          High-End.
        </h1>
        <h1 className="text-5xl md:text-9xl font-bold leading-none mb-8 tracking-tighter italic text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          Web Design.
        </h1>
        <p className="text-sm md:text-base max-w-lg mb-2 font-light text-slate-400 uppercase tracking-widest">Fuad Adebara &mdash; 4 Years Experience</p>
        <p className="text-sm md:text-base max-w-xl mb-12 font-light text-slate-500">I build high-performance, conversion-focused websites that bring your brand's vision to life with technical precision and creative flair.</p>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-20">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-purple-600 text-white px-10 py-4 cursor-pointer hover:bg-purple-700 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          >
            Connect With Us
          </button>
          <button 
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white/5 text-white px-10 py-4 cursor-pointer hover:bg-white/10 rounded-full text-xs font-bold uppercase tracking-[0.2em] border border-white/10 transition-all backdrop-blur-sm"
          >
            View Work
          </button>
        </div>

        {/* Infinite Moving Fading Carousel */}
        <div className="w-full max-w-2xl mx-auto overflow-hidden relative h-12 mb-10 z-10">
          <div className="flex animate-marquee whitespace-nowrap text-white/10 text-3xl font-serif tracking-[0.5em] font-black italic items-center">
            <span className="mx-16">WEBSITES</span>
            <span className="mx-16">ARCHITECTURE</span>
            <span className="mx-16">DEVELOPMENT</span>
            <span className="mx-16">WEBSITES</span>
            <span className="mx-16">ARCHITECTURE</span>
            <span className="mx-16">DEVELOPMENT</span>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent"></div>
        </div>
      </div>

      {/* Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full -z-10 animate-pulse-glow"></div>
    </div>
  );
};

export default HeroSection;
