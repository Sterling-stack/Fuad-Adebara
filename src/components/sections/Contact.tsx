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
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-primary font-bold tracking-widest uppercase text-xs">Contact</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-white">Let's Discuss Your Project</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities and ways to support your vision.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-orange-50 dark:bg-slate-800 rounded-2xl text-primary shrink-0 transition-transform group hover:scale-110">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Me</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">fuadadebara1947@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-orange-50 dark:bg-slate-800 rounded-2xl text-primary shrink-0 transition-transform group hover:scale-110">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Call Me</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">09112396309</div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-orange-50 dark:bg-slate-800 rounded-2xl text-primary shrink-0 transition-transform group hover:scale-110">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Location</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">Nigeria (Remote Globally)</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Connect With Me</div>
              <div className="flex space-x-4">
                {[Twitter, Linkedin, Instagram, Github].map((Icon, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ scale: 1.1, translateY: -4 }}
                    className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.a
              href="https://wa.me/2349112396309"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-[#25D366] text-white rounded-2xl font-bold font-serif shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Message on WhatsApp</span>
            </motion.a>
          </div>

          {/* Right: Contact Form */}
          <div className="glassmorphism p-8 md:p-12 rounded-3xl shadow-elegant border-border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-muted/50 border-border h-12" {...field} />
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" className="bg-muted/50 border-border h-12" {...field} />
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
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="How can I help you?" className="bg-muted/50 border-border h-12" {...field} />
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
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project..." 
                          className="bg-muted/50 border-border min-h-[150px] resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={form.formState.isSubmitting}
                  className="w-full bg-gradient-primary hover:opacity-90 shadow-elegant h-14 text-lg font-bold"
                >
                  {form.formState.isSubmitting ? (
                    <span className="flex items-center space-x-2">
                       <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                       <span>Sending...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
