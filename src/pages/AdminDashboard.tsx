import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { getContent, saveContent, SiteContent, BlogPost, Achievement } from "@/lib/content-store";
import { Button } from "@/components/ui/button";
import {
  LogOut, Save, Plus, Trash2, Heart, Home, FileText, Award,
  Quote, PenTool, CheckCircle, Settings, ChevronDown, ChevronUp
} from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { isAdmin, logout } = useAdmin();
  const navigate = useNavigate();
  const [content, setContent] = useState<SiteContent>(getContent());
  const [activeTab, setActiveTab] = useState<"hero" | "blog" | "achievements" | "quotes">("hero");
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    if (!isAdmin) navigate("/admin");
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const update = (patch: Partial<SiteContent>) => {
    setContent((prev) => ({ ...prev, ...patch }));
    setSaved(false);
  };

  const handleSave = () => {
    saveContent(content);
    setSaved(true);
    toast.success("Content saved successfully!");
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const addBlogPost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: "New Blog Post",
      category: "My Story",
      excerpt: "Write a short excerpt here...",
      time: "5 min",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    update({ blogPosts: [...content.blogPosts, newPost] });
  };

  const updateBlogPost = (id: string, patch: Partial<BlogPost>) => {
    update({ blogPosts: content.blogPosts.map((p) => (p.id === id ? { ...p, ...patch } : p)) });
  };

  const deleteBlogPost = (id: string) => {
    update({ blogPosts: content.blogPosts.filter((p) => p.id !== id) });
  };

  const addAchievement = () => {
    const newAch: Achievement = {
      id: Date.now().toString(),
      title: "New Achievement",
      desc: "Describe your achievement...",
      year: new Date().getFullYear().toString(),
    };
    update({ achievements: [...content.achievements, newAch] });
  };

  const updateAchievement = (id: string, patch: Partial<Achievement>) => {
    update({ achievements: content.achievements.map((a) => (a.id === id ? { ...a, ...patch } : a)) });
  };

  const deleteAchievement = (id: string) => {
    update({ achievements: content.achievements.filter((a) => a.id !== id) });
  };

  const updateQuote = (index: number, value: string) => {
    const newQuotes = [...content.quotes];
    newQuotes[index] = value;
    update({ quotes: newQuotes });
  };

  const addQuote = () => update({ quotes: [...content.quotes, "New quote..."] });
  const deleteQuote = (index: number) => update({ quotes: content.quotes.filter((_, i) => i !== index) });

  const tabs = [
    { key: "hero" as const, label: "Hero & About", icon: Home },
    { key: "blog" as const, label: "Blog Posts", icon: FileText },
    { key: "achievements" as const, label: "Achievements", icon: Award },
    { key: "quotes" as const, label: "Quotes", icon: Quote },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Settings className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-display font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-[10px] text-muted-foreground">Manage your site content</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted transition-colors">
              View Site
            </Link>
            <Button size="sm" onClick={handleSave} disabled={saved} className="rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5">
              <Save className="w-3.5 h-3.5" /> {saved ? "Saved" : "Save Changes"}
            </Button>
            <Button size="sm" variant="outline" onClick={handleLogout} className="rounded-lg gap-1.5">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === key
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground border border-border hover:text-foreground hover:border-primary/30"
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {/* Hero & About */}
        {activeTab === "hero" && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display font-semibold text-foreground mb-5 flex items-center gap-2">
                <Home className="w-5 h-5 text-primary" /> Hero Section
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Heading</label>
                  <input
                    value={content.heroHeading}
                    onChange={(e) => update({ heroHeading: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Subtitle</label>
                  <textarea
                    value={content.heroSubtext}
                    onChange={(e) => update({ heroSubtext: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display font-semibold text-foreground mb-5 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-primary" /> About Intro
              </h2>
              <textarea
                value={content.aboutIntro}
                onChange={(e) => update({ aboutIntro: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
          </div>
        )}

        {/* Blog Posts */}
        {activeTab === "blog" && (
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Blog Posts ({content.blogPosts.length})
              </h2>
              <Button size="sm" onClick={addBlogPost} className="rounded-lg gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="w-3.5 h-3.5" /> Add Post
              </Button>
            </div>
            {content.blogPosts.map((post) => (
              <BlogPostEditor key={post.id} post={post} onUpdate={updateBlogPost} onDelete={deleteBlogPost} />
            ))}
          </div>
        )}

        {/* Achievements */}
        {activeTab === "achievements" && (
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" /> Achievements ({content.achievements.length})
              </h2>
              <Button size="sm" onClick={addAchievement} className="rounded-lg gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="w-3.5 h-3.5" /> Add Achievement
              </Button>
            </div>
            {content.achievements.map((ach) => (
              <div key={ach.id} className="bg-card rounded-2xl border border-border p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-3">
                    <input
                      value={ach.title}
                      onChange={(e) => updateAchievement(ach.id, { title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Achievement title"
                    />
                    <input
                      value={ach.desc}
                      onChange={(e) => updateAchievement(ach.id, { desc: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Description"
                    />
                    <input
                      value={ach.year}
                      onChange={(e) => updateAchievement(ach.id, { year: e.target.value })}
                      className="w-24 px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Year"
                    />
                  </div>
                  <button onClick={() => deleteAchievement(ach.id)} className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quotes */}
        {activeTab === "quotes" && (
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
                <Quote className="w-5 h-5 text-primary" /> Quotes ({content.quotes.length})
              </h2>
              <Button size="sm" onClick={addQuote} className="rounded-lg gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="w-3.5 h-3.5" /> Add Quote
              </Button>
            </div>
            {content.quotes.map((q, i) => (
              <div key={i} className="flex gap-3 items-start bg-card rounded-2xl border border-border p-5">
                <Quote className="w-5 h-5 text-warm flex-shrink-0 mt-2" />
                <textarea
                  value={q}
                  onChange={(e) => updateQuote(i, e.target.value)}
                  rows={2}
                  className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
                <button onClick={() => deleteQuote(i)} className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BlogPostEditor = ({
  post,
  onUpdate,
  onDelete,
}: {
  post: BlogPost;
  onUpdate: (id: string, patch: Partial<BlogPost>) => void;
  onDelete: (id: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm truncate">{post.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">{post.category}</span>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-3 border-t border-border pt-4">
          <input
            value={post.title}
            onChange={(e) => onUpdate(post.id, { title: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Title"
          />
          <div className="grid grid-cols-3 gap-3">
            <input
              value={post.category}
              onChange={(e) => onUpdate(post.id, { category: e.target.value })}
              className="px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Category"
            />
            <input
              value={post.time}
              onChange={(e) => onUpdate(post.id, { time: e.target.value })}
              className="px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Read time"
            />
            <input
              value={post.date}
              onChange={(e) => onUpdate(post.id, { date: e.target.value })}
              className="px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Date"
            />
          </div>
          <textarea
            value={post.excerpt}
            onChange={(e) => onUpdate(post.id, { excerpt: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            placeholder="Excerpt"
          />
          <div className="flex justify-end">
            <button onClick={() => onDelete(post.id)} className="flex items-center gap-1.5 text-sm text-destructive hover:bg-destructive/10 px-3 py-1.5 rounded-lg transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> Delete Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
