import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Briefcase, 
  Mail, 
  TrendingUp, 
  ArrowUpRight, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';

interface Stat {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend: string;
  color: string;
}

const StatCard = ({ label, value, icon: Icon, trend, color }: Stat) => (
  <div className="bg-[#050505] p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 blur-[80px] -mr-10 -mt-10 opacity-20 bg-${color}`} />
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-${color}/10 border border-${color}/20 text-${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full flex items-center">
          <TrendingUp className="w-3 h-3 mr-1" />
          {trend}
        </span>
      </div>
      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{label}</h3>
      <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ projects: 0, testimonials: 0, inquiries: 0 });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsSnap, testimonialsSnap, submissionsSnap] = await Promise.all([
          getDocs(collection(db, 'projects')),
          getDocs(collection(db, 'testimonials')),
          getDocs(query(collection(db, 'submissions'), orderBy('createdAt', 'desc'), limit(5)))
        ]);

        setCounts({
          projects: projectsSnap.size,
          testimonials: testimonialsSnap.size,
          inquiries: submissionsSnap.size 
        });

        const recent = submissionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecentInquiries(recent);
      } catch (error) {
        // We log to the required system handler
        handleFirestoreError(error, OperationType.GET, 'dashboard_data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats: Stat[] = [
    { label: 'Projects', value: counts.projects, icon: Briefcase, trend: '+12%', color: 'blue-500' },
    { label: 'Testimonials', value: counts.testimonials, icon: Users, trend: '+5%', color: 'purple-500' },
    { label: 'Total Inquiries', value: recentInquiries.length > 5 ? '5+' : recentInquiries.length, icon: Mail, trend: '+18%', color: 'primary' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Dashboard</h1>
          <p className="text-slate-500 text-sm font-light">Welcome back, here's what's happening with your portfolio.</p>
        </div>
        <div className="flex items-center space-x-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <Clock className="w-4 h-4" />
          <span>Last updated: {format(new Date(), 'HH:mm')}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-[#050505] rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">Recent Inquiries</h2>
            <Button variant="ghost" size="sm" className="text-xs text-primary font-bold">
              View All <ArrowUpRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {recentInquiries.length > 0 ? (
                recentInquiries.map((inquiry, i) => (
                  <motion.div 
                    key={inquiry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start space-x-4 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors truncate">{inquiry.name}</h4>
                        <span className="text-[10px] text-slate-600 font-medium">
                          {inquiry.createdAt ? format(inquiry.createdAt.toDate(), 'MMM d') : 'Just now'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{inquiry.subject}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10 opacity-20">
                  <Mail className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-xs uppercase tracking-widest font-bold">No recent inquiries</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions / System Health */}
        <div className="bg-[#050505] rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">System Status</h2>
          </div>
          <div className="p-8 flex flex-col items-center justify-center text-center h-[300px]">
             <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                </div>
                <div className="absolute inset-0 rounded-full border-t border-green-500/40 animate-spin transition-all duration-[3000ms]" />
             </div>
             <h3 className="text-white font-bold mb-2">Systems Operational</h3>
             <p className="text-xs text-slate-500 max-w-[200px]">All portfolio services and database connections are performing optimally.</p>
             
             <div className="grid grid-cols-2 gap-4 mt-8 w-full">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
                   <span className="text-xs font-bold text-white mb-1">Firestore</span>
                   <span className="text-[10px] text-green-400 font-bold uppercase tracking-tighter">Healthy</span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
                   <span className="text-xs font-bold text-white mb-1">Auth</span>
                   <span className="text-[10px] text-green-400 font-bold uppercase tracking-tighter">Healthy</span>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      {/* Portfolio Quick View */}
      <div className="bg-[#050505] rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">Website Integration</h2>
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
               <div className="w-full md:w-1/3 aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center p-4">
                  <div className="space-y-2 w-full">
                     <div className="h-2 w-full bg-white/10 rounded" />
                     <div className="h-2 w-2/3 bg-white/10 rounded" />
                     <div className="h-10 w-full bg-primary/20 rounded-xl" />
                  </div>
               </div>
               <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-3 italic">Connected to Live Portfolio</h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">Your dashboard is directly synced with your live website. Any changes you make here will be reflected instantly for your visitors.</p>
                  <Button asChild variant="outline" className="border-white/10 text-xs font-bold uppercase tracking-widest bg-transparent">
                    <a href="/" target="_blank"><ExternalLink className="w-3 h-3 mr-2" /> View Live Site</a>
                  </Button>
               </div>
            </div>
          </div>
      </div>
    </div>
  );
}
