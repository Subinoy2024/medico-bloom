import Layout from "@/components/Layout";
import heroImg from "@/assets/ankita-hero.jpg";
import { Heart, Target, BookOpen, Eye, Sparkles, GraduationCap } from "lucide-react";

const About = () => (
  <Layout>
    <section className="section-padding">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">About</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">About Ankita</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">The person behind the words, the notes, and the journey.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-3xl border border-border p-8 md:p-12 mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <img src={heroImg} alt="Ankita Debnath" className="w-40 h-40 rounded-2xl object-cover shadow-lg flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-1">Ankita Debnath</h2>
              <p className="text-sm text-primary font-medium mb-4">MBBS Student • Aspiring Doctor • Content Creator</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Hi! I'm Ankita — a medical student with a deep love for learning, sharing, and growing. I believe that the best way to learn something is to teach it, and that's exactly what this blog is about.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not studying Pathology or making colorful notes, you'll find me reading, journaling, or dreaming about the kind of doctor I want to become. This space is my way of documenting it all — honestly and openly.
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {[
            { icon: Heart, title: "Who I Am", content: "I'm a curious, driven, and slightly perfectionistic medical student who finds joy in understanding the 'why' behind everything. I value discipline, kindness, and continuous self-improvement. Medicine, for me, is not just a profession — it's a way of seeing and serving the world." },
            { icon: Sparkles, title: "Why I Started Sharing", content: "During my early MBBS years, I realized how many students struggle to find simplified, well-organized study resources. I started making notes for myself, shared them with a few friends, and the feedback was overwhelming. That's when I decided to create this platform — to make quality medical learning accessible, personal, and inspiring." },
            { icon: GraduationCap, title: "What Medicine Means to Me", content: "Medicine is the perfect blend of science and humanity. Every patient has a story, every disease has a lesson, and every day in medical school teaches me something new about myself. I chose this path because I want to make a real difference — one patient, one student, one note at a time." },
            { icon: Eye, title: "My Vision", content: "I envision a world where medical education is not just about rote learning and competition, but about genuine understanding, collaboration, and personal growth. Through this blog, I want to build a warm, supportive community of medical students who uplift each other." },
          ].map(({ icon: Icon, title, content }) => (
            <div key={title} className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
