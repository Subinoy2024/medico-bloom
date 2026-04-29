import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import EmptyState from "@/components/EmptyState";
import { getContent, SiteContent } from "@/lib/content-store";
import { Icon } from "@/lib/icon-map";
import ankitaPhoto from "@/assets/ankita-photo.jpg";

const About = () => {
  const [c, setC] = useState<SiteContent>(getContent());
  useEffect(() => { setC(getContent()); }, []);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">{c.about.tagline}</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">About Ankita</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">{c.about.subtitle}</p>
          </div>

          <div className="bg-card rounded-3xl border border-border p-8 md:p-12 mb-16 shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-lg" />
                <img src={ankitaPhoto} alt="Ankita Debnath" className="relative w-44 h-44 rounded-2xl object-cover shadow-lg" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-1">Ankita Debnath</h2>
                <p className="text-sm text-accent font-semibold mb-4">{c.about.role}</p>
                {c.about.bio1 && <p className="text-muted-foreground leading-relaxed mb-4">{c.about.bio1}</p>}
                {c.about.bio2 && <p className="text-muted-foreground leading-relaxed">{c.about.bio2}</p>}
                {!c.about.bio1 && !c.about.bio2 && <p className="text-sm text-muted-foreground italic">Bio not added yet.</p>}
              </div>
            </div>
          </div>

          {c.about.sections.length > 0 ? (
            <div className="space-y-14">
              {c.about.sections.map((s) => (
                <div key={s.id} className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-primary flex-shrink-0 mt-1 group-hover:from-primary group-hover:to-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon name={s.iconKey} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-3">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{s.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No about sections added yet." />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default About;
