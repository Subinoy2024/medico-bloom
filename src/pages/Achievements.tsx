import Layout from "@/components/Layout";
import { Award, GraduationCap, Users, PenTool, Star, Trophy, BookOpen, Heart, Target, Sparkles } from "lucide-react";

const achievements = [
  { icon: GraduationCap, title: "NEET Qualified", desc: "Cleared NEET-UG with a competitive score, securing admission into medical college.", year: "2023" },
  { icon: Award, title: "University Topper — Anatomy", desc: "Secured the highest marks in Anatomy during 1st year university examinations.", year: "2024" },
  { icon: Trophy, title: "Quiz Competition Winner", desc: "Won 1st place in the inter-batch medical quiz competition on Pathology and Pharmacology.", year: "2024" },
  { icon: Users, title: "Peer Mentorship Program", desc: "Selected as a peer mentor to guide junior MBBS students in study techniques and exam preparation.", year: "2025" },
  { icon: PenTool, title: "Started Medico Blog", desc: "Launched this blog to share knowledge, notes, and personal experiences with fellow students.", year: "2025" },
  { icon: BookOpen, title: "Published 200+ Study Notes", desc: "Created and shared over 200 subject-wise study notes used by thousands of students.", year: "2025" },
  { icon: Star, title: "Conference Presentation", desc: "Presented a case study on clinical pharmacology at the regional medical students' conference.", year: "2025" },
  { icon: Heart, title: "Community Service", desc: "Volunteered in health awareness camps, providing basic health education to underserved communities.", year: "2024" },
];

const personalWins = [
  "Maintained a consistent study routine for 365 days",
  "Overcame fear of viva examinations through preparation",
  "Built a supportive study group that became lifelong friends",
  "Learned to balance academics with mental wellness",
  "Started journaling daily — it changed my perspective",
  "Helped 50+ juniors with personalized study guidance",
];

const Achievements = () => (
  <Layout>
    <section className="section-padding">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Milestones</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">Achievements</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Every milestone matters — big or small. Here are some moments I'm proud of.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-20">
          {achievements.map(({ icon: Icon, title, desc, year }) => (
            <div key={title} className="card-hover bg-card rounded-2xl p-6 border border-border relative overflow-hidden">
              <div className="absolute top-4 right-4 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">{year}</div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Personal Wins */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-foreground mb-3">Personal Wins 🌟</h2>
            <p className="text-muted-foreground">The quiet victories that mean the most.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {personalWins.map((win, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
                <Sparkles className="w-4 h-4 text-warm flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{win}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inspiring Banner */}
        <div className="mt-20 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
          <div className="relative z-10 py-14 px-8 text-center">
            <Target className="w-9 h-9 text-primary-foreground/50 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-3">The Journey Continues</h2>
            <p className="text-primary-foreground/65 max-w-md mx-auto">Every day is a chance to learn something new, grow a little more, and move closer to becoming the doctor I dream of being.</p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Achievements;
