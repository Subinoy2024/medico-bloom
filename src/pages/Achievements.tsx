import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import EmptyState from "@/components/EmptyState";
import { getContent, SiteContent } from "@/lib/content-store";
import { Icon } from "@/lib/icon-map";
import { Sparkles, Target } from "lucide-react";

const Achievements = () => {
  const [c, setC] = useState<SiteContent>(getContent());
  useEffect(() => { setC(getContent()); }, []);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Milestones</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">Achievements</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">Every milestone matters — big or small.</p>
          </div>

          {c.achievements.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6 mb-20">
              {c.achievements.map((a) => (
                <div key={a.id} className="card-hover bg-card rounded-2xl p-6 border border-border relative overflow-hidden">
                  {a.year && <div className="absolute top-4 right-4 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">{a.year}</div>}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Icon name={a.iconKey} className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{a.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-20"><EmptyState message="No achievements added yet." /></div>
          )}

          {c.personalWins.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-display font-bold text-foreground mb-3">Personal Wins 🌟</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {c.personalWins.map((win, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
                    <Sparkles className="w-4 h-4 text-warm flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{win}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-20 rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
            <div className="relative z-10 py-14 px-8 text-center">
              <Target className="w-9 h-9 text-primary-foreground/50 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-3">The Journey Continues</h2>
              <p className="text-primary-foreground/65 max-w-md mx-auto">Every day is a chance to learn and grow.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Achievements;
