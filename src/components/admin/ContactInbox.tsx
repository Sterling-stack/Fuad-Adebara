import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Trash2, 
  ChevronRight, 
  Search, 
  User, 
  Calendar,
  X,
  MessageCircle,
  Loader2,
  Inbox
} from 'lucide-react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: any;
}

export default function ContactInbox() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    const path = 'submissions';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Submission));
      setSubmissions(data);
    } catch (error) {
      toast.error("Failed to load inquiries");
      handleFirestoreError(error, OperationType.LIST, path);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this inquiry?")) return;
    const path = `submissions/${id}`;
    try {
      await deleteDoc(doc(db, 'submissions', id));
      setSubmissions(prev => prev.filter(s => s.id !== id));
      if (selectedSubmission?.id === id) setSelectedSubmission(null);
      toast.success("Inquiry deleted");
    } catch (error) {
      toast.error("Failed to delete inquiry");
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Inquiries</h1>
          <p className="text-slate-500 text-sm">Review messages and leads from your contact form.</p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase">
          <Inbox className="w-4 h-4" />
          <span>{submissions.length} Total</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="bg-[#050505] rounded-3xl border border-white/5 overflow-hidden flex flex-col h-full">
           <div className="p-4 border-b border-white/5 bg-white/[0.02]">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                 <input 
                   disabled
                   placeholder="Search (Coming soon)" 
                   className="w-full bg-black border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-400 outline-none"
                 />
              </div>
           </div>
           
           <div className="flex-1 overflow-y-auto divide-y divide-white/5">
              {isLoading ? (
                <div className="p-10 flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : submissions.length > 0 ? (
                submissions.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedSubmission(item)}
                    className={`p-4 cursor-pointer transition-all hover:bg-white/[0.02] relative group ${selectedSubmission?.id === item.id ? 'bg-primary/[0.03] border-l-2 border-primary' : 'border-l-2 border-transparent'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`text-xs font-bold truncate ${selectedSubmission?.id === item.id ? 'text-primary' : 'text-slate-200'}`}>
                        {item.name}
                      </h4>
                      <span className="text-[9px] text-slate-600 font-medium whitespace-nowrap ml-2">
                        {item.createdAt ? format(item.createdAt.toDate(), 'MMM d') : 'Now'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mb-1">{item.subject}</p>
                    <p className="text-[10px] text-slate-600 line-clamp-1">{item.message}</p>
                    
                    <button 
                      onClick={(e) => handleDelete(item.id, e)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center opacity-20">
                  <Mail className="w-10 h-10 mx-auto mb-4" />
                  <p className="text-[10px] uppercase font-bold tracking-widest leading-loose">No messages yet</p>
                </div>
              )}
           </div>
        </div>

        {/* View */}
        <div className="lg:col-span-2 bg-[#050505] rounded-3xl border border-white/5 overflow-hidden flex flex-col h-full relative">
           <AnimatePresence mode="wait">
             {selectedSubmission ? (
               <motion.div 
                 key={selectedSubmission.id}
                 initial={{ opacity: 0, scale: 0.99 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.01 }}
                 className="flex flex-col h-full"
               >
                  <div className="p-8 border-b border-white/5 space-y-6">
                     <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div className="flex items-center space-x-4">
                           <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xl font-bold italic">
                              {selectedSubmission.name[0]}
                           </div>
                           <div>
                              <h2 className="text-xl font-bold text-white tracking-tight">{selectedSubmission.name}</h2>
                              <p className="text-xs text-slate-500">{selectedSubmission.email}</p>
                           </div>
                        </div>
                        <div className="flex items-center space-x-2">
                           <Button variant="ghost" size="sm" onClick={() => setSelectedSubmission(null)} className="lg:hidden">
                             <X className="w-4 h-4" />
                           </Button>
                           <Button variant="outline" className="border-white/10 text-[10px] font-bold uppercase tracking-widest bg-transparent">
                             <MessageCircle className="w-3.5 h-3.5 mr-2" /> Reply
                           </Button>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                           <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mb-1">Status</p>
                           <p className="text-[10px] text-green-400 font-bold uppercase tracking-tighter">Received</p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                           <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mb-1">Channel</p>
                           <p className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter">Web Form</p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5 lg:col-span-2">
                           <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mb-1">Received At</p>
                           <p className="text-[10px] text-slate-300 font-bold">
                             {selectedSubmission.createdAt ? format(selectedSubmission.createdAt.toDate(), 'MMMM d, yyyy HH:mm') : 'Unknown'}
                           </p>
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-8 flex-1 overflow-y-auto">
                     <div className="max-w-2xl">
                        <h3 className="text-sm font-bold text-slate-200 mb-6 flex items-center">
                           <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                           {selectedSubmission.subject}
                        </h3>
                        <div className="bg-white/[0.02] p-8 rounded-3xl border border-white/5 min-h-[200px]">
                            <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap font-light">
                               {selectedSubmission.message}
                            </p>
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-4 border-t border-white/5 bg-white/[0.01] flex justify-between items-center">
                     <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">End of Message Thread</p>
                     <Button 
                       variant="ghost" 
                       size="sm" 
                       onClick={(e) => handleDelete(selectedSubmission.id, e as any)}
                       className="text-[9px] font-bold text-slate-600 hover:text-red-400 uppercase tracking-widest"
                     >
                       <Trash2 className="w-3 h-3 mr-2 text-red-500/50" /> Delete Forever
                     </Button>
                  </div>
               </motion.div>
             ) : (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 opacity-20">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Mail className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-widest mb-2 italic">Select an Inquiry</h3>
                  <p className="text-xs text-slate-500 max-w-xs">Click on a message from the list to view its contents and details.</p>
               </div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
