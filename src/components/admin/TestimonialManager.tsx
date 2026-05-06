import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  User, 
  Quote, 
  Star,
  X,
  Loader2,
  Check
} from 'lucide-react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatarUrl?: string;
}

export default function TestimonialManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: '',
    rating: 5,
    avatarUrl: ''
  });

  const fetchData = async () => {
    setIsLoading(true);
    const path = 'testimonials';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial)));
    } catch (error) {
      toast.error("Failed to load testimonials");
      handleFirestoreError(error, OperationType.LIST, path);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenModal = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        role: item.role,
        quote: item.quote,
        rating: item.rating,
        avatarUrl: item.avatarUrl || ''
      });
    } else {
      setEditingItem(null);
      setFormData({ name: '', role: '', quote: '', rating: 5, avatarUrl: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const path = 'testimonials';
    try {
      const payload = { ...formData, updatedAt: serverTimestamp() };
      if (editingItem) {
        await updateDoc(doc(db, path, editingItem.id), payload);
        toast.success("Updated!");
      } else {
        await addDoc(collection(db, path), { ...payload, createdAt: serverTimestamp() });
        toast.success("Added!");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) { 
      toast.error("Error saving");
      handleFirestoreError(error, OperationType.WRITE, path);
    } finally { setIsSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const path = `testimonials/${id}`;
    try {
      await deleteDoc(doc(db, 'testimonials', id));
      toast.success("Deleted");
      fetchData();
    } catch (error) { 
      toast.error("Error deleting");
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Testimonials</h1>
          <p className="text-slate-500 text-sm">Manage social proof and client feedback.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 font-bold shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <Plus className="w-4 h-4 mr-2" /> Add Feedback
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-full p-20 flex flex-col items-center justify-center text-slate-500">
             <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : items.length > 0 ? (
          items.map((item) => (
            <motion.div 
              key={item.id}
              layout
              className="bg-[#050505] p-8 rounded-3xl border border-white/5 relative group hover:border-white/10 transition-colors"
            >
               <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-700 overflow-hidden">
                        {item.avatarUrl ? (
                          <img src={item.avatarUrl} alt={item.name} className="w-full h-full object-cover" />
                        ) : <User className="w-6 h-6" />}
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-white">{item.name}</h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{item.role}</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-1">
                     <Button variant="ghost" size="icon" onClick={() => handleOpenModal(item)} className="text-slate-500 hover:text-white">
                        <Edit2 className="w-3 h-3" />
                     </Button>
                     <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-slate-500 hover:text-red-400">
                        <Trash2 className="w-3 h-3" />
                     </Button>
                  </div>
               </div>
               
               <div className="flex items-center space-x-1 mb-4 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < item.rating ? 'fill-current' : 'text-slate-800'}`} />
                  ))}
               </div>
               
               <p className="text-xs text-slate-400 leading-relaxed italic">"{item.quote}"</p>
               
               <div className="absolute bottom-6 right-8 opacity-5">
                  <Quote className="w-12 h-12 text-primary rotate-180" />
               </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full p-20 text-center opacity-20 border border-dashed border-white/10 rounded-3xl">
             <Quote className="w-16 h-16 mx-auto mb-4" />
             <p className="text-xs uppercase font-bold tracking-widest">No client feedback yet</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#080808] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
               <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-md font-bold text-white uppercase tracking-widest italic">{editingItem ? 'Edit Feedback' : 'Add Feedback'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary/50"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Role/Company</label>
                      <input 
                        type="text" 
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary/50"
                        required
                      />
                    </div>
                 </div>

                 <div className="space-y-1">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Client Quote</label>
                   <textarea 
                     value={formData.quote}
                     onChange={(e) => setFormData({...formData, quote: e.target.value})}
                     className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary/50 min-h-[100px] resize-none"
                     required
                   />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rating (1-5)</label>
                      <input 
                        type="number" 
                        min="1" max="5"
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Avatar URL (Optional)</label>
                      <input 
                        type="url" 
                        value={formData.avatarUrl}
                        onChange={(e) => setFormData({...formData, avatarUrl: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary/50"
                      />
                    </div>
                 </div>

                 <Button 
                   type="submit" 
                   disabled={isSaving}
                   className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl font-bold tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                 >
                   {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingItem ? 'Apply Changes' : 'Publish Testimonial')}
                 </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
