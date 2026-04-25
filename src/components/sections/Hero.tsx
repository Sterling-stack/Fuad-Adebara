import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';

export default function Hero() {
  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'PORTFOLIO', href: '#portfolio' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com' },
    { icon: Twitter, href: 'https://twitter.com' },
    { icon: Linkedin, href: 'https://linkedin.com' },
    { icon: Instagram, href: 'https://instagram.com' },
  ];

  return (
    <section id="home" className="w-full">
      <MinimalistHero
        mainText="Luxury digital experience designer and full-stack developer based in Lagos. Crafting high-end interfaces that bridge the gap between design and technology."
        readMoreLink="#about"
        imageSrc="https://ik.imagekit.io/fpxbgsota/image%2013.png?updatedAt=1753531863793"
        imageAlt="Fuad Adebara"
        overlayText={{
          part1: 'less is',
          part2: 'more.',
        }}
        socialLinks={socialLinks}
        locationText="Lagos, Nigeria"
      />
    </section>
  );
}

