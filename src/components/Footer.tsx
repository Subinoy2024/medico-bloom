import { Link } from "react-router-dom";
import { Stethoscope, Instagram, Twitter, Youtube, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-foreground">
                Medico <span className="text-primary">Journey</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Notes, clinical learning, exam prep, and real MBBS student life. Your smart learning companion.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Blog", "Notes", "Clinical Cases", "Exam Prep", "About", "Contact"].map((name) => (
                <Link key={name} to={`/${name.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Subjects</h4>
            <div className="flex flex-col gap-2">
              {["Anatomy", "Physiology", "Pathology", "Pharmacology", "Medicine", "Surgery"].map((s) => (
                <Link key={s} to="/notes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {s}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
            <a href="mailto:hello@medicojourney.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" /> hello@medicojourney.com
            </a>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Got study questions or want to collaborate? Feel free to reach out!
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 Medico Journey. Made with ❤️ for medical students.</p>
          <button onClick={scrollToTop} className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity">
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
