import Layout from "@/components/Layout";
import { Stethoscope, ArrowRight, AlertCircle, CheckCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const cases = [
  { title: "Acute Appendicitis in a 22-Year-Old Male", specialty: "Surgery", difficulty: "Moderate", summary: "A young male presents with acute RIF pain, nausea, and low-grade fever. Classic migratory pain pattern." },
  { title: "Diabetic Ketoacidosis Emergency", specialty: "Medicine", difficulty: "High", summary: "Type 1 diabetic presents with altered sensorium, Kussmaul breathing, and fruity odor of breath." },
  { title: "Neonatal Jaundice — When to Worry", specialty: "Pediatrics", difficulty: "Moderate", summary: "A 3-day-old neonate presents with progressive jaundice. Evaluate physiological vs pathological causes." },
  { title: "Ectopic Pregnancy Presentation", specialty: "OBGYN", difficulty: "High", summary: "A woman of reproductive age presents with acute abdominal pain, amenorrhea, and vaginal bleeding." },
  { title: "Tension Pneumothorax in Trauma", specialty: "Emergency", difficulty: "High", summary: "Post-trauma patient with severe dyspnea, tracheal deviation, and absent breath sounds on one side." },
  { title: "Iron Deficiency Anemia Workup", specialty: "Medicine", difficulty: "Moderate", summary: "A young woman presents with fatigue, pallor, and koilonychia. Systematic approach to microcytic anemia." },
];

const clinicalPearls = [
  "Murphy's sign is specific for cholecystitis — pain on deep palpation of the RUQ during inspiration.",
  "In DKA, always check potassium before starting insulin — hypokalemia can be fatal.",
  "Rovsing's sign: Pain in RIF on palpation of LIF — suggests appendicitis.",
  "Kernig's sign positive = meningeal irritation — think meningitis.",
];

const ClinicalCases = () => (
  <Layout>
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">Clinical Cases</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Practice clinical reasoning with real-world inspired case discussions.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {cases.map((c) => (
            <div key={c.title} className="card-hover bg-card rounded-2xl p-6 border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[3rem]" />
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">{c.specialty}</span>
                <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs">{c.difficulty}</span>
              </div>
              <Stethoscope className="w-8 h-8 text-primary/30 mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{c.summary}</p>
              <Button variant="default" size="sm" className="rounded-lg">
                Read Case <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          ))}
        </div>

        {/* Clinical Pearls */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-foreground mb-3">Clinical Pearls 💎</h2>
            <p className="text-muted-foreground">High-yield clinical facts you must know for exams and ward rounds.</p>
          </div>
          <div className="space-y-4">
            {clinicalPearls.map((pearl, i) => (
              <div key={i} className="flex gap-4 p-5 bg-accent/5 rounded-2xl border border-accent/20">
                <Lightbulb className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">{pearl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default ClinicalCases;
