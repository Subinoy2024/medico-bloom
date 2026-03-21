import Layout from "@/components/Layout";
import { Sparkles, Heart, Star, BookOpen, GraduationCap, Lightbulb } from "lucide-react";

const timeline = [
  { year: "Early Years", icon: Sparkles, title: "Early Inspiration", desc: "Growing up, I was always fascinated by biology and the human body. A visit to the hospital with my grandmother sparked my dream of becoming a doctor — I knew this was my calling.", color: "primary" },
  { year: "Class 11-12", icon: BookOpen, title: "The Preparation Years", desc: "Two intense years of NEET preparation taught me discipline, sacrifice, and the power of consistency. Late nights, countless mock tests, and unwavering determination defined this phase.", color: "accent" },
  { year: "NEET", icon: Star, title: "Qualifying NEET", desc: "The day I saw my NEET result was surreal. All the hard work had paid off. It wasn't just a score — it was a ticket to my dream. That moment changed everything.", color: "warm" },
  { year: "1st Year", icon: GraduationCap, title: "Entering Medical Life", desc: "Walking into the medical college for the first time was overwhelming and magical. The anatomy hall, the white coat ceremony, the new friendships — it was the beginning of something extraordinary.", color: "primary" },
  { year: "Ongoing", icon: Heart, title: "Challenges & Growth", desc: "Medical school hasn't been easy. From struggling with vast syllabi to managing mental health, I've faced my share of challenges. But each one has made me stronger, more empathetic, and more resilient.", color: "accent" },
  { year: "Now", icon: Lightbulb, title: "What I'm Still Learning", desc: "I'm learning that medicine is as much about patience and compassion as it is about knowledge. I'm learning to be kinder to myself, to celebrate small wins, and to keep showing up every single day.", color: "warm" },
];

const lessons = [
  "Consistency beats intensity — small daily efforts compound into extraordinary results.",
  "It's okay to struggle — what matters is that you don't give up.",
  "Sharing knowledge doesn't diminish it — it multiplies it.",
  "Your journey is unique — never compare your Chapter 1 with someone else's Chapter 20.",
];

const Journey = () => (
  <Layout>
    <section className="section-padding">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">My Story</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">My Journey</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">From a dreaming school kid to an MBBS student — this is the story of how I got here.</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
          <div className="space-y-12">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;
              return (
                <div key={item.title} className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`hidden md:block md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-xs text-primary font-semibold tracking-wider uppercase">{item.year}</span>
                    <h3 className="text-lg font-display font-bold text-foreground mt-1 mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5 text-primary" />
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

        {/* Life Lessons */}
        <div className="mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-foreground mb-3">Life Lessons I've Learned</h2>
          </div>
          <div className="space-y-4">
            {lessons.map((lesson, i) => (
              <div key={i} className="flex gap-4 p-5 bg-card rounded-2xl border border-border card-hover">
                <Star className="w-5 h-5 text-warm flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">{lesson}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Journey;
