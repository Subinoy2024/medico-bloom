import Layout from "@/components/Layout";
import { Target, Award, BookOpen, Clock, TrendingUp, CheckCircle, Brain, Lightbulb, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const strategies = [
  { icon: Target, title: "NEET PG Strategy", desc: "Subject-wise weightage, high-yield topics, and proven study plans from toppers.", progress: 65 },
  { icon: Award, title: "University Exams", desc: "Previous year questions, important topics, and exam-day tips for theory & practicals.", progress: 45 },
  { icon: Brain, title: "Viva Preparation", desc: "Common viva questions by subject, answering frameworks, and confidence-building tips.", progress: 30 },
  { icon: Clock, title: "Last-Minute Revision", desc: "Quick-fire summaries, must-know facts, and one-page revision sheets.", progress: 80 },
];

const topperTips = [
  "Start with high-yield subjects first — Pharmacology, Pathology, and Medicine cover ~40% of NEET PG.",
  "Use active recall and spaced repetition instead of passive reading.",
  "Solve at least 100 MCQs daily during the last 3 months of preparation.",
  "Make personal summary sheets for quick revision — don't rely solely on textbooks.",
];

const ExamPrep = () => (
  <Layout>
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">Exam Preparation</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Smart strategies, revision tools, and MCQ practice to help you score your best.</p>
        </div>

        {/* Countdown Banner */}
        <div className="rounded-3xl overflow-hidden relative mb-16">
          <div className="absolute inset-0 bg-[image:var(--hero-gradient)]" />
          <div className="relative z-10 py-12 px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-2">Stay Focused. Stay Consistent.</h2>
            <p className="text-primary-foreground/70 mb-6">Your exam preparation journey starts with the right strategy.</p>
            <div className="flex justify-center gap-6">
              {[
                { value: "240+", label: "Study Notes" },
                { value: "500+", label: "MCQs" },
                { value: "50+", label: "Clinical Cases" },
                { value: "10+", label: "Subjects" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">{value}</div>
                  <div className="text-xs text-primary-foreground/60">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategy Cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {strategies.map(({ icon: Icon, title, desc, progress }) => (
            <div key={title} className="card-hover bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">{title}</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{desc}</p>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{progress}% content ready</p>
            </div>
          ))}
        </div>

        {/* MCQ Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-foreground mb-3">MCQ Practice Highlights</h2>
          <p className="text-muted-foreground">Test your knowledge with subject-wise MCQ sets.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {["Pharmacology MCQs", "Pathology MCQs", "Medicine MCQs"].map((title) => (
            <div key={title} className="card-hover bg-card rounded-2xl p-6 border border-border text-center">
              <CheckCircle className="w-10 h-10 text-accent mx-auto mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground mb-4">50+ curated questions with explanations</p>
              <Button variant="outline" size="sm" className="rounded-lg">Practice Now</Button>
            </div>
          ))}
        </div>

        {/* Topper Strategies */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-foreground mb-3">Topper Strategies 🏆</h2>
          </div>
          <div className="space-y-4">
            {topperTips.map((tip, i) => (
              <div key={i} className="flex gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10">
                <Star className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default ExamPrep;
