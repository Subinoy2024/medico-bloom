import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-student.jpg";
import {
  BookOpen, Heart, Brain, Microscope, Pill, FlaskConical, Stethoscope,
  Baby, Scissors, Eye, ArrowRight, Clock, Star, ChevronRight,
  Download, Lightbulb, Target, Award, Users, Send, CheckCircle, Sparkles
} from "lucide-react";

const trustBadges = [
  { icon: BookOpen, label: "MBBS Notes" },
  { icon: Stethoscope, label: "Clinical Learning" },
  { icon: Target, label: "Exam-Oriented" },
  { icon: Users, label: "Student Friendly" },
];

const categories = [
  { name: "Anatomy", icon: Eye, color: "178 55% 35%" },
  { name: "Physiology", icon: Heart, color: "200 60% 40%" },
  { name: "Biochemistry", icon: FlaskConical, color: "152 55% 45%" },
  { name: "Pathology", icon: Microscope, color: "0 65% 55%" },
  { name: "Pharmacology", icon: Pill, color: "260 50% 55%" },
  { name: "Microbiology", icon: Brain, color: "30 70% 50%" },
  { name: "Medicine", icon: Stethoscope, color: "178 55% 35%" },
  { name: "Surgery", icon: Scissors, color: "200 60% 40%" },
  { name: "Pediatrics", icon: Baby, color: "320 50% 50%" },
  { name: "OBGYN", icon: Heart, color: "340 60% 55%" },
];

const blogPosts = [
  { title: "How to Study Anatomy Effectively", category: "Anatomy", time: "5 min", excerpt: "Proven strategies to master anatomy with visual learning, mnemonics and smart revision techniques." },
  { title: "Understanding Heart Failure: A Clinical Approach", category: "Medicine", time: "8 min", excerpt: "Break down heart failure pathophysiology, diagnosis and treatment in a simplified way." },
  { title: "Top 10 Pharmacology Mnemonics", category: "Pharmacology", time: "4 min", excerpt: "Never forget drug classifications again with these battle-tested mnemonics for exams." },
];

const clinicalCases = [
  { title: "Acute Appendicitis in a Young Male", specialty: "Surgery", difficulty: "Moderate" },
  { title: "Diabetic Ketoacidosis Emergency", specialty: "Medicine", difficulty: "High" },
  { title: "Neonatal Jaundice Evaluation", specialty: "Pediatrics", difficulty: "Moderate" },
];

