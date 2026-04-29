import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { getContent, saveContent, SiteContent, BlogPost, Achievement, JourneyItem, RoutineBlock, Practice, Subject, Mnemonic, IconItem, AboutSection, newId, emptyContent } from "@/lib/content-store";
import { ICON_KEYS, Icon } from "@/lib/icon-map";
import { Button } from "@/components/ui/button";
import { LogOut, Save, Plus, Trash2, Settings, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { isAdmin, logout } = useAdmin();
  const navigate = useNavigate();
  const [content, setContent] = useState<SiteContent>(getContent());
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [saved, setSaved] = useState(true);

  useEffect(() => { if (!isAdmin) navigate("/admin"); }, [isAdmin, navigate]);
  if (!isAdmin) return null;

  const update = (patch: Partial<SiteContent>) => { setContent((p) => ({ ...p, ...patch })); setSaved(false); };
  const handleSave = () => { saveContent(content); setSaved(true); toast.success("Content saved!"); };
  const handleLogout = () => { logout(); navigate("/admin"); };
  const handleReset = () => {
    if (confirm("Reset all content to defaults? This cannot be undone.")) {
      setContent(emptyContent); setSaved(false);
    }
  };

  const tabs = [
    { key: "hero", label: "Hero" },
    { key: "about", label: "About Page" },
    { key: "story", label: "My Story Preview" },
    { key: "share", label: "What I Share" },
    { key: "blog", label: "Blog" },
    { key: "journey", label: "Journey" },
    { key: "achievements", label: "Achievements" },
    { key: "practices", label: "Practices & Routine" },
    { key: "research", label: "Research" },
    { key: "knowledge", label: "Knowledge Corner" },
    { key: "quotes", label: "Quotes" },
    { key: "contact", label: "Contact" },
    { key: "footer", label: "Footer" },
  ];

  const Field = ({ label, value, onChange, multiline, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; rows?: number }) => (
    <div>
      <label className="text-xs font-medium text-foreground mb-1.5 block">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
      )}
    </div>
  );

  const IconPicker = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <div>
      <label className="text-xs font-medium text-foreground mb-1.5 block">Icon</label>
      <div className="flex items-center gap-2">
        <select value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          {ICON_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-primary"><Icon name={value} className="w-5 h-5" /></div>
      </div>
    </div>
  );

  // Generic list helpers
  const addToList = <T,>(key: keyof SiteContent, item: T) => update({ [key]: [...(content[key] as any[]), item] } as any);
  const removeFromList = (key: keyof SiteContent, id: string) => update({ [key]: (content[key] as any[]).filter((x: any) => x.id !== id) } as any);
  const updateInList = (key: keyof SiteContent, id: string, patch: any) => update({ [key]: (content[key] as any[]).map((x: any) => x.id === id ? { ...x, ...patch } : x) } as any);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"><Settings className="w-4 h-4 text-primary-foreground" /></div>
            <div>
              <h1 className="text-sm font-display font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-[10px] text-muted-foreground">Manage your site content {saved ? "" : "• unsaved changes"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted">View Site</Link>
            <Button size="sm" variant="outline" onClick={handleReset} className="rounded-lg gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> Reset</Button>
            <Button size="sm" onClick={handleSave} disabled={saved} className="rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5"><Save className="w-3.5 h-3.5" /> {saved ? "Saved" : "Save"}</Button>
            <Button size="sm" variant="outline" onClick={handleLogout} className="rounded-lg gap-1.5"><LogOut className="w-3.5 h-3.5" /> Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 grid lg:grid-cols-[220px_1fr] gap-6">
        <aside>
          <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:sticky lg:top-20">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`flex-shrink-0 text-left px-3 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${activeTab === t.key ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-muted"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </aside>

        <main className="space-y-4 max-w-3xl">
          {activeTab === "hero" && (
            <Section title="Hero Section">
              <Field label="Badge text" value={content.hero.badge} onChange={(v) => update({ hero: { ...content.hero, badge: v } })} />
              <Field label="Heading prefix" value={content.hero.headingPrefix} onChange={(v) => update({ hero: { ...content.hero, headingPrefix: v } })} />
              <Field label="Heading name" value={content.hero.headingName} onChange={(v) => update({ hero: { ...content.hero, headingName: v } })} />
              <Field label="Subtext" value={content.hero.subtext} onChange={(v) => update({ hero: { ...content.hero, subtext: v } })} multiline />
              <Field label="Primary CTA" value={content.hero.ctaPrimary} onChange={(v) => update({ hero: { ...content.hero, ctaPrimary: v } })} />
              <Field label="Secondary CTA" value={content.hero.ctaSecondary} onChange={(v) => update({ hero: { ...content.hero, ctaSecondary: v } })} />
              <Field label="Home page about intro" value={content.aboutIntro} onChange={(v) => update({ aboutIntro: v })} multiline rows={4} />
            </Section>
          )}

          {activeTab === "about" && (
            <>
              <Section title="About Page">
                <Field label="Tagline" value={content.about.tagline} onChange={(v) => update({ about: { ...content.about, tagline: v } })} />
                <Field label="Subtitle" value={content.about.subtitle} onChange={(v) => update({ about: { ...content.about, subtitle: v } })} />
                <Field label="Role" value={content.about.role} onChange={(v) => update({ about: { ...content.about, role: v } })} />
                <Field label="Bio paragraph 1" value={content.about.bio1} onChange={(v) => update({ about: { ...content.about, bio1: v } })} multiline />
                <Field label="Bio paragraph 2" value={content.about.bio2} onChange={(v) => update({ about: { ...content.about, bio2: v } })} multiline />
              </Section>
              <Section title={`About Sections (${content.about.sections.length})`} onAdd={() => update({ about: { ...content.about, sections: [...content.about.sections, { id: newId(), iconKey: "heart", title: "New section", content: "" }] } })}>
                {content.about.sections.map((s) => (
                  <Card key={s.id} title={s.title} onDelete={() => update({ about: { ...content.about, sections: content.about.sections.filter((x) => x.id !== s.id) } })}>
                    <IconPicker value={s.iconKey} onChange={(v) => update({ about: { ...content.about, sections: content.about.sections.map((x) => x.id === s.id ? { ...x, iconKey: v } : x) } })} />
                    <Field label="Title" value={s.title} onChange={(v) => update({ about: { ...content.about, sections: content.about.sections.map((x) => x.id === s.id ? { ...x, title: v } : x) } })} />
                    <Field label="Content" value={s.content} onChange={(v) => update({ about: { ...content.about, sections: content.about.sections.map((x) => x.id === s.id ? { ...x, content: v } : x) } })} multiline />
                  </Card>
                ))}
              </Section>
            </>
          )}

          {activeTab === "story" && (
            <Section title="My Story Preview (Home Page)">
              <Field label="Tagline" value={content.myStoryPreview.tagline} onChange={(v) => update({ myStoryPreview: { ...content.myStoryPreview, tagline: v } })} />
              <Field label="Heading" value={content.myStoryPreview.heading} onChange={(v) => update({ myStoryPreview: { ...content.myStoryPreview, heading: v } })} />
              <Field label="Paragraph 1" value={content.myStoryPreview.paragraph1} onChange={(v) => update({ myStoryPreview: { ...content.myStoryPreview, paragraph1: v } })} multiline />
              <Field label="Paragraph 2" value={content.myStoryPreview.paragraph2} onChange={(v) => update({ myStoryPreview: { ...content.myStoryPreview, paragraph2: v } })} multiline />
            </Section>
          )}

          {activeTab === "share" && (
            <Section title={`What I Share (${content.whatIShare.length})`} onAdd={() => addToList<IconItem>("whatIShare", { id: newId(), iconKey: "heart", title: "New", desc: "" })}>
              {content.whatIShare.map((it) => (
                <Card key={it.id} title={it.title} onDelete={() => removeFromList("whatIShare", it.id)}>
                  <IconPicker value={it.iconKey} onChange={(v) => updateInList("whatIShare", it.id, { iconKey: v })} />
                  <Field label="Title" value={it.title} onChange={(v) => updateInList("whatIShare", it.id, { title: v })} />
                  <Field label="Description" value={it.desc} onChange={(v) => updateInList("whatIShare", it.id, { desc: v })} multiline rows={2} />
                </Card>
              ))}
            </Section>
          )}

          {activeTab === "blog" && (
            <>
              <Section title="Featured Blog">
                <Field label="Title" value={content.featuredBlog.title} onChange={(v) => update({ featuredBlog: { ...content.featuredBlog, title: v } })} />
                <Field label="Excerpt" value={content.featuredBlog.excerpt} onChange={(v) => update({ featuredBlog: { ...content.featuredBlog, excerpt: v } })} multiline />
              </Section>
              <Section title="Blog Categories">
                <ListEditor items={content.blogCategories} onChange={(arr) => update({ blogCategories: arr })} placeholder="Category name" />
              </Section>
              <Section title={`Blog Posts (${content.blogPosts.length})`} onAdd={() => addToList<BlogPost>("blogPosts", { id: newId(), title: "New Post", category: "My Story", date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), time: "5 min", excerpt: "" })}>
                {content.blogPosts.map((p) => (
                  <Card key={p.id} title={p.title} onDelete={() => removeFromList("blogPosts", p.id)}>
                    <Field label="Title" value={p.title} onChange={(v) => updateInList("blogPosts", p.id, { title: v })} />
                    <div className="grid grid-cols-3 gap-3">
                      <Field label="Category" value={p.category} onChange={(v) => updateInList("blogPosts", p.id, { category: v })} />
                      <Field label="Date" value={p.date} onChange={(v) => updateInList("blogPosts", p.id, { date: v })} />
                      <Field label="Read time" value={p.time} onChange={(v) => updateInList("blogPosts", p.id, { time: v })} />
                    </div>
                    <Field label="Excerpt" value={p.excerpt} onChange={(v) => updateInList("blogPosts", p.id, { excerpt: v })} multiline />
                  </Card>
                ))}
              </Section>
            </>
          )}

          {activeTab === "journey" && (
            <>
              <Section title={`Journey Timeline (${content.journeyTimeline.length})`} onAdd={() => addToList<JourneyItem>("journeyTimeline", { id: newId(), year: "Year", iconKey: "sparkles", title: "New milestone", desc: "" })}>
                {content.journeyTimeline.map((j) => (
                  <Card key={j.id} title={j.title} onDelete={() => removeFromList("journeyTimeline", j.id)}>
                    <IconPicker value={j.iconKey} onChange={(v) => updateInList("journeyTimeline", j.id, { iconKey: v })} />
                    <Field label="Year/Period" value={j.year} onChange={(v) => updateInList("journeyTimeline", j.id, { year: v })} />
                    <Field label="Title" value={j.title} onChange={(v) => updateInList("journeyTimeline", j.id, { title: v })} />
                    <Field label="Description" value={j.desc} onChange={(v) => updateInList("journeyTimeline", j.id, { desc: v })} multiline />
                  </Card>
                ))}
              </Section>
              <Section title="Life Lessons">
                <ListEditor items={content.journeyLessons} onChange={(arr) => update({ journeyLessons: arr })} placeholder="A life lesson..." multiline />
              </Section>
            </>
          )}

          {activeTab === "achievements" && (
            <>
              <Section title={`Achievements (${content.achievements.length})`} onAdd={() => addToList<Achievement>("achievements", { id: newId(), iconKey: "award", title: "New", desc: "", year: "" })}>
                {content.achievements.map((a) => (
                  <Card key={a.id} title={a.title} onDelete={() => removeFromList("achievements", a.id)}>
                    <IconPicker value={a.iconKey} onChange={(v) => updateInList("achievements", a.id, { iconKey: v })} />
                    <Field label="Title" value={a.title} onChange={(v) => updateInList("achievements", a.id, { title: v })} />
                    <Field label="Description" value={a.desc} onChange={(v) => updateInList("achievements", a.id, { desc: v })} multiline rows={2} />
                    <Field label="Year" value={a.year} onChange={(v) => updateInList("achievements", a.id, { year: v })} />
                  </Card>
                ))}
              </Section>
              <Section title="Personal Wins">
                <ListEditor items={content.personalWins} onChange={(arr) => update({ personalWins: arr })} placeholder="A personal win..." />
              </Section>
            </>
          )}

          {activeTab === "practices" && (
            <>
              <Section title={`Daily Routine (${content.routineBlocks.length})`} onAdd={() => addToList<RoutineBlock>("routineBlocks", { id: newId(), time: "12:00 PM", activity: "", iconKey: "clock" })}>
                {content.routineBlocks.map((b) => (
                  <Card key={b.id} title={`${b.time} — ${b.activity}`} onDelete={() => removeFromList("routineBlocks", b.id)}>
                    <IconPicker value={b.iconKey} onChange={(v) => updateInList("routineBlocks", b.id, { iconKey: v })} />
                    <Field label="Time" value={b.time} onChange={(v) => updateInList("routineBlocks", b.id, { time: v })} />
                    <Field label="Activity" value={b.activity} onChange={(v) => updateInList("routineBlocks", b.id, { activity: v })} />
                  </Card>
                ))}
              </Section>
              <Section title={`Practices (${content.practices.length})`} onAdd={() => addToList<Practice>("practices", { id: newId(), iconKey: "target", title: "New practice", points: [] })}>
                {content.practices.map((p) => (
                  <Card key={p.id} title={p.title} onDelete={() => removeFromList("practices", p.id)}>
                    <IconPicker value={p.iconKey} onChange={(v) => updateInList("practices", p.id, { iconKey: v })} />
                    <Field label="Title" value={p.title} onChange={(v) => updateInList("practices", p.id, { title: v })} />
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">Points</label>
                      <ListEditor items={p.points} onChange={(arr) => updateInList("practices", p.id, { points: arr })} placeholder="A point..." />
                    </div>
                  </Card>
                ))}
              </Section>
              <Section title={`Study Practices Grid - Home (${content.studyPracticesGrid.length})`} onAdd={() => addToList<IconItem>("studyPracticesGrid", { id: newId(), iconKey: "target", title: "New", desc: "" })}>
                {content.studyPracticesGrid.map((it) => (
                  <Card key={it.id} title={it.title} onDelete={() => removeFromList("studyPracticesGrid", it.id)}>
                    <IconPicker value={it.iconKey} onChange={(v) => updateInList("studyPracticesGrid", it.id, { iconKey: v })} />
                    <Field label="Title" value={it.title} onChange={(v) => updateInList("studyPracticesGrid", it.id, { title: v })} />
                    <Field label="Description" value={it.desc} onChange={(v) => updateInList("studyPracticesGrid", it.id, { desc: v })} />
                  </Card>
                ))}
              </Section>
            </>
          )}

          {activeTab === "research" && (
            <>
              <Section title={`Subjects / Research Areas (${content.subjects.length})`} onAdd={() => addToList<Subject>("subjects", { id: newId(), name: "New topic", year: "Core", notes: 0, difficulty: "Moderate" })}>
                {content.subjects.map((s) => (
                  <Card key={s.id} title={s.name} onDelete={() => removeFromList("subjects", s.id)}>
                    <Field label="Name" value={s.name} onChange={(v) => updateInList("subjects", s.id, { name: v })} />
                    <div className="grid grid-cols-3 gap-3">
                      <Field label="Category" value={s.year} onChange={(v) => updateInList("subjects", s.id, { year: v })} />
                      <Field label="# notes" value={String(s.notes)} onChange={(v) => updateInList("subjects", s.id, { notes: Number(v) || 0 })} />
                      <Field label="Difficulty" value={s.difficulty} onChange={(v) => updateInList("subjects", s.id, { difficulty: v })} />
                    </div>
                  </Card>
                ))}
              </Section>
              <Section title={`Mnemonics (${content.mnemonics.length})`} onAdd={() => addToList<Mnemonic>("mnemonics", { id: newId(), title: "", subject: "", content: "" })}>
                {content.mnemonics.map((m) => (
                  <Card key={m.id} title={m.title || "Mnemonic"} onDelete={() => removeFromList("mnemonics", m.id)}>
                    <Field label="Title" value={m.title} onChange={(v) => updateInList("mnemonics", m.id, { title: v })} />
                    <Field label="Subject" value={m.subject} onChange={(v) => updateInList("mnemonics", m.id, { subject: v })} />
                    <Field label="Content" value={m.content} onChange={(v) => updateInList("mnemonics", m.id, { content: v })} multiline rows={2} />
                  </Card>
                ))}
              </Section>
            </>
          )}

          {activeTab === "knowledge" && (
            <Section title={`Knowledge Corner (${content.knowledgeCorner.length})`} onAdd={() => addToList<IconItem>("knowledgeCorner", { id: newId(), iconKey: "book", title: "New", desc: "" })}>
              {content.knowledgeCorner.map((it) => (
                <Card key={it.id} title={it.title} onDelete={() => removeFromList("knowledgeCorner", it.id)}>
                  <IconPicker value={it.iconKey} onChange={(v) => updateInList("knowledgeCorner", it.id, { iconKey: v })} />
                  <Field label="Title" value={it.title} onChange={(v) => updateInList("knowledgeCorner", it.id, { title: v })} />
                  <Field label="Description" value={it.desc} onChange={(v) => updateInList("knowledgeCorner", it.id, { desc: v })} />
                </Card>
              ))}
            </Section>
          )}

          {activeTab === "quotes" && (
            <Section title="Quotes">
              <ListEditor items={content.quotes} onChange={(arr) => update({ quotes: arr })} placeholder="A quote..." multiline />
            </Section>
          )}

          {activeTab === "contact" && (
            <Section title="Contact">
              <Field label="Email" value={content.contact.email} onChange={(v) => update({ contact: { ...content.contact, email: v } })} />
              <Field label="Instagram URL" value={content.contact.instagram} onChange={(v) => update({ contact: { ...content.contact, instagram: v } })} />
              <Field label="Twitter URL" value={content.contact.twitter} onChange={(v) => update({ contact: { ...content.contact, twitter: v } })} />
              <Field label="YouTube URL" value={content.contact.youtube} onChange={(v) => update({ contact: { ...content.contact, youtube: v } })} />
              <Field label="LinkedIn URL" value={content.contact.linkedin} onChange={(v) => update({ contact: { ...content.contact, linkedin: v } })} />
              <Field label="Collaboration text" value={content.contact.collabText} onChange={(v) => update({ contact: { ...content.contact, collabText: v } })} multiline />
              <Field label="Sign-off quote" value={content.contact.signoffQuote} onChange={(v) => update({ contact: { ...content.contact, signoffQuote: v } })} multiline />
            </Section>
          )}

          {activeTab === "footer" && (
            <Section title="Footer">
              <Field label="Tagline" value={content.footer.tagline} onChange={(v) => update({ footer: { ...content.footer, tagline: v } })} multiline />
            </Section>
          )}
        </main>
      </div>
    </div>
  );
};

