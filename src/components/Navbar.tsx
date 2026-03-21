import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "My Journey", path: "/journey" },
  { name: "Achievements", path: "/achievements" },
  { name: "Blog", path: "/blog" },
  { name: "Notes", path: "/notes" },
  { name: "Practices", path: "/practices" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-sm py-2" : "bg-transparent py-4"}`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <Heart className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-display font-bold text-foreground leading-tight">Ankita Debnath</span>
            <span className="text-[10px] text-muted-foreground tracking-wider uppercase hidden sm:block">MBBS Journey & Learning</span>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}>{link.name}</Link>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-2">
          <button onClick={() => setDark(!dark)} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            {dark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>
          <Button size="sm" asChild className="rounded-full"><Link to="/blog">Read My Blog</Link></Button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden p-2 rounded-lg text-foreground">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="xl:hidden glass border-t border-border mt-2 animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}>{link.name}</Link>
            ))}
            <div className="flex items-center gap-3 mt-3 px-4">
              <button onClick={() => setDark(!dark)} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted">
                {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Button size="sm" asChild className="flex-1 rounded-full"><Link to="/blog">Read My Blog</Link></Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
