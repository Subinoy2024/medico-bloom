import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Instagram, Twitter, Youtube, Linkedin, Mail, ArrowUp } from "lucide-react";
import { getContent, SiteContent } from "@/lib/content-store";

const Footer = () => {
  const [c, setC] = useState<SiteContent>(getContent());
  useEffect(() => { setC(getContent()); }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socials = [
    { Icon: Instagram, url: c.contact.instagram },
    { Icon: Twitter, url: c.contact.twitter },
    { Icon: Youtube, url: c.contact.youtube },
    { Icon: Linkedin, url: c.contact.linkedin },
  ].filter((s) => s.url);

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
              </div>
              <span className="text-lg font-display font-bold text-foreground">Ankita Debnath</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">{c.footer.tagline}</p>
            {socials.length > 0 && (
              <div className="flex gap-2.5">
                {socials.map(({ Icon, url }, i) => (
                  <a key={i} href={url} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm">Pages</h4>
            <div className="flex flex-col gap-2.5">
              {[{ n: "About Ankita", p: "/about" }, { n: "My Journey", p: "/journey" }, { n: "Achievements", p: "/achievements" }, { n: "Blog", p: "/blog" }, { n: "Research", p: "/research" }, { n: "Practices", p: "/practices" }].map(({ n, p }) => (
                <Link key={n} to={p} className="text-sm text-muted-foreground hover:text-accent transition-colors">{n}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm">Blog Topics</h4>
            <div className="flex flex-col gap-2.5">
              {c.blogCategories.length > 0 ? c.blogCategories.map((s) => (
                <Link key={s} to="/blog" className="text-sm text-muted-foreground hover:text-accent transition-colors">{s}</Link>
              )) : <span className="text-sm text-muted-foreground italic">No topics yet</span>}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm">Get in Touch</h4>
            {c.contact.email && (
              <a href={`mailto:${c.contact.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-3 break-all">
                <Mail className="w-4 h-4 flex-shrink-0" /> {c.contact.email}
              </a>
            )}
            <p className="text-sm text-muted-foreground leading-relaxed">Feel free to connect or just say hello!</p>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 Ankita Debnath. Made by <a href="https://dccloud.in.net" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">dccloud.in.net</a> ❤️</p>
          <button onClick={scrollToTop} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity shadow-md">
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
