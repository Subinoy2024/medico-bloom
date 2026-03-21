import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Search, Clock, ArrowRight, BookMarked, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const allCategories = ["All", "My Story", "Medical Learning", "Study Tips", "Student Life", "Clinical Experience", "Motivation", "Reflection"];

const articles = [
  { title: "How I Prepare for University Exams — My Complete Method", category: "Study Tips", date: "Mar 15, 2026", time: "6 min", excerpt: "A step-by-step breakdown of my exam preparation strategy that helps me stay consistent and confident." },
  { title: "The Day I Realized Why I Chose Medicine", category: "My Story", date: "Mar 12, 2026", time: "4 min", excerpt: "A personal reflection on a moment in the hospital that changed everything for me." },
  { title: "Top 10 Anatomy Mnemonics That Actually Work", category: "Medical Learning", date: "Mar 10, 2026", time: "5 min", excerpt: "Battle-tested memory aids for cranial nerves, brachial plexus, and more." },
  { title: "Surviving First Year MBBS: Honest Advice", category: "Student Life", date: "Mar 8, 2026", time: "7 min", excerpt: "What I wish someone had told me before my first year in medical school." },
  { title: "My First Clinical Posting Experience", category: "Clinical Experience", date: "Mar 5, 2026", time: "5 min", excerpt: "Walking into the ward for the first time — the nerves, the learning, and the growth." },
  { title: "How I Stay Motivated During Tough Days", category: "Motivation", date: "Mar 3, 2026", time: "4 min", excerpt: "Practical strategies that help me push through when things get overwhelming." },
  { title: "Reflections on Becoming a Better Student", category: "Reflection", date: "Feb 28, 2026", time: "5 min", excerpt: "Personal thoughts on growth, discipline, and what it really means to be a good medical student." },
  { title: "Making Effective Study Notes: My Approach", category: "Study Tips", date: "Feb 25, 2026", time: "6 min", excerpt: "Color coding, concept maps, and the methods behind my most effective notes." },
];

const Blog = () => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("All");

  const filtered = articles.filter(
    (a) => (active === "All" || a.category === active) && a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Blog</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">My Blog</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">Stories, insights, study guides, and honest reflections from my MBBS journey.</p>
          </div>

          {/* Featured */}
          <div className="relative rounded-3xl overflow-hidden mb-12 card-hover">
            <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
            <div className="relative z-10 p-8 md:p-12">
              <span className="inline-flex items-center gap-1 text-primary-foreground/70 text-sm mb-3"><TrendingUp className="w-4 h-4" /> Featured Post</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-3 max-w-lg">From Doubt to Determination — My First Year in Medical School</h2>
              <p className="text-primary-foreground/70 mb-6 max-w-lg">An honest look at the emotional rollercoaster of first year MBBS — the fears, the breakthroughs, and the moments that defined me.</p>
              <Button variant="secondary" className="rounded-full text-primary font-semibold">Read Article <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {allCategories.map((c) => (
                  <button key={c} onClick={() => setActive(c)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${active === c ? "bg-primary text-primary-foreground shadow-md" : "bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-primary"}`}>
                    {c}
                  </button>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {filtered.map((a) => (
                  <div key={a.title} className="card-hover bg-card rounded-2xl overflow-hidden border border-border">
                    <div className="h-32 bg-[image:var(--soft-gradient)] flex items-center justify-center">
                      <BookMarked className="w-8 h-8 text-primary/20" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{a.category}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{a.time}</span>
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-1.5 line-clamp-2 text-sm">{a.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{a.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{a.date}</span>
                        <span className="text-xs font-medium text-primary hover:underline cursor-pointer flex items-center gap-1">Read <ArrowRight className="w-3 h-3" /></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4 text-sm">Popular Posts</h3>
                <div className="space-y-4">
                  {articles.slice(0, 4).map((p, i) => (
                    <div key={p.title} className="flex gap-3">
                      <span className="text-xl font-display font-bold text-primary/25">{i + 1}</span>
                      <div>
                        <h4 className="text-xs font-medium text-foreground line-clamp-2">{p.title}</h4>
                        <span className="text-[11px] text-muted-foreground">{p.time} read</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4 text-sm">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {allCategories.slice(1).map((c) => (
                    <button key={c} onClick={() => setActive(c)} className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">{c}</button>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
                <div className="relative z-10 p-6 text-center">
                  <h3 className="font-display font-semibold text-primary-foreground mb-2 text-sm">Newsletter</h3>
                  <p className="text-xs text-primary-foreground/65 mb-4">Get my latest posts in your inbox.</p>
                  <input placeholder="Email" className="w-full px-3 py-2 rounded-full bg-primary-foreground/12 border border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/40 text-sm mb-3 focus:outline-none" />
                  <Button variant="secondary" size="sm" className="w-full rounded-full text-primary font-semibold">Subscribe</Button>
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
