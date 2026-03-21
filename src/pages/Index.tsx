import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getContent, SiteContent } from "@/lib/content-store";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import ankitaPhoto from "@/assets/ankita-photo.jpg";
import ankitaPhoto2 from "@/assets/ankita-photo.jpg";
import {
  BookOpen, Heart, Sparkles, ArrowRight, Clock, Star, ChevronRight,
  Download, Lightbulb, Target, Award, Users, Send, PenTool,
  Stethoscope, Brain, GraduationCap, Flame, Calendar, CheckCircle,
  Quote, BookMarked, Sun, Coffee
} from "lucide-react";

// Static data kept outside component

const whatIShare = [
  { icon: Heart, title: "My Story", desc: "Personal experiences and reflections from my MBBS journey" },
  { icon: Award, title: "Achievements", desc: "Milestones, recognitions, and small victories along the way" },
  { icon: Stethoscope, title: "Medical Knowledge", desc: "Simplified concepts and clinical insights for students" },
  { icon: BookOpen, title: "Study Notes", desc: "Well-organized, exam-oriented notes by subject" },
  { icon: Calendar, title: "Daily Practices", desc: "Routines, habits, and productivity methods that work" },
  { icon: Coffee, title: "Student Life", desc: "Real stories, challenges, and joys of being an MBBS student" },
  { icon: Brain, title: "Clinical Learning", desc: "Case discussions and bedside learning experiences" },
  { icon: Flame, title: "Motivation", desc: "Words, strategies, and mindset tips to keep you going" },
];

const blogPosts = [
  { title: "How I Prepare for University Exams — My Complete Method", category: "Study Tips", time: "6 min", excerpt: "A step-by-step breakdown of my exam preparation strategy that helped me stay consistent." },
  { title: "The Day I Realized Why I Chose Medicine", category: "My Story", time: "4 min", excerpt: "A personal reflection on a moment in the hospital that changed everything for me." },
  { title: "Top 10 Anatomy Mnemonics That Actually Work", category: "Medical Learning", time: "5 min", excerpt: "Battle-tested memory aids for cranial nerves, brachial plexus, and more." },
];

const testimonials = [
  { name: "Riya M.", text: "Ankita's notes are so clear and well-organized. They saved me during exam week!", year: "2nd Year MBBS" },
  { name: "Arjun S.", text: "Her journey posts are incredibly motivating. Feels like having a senior guide you.", year: "1st Year MBBS" },
  { name: "Sneha P.", text: "The study routine section literally transformed how I plan my days. So grateful!", year: "3rd Year MBBS" },
];

