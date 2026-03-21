import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Search, Clock, ArrowRight, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const allCategories = ["All", "Anatomy", "Physiology", "Pathology", "Pharmacology", "Medicine", "Surgery", "Pediatrics"];

const articles = [
  { title: "Complete Guide to Cranial Nerves", category: "Anatomy", date: "Mar 15, 2026", time: "7 min", excerpt: "Master all 12 cranial nerves with this detailed guide including mnemonics, clinical correlations, and exam tips." },
  { title: "Cardiac Cycle Made Simple", category: "Physiology", date: "Mar 12, 2026", time: "5 min", excerpt: "Understand the phases of the cardiac cycle with easy diagrams and clinical relevance." },
  { title: "Inflammatory Markers Explained", category: "Pathology", date: "Mar 10, 2026", time: "6 min", excerpt: "CRP, ESR, and more — learn what each inflammatory marker means and when to use them." },
  { title: "Antihypertensive Drug Classes", category: "Pharmacology", date: "Mar 8, 2026", time: "8 min", excerpt: "A comprehensive review of all antihypertensive drug classes with mechanisms and side effects." },
  { title: "Approach to Chest Pain", category: "Medicine", date: "Mar 5, 2026", time: "10 min", excerpt: "Systematic approach to evaluating chest pain — from differential diagnosis to workup." },
  { title: "Appendectomy: Step by Step", category: "Surgery", date: "Mar 3, 2026", time: "6 min", excerpt: "Detailed surgical steps, anatomy review, and common viva questions about appendectomy." },
];

const popularPosts = articles.slice(0, 3);

const Blog = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = articles.filter(
    (a) =>
      (activeCategory === "All" || a.category === activeCategory) &&
      a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">The Blog</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">Insights, study guides, and clinical wisdom for your MBBS journey.</p>
          </div>

          {/* Featured */}
          <div className="relative rounded-3xl overflow-hidden mb-12 card-hover">
            <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
            <div className="relative z-10 p-8 md:p-12">
              <span className="inline-flex items-center gap-1 text-primary-foreground/70 text-sm mb-3"><TrendingUp className="w-4 h-4" /> Trending Now</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-3 max-w-lg">How I Scored 95% in University Anatomy Exams — My Complete Strategy</h2>
              <p className="text-primary-foreground/70 mb-6 max-w-lg">From day one to exam day — a step-by-step breakdown of study techniques, resources, and time management that worked.</p>
              <Button variant="secondary" className="rounded-xl text-primary font-semibold">Read Article <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2">
              {/* Search + Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {allCategories.map((c) => (
                  <button key={c} onClick={() => setActiveCategory(c)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}>
                    {c}
                  </button>
                ))}
              </div>

              {/* Articles Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {filtered.map((a) => (
                  <div key={a.title} className="card-hover bg-card rounded-2xl overflow-hidden border border-border">
                    <div className="h-36 bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-primary/30" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{a.category}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{a.time}</span>
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-1.5 line-clamp-2 text-sm">{a.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{a.excerpt}</p>
                      <span className="text-xs text-muted-foreground">{a.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Popular Posts</h3>
                <div className="space-y-4">
                  {popularPosts.map((p, i) => (
                    <div key={p.title} className="flex gap-3">
                      <span className="text-2xl font-display font-bold text-primary/30">{i + 1}</span>
                      <div>
                        <h4 className="text-sm font-medium text-foreground line-clamp-2">{p.title}</h4>
                        <span className="text-xs text-muted-foreground">{p.time} read</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {allCategories.slice(1).map((c) => (
                    <button key={c} onClick={() => setActiveCategory(c)} className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
                <div className="relative z-10 p-6 text-center">
                  <h3 className="font-display font-semibold text-primary-foreground mb-2">Newsletter</h3>
                  <p className="text-sm text-primary-foreground/70 mb-4">Weekly study tips in your inbox.</p>
                  <input placeholder="Email" className="w-full px-3 py-2 rounded-lg bg-primary-foreground/15 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm mb-3 focus:outline-none" />
                  <Button variant="secondary" size="sm" className="w-full rounded-lg text-primary font-semibold">Subscribe</Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
