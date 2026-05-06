import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, Twitter, Linkedin, Instagram, Github } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await addDoc(collection(db, 'submissions'), {
        ...values,
        createdAt: serverTimestamp(),
      });
      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Contact Info */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-6xl md:text-7xl font-serif leading-tight uppercase tracking-tight text-white">Let's <br/> Collaborate</h2>
              <p className="text-lg text-slate-400 leading-relaxed max-w-sm">
                Ready to build something iconic? Let's discuss your next web design project.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-primary shrink-0 transition-transform group hover:scale-110">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Email Me</div>
                  <div className="text-lg font-bold text-white leading-tight tracking-tight italic font-serif">fuadadebara1947@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-primary shrink-0 transition-transform group hover:scale-110">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Call Me</div>
                  <div className="text-lg font-bold text-white leading-tight tracking-tight italic font-serif">09112396309</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Connect With Me</div>
              <div className="flex space-x-4">
                {[Twitter, Linkedin, Instagram, Github].map((Icon, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ scale: 1.1, translateY: -4 }}
                    className="p-3 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="p-8 md:p-12 border border-white/10 bg-white/5 backdrop-blur-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-[10px] font-bold tracking-[0.2em] text-slate-400">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-transparent border-white/10 text-white h-10 rounded-none focus:border-primary transition-colors" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-[10px] font-bold tracking-[0.2em] text-slate-400">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" className="bg-transparent border-white/10 text-white h-10 rounded-none focus:border-primary transition-colors" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-[10px] font-bold tracking-[0.2em] text-slate-400">Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Web Design Project" className="bg-transparent border-white/10 text-white h-10 rounded-none focus:border-primary transition-colors" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-[10px] font-bold tracking-[0.2em] text-slate-400">Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your web vision..." 
                          className="bg-transparent border-white/10 text-white min-h-[150px] resize-none rounded-none focus:border-primary transition-colors" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button 
                  type="submit" 
                  disabled={form.formState.isSubmitting}
                  className="w-full bg-primary text-white hover:bg-primary/80 transition-all h-14 text-xs font-bold uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                >
                  {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
