import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/ankita-hero.jpg";
import studyImg from "@/assets/ankita-study.jpg";
import {
  BookOpen, Heart, Sparkles, ArrowRight, Clock, Star, ChevronRight,
  Download, Lightbulb, Target, Award, Users, Send, PenTool,
  Stethoscope, Brain, GraduationCap, Flame, Calendar, CheckCircle,
  Quote, BookMarked, Sun, Coffee
} from "lucide-react";

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
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      <div className="absolute inset-0 bg-[image:var(--hero-gradient)] opacity-[0.97]" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(174 50% 60% / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 30%, hsl(200 45% 50% / 0.2) 0%, transparent 50%)" }} />
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-sm font-medium mb-8 border border-primary-foreground/10">
              <Sparkles className="w-4 h-4" /> Welcome to my world
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold text-primary-foreground leading-[1.15] mb-6">
              Hi, I'm <span className="italic">Ankita Debnath</span>
            </h1>
            <p className="text-lg text-primary-foreground/75 leading-relaxed mb-8 max-w-lg">
              An MBBS student sharing my journey, achievements, medical learning, study practices, and life experiences to inspire and support others.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Button size="lg" variant="secondary" asChild className="rounded-full font-semibold shadow-lg text-primary">
                <Link to="/journey"><Heart className="w-4 h-4 mr-2" /> Read My Story</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/blog">Explore My Blog <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { icon: BookOpen, label: "Study Notes" },
                { icon: GraduationCap, label: "MBBS Journey" },
                { icon: Flame, label: "Motivation" },
                { icon: PenTool, label: "Personal Blog" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-primary-foreground/60 text-sm">
                  <Icon className="w-3.5 h-3.5" /> {label}
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex justify-center animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-primary-foreground/5 blur-2xl" />
              <img src={heroImg} alt="Ankita Debnath" className="relative rounded-[2rem] shadow-2xl w-full max-w-[420px] object-cover aspect-[3/4]" />
              <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-5 py-3 animate-float shadow-lg">
                <p className="text-sm font-semibold text-foreground">📚 MBBS Student</p>
                <p className="text-xs text-muted-foreground">Passionate about learning</p>
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
          <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">About Me</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">A Little About Ankita</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I'm a medical student who believes in the power of sharing knowledge. Through this blog, I document my MBBS journey — the lessons, the struggles, the small victories, and everything in between. Whether it's study notes, exam strategies, or just honest reflections about student life, I hope my words resonate with you.
          </p>
          <Link to="/about" className="inline-flex items-center gap-1 text-primary font-medium hover:underline text-sm">
            Read more about me <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>

    {/* My Story Preview */}
    <section className="section-padding bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden">
            <img src={studyImg} alt="Ankita studying" className="w-full object-cover aspect-[16/11] rounded-3xl" />
          </div>
          <div>
            <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">My Story</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">The Journey That Shaped Me</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              From a curious school student to walking the corridors of a medical college — my path has been full of determination, late-night study sessions, and moments that tested my resolve.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Every challenge taught me something new, and every small win reminded me why I chose this path. This is more than an academic journey — it's a story of growth, discipline, and following your dreams.
            </p>
            <Button variant="outline" asChild className="rounded-full">
              <Link to="/journey">Read My Full Journey <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Achievements Preview */}
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Achievements</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Milestones & Recognitions</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Some moments I'm proud of — big and small.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Award, title: "Academic Excellence", desc: "Consistent top performer in university exams" },
            { icon: GraduationCap, title: "NEET Qualified", desc: "Cleared NEET with a strong score and rank" },
            { icon: Users, title: "Peer Mentor", desc: "Helped juniors with study guidance and notes" },
            { icon: PenTool, title: "Content Creator", desc: "Building a knowledge-sharing platform for students" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-hover bg-card rounded-2xl p-6 border border-border text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1.5 text-sm">{title}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/achievements" className="inline-flex items-center gap-1 text-primary font-medium hover:underline text-sm">
            See all achievements <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>

    {/* What I Share */}
    <section className="section-padding bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Content</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">What I Share</h2>
          <p className="text-muted-foreground max-w-md mx-auto">From personal stories to medical knowledge — here's what you'll find on this blog.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {whatIShare.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-hover bg-card rounded-2xl p-5 border border-border group">
              <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center mb-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
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
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Blog</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Featured Posts</h2>
            <p className="text-muted-foreground">Latest from my blog — stories, tips, and reflections.</p>
          </div>
          <Link to="/blog" className="hidden md:flex items-center gap-1 text-primary font-medium hover:underline text-sm">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.title} className="card-hover bg-card rounded-2xl overflow-hidden border border-border">
              <div className="h-40 bg-[image:var(--soft-gradient)] flex items-center justify-center">
                <BookMarked className="w-10 h-10 text-primary/25" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">{post.category}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2 text-[15px]">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                <Link to="/blog" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Study Practices Preview */}
    <section className="section-padding bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Practices</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">My Study Practices</h2>
          <p className="text-muted-foreground max-w-md mx-auto">The habits and methods that keep me consistent and productive.</p>
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
            <div key={title} className="card-hover bg-card rounded-2xl p-6 border border-border">
              <Icon className="w-7 h-7 text-warm mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-1 text-sm">{title}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" asChild className="rounded-full">
            <Link to="/practices">See My Full Routine <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Knowledge Corner */}
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Resources</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Knowledge Corner</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Quick medical concepts, useful learning resources, and simplified notes.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Download, title: "Downloadable Notes", desc: "PDF notes for every subject" },
            { icon: Brain, title: "Mnemonics Bank", desc: "Memory aids that actually work" },
            { icon: Lightbulb, title: "Quick Concepts", desc: "One-page concept summaries" },
            { icon: BookOpen, title: "Revision Sheets", desc: "High-yield tables & diagrams" },
          ].map(({ icon: Icon, title, desc }) => (
            <Link key={title} to="/notes" className="card-hover bg-card rounded-2xl p-5 border border-border group text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm mb-1">{title}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Student Life */}
    <section className="section-padding bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Reflections</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Life as an MBBS Student</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Medical school is more than just textbooks and exams. It's about growth, resilience, learning from patients, midnight study sessions, and finding yourself in the process.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I share honest reflections about the challenges, the beautiful moments, and everything that makes this journey uniquely rewarding.
            </p>
            <div className="space-y-3">
              {["Late-night study sessions & their lessons", "Balancing academics with personal growth", "First clinical experiences that changed my perspective", "Building discipline one day at a time"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-3xl p-8 border border-border">
            <Quote className="w-8 h-8 text-primary/30 mb-4" />
            <blockquote className="font-display text-xl text-foreground italic leading-relaxed mb-6">
              "Every patient I meet, every page I study, every challenge I face — it all reminds me that this journey is worth every sacrifice."
            </blockquote>
            <p className="text-sm text-muted-foreground">— Ankita Debnath</p>
          </div>
        </div>
      </div>
    </section>

    {/* Words I Live By */}
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Values</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Words I Live By</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {quotes.map((q, i) => (
            <div key={i} className="bg-card rounded-2xl p-6 border border-border text-center card-hover">
              <div className="w-10 h-10 rounded-full bg-warm/10 flex items-center justify-center mx-auto mb-4">
                <Quote className="w-5 h-5 text-warm" />
              </div>
              <p className="font-display text-foreground italic text-sm leading-relaxed">"{q}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-padding bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Love</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">What Readers Love</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card-hover bg-card rounded-2xl p-6 border border-border">
              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-warm text-warm" />)}
              </div>
              <p className="text-sm text-muted-foreground mb-5 italic leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.year}</p>
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
          <div className="relative z-10 py-16 px-8 text-center">
            <Send className="w-9 h-9 text-primary-foreground/50 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-3">Stay Connected</h2>
            <p className="text-primary-foreground/65 mb-8 max-w-md mx-auto">Get my latest posts, study tips, and reflections delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your.email@example.com" className="flex-1 px-5 py-3 rounded-full bg-primary-foreground/12 border border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-foreground/25" />
              <Button variant="secondary" className="rounded-full text-primary font-semibold px-6">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