const quotes = [
  "Medicine is not just a career — it's a calling to serve with knowledge and compassion.",
  "Small daily progress leads to extraordinary results.",
  "Stay curious, stay humble, keep learning.",
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, hsl(170 55% 32% / 0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, hsl(340 50% 55% / 0.1) 0%, transparent 50%)" }} />
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/10 text-primary-foreground/80 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 animate-pulse-soft" /> Welcome to my world ✨
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-[1.1] mb-6">
              Hi, I'm{" "}
              <span className="italic relative">
                Ankita
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6c50-8 150-8 196 0" stroke="hsl(340 50% 55%)" strokeWidth="3" strokeLinecap="round" /></svg>
              </span>{" "}
              <span className="block mt-1">Debnath</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 leading-relaxed mb-10 max-w-lg">
              An MBBS student sharing my journey, achievements, medical learning, study practices, and life experiences to inspire and support others.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" asChild className="rounded-full font-semibold shadow-xl bg-accent hover:bg-accent/90 text-accent-foreground px-7">
                <Link to="/journey"><Heart className="w-4 h-4 mr-2" /> Read My Story</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-7">
                <Link to="/blog">Explore My Blog <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                { icon: BookOpen, label: "Study Notes" },
                { icon: GraduationCap, label: "MBBS Journey" },
                { icon: Flame, label: "Motivation" },
                { icon: PenTool, label: "Personal Blog" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-primary-foreground/50 text-sm">
                  <Icon className="w-3.5 h-3.5" /> {label}
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex justify-center animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-8 rounded-[2.5rem] bg-accent/15 blur-3xl animate-pulse-soft" />
              <div className="absolute -inset-4 rounded-[2.5rem] bg-primary-foreground/5 blur-xl" />
              <img src={ankitaPhoto} alt="Ankita Debnath" className="relative rounded-[2rem] shadow-2xl w-full max-w-[400px] object-cover aspect-[3/4] border-4 border-primary-foreground/10" />
              <div className="absolute -bottom-5 -left-5 glass rounded-2xl px-5 py-3.5 animate-float shadow-xl">
                <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">🩺 MBBS Student</p>
                <p className="text-xs text-muted-foreground">Dreamer · Learner · Creator</p>
              </div>
              <div className="absolute -top-3 -right-3 glass rounded-xl px-4 py-2 animate-float shadow-lg" style={{ animationDelay: "1.5s" }}>
                <p className="text-xs font-semibold text-foreground flex items-center gap-1">✨ Sharing Knowledge</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Personal Intro */}
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">About Me</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">A Little About Ankita</h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-6">
            I'm a medical student who believes in the power of sharing knowledge. Through this blog, I document my MBBS journey — the lessons, the struggles, the small victories, and everything in between.
          </p>
          <Link to="/about" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
            Read more about me <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>

    {/* My Story Preview */}
    <section className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl" />
            <img src={ankitaPhoto2} alt="Ankita studying" className="relative w-full object-cover aspect-[16/11] rounded-3xl shadow-lg" />
          </div>
          <div>
            <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">My Story</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">The Journey That Shaped Me</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              From a curious school student to walking the corridors of a medical college — my path has been full of determination, late-night study sessions, and moments that tested my resolve.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Every challenge taught me something new, and every small win reminded me why I chose this path.
            </p>
            <Button variant="outline" asChild className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
              <Link to="/journey">Read My Full Journey <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Achievements Preview */}
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">Achievements</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Milestones & Recognitions</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Some moments I'm proud of — big and small.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Award, title: "Academic Excellence", desc: "Consistent top performer in university exams", gradient: "from-primary/10 to-primary/5" },
            { icon: GraduationCap, title: "NEET Qualified", desc: "Cleared NEET with a strong score and rank", gradient: "from-accent/10 to-accent/5" },
            { icon: Users, title: "Peer Mentor", desc: "Helped juniors with study guidance and notes", gradient: "from-warm/10 to-warm/5" },
            { icon: PenTool, title: "Content Creator", desc: "Building a knowledge-sharing platform", gradient: "from-primary/10 to-accent/5" },
          ].map(({ icon: Icon, title, desc, gradient }) => (
            <div key={title} className={`card-hover bg-gradient-to-br ${gradient} rounded-2xl p-6 border border-border text-center`}>
              <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center mx-auto mb-4 text-primary shadow-sm">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1.5">{title}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/achievements" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline text-sm">
            See all achievements <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>

    {/* What I Share */}
    <section className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">Content</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">What I Share</h2>
          <p className="text-muted-foreground max-w-md mx-auto">From personal stories to medical knowledge — here's what you'll find.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {whatIShare.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-hover bg-card rounded-2xl p-5 border border-border group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 text-primary group-hover:from-primary group-hover:to-primary group-hover:text-primary-foreground transition-all duration-300">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm mb-1">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Blog Posts */}
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">Blog</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Featured Posts</h2>
            <p className="text-muted-foreground">Latest stories, tips, and reflections.</p>
          </div>
          <Link to="/blog" className="hidden md:flex items-center gap-1 text-primary font-semibold hover:underline text-sm">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <div key={post.title} className="card-hover bg-card rounded-2xl overflow-hidden border border-border group">
              <div className={`h-44 flex items-center justify-center ${i === 0 ? "bg-gradient-to-br from-primary/15 to-accent/10" : i === 1 ? "bg-gradient-to-br from-accent/10 to-warm/10" : "bg-gradient-to-br from-warm/10 to-primary/10"}`}>
                <BookMarked className="w-12 h-12 text-primary/20 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">{post.category}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                <Link to="/blog" className="text-sm font-semibold text-primary hover:text-accent transition-colors flex items-center gap-1">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Study Practices Preview */}
    <section className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">Practices</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">My Study Practices</h2>
          <p className="text-muted-foreground max-w-md mx-auto">The habits and methods that keep me consistent.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Sun, title: "Morning Routine", desc: "Early starts, revision, and focused study blocks" },
            { icon: PenTool, title: "Note-Making", desc: "Handwritten summaries, color coding, and concept maps" },
            { icon: Target, title: "Revision Strategy", desc: "Spaced repetition and active recall techniques" },
            { icon: Calendar, title: "Weekly Planning", desc: "Structured timetables with flexibility for life" },
            { icon: Flame, title: "Staying Motivated", desc: "Self-talk, goals, and celebrating small wins" },
            { icon: Coffee, title: "Life Balance", desc: "Rest, hobbies, and mental health practices" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-hover bg-card rounded-2xl p-6 border border-border group">
              <Icon className="w-7 h-7 text-warm mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-display font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="outline" asChild className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/practices">See My Full Routine <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Knowledge Corner */}
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">Resources</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Knowledge Corner</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Quick medical concepts, useful learning resources, and simplified notes.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Download, title: "Downloadable Notes", desc: "PDF notes for every subject", color: "primary" },
            { icon: Brain, title: "Mnemonics Bank", desc: "Memory aids that actually work", color: "accent" },
            { icon: Lightbulb, title: "Quick Concepts", desc: "One-page concept summaries", color: "warm" },
            { icon: BookOpen, title: "Revision Sheets", desc: "High-yield tables & diagrams", color: "primary" },
          ].map(({ icon: Icon, title, desc, color }) => (
            <Link key={title} to="/notes" className="card-hover bg-card rounded-2xl p-6 border border-border group text-center">
              <div className={`w-14 h-14 rounded-2xl bg-${color}/10 flex items-center justify-center mx-auto mb-4 text-${color} group-hover:bg-${color} group-hover:text-${color}-foreground transition-all duration-300`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm mb-1">{title}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Student Life + Quote */}
    <section className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">Reflections</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Life as an MBBS Student</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Medical school is more than just textbooks and exams. It's about growth, resilience, learning from patients, midnight study sessions, and finding yourself in the process.
            </p>
            <div className="space-y-3 mt-6">
              {["Late-night study sessions & their lessons", "Balancing academics with personal growth", "First clinical experiences that changed my perspective", "Building discipline one day at a time"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/5 to-primary/5 blur-xl" />
            <div className="relative bg-card rounded-3xl p-8 border border-border shadow-lg">
              <Quote className="w-8 h-8 text-accent/30 mb-4" />
              <blockquote className="font-display text-xl text-foreground italic leading-relaxed mb-6">
                "Every patient I meet, every page I study, every challenge I face — it all reminds me that this journey is worth every sacrifice."
              </blockquote>
              <div className="flex items-center gap-3">
                <img src={ankitaPhoto} alt="Ankita" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Ankita Debnath</p>
                  <p className="text-xs text-muted-foreground">MBBS Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Words I Live By */}
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">Values</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Words I Live By</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {quotes.map((q, i) => (
            <div key={i} className={`rounded-2xl p-7 border border-border text-center card-hover ${i === 1 ? "bg-gradient-to-br from-accent/5 to-warm/5" : "bg-card"}`}>
              <div className="w-11 h-11 rounded-full bg-warm/10 flex items-center justify-center mx-auto mb-4">
                <Quote className="w-5 h-5 text-warm" />
              </div>
              <p className="font-display text-foreground italic leading-relaxed">"{q}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">Love</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">What Readers Love</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card-hover bg-card rounded-2xl p-7 border border-border">
              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-warm text-warm" />)}
              </div>
              <p className="text-sm text-muted-foreground mb-6 italic leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Newsletter */}
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(340 50% 55% / 0.15) 0%, transparent 60%)" }} />
          <div className="relative z-10 py-20 px-8 text-center">
            <div className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
              <Send className="w-6 h-6 text-primary-foreground/60" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-3">Stay Connected</h2>
            <p className="text-primary-foreground/60 mb-8 max-w-md mx-auto">Get my latest posts, study tips, and reflections delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your.email@example.com" className="flex-1 px-6 py-3.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/12 text-primary-foreground placeholder:text-primary-foreground/35 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20" />
              <Button className="rounded-full font-semibold px-7 bg-accent hover:bg-accent/90 text-accent-foreground">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
