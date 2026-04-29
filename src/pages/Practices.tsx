import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import EmptyState from "@/components/EmptyState";
import { getContent, SiteContent } from "@/lib/content-store";
import { Icon } from "@/lib/icon-map";
import { CheckCircle } from "lucide-react";

const Practices = () => {
  const [c, setC] = useState<SiteContent>(getContent());
  useEffect(() => { setC(getContent()); }, []);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Routine</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">Practices & Routine</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">The habits and methods that keep me focused.</p>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8 text-center">My Daily Routine</h2>
            {c.routineBlocks.length > 0 ? (
              <div className="max-w-2xl mx-auto space-y-3">
                {c.routineBlocks.map((b) => (
                  <div key={b.id} className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border card-hover">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Icon name={b.iconKey} className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-primary font-semibold">{b.time}</span>
                      <p className="text-sm text-foreground">{b.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-2xl mx-auto"><EmptyState message="No routine blocks added yet." /></div>
            )}
          </div>

          {c.practices.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {c.practices.map((p) => (
                <div key={p.id} className="card-hover bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-warm/10 flex items-center justify-center text-warm">
                      <Icon name={p.iconKey} className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground">{p.title}</h3>
                  </div>
                  <div className="space-y-2.5">
                    {p.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No practices added yet." />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Practices;
