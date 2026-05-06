import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Image as ImageIcon,
  X,
  Check,
  Loader2,
  FolderKanban
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

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  order: number;
}

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
    order: 0
  });

  const fetchProjects = async () => {
    setIsLoading(true);
    const path = 'projects';
    try {
      const q = query(collection(db, path), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      setProjects(data);
    } catch (error) {
      toast.error("Failed to load projects");
      handleFirestoreError(error, OperationType.LIST, path);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        category: project.category,
        description: project.description,
        imageUrl: project.imageUrl,
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        order: project.order
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        category: '',
        description: '',
        imageUrl: '',
        liveUrl: '',
        githubUrl: '',
        order: projects.length
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const path = 'projects';
    try {
      const dataToSave = {
        ...formData,
        updatedAt: serverTimestamp(),
      };

      if (editingProject) {
        await updateDoc(doc(db, path, editingProject.id), dataToSave);
        toast.success("Project updated successfully");
      } else {
        await addDoc(collection(db, path), {
          ...dataToSave,
          createdAt: serverTimestamp()
        });
        toast.success("Project added successfully");
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (error) {
      toast.error("Failed to save project");
      handleFirestoreError(error, OperationType.WRITE, path);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const path = `projects/${id}`;
    try {
      await deleteDoc(doc(db, 'projects', id));
      toast.success("Project deleted");
      fetchProjects();
    } catch (error) {
      toast.error("Failed to delete project");
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Project Portfolio</h1>
          <p className="text-slate-500 text-sm">Manage the work displayed on your public portfolio.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 font-bold shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <Plus className="w-4 h-4 mr-2" /> Add New Project
        </Button>
      </div>

      {/* Projects Grid/List */}
      <div className="bg-[#050505] rounded-3xl border border-white/5 overflow-hidden">
        {isLoading ? (
          <div className="p-20 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="text-xs uppercase tracking-widest font-bold">Synchronizing Portfolio...</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="divide-y divide-white/5">
            {projects.map((project) => (
              <div key={project.id} className="p-6 flex flex-col md:flex-row items-center gap-6 group hover:bg-white/[0.02] transition-colors">
                <div className="w-full md:w-32 aspect-video bg-white/5 rounded-xl border border-white/10 overflow-hidden flex-shrink-0">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full">{project.category}</span>
                    <span className="text-[10px] font-bold text-slate-600 uppercase">Order #{project.order}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed max-w-xl">{project.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenModal(project)} className="text-slate-500 hover:text-white hover:bg-white/5">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)} className="text-slate-500 hover:text-red-400 hover:bg-red-400/5">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      <Button variant="ghost" size="icon" className="text-slate-500 hover:text-primary hover:bg-primary/5">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-20 text-center opacity-20">
            <FolderKanban className="w-16 h-16 mx-auto mb-6" />
            <p className="text-xs uppercase tracking-widest font-bold">No projects found. Add your first one above.</p>
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
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[#080808] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white italic">{editingProject ? 'Edit Project' : 'New Project'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project Title</label>
                        <input 
                          type="text" 
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary/50"
                          placeholder="e.g. Quantum Dashboard"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</label>
                        <input 
                          type="text" 
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary/50"
                          placeholder="e.g. Web Development"
                          required
                        />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Display Order</label>
                        <input 
                          type="number" 
                          value={formData.order}
                          onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Thumbnail URL</label>
                        <input 
                          type="url" 
                          value={formData.imageUrl}
                          onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary/50"
                          placeholder="https://images.unsplash.com/..."
                          required
                        />
                      </div>
                   </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary/50 min-h-[100px] resize-none"
                    placeholder="Brief overview of the project..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live URL (Optional)</label>
                      <input 
                        type="url" 
                        value={formData.liveUrl}
                        onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary/50"
                        placeholder="https://..."
                      />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Github URL (Optional)</label>
                      <input 
                        type="url" 
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary/50"
                        placeholder="https://github.com/..."
                      />
                   </div>
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSaving}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl font-bold italic shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  >
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingProject ? 'Update Project' : 'Create Project')}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 border-white/5 hover:bg-white/5 py-6 rounded-2xl text-slate-500"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
