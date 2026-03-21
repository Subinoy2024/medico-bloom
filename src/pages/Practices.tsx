import Layout from "@/components/Layout";
import { Sun, PenTool, Target, Calendar, Flame, Coffee, CheckCircle, Clock, BookOpen, Heart } from "lucide-react";

const routineBlocks = [
  { time: "5:30 AM", activity: "Wake up, gratitude journaling, light stretching", icon: Sun },
  { time: "6:00 AM", activity: "Review yesterday's topics — active recall session", icon: BookOpen },
  { time: "7:00 AM", activity: "Breakfast + news/podcast (health-related)", icon: Coffee },
  { time: "8:00 AM", activity: "College lectures and practical sessions", icon: Calendar },
  { time: "1:00 PM", activity: "Lunch break + short rest", icon: Heart },
  { time: "2:30 PM", activity: "Self-study block — new topics + note-making", icon: PenTool },
  { time: "5:00 PM", activity: "Exercise / walk / personal time", icon: Flame },
  { time: "6:30 PM", activity: "Evening revision session — spaced repetition", icon: Target },
  { time: "9:00 PM", activity: "Light reading + plan next day + sleep by 10:30", icon: Clock },
];

const practices = [
  {
    icon: PenTool, title: "My Note-Making Method",
    points: ["Color-coded headings and subheadings", "Concept maps for complex topics", "Summary tables at the end of each chapter", "Highlighting high-yield points for quick revision", "Using mnemonics wherever possible"]
  },
  {
    icon: Target, title: "Revision Strategy",
    points: ["Day 1: Learn and take notes", "Day 3: First revision using active recall", "Day 7: Second revision with self-testing", "Day 21: Final consolidation revision", "Before exams: Quick summary sheets only"]
  },
  {
    icon: Flame, title: "Staying Motivated",
    points: ["Setting small, achievable daily goals", "Celebrating every small win", "Maintaining a gratitude journal", "Connecting with supportive study partners", "Remembering my 'why' — the patients I'll serve"]
  },
  {
    icon: Heart, title: "Balancing Life & MBBS",
    points: ["Dedicated rest days every week", "Regular exercise and physical activity", "Staying connected with family and friends", "Pursuing hobbies outside medicine", "Prioritizing mental health and self-care"]
  },
];

const Practices = () => (
  <Layout>
    <section className="section-padding">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-sm text-primary font-medium tracking-wider uppercase mb-4 block">Routine</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">Practices & Routine</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">The habits, methods, and daily practices that keep me productive, focused, and happy.</p>
        </div>

        {/* Daily Routine */}
        <div className="mb-20">
          <h2 className="text-2xl font-display font-bold text-foreground mb-8 text-center">My Daily Routine</h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {routineBlocks.map(({ time, activity, icon: Icon }) => (
              <div key={time} className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border card-hover">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-primary font-semibold">{time}</span>
                  <p className="text-sm text-foreground">{activity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Practices */}
        <div className="grid sm:grid-cols-2 gap-6">
          {practices.map(({ icon: Icon, title, points }) => (
            <div key={title} className="card-hover bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-warm/10 flex items-center justify-center text-warm">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-foreground">{title}</h3>
              </div>
              <div className="space-y-2.5">
                {points.map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Motivational CTA */}
        <div className="mt-20 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[image:var(--warm-gradient)]" />
          <div className="relative z-10 py-14 px-8 text-center">
            <Flame className="w-9 h-9 text-warm-foreground/50 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-warm-foreground mb-3">Discipline Is Freedom</h2>
            <p className="text-warm-foreground/70 max-w-md mx-auto">The routines that feel hard today become the habits that carry you tomorrow. Keep showing up.</p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Practices;
