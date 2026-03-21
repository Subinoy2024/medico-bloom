import { useState } from "react";
import Layout from "@/components/Layout";
import { BookOpen, Download, Search, Filter, Brain, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const subjects = [
  { name: "Anatomy", year: "1st Year", notes: 24, difficulty: "Moderate" },
  { name: "Physiology", year: "1st Year", notes: 20, difficulty: "Moderate" },
  { name: "Biochemistry", year: "1st Year", notes: 18, difficulty: "High" },
  { name: "Pathology", year: "2nd Year", notes: 30, difficulty: "High" },
  { name: "Pharmacology", year: "2nd Year", notes: 28, difficulty: "High" },
  { name: "Microbiology", year: "2nd Year", notes: 22, difficulty: "Moderate" },
  { name: "Medicine", year: "3rd Year", notes: 35, difficulty: "High" },
  { name: "Surgery", year: "3rd Year", notes: 25, difficulty: "Moderate" },
  { name: "Pediatrics", year: "3rd Year", notes: 18, difficulty: "Moderate" },
  { name: "OBGYN", year: "3rd Year", notes: 20, difficulty: "Moderate" },
];

const years = ["All Years", "1st Year", "2nd Year", "3rd Year"];
const difficulties = ["All", "Moderate", "High"];

const mnemonics = [
  { title: "Cranial Nerves", content: "Oh Oh Oh To Touch And Feel Very Good Velvet AH!", subject: "Anatomy" },
  { title: "Brachial Plexus", content: "Robert Taylor Drinks Cold Beer", subject: "Anatomy" },
  { title: "ECG Lead Placement", content: "Ride Your Green Bicycle", subject: "Physiology" },
];

const StudyNotes = () => {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("All Years");
  const [difficulty, setDifficulty] = useState("All");

  const filtered = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) &&
      (year === "All Years" || s.year === year) &&
      (difficulty === "All" || s.difficulty === difficulty)
  );

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">Study Notes</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">Organized, exam-oriented notes for every MBBS subject. Download, revise, and ace your exams.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search subjects..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="px-4 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="px-4 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
              {difficulties.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>

          {/* Subject Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {filtered.map((s) => (
              <div key={s.name} className="card-hover bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{s.year}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-1">{s.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{s.notes} notes available • {s.difficulty}</p>
                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="rounded-lg flex-1">View Notes</Button>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Mnemonics */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold text-foreground mb-3">Mnemonics & High-Yield Points</h2>
              <p className="text-muted-foreground">Quick memory aids to help you recall faster during exams.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mnemonics.map((m) => (
                <div key={m.title} className="card-hover bg-card rounded-2xl p-6 border border-border">
                  <Brain className="w-8 h-8 text-accent mb-3" />
                  <h3 className="font-display font-semibold text-foreground mb-1">{m.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{m.subject}</p>
                  <p className="text-sm text-primary font-medium italic">"{m.content}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Revision */}
          <div className="rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
            <div className="relative z-10 py-16 px-8 text-center">
              <Sparkles className="w-10 h-10 text-primary-foreground/60 mx-auto mb-4" />
              <h2 className="text-3xl font-display font-bold text-primary-foreground mb-3">Quick Revision Zone</h2>
              <p className="text-primary-foreground/70 mb-6 max-w-md mx-auto">One-page summaries, flowcharts, and tables for last-minute revision before exams.</p>
              <Button variant="secondary" className="rounded-xl text-primary font-semibold">Browse Revision Notes</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StudyNotes;
