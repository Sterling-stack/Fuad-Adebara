import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from '@/components/ui/sonner';

// Main Website
import Navbar from './components/Navbar';
import Hero from './components/ui/quantam-mysh-hero';
import TrustedBy from './components/sections/TrustedBy';
import About from './components/sections/About';
import Portfolio from './components/sections/Portfolio';
import Skills from './components/sections/Skills';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';

// Admin Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import ProjectManager from './components/admin/ProjectManager';
import TestimonialManager from './components/admin/TestimonialManager';
import ContactInbox from './components/admin/ContactInbox';
import AdminSettings from './components/admin/AdminSettings';

import { ThemeProvider } from './components/theme-provider';

function MainWebsite() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background transition-colors duration-500">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TrustedBy />
        <About />
        <Portfolio />
        <Skills />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Site */}
            <Route path="/" element={<MainWebsite />} />
            
            {/* Admin Routes (Publicly Accessible) */}
            <Route path="/admin">
              <Route element={<AdminLayout children={<AdminDashboard />} />}>
                <Route index element={<AdminDashboard />} />
              </Route>
              <Route path="projects" element={<AdminLayout children={<ProjectManager />} />} />
              <Route path="testimonials" element={<AdminLayout children={<TestimonialManager />} />} />
              <Route path="inquiries" element={<AdminLayout children={<ContactInbox />} />} />
              <Route path="settings" element={<AdminLayout children={<AdminSettings />} />} />
            </Route>

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </ThemeProvider>
  );
}
