import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  MessageSquare, 
  Settings, 
  LogOut, 
  User, 
  Mail,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active: boolean;
  onClick?: () => void;
  key?: string;
}

function SidebarItem({ icon: Icon, label, href, active, onClick }: SidebarItemProps) {
  return (
    <Link 
      to={href} 
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
        active 
          ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300'}`} />
      <span className="text-sm font-medium">{label}</span>
      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
    { icon: FolderKanban, label: 'Projects', href: '/admin/projects' },
    { icon: User, label: 'Testimonials', href: '/admin/testimonials' },
    { icon: Mail, label: 'Inquiries', href: '/admin/inquiries' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-[#050505] border-r border-white/5 z-[70] transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:block
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-10">
            <Link to="/" className="text-xl font-bold tracking-tighter flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <span className="text-white text-xs font-black italic">F.</span>
              </div>
              <span className="text-sm uppercase tracking-[0.2em] font-light">Admin</span>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={location.pathname === item.href}
                onClick={() => setIsSidebarOpen(false)}
              />
            ))}
          </nav>

          <div className="pt-6 border-t border-white/5 space-y-4">
            <div className="flex items-center space-x-3 px-4">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[10px] font-bold">
                {user?.email?.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">{user?.email?.split('@')[0]}</p>
                <p className="text-[10px] text-slate-500 truncate">Administrator</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              onClick={logout}
              className="w-full justify-start text-slate-500 hover:text-red-400 hover:bg-red-400/5 group"
            >
              <LogOut className="w-4 h-4 mr-3" />
              <span className="text-xs font-medium">Log out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
