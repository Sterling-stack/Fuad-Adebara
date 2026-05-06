import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Lock, LogIn, Chrome } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Successfully logged in!');
      navigate('/admin');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success('Successfully logged in with Google!');
      navigate('/admin');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login with Google');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl border border-primary/20 mb-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2 italic">FUAD.ADMIN</h1>
          <p className="text-slate-500 text-sm font-light uppercase tracking-[0.2em]">Restricted Access Area</p>
        </div>

        <div className="bg-[#050505] p-8 rounded-3xl border border-white/5 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)] group"
            >
              <LogIn className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
              Sign In to Dashboard
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#050505] px-4 text-slate-600 font-bold tracking-widest">or</span>
            </div>
          </div>

          <Button 
            onClick={handleGoogleLogin}
            variant="outline" 
            className="w-full border-white/10 hover:bg-white/5 rounded-xl py-6 text-slate-300 font-medium"
          >
            <Chrome className="w-4 h-4 mr-2" />
            Continue with Authorised Account
          </Button>
        </div>

        <p className="text-center mt-10 text-[10px] text-slate-600 uppercase tracking-[0.3em] font-bold">
          &copy; {new Date().getFullYear()} Fuad Portfolio &bull; Security Logged
        </p>
      </motion.div>
    </div>
  );
}
