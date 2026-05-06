import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Utensils, Briefcase, ShoppingBag, ChefHat, Star } from 'lucide-react';

const partners = [
  { 
    name: 'De Chef', 
    logo: 'https://i.imgur.com/OR5qydi.png', 
    icon: Utensils 
  },
  { 
    name: 'Follymobis', 
    logo: 'https://i.imgur.com/x0hkru4.png', 
    icon: ChefHat 
  },
  { 
    name: 'JF Brand', 
    logo: 'https://i.imgur.com/VAAFgbv.png', 
    icon: Briefcase 
  },
  { 
    name: 'UNIXESSORIES', 
    logo: 'https://i.imgur.com/yZasPBj.png', 
    icon: ShoppingBag 
  },
  { 
    name: 'Aroma Exclusive', 
    logo: 'https://aromaexclusive.com/cdn/shop/files/aroma_exclusive_logo_with_slogan_160x@2x.jpg?v=1653385918', 
    icon: Star 
  },
];

export default function TrustedBy() {
  const [errorImages, setErrorImages] = useState<Record<number, boolean>>({});

  const handleImageError = (idx: number) => {
    setErrorImages(prev => ({ ...prev, [idx]: true }));
  };

  return (
    <section id="trusted" className="py-24 bg-black border-y border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">SELECT CLIENTELE</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-light">Collaborating with visionary brands to build remarkable identities.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-l border-t border-white/10">
          {partners.map((partner, idx) => {
            const Icon = partner.icon;
            const hasError = errorImages[idx];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-center p-8 border-r border-b border-white/10 group hover:bg-white/[0.02] transition-colors relative h-64"
              >
                <div className="flex flex-col items-center space-y-6 transition-all duration-700 w-full">
                  <div className="h-32 w-full flex items-center justify-center">
                    {!hasError ? (
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        className="max-h-full max-w-full object-contain filter-none opacity-100 transition-all duration-300 group-hover:scale-105" 
                        referrerPolicy="no-referrer" 
                        onError={() => handleImageError(idx)}
                      />
                    ) : (
                      <Icon className="w-16 h-16 text-primary group-hover:scale-110 transition-transform" />
                    )}
                  </div>
                  <span className="text-[10px] font-black tracking-[0.4em] text-slate-300 group-hover:text-primary uppercase transition-colors">{partner.name}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
