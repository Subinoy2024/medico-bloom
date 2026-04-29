import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import EmptyState from "@/components/EmptyState";
import { getContent, SiteContent } from "@/lib/content-store";
import { Search, Clock, ArrowRight, BookMarked, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const [c, setC] = useState<SiteContent>(getContent());
  useEffect(() => { setC(getContent()); }, []);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("All");

  const categories = ["All", ...c.blogCategories];
  const filtered = c.blogPosts.filter(
    (a) => (active === "All" || a.category === active) && a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Blog</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">My Blog</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">Stories, insights, and reflections.</p>
          </div>

          {c.featuredBlog.title && (
            <div className="relative rounded-3xl overflow-hidden mb-12 card-hover">
              <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
              <div className="relative z-10 p-8 md:p-12">
                <span className="inline-flex items-center gap-1 text-primary-foreground/70 text-sm mb-3"><TrendingUp className="w-4 h-4" /> Featured Post</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-3 max-w-lg">{c.featuredBlog.title}</h2>
                <p className="text-primary-foreground/70 mb-6 max-w-lg">{c.featuredBlog.excerpt}</p>
                <Button variant="secondary" className="rounded-full text-primary font-semibold">Read Article <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              {categories.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => setActive(cat)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${active === cat ? "bg-primary text-primary-foreground shadow-md" : "bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-primary"}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              )}
              {filtered.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-5">
                  {filtered.map((a) => (
                    <div key={a.id} className="card-hover bg-card rounded-2xl overflow-hidden border border-border">
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState message="No blog posts yet." />
              )}
            </div>

            <aside className="space-y-6">
              {c.blogPosts.length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4 text-sm">Recent Posts</h3>
                  <div className="space-y-4">
                    {c.blogPosts.slice(0, 4).map((p, i) => (
                      <div key={p.id} className="flex gap-3">
                        <span className="text-xl font-display font-bold text-primary/25">{i + 1}</span>
                        <div>
                          <h4 className="text-xs font-medium text-foreground line-clamp-2">{p.title}</h4>
                          <span className="text-[11px] text-muted-foreground">{p.time} read</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {c.blogCategories.length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4 text-sm">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {c.blogCategories.map((cat) => (
                      <button key={cat} onClick={() => setActive(cat)} className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">{cat}</button>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