const Section = ({ title, children, onAdd }: { title: string; children: React.ReactNode; onAdd?: () => void }) => (
  <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="font-display font-semibold text-foreground">{title}</h2>
      {onAdd && <Button size="sm" onClick={onAdd} className="rounded-lg gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground"><Plus className="w-3.5 h-3.5" /> Add</Button>}
    </div>
    {children}
  </div>
);

const Card = ({ title, children, onDelete }: { title: string; children: React.ReactNode; onDelete: () => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-background">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-3 hover:bg-muted/40 text-left">
        <span className="text-sm font-medium text-foreground truncate flex-1">{title || "Untitled"}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="p-4 space-y-3 border-t border-border">
          {children}
          <div className="flex justify-end pt-2">
            <button onClick={onDelete} className="flex items-center gap-1.5 text-xs text-destructive hover:bg-destructive/10 px-3 py-1.5 rounded-lg"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

const ListEditor = ({ items, onChange, placeholder, multiline }: { items: string[]; onChange: (arr: string[]) => void; placeholder: string; multiline?: boolean }) => (
  <div className="space-y-2">
    {items.map((item, i) => (
      <div key={i} className="flex gap-2 items-start">
        {multiline ? (
          <textarea value={item} onChange={(e) => onChange(items.map((x, idx) => idx === i ? e.target.value : x))} rows={2} className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder={placeholder} />
        ) : (
          <input value={item} onChange={(e) => onChange(items.map((x, idx) => idx === i ? e.target.value : x))} className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder={placeholder} />
        )}
        <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></button>
      </div>
    ))}
    <Button size="sm" variant="outline" onClick={() => onChange([...items, ""])} className="rounded-lg gap-1.5"><Plus className="w-3.5 h-3.5" /> Add</Button>
  </div>
);

export default AdminDashboard;
