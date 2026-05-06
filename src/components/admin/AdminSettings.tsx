import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  Shield, 
  Terminal, 
  Database, 
  RefreshCw,
  Check,
  ChevronRight,
  Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function AdminSettings() {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleClearCache = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Client-side cache cleared");
    }, 1500);
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">System Settings</h1>
        <p className="text-slate-500 text-sm font-light">Manage your administrative preferences and system health.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Profile Card */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#050505] p-6 rounded-3xl border border-white/5 h-full">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Administrator</h3>
               <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 p-1 mb-4 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                     <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-2xl font-black italic">
                        {user?.email?.charAt(0).toUpperCase()}
                     </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{user?.email?.split('@')[0]}</h4>
                  <p className="text-xs text-slate-500 mb-6">{user?.email}</p>
                  
                  <div className="w-full space-y-2">
                     <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Role</span>
                        <span className="text-[10px] font-bold text-primary uppercase">Super Admin</span>
                     </div>
                     <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Provider</span>
                        <span className="text-[10px] font-bold text-slate-400 capitalize">Firebase</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* General Settings */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#050505] rounded-3xl border border-white/5 overflow-hidden">
               <div className="p-6 border-b border-white/5 flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white">Maintenance Actions</h3>
               </div>
               <div className="p-6 divide-y divide-white/5">
                  <div className="py-4 flex items-center justify-between group">
                     <div>
                        <h4 className="text-sm font-bold text-slate-200 mb-1">Clear Application Cache</h4>
                        <p className="text-xs text-slate-500 font-light">Force a fresh reload of all portfolio data.</p>
                     </div>
                     <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={isRefreshing}
                        onClick={handleClearCache}
                        className="border-white/10 text-[10px] uppercase font-bold tracking-widest"
                     >
                        {isRefreshing ? <RefreshCw className="w-3 h-3 animate-spin mr-2" /> : <RefreshCw className="w-3 h-3 mr-2" />}
                        Execute
                     </Button>
                  </div>
                  
                  <div className="py-4 flex items-center justify-between opacity-50 group">
                     <div>
                        <h4 className="text-sm font-bold text-slate-200 mb-1">Audit Logs</h4>
                        <p className="text-xs text-slate-500 font-light">View history of administrative changes.</p>
                     </div>
                     <Button variant="ghost" size="sm" className="text-slate-600 hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                     </Button>
                  </div>

                  <div className="py-4 flex items-center justify-between opacity-50 group">
                     <div>
                        <h4 className="text-sm font-bold text-slate-200 mb-1">Two-Factor Authentication</h4>
                        <p className="text-xs text-slate-500 font-light">Enhance security for your dashboard access.</p>
                     </div>
                     <div className="h-5 w-10 bg-white/10 rounded-full relative">
                        <div className="absolute left-1 top-1 w-3 h-3 bg-slate-700 rounded-full" />
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-[#050505] rounded-3xl border border-white/5 overflow-hidden">
               <div className="p-6 border-b border-white/5 flex items-center space-x-3">
                  <Code className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white">Developer Info</h3>
               </div>
               <div className="p-8">
                  <div className="flex items-center space-x-6">
                     <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Terminal className="w-6 h-6 text-slate-400" />
                     </div>
                     <div>
                        <p className="text-xs text-slate-500 mb-1 uppercase font-bold tracking-tighter">Environment</p>
                        <p className="text-sm font-bold text-white font-mono">Production Mode</p>
                     </div>
                  </div>
                  
                  <div className="mt-8 bg-black/40 rounded-2xl p-6 border border-white/5">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                           <Database className="w-3 h-3 text-primary" />
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Firestore Health</span>
                        </div>
                        <div className="flex items-center space-x-2">
                           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                           <span className="text-[10px] font-bold text-green-500 uppercase">Synchronized</span>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '85%' }}
                              className="h-full bg-primary" 
                           />
                        </div>
                        <p className="text-[9px] text-slate-600 uppercase font-bold tracking-[0.2em]">85% Connection Latency Optimization</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
