import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import EmptyState from "@/components/EmptyState";
import { getContent, SiteContent } from "@/lib/content-store";
import { BookOpen, Search, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const Research = () => {
  const [c, setC] = useState<SiteContent>(getContent());
  useEffect(() => { setC(getContent()); }, []);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("All Areas");

  const years = ["All Areas", ...Array.from(new Set(c.subjects.map((s) => s.year)))];
  const filtered = c.subjects.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) && (year === "All Areas" || s.year === year)
  );

  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Resources</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">Research</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">Clinical topics, evidence summaries, and research notes across medical specialties.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search topics..." className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="px-5 py-3 rounded-full bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </div>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
              {filtered.map((s) => (
                <div key={s.id} className="card-hover bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{s.year}</span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-1">{s.name}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{s.notes} notes • {s.difficulty}</p>
                  <Button size="sm" className="rounded-full w-full">Read Notes</Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-20"><EmptyState message="No subjects added yet." /></div>
          )}

          {c.mnemonics.length > 0 && (
            <div className="mb-20">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-display font-bold text-foreground mb-3">Mnemonics & High-Yield Points</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {c.mnemonics.map((m) => (
                  <div key={m.id} className="card-hover bg-card rounded-2xl p-6 border border-border">
                    <Brain className="w-7 h-7 text-accent mb-3" />
                    <h3 className="font-display font-semibold text-foreground mb-1">{m.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{m.subject}</p>
                    <p className="text-sm text-primary font-medium italic">"{m.content}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Research;
