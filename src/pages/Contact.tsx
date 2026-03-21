import { useState } from "react";
import Layout from "@/components/Layout";
import { Send, Mail, Instagram, Twitter, Youtube, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">Get in Touch</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">Have a question, want to collaborate, or just want to say hi? Drop me a message!</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Form */}
            <div className="md:col-span-3 bg-card rounded-2xl border border-border p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-foreground text-xl mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">Thanks for reaching out. I'll get back to you soon!</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                    <input required className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <input required type="email" className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="you@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
                    <input className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="What's this about?" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                    <textarea required rows={5} className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder="Your message..." />
                  </div>
                  <Button type="submit" className="w-full rounded-xl">
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Connect</h3>
                <a href="mailto:hello@medicojourney.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                  <Mail className="w-5 h-5" /> hello@medicojourney.com
                </a>
                <div className="flex gap-3">
                  {[Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
                <div className="relative z-10 p-6">
                  <h3 className="font-display font-semibold text-primary-foreground mb-2">Want to Collaborate?</h3>
                  <p className="text-sm text-primary-foreground/70">I'm always open to guest posts, case submissions, and collaborations with fellow medical students and educators.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
