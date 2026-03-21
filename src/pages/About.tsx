import Layout from "@/components/Layout";
import { Heart, Target, BookOpen, Award, Users, Sparkles } from "lucide-react";

const About = () => (
  <Layout>
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">About Medico Journey</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">The story behind your favorite MBBS learning companion.</p>
        </div>

        {/* Profile */}
        <div className="bg-card rounded-3xl border border-border p-8 md:p-12 mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground flex-shrink-0">
              <span className="text-4xl font-display font-bold">MJ</span>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">Hey, I'm a fellow MBBS student! 👋</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I started Medico Journey during my 2nd year of MBBS because I struggled to find simplified, exam-oriented notes that actually made sense. Most resources were either too complex or too superficial.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                So I began creating my own notes, mnemonics, and case discussions — and shared them with classmates who found them incredibly helpful. That's how Medico Journey was born.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, this platform serves thousands of medical students with free, high-quality study material. My mission is simple: <span className="text-primary font-medium">make MBBS learning less stressful and more effective.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Target, title: "Mission", desc: "To democratize medical education by creating free, simplified, and exam-focused resources for every MBBS student." },
            { icon: Heart, title: "Why This Exists", desc: "Because every medical student deserves access to quality study material without spending a fortune on coaching classes." },
            { icon: BookOpen, title: "What We Offer", desc: "Comprehensive notes, clinical case discussions, exam strategies, mnemonics, and a supportive community for medical students." },
            { icon: Award, title: "Achievements", desc: "Helped 5000+ students, 200+ study notes published, featured in student communities, and growing every day." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-hover bg-card rounded-2xl p-6 border border-border">
              <Icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
          <div className="relative z-10 py-12 px-8 text-center">
            <Sparkles className="w-10 h-10 text-primary-foreground/60 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-3">Join the Journey</h2>
            <p className="text-primary-foreground/70 max-w-md mx-auto">Want to contribute, collaborate, or just say hi? I'd love to connect with fellow medical students!</p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