const testimonials = [
  { name: "Priya S.", year: "3rd Year MBBS", text: "Medico Journey made pathology fun and easy to understand. My scores improved significantly!" },
  { name: "Rahul K.", year: "Intern", text: "The clinical cases section is gold. It prepared me way better for ward rounds than any textbook." },
  { name: "Ananya M.", year: "NEET PG Aspirant", text: "The revision notes and mnemonics are lifesavers during last-minute exam prep." },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[image:var(--hero-gradient)] opacity-95" />
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/15 text-primary-foreground text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Your MBBS Learning Companion
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
              Your Smart MBBS Learning Companion
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8 max-w-lg">
              Simplified notes, clinical insights, case discussions, exam strategies, and daily motivation for medical students.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" asChild className="rounded-xl text-primary font-semibold shadow-lg">
                <Link to="/notes"><BookOpen className="w-5 h-5 mr-2" /> Explore Notes</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-xl border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/blog">Start Learning <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 mt-10">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                  <Icon className="w-4 h-4" /> {label}
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-primary-foreground/10 blur-2xl" />
              <img src={heroImg} alt="Medical student studying" className="relative rounded-2xl shadow-2xl w-full object-cover aspect-square" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Categories */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Browse by Subject</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Dive into comprehensive notes and resources for every MBBS subject.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map(({ name, icon: Icon }) => (
            <Link key={name} to="/notes" className="group card-hover bg-card rounded-2xl p-6 flex flex-col items-center gap-3 border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary">
                <Icon className="w-7 h-7" />
              </div>
              <span className="text-sm font-semibold text-foreground">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Blog Posts */}
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Featured Articles</h2>
            <p className="text-muted-foreground">Latest insights, tips, and study guides from the blog.</p>
          </div>
          <Link to="/blog" className="hidden md:flex items-center gap-1 text-primary font-medium hover:underline">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.title} className="card-hover bg-card rounded-2xl overflow-hidden border border-border">
              <div className="h-44 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-primary/40" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">{post.category}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2">{post.title}</h3>
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

    {/* Clinical Cases */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Latest Clinical Cases</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Real-world case discussions to sharpen your clinical thinking.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {clinicalCases.map((c) => (
            <div key={c.title} className="card-hover bg-card rounded-2xl p-6 border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[4rem]" />
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">{c.specialty}</span>
                <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs">{c.difficulty}</span>
              </div>
              <Stethoscope className="w-10 h-10 text-primary/30 mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-3">{c.title}</h3>
              <Link to="/clinical-cases" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                Read Case <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Exam Prep Toolkit */}
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Exam Preparation Toolkit</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Everything you need to ace your university exams & NEET PG.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Target, title: "NEET PG Strategy", desc: "High-yield topics, MCQ patterns, and topper tips" },
            { icon: Award, title: "University Exams", desc: "Subject-wise revision plans and important questions" },
            { icon: Lightbulb, title: "Viva Preparation", desc: "Common viva questions and confident answering tips" },
            { icon: Download, title: "Quick Revision", desc: "Last-minute notes, flowcharts, and summary tables" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-hover bg-card rounded-2xl p-6 border border-border text-center">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Study Resources */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Top Study Resources</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Downloadable notes, mnemonics, and cheat sheets for quick learning.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Download, title: "Downloadable Notes", desc: "PDF notes for every subject" },
            { icon: Brain, title: "Mnemonics Bank", desc: "Memorize faster with smart tricks" },
            { icon: Sparkles, title: "Quick Revisions", desc: "One-page summaries per topic" },
            { icon: BookOpen, title: "Cheat Sheets", desc: "High-yield tables & diagrams" },
          ].map(({ icon: Icon, title, desc }) => (
            <Link key={title} to="/notes" className="card-hover bg-card rounded-2xl p-6 border border-border group">
              <Icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Student Life */}
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Student Life & Motivation</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Beyond academics — tips to stay healthy, happy and motivated.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Beat Burnout", desc: "Self-care strategies for medical students" },
            { title: "Daily Routine", desc: "Build a productive study schedule" },
            { title: "Time Management", desc: "Balance studies, clinics & life" },
            { title: "Internship Tips", desc: "Survive and thrive during rotations" },
          ].map(({ title, desc }) => (
            <div key={title} className="card-hover bg-card rounded-2xl p-6 border border-border">
              <Heart className="w-8 h-8 text-primary/60 mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">What Students Love</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Hear from fellow MBBS students who use Medico Journey.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card-hover bg-card rounded-2xl p-6 border border-border">
              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
              </div>
              <p className="text-sm text-muted-foreground mb-4 italic">"{t.text}"</p>
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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
          <div className="relative z-10 py-16 px-8 text-center">
            <Send className="w-10 h-10 text-primary-foreground/60 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-3">Stay in the Loop</h2>
            <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">Get weekly study tips, new notes, and exam updates straight to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your.email@mbbs.com" className="flex-1 px-4 py-3 rounded-xl bg-primary-foreground/15 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30" />
              <Button variant="secondary" className="rounded-xl text-primary font-semibold">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Frequently Asked Questions</h2>
        </div>
        {[
          { q: "Who is this blog for?", a: "Medico Journey is designed for MBBS students, interns, and NEET PG aspirants who want simplified, exam-oriented study resources." },
          { q: "Are the notes free to download?", a: "Yes! Most notes and quick revision resources are completely free. We believe quality medical education should be accessible to all." },
          { q: "How often is new content published?", a: "We publish new articles, clinical cases, and study notes every week. Subscribe to our newsletter to stay updated!" },
          { q: "Can I contribute or collaborate?", a: "Absolutely! We welcome guest posts, case submissions, and collaborations. Head to the Contact page to get in touch." },
        ].map(({ q, a }) => (
          <details key={q} className="group bg-card rounded-2xl border border-border mb-3">
            <summary className="flex items-center justify-between p-5 cursor-pointer font-display font-semibold text-foreground">
              {q}
              <ChevronRight className="w-5 h-5 text-muted-foreground group-open:rotate-90 transition-transform" />
            </summary>
            <div className="px-5 pb-5 text-sm text-muted-foreground">{a}</div>
          </details>
        ))}
      </div>
    </section>
  </Layout>
);

export default Index;
