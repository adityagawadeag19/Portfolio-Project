import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema } from "@shared/schema";
import type { InsertContactMessage } from "@shared/schema";

export function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:alex@example.com", label: "Email" },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 portfolio-bg">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="flex items-center justify-center mb-4">
            <span className="section-number">05.</span>
            <span className="section-title">Get In Touch</span>
          </h2>
          <div className="section-underline mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold portfolio-text mb-6">
            What's Next?
          </h3>
          <p className="text-lg portfolio-muted leading-relaxed max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. Whether you have a 
            question, want to collaborate, or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="portfolio-surface p-8 rounded-lg shadow-lg mb-12 theme-transition"
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium portfolio-text mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="Your Name"
                  className="theme-transition"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium portfolio-text mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="your.email@example.com"
                  className="theme-transition"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium portfolio-text mb-2">
                Subject
              </label>
              <Input
                id="subject"
                {...form.register("subject")}
                placeholder="Let's work together!"
                className="theme-transition"
              />
              {form.formState.errors.subject && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.subject.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium portfolio-text mb-2">
                Message
              </label>
              <Textarea
                id="message"
                {...form.register("message")}
                rows={6}
                placeholder="Tell me about your project or just say hello!"
                className="theme-transition resize-none"
              />
              {form.formState.errors.message && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={contactMutation.isPending}
              className="w-full md:w-auto px-8 py-4 text-white font-medium transition-all duration-300 hover:transform hover:scale-105 disabled:opacity-50"
              style={{ 
                backgroundColor: 'var(--portfolio-primary)',
                borderColor: 'var(--portfolio-primary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--portfolio-primary)';
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--portfolio-primary)';
                e.currentTarget.style.opacity = '1';
              }}
            >
              {contactMutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </motion.div>

        {/* Alternative Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <a
            href="mailto:alex@example.com"
            className="px-6 py-3 border border-portfolio-primary text-portfolio-primary hover:bg-portfolio-primary/10 rounded-lg transition-all duration-300 font-medium"
          >
            Say Hello
          </a>

          <div className="flex gap-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-text hover:portfolio-primary transition-colors duration-200"
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
