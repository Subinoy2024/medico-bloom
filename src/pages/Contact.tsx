import { useState } from "react";
import Layout from "@/components/Layout";
import { Send, Mail, Instagram, Twitter, Youtube, Linkedin, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Connect</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">Get in Touch</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">Feel free to connect, collaborate, or just say hello. I'd love to hear from you!</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3 bg-card rounded-2xl border border-border p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-warm mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-foreground text-xl mb-2">Thank You! 💌</h3>
                  <p className="text-muted-foreground">Your message has been sent. I'll get back to you soon!</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                    <input required className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="you@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                    <textarea required rows={5} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Your message..." />
                  </div>
                  <Button type="submit" className="w-full rounded-full"><Send className="w-4 h-4 mr-2" /> Send Message</Button>
                </form>
              )}
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4 text-sm">Connect With Me</h3>
                <a href="mailto:ankita@example.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors mb-5">
                  <Mail className="w-5 h-5" /> ankita@example.com
                </a>
                <div className="flex gap-2.5">
                  {[Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
                <div className="relative z-10 p-6">
                  <MessageCircle className="w-7 h-7 text-primary-foreground/50 mb-3" />
                  <h3 className="font-display font-semibold text-primary-foreground mb-2 text-sm">Want to Collaborate?</h3>
                  <p className="text-xs text-primary-foreground/65 leading-relaxed">I'm always open to guest posts, collaborations, and connecting with fellow students and educators.</p>
                </div>
              </div>
              <div className="bg-card rounded-2xl border border-border p-6">
                <p className="text-sm text-muted-foreground italic leading-relaxed">"Whether you have a question, want to share your story, or just need someone to talk to about medical school — I'm here. Don't hesitate to reach out." 💛</p>
                <p className="text-xs text-primary font-medium mt-3">— Ankita</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
