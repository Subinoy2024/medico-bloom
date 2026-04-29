import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import EmptyState from "@/components/EmptyState";
import { getContent, SiteContent } from "@/lib/content-store";
import { Icon } from "@/lib/icon-map";
import { Star } from "lucide-react";

const Journey = () => {
  const [c, setC] = useState<SiteContent>(getContent());
  useEffect(() => { setC(getContent()); }, []);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">My Story</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">My Journey</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">From a dreaming school kid to a practicing doctor.</p>
          </div>

          {c.journeyTimeline.length > 0 ? (
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
              <div className="space-y-12">
                {c.journeyTimeline.map((item, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <div key={item.id} className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <div className={`hidden md:block md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                        <span className="text-xs text-primary font-semibold tracking-wider uppercase">{item.year}</span>
                        <h3 className="text-lg font-display font-bold text-foreground mt-1 mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-md">
                          <Icon name={item.iconKey} className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="md:hidden flex-1">
                        <span className="text-xs text-primary font-semibold tracking-wider uppercase">{item.year}</span>
                        <h3 className="text-lg font-display font-bold text-foreground mt-1 mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                      <div className={`hidden md:block md:w-1/2 ${isLeft ? "md:pl-12" : "md:pr-12"}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <EmptyState message="No journey milestones added yet." />
          )}

          {c.journeyLessons.length > 0 && (
            <div className="mt-24">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-display font-bold text-foreground mb-3">Life Lessons I've Learned</h2>
              </div>
              <div className="space-y-4">
                {c.journeyLessons.map((lesson, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-card rounded-2xl border border-border card-hover">
                    <Star className="w-5 h-5 text-warm flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed">{lesson}</p>
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

export default Journey;
