import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getContent, SiteContent } from "@/lib/content-store";
import { Icon } from "@/lib/icon-map";
import Layout from "@/components/Layout";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import ankitaPhoto from "@/assets/ankita-photo.jpg";
import { Heart, Sparkles, ArrowRight, Clock, ChevronRight, BookMarked } from "lucide-react";

const Index = () => {
  const [c, setC] = useState<SiteContent>(getContent());
  useEffect(() => { setC(getContent()); }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, hsl(170 55% 32% / 0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, hsl(340 50% 55% / 0.1) 0%, transparent 50%)" }} />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              {c.hero.badge && (
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/10 text-primary-foreground/80 text-sm font-medium mb-8">
                  <Sparkles className="w-4 h-4 animate-pulse-soft" /> {c.hero.badge}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-[1.1] mb-6">
                {c.hero.headingPrefix}{" "}
                <span className="italic relative">
                  {c.hero.headingName}
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6c50-8 150-8 196 0" stroke="hsl(340 50% 55%)" strokeWidth="3" strokeLinecap="round" /></svg>
                </span>
              </h1>
              {c.hero.subtext && (
                <p className="text-lg md:text-xl text-primary-foreground/70 leading-relaxed mb-10 max-w-lg">{c.hero.subtext}</p>
              )}
              <div className="flex flex-wrap gap-4 mb-12">
                <Button size="lg" asChild className="rounded-full font-semibold shadow-xl bg-accent hover:bg-accent/90 text-accent-foreground px-7">
                  <Link to="/journey"><Heart className="w-4 h-4 mr-2" /> {c.hero.ctaPrimary || "Read My Story"}</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-7">
                  <Link to="/blog">{c.hero.ctaSecondary || "Explore My Blog"} <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-center animate-scale-in">
              <div className="relative">
                <div className="absolute -inset-8 rounded-[2.5rem] bg-accent/15 blur-3xl animate-pulse-soft" />
                <img src={ankitaPhoto} alt="Ankita Debnath" className="relative rounded-[2rem] shadow-2xl w-full max-w-[400px] object-cover aspect-[3/4] border-4 border-primary-foreground/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About intro */}
      {c.aboutIntro && (
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">About Me</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">A Little About Ankita</h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">{c.aboutIntro}</p>
              <Link to="/about" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
                Read more about me <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* My Story Preview */}
      {(c.myStoryPreview.paragraph1 || c.myStoryPreview.paragraph2) && (
        <section className="section-padding bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl" />
                <img src={ankitaPhoto} alt="Ankita" className="relative w-full object-cover aspect-[16/11] rounded-3xl shadow-lg" />
              </div>
              <div>
                <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">{c.myStoryPreview.tagline}</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">{c.myStoryPreview.heading}</h2>
                {c.myStoryPreview.paragraph1 && <p className="text-muted-foreground leading-relaxed mb-4">{c.myStoryPreview.paragraph1}</p>}
                {c.myStoryPreview.paragraph2 && <p className="text-muted-foreground leading-relaxed mb-8">{c.myStoryPreview.paragraph2}</p>}
                <Button variant="outline" asChild className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                  <Link to="/journey">Read My Full Journey <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Achievements Preview */}
      {c.achievements.length > 0 && (
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">Achievements</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Milestones & Recognitions</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {c.achievements.slice(0, 4).map((a) => (
                <div key={a.id} className="card-hover bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-border text-center">
                  <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center mx-auto mb-4 text-primary shadow-sm">
                    <Icon name={a.iconKey} className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1.5">{a.title}</h3>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/achievements" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline text-sm">
                See all achievements <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* What I Share */}
      {c.whatIShare.length > 0 && (
        <section className="section-padding bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">Content</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">What I Share</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {c.whatIShare.map((item) => (
                <div key={item.id} className="card-hover bg-card rounded-2xl p-5 border border-border group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 text-primary group-hover:from-primary group-hover:to-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon name={item.iconKey} className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Blog */}
      {c.blogPosts.length > 0 && (
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-14">
              <div>
                <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">Blog</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Featured Posts</h2>
              </div>
              <Link to="/blog" className="hidden md:flex items-center gap-1 text-primary font-semibold hover:underline text-sm">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {c.blogPosts.slice(0, 3).map((post, i) => (
                <div key={post.id} className="card-hover bg-card rounded-2xl overflow-hidden border border-border group">
                  <div className={`h-44 flex items-center justify-center ${i === 0 ? "bg-gradient-to-br from-primary/15 to-accent/10" : i === 1 ? "bg-gradient-to-br from-accent/10 to-warm/10" : "bg-gradient-to-br from-warm/10 to-primary/10"}`}>
                    <BookMarked className="w-12 h-12 text-primary/20 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">{post.category}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                    <Link to="/blog" className="text-sm font-semibold text-primary hover:text-accent transition-colors flex items-center gap-1">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Study Practices Grid */}
      {c.studyPracticesGrid.length > 0 && (
        <section className="section-padding bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">Practices</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">My Study Practices</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {c.studyPracticesGrid.map((p) => (
                <div key={p.id} className="card-hover bg-card rounded-2xl p-6 border border-border group">
                  <Icon name={p.iconKey} className="w-7 h-7 text-warm mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display font-semibold text-foreground mb-1">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button variant="outline" asChild className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/practices">See My Full Routine <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Knowledge Corner */}
      {c.knowledgeCorner.length > 0 && (
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-sm text-accent font-semibold tracking-wider uppercase mb-4 block">Resources</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Knowledge Corner</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {c.knowledgeCorner.map((k) => (
                <Link key={k.id} to="/research" className="card-hover bg-card rounded-2xl p-6 border border-border group text-center">
                  <Icon name={k.iconKey} className="w-7 h-7 text-primary mx-auto mb-3" />
                  <h3 className="font-display font-semibold text-foreground text-sm mb-1">{k.title}</h3>
                  <p className="text-xs text-muted-foreground">{k.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quotes */}
      {c.quotes.length > 0 && (
        <section className="section-padding bg-muted/50">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-6">
              {c.quotes.map((q, i) => (
                <blockquote key={i} className="bg-card rounded-2xl p-6 border border-border text-center">
                  <p className="text-lg italic text-foreground">"{q}"</p>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Index;
