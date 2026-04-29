// localStorage-based content store. Default seed is empty.
const CONTENT_KEY = "ankita_site_content_v2";

export interface IconItem { id: string; iconKey: string; title: string; desc: string }
export interface BlogPost { id: string; title: string; category: string; date: string; time: string; excerpt: string; body?: string; featured?: boolean }
export interface Achievement { id: string; iconKey: string; title: string; desc: string; year: string }
export interface JourneyItem { id: string; year: string; iconKey: string; title: string; desc: string }
export interface RoutineBlock { id: string; time: string; activity: string; iconKey: string }
export interface Practice { id: string; iconKey: string; title: string; points: string[] }
export interface Subject { id: string; name: string; year: string; notes: number; difficulty: string }
export interface Mnemonic { id: string; title: string; subject: string; content: string }
export interface AboutSection { id: string; iconKey: string; title: string; content: string }

export interface SiteContent {
  hero: { badge: string; headingPrefix: string; headingName: string; subtext: string; ctaPrimary: string; ctaSecondary: string };
  aboutIntro: string;
  about: { tagline: string; subtitle: string; role: string; bio1: string; bio2: string; sections: AboutSection[] };
  myStoryPreview: { tagline: string; heading: string; paragraph1: string; paragraph2: string };
  whatIShare: IconItem[];
  blogPosts: BlogPost[];
  blogCategories: string[];
  featuredBlog: { title: string; excerpt: string };
  quotes: string[];
  achievements: Achievement[];
  personalWins: string[];
  journeyTimeline: JourneyItem[];
  journeyLessons: string[];
  studyPracticesGrid: IconItem[];
  knowledgeCorner: IconItem[];
  routineBlocks: RoutineBlock[];
  practices: Practice[];
  subjects: Subject[];
  mnemonics: Mnemonic[];
  contact: { email: string; instagram: string; twitter: string; youtube: string; linkedin: string; collabText: string; signoffQuote: string };
  footer: { tagline: string };
}

export const emptyContent: SiteContent = {
  hero: {
    badge: "Welcome to my world ✨",
    headingPrefix: "Hi, I'm",
    headingName: "Dr. Ankita Debnath",
    subtext: "A practicing doctor sharing clinical insights, research, patient stories, and reflections from a life devoted to medicine.",
    ctaPrimary: "Read My Story",
    ctaSecondary: "Explore My Blog",
  },
  aboutIntro: "I'm a doctor who believes in the power of sharing knowledge. Through this space, I document insights from clinical practice, research findings, and reflections on the art and science of medicine.",
  about: {
    tagline: "About",
    subtitle: "The person behind the words, the research, and the journey.",
    role: "Doctor • Clinician • Researcher • Writer",
    bio1: "Hi! I'm Dr. Ankita Debnath — a doctor with a deep love for learning, sharing, and growing. I believe the best way to deepen knowledge is to teach it, and that's the spirit of this space.",
    bio2: "When I'm not seeing patients or working on research, you'll find me reading, writing, or thinking about the kind of physician I aspire to be every day.",
    sections: [
      { id: "a1", iconKey: "heart", title: "Who I Am", content: "I'm a curious, driven, and compassionate doctor who finds meaning in understanding the 'why' behind every diagnosis. Medicine, for me, is not just a profession — it's a way of seeing and serving the world." },
      { id: "a2", iconKey: "sparkles", title: "Why I Started Sharing", content: "Throughout my training and practice, I saw how much clarity and warmth was missing from medical communication. I started writing to bridge that gap — to make medicine more human, accessible, and inspiring." },
      { id: "a3", iconKey: "graduation", title: "What Medicine Means to Me", content: "Medicine is the perfect blend of science and humanity. Every patient has a story, every disease has a lesson, and every day teaches me something new about resilience, empathy, and care." },
      { id: "a4", iconKey: "eye", title: "My Vision", content: "I envision a world where medicine is practiced with deep understanding, collaboration, and humanity. Through this space, I want to build a thoughtful community of clinicians, researchers, and curious minds." },
    ],
  },
  myStoryPreview: {
    tagline: "My Story",
    heading: "The Journey That Shaped Me",
    paragraph1: "From a curious child fascinated by biology to walking the wards as a doctor — my path has been full of determination, sleepless nights, and moments that tested my resolve.",
    paragraph2: "Every challenge taught me something new, and every patient reminded me why I chose this calling.",
  },
  whatIShare: [
    { id: "ws1", iconKey: "heart", title: "My Story", desc: "Personal experiences and reflections from my medical journey" },
    { id: "ws2", iconKey: "award", title: "Achievements", desc: "Milestones, recognitions, and quiet victories along the way" },
    { id: "ws3", iconKey: "stethoscope", title: "Clinical Insights", desc: "Bedside lessons, case reflections, and practical pearls" },
    { id: "ws4", iconKey: "book", title: "Research", desc: "Studies, papers, and evidence-based learning" },
    { id: "ws5", iconKey: "calendar", title: "Daily Practices", desc: "Routines and habits that keep me focused and well" },
    { id: "ws6", iconKey: "coffee", title: "Doctor Life", desc: "Real stories, challenges, and joys of clinical practice" },
    { id: "ws7", iconKey: "brain", title: "Medical Knowledge", desc: "Simplified concepts and clinical pearls" },
    { id: "ws8", iconKey: "flame", title: "Motivation", desc: "Words and mindset tips to keep you going" },
  ],
  blogPosts: [
    { id: "b1", title: "Lessons from My First Year of Practice", category: "My Story", date: "Mar 15, 2026", time: "6 min", excerpt: "What stepping into the role of a doctor really taught me — beyond textbooks." },
    { id: "b2", title: "The Day a Patient Changed How I See Medicine", category: "Reflection", date: "Mar 12, 2026", time: "4 min", excerpt: "A quiet moment in the ward that reshaped my understanding of care." },
    { id: "b3", title: "Reading Research Papers — A Clinician's Method", category: "Research", date: "Mar 10, 2026", time: "5 min", excerpt: "How I evaluate evidence and translate it into bedside decisions." },
    { id: "b4", title: "Burnout, Boundaries, and Staying Whole", category: "Doctor Life", date: "Mar 8, 2026", time: "7 min", excerpt: "Honest reflections on protecting your wellbeing as a clinician." },
    { id: "b5", title: "Communicating Diagnoses with Compassion", category: "Clinical Insights", date: "Mar 5, 2026", time: "5 min", excerpt: "The words we choose matter. Lessons from years of difficult conversations." },
    { id: "b6", title: "Why I Still Take Notes by Hand", category: "Practice", date: "Mar 3, 2026", time: "4 min", excerpt: "On slowing down, thinking clearly, and the underrated power of paper." },
  ],
  blogCategories: ["My Story", "Clinical Insights", "Research", "Doctor Life", "Reflection", "Motivation", "Practice"],
  featuredBlog: {
    title: "From the Wards to the World — My Journey as a Doctor",
    excerpt: "An honest look at the rollercoaster of medical practice — the fears, the breakthroughs, and the moments that defined me.",
  },
  quotes: [
    "Medicine is not just a career — it's a calling to serve with knowledge and compassion.",
    "Small daily progress leads to extraordinary results.",
    "Stay curious, stay humble, keep learning.",
  ],
  achievements: [
    { id: "ac1", iconKey: "graduation", title: "MBBS, Distinction", desc: "Completed medical training with distinction and clinical honors.", year: "2023" },
    { id: "ac2", iconKey: "award", title: "University Topper — Anatomy", desc: "Secured the highest marks in Anatomy during 1st year university examinations.", year: "2020" },
    { id: "ac3", iconKey: "trophy", title: "Quiz Competition Winner", desc: "Won 1st place in the inter-college medical quiz on Pathology and Pharmacology.", year: "2021" },
    { id: "ac4", iconKey: "users", title: "Mentorship Program", desc: "Mentor for junior doctors and students, guiding clinical reasoning and career growth.", year: "2025" },
    { id: "ac5", iconKey: "pen", title: "Medical Writer", desc: "Launched this space to share knowledge, research, and reflections with peers.", year: "2025" },
    { id: "ac6", iconKey: "book", title: "Published Research", desc: "Co-authored peer-reviewed research papers in clinical medicine.", year: "2025" },
    { id: "ac7", iconKey: "star", title: "Conference Presentation", desc: "Presented case studies at regional and national medical conferences.", year: "2024" },
    { id: "ac8", iconKey: "heart", title: "Community Service", desc: "Led health-awareness camps for underserved communities.", year: "2024" },
  ],
  personalWins: [
    "Maintained a consistent learning routine throughout residency",
    "Overcame the fear of difficult conversations with patients and families",
    "Built a supportive circle of colleagues that became lifelong friends",
    "Learned to balance clinical work with mental wellness",
    "Started journaling daily — it changed my perspective",
    "Helped 50+ juniors with personalized career guidance",
  ],
  journeyTimeline: [
    { id: "j1", year: "Early Years", iconKey: "sparkles", title: "Early Inspiration", desc: "Growing up, I was always fascinated by biology and the human body. A childhood hospital visit sparked my dream of becoming a doctor — I knew this was my calling." },
    { id: "j2", year: "Pre-Med", iconKey: "book", title: "The Preparation Years", desc: "Two intense years of NEET preparation taught me discipline, sacrifice, and the power of consistency." },
    { id: "j3", year: "NEET", iconKey: "star", title: "Qualifying NEET", desc: "The day I saw my result was surreal. All the hard work had paid off — it was a ticket to my dream." },
    { id: "j4", year: "Medical School", iconKey: "graduation", title: "Becoming a Doctor", desc: "Walking into medical college, the white coat ceremony, the long nights of study and clinical rotations — it shaped who I am today." },
    { id: "j5", year: "Practice", iconKey: "stethoscope", title: "Stepping Into Practice", desc: "Caring for patients on my own brought a new kind of responsibility — and a new kind of joy. Every day in the clinic teaches me something." },
    { id: "j6", year: "Now", iconKey: "lightbulb", title: "What I'm Still Learning", desc: "Medicine is as much about patience and compassion as it is about knowledge. I'm learning to be kinder to myself, to celebrate small wins, and to keep showing up." },
  ],
  journeyLessons: [
    "Consistency beats intensity — small daily efforts compound into extraordinary results.",
    "It's okay to struggle — what matters is that you don't give up.",
    "Sharing knowledge doesn't diminish it — it multiplies it.",
    "Your journey is unique — never compare your Chapter 1 with someone else's Chapter 20.",
  ],
  studyPracticesGrid: [
    { id: "sp1", iconKey: "sun", title: "Morning Routine", desc: "Early starts, journaling, and focused deep-work blocks" },
    { id: "sp2", iconKey: "pen", title: "Note-Making", desc: "Handwritten summaries and concept maps for clinical learning" },
    { id: "sp3", iconKey: "target", title: "Active Recall", desc: "Spaced repetition and self-testing for retention" },
    { id: "sp4", iconKey: "calendar", title: "Weekly Planning", desc: "Structured weeks with flexibility for life and rest" },
    { id: "sp5", iconKey: "flame", title: "Staying Motivated", desc: "Self-talk, goals, and celebrating small wins" },
    { id: "sp6", iconKey: "coffee", title: "Life Balance", desc: "Rest, hobbies, and mental health practices" },
  ],
  knowledgeCorner: [
    { id: "k1", iconKey: "download", title: "Downloadable Resources", desc: "PDF guides on clinical topics" },
    { id: "k2", iconKey: "brain", title: "Mnemonics Bank", desc: "Memory aids that actually work" },
    { id: "k3", iconKey: "lightbulb", title: "Quick Concepts", desc: "One-page concept summaries" },
    { id: "k4", iconKey: "book", title: "Revision Sheets", desc: "High-yield tables and diagrams" },
  ],
  routineBlocks: [
    { id: "r1", time: "5:30 AM", activity: "Wake up, gratitude journaling, light stretching", iconKey: "sun" },
    { id: "r2", time: "6:00 AM", activity: "Reading — research papers or a chapter", iconKey: "book" },
    { id: "r3", time: "7:00 AM", activity: "Breakfast + medical podcast or news", iconKey: "coffee" },
    { id: "r4", time: "8:30 AM", activity: "Clinic / hospital rounds and patient care", iconKey: "stethoscope" },
    { id: "r5", time: "1:00 PM", activity: "Lunch break + short rest", iconKey: "heart" },
    { id: "r6", time: "2:30 PM", activity: "Continued clinical work and case discussions", iconKey: "users" },
    { id: "r7", time: "5:00 PM", activity: "Exercise / walk / personal time", iconKey: "flame" },
    { id: "r8", time: "6:30 PM", activity: "Writing, research, or note-making", iconKey: "pen" },
    { id: "r9", time: "9:30 PM", activity: "Light reading + plan next day + sleep by 10:30", iconKey: "clock" },
  ],
  practices: [
    { id: "p1", iconKey: "pen", title: "My Note-Making Method", points: ["Color-coded headings and subheadings", "Concept maps for complex topics", "Summary tables at the end of each chapter", "Highlighting high-yield clinical points", "Mnemonics wherever helpful"] },
    { id: "p2", iconKey: "target", title: "Learning Strategy", points: ["Day 1: Read and take notes", "Day 3: First active-recall pass", "Day 7: Self-testing pass", "Day 21: Final consolidation", "Before exams or talks: summary sheets only"] },
    { id: "p3", iconKey: "flame", title: "Staying Motivated", points: ["Setting small, achievable daily goals", "Celebrating every small win", "Maintaining a gratitude journal", "Connecting with supportive colleagues", "Remembering my 'why' — the patients I serve"] },
    { id: "p4", iconKey: "heart", title: "Balancing Life & Medicine", points: ["Dedicated rest days every week", "Regular exercise and movement", "Staying connected with family and friends", "Pursuing hobbies outside medicine", "Prioritizing mental health and self-care"] },
  ],
  subjects: [
    { id: "s1", name: "Clinical Medicine", year: "Core", notes: 35, difficulty: "High" },
    { id: "s2", name: "Cardiology", year: "Specialty", notes: 28, difficulty: "High" },
    { id: "s3", name: "Pulmonology", year: "Specialty", notes: 22, difficulty: "Moderate" },
    { id: "s4", name: "Endocrinology", year: "Specialty", notes: 20, difficulty: "Moderate" },
    { id: "s5", name: "Pathology", year: "Foundation", notes: 30, difficulty: "High" },
    { id: "s6", name: "Pharmacology", year: "Foundation", notes: 28, difficulty: "High" },
    { id: "s7", name: "Microbiology", year: "Foundation", notes: 22, difficulty: "Moderate" },
    { id: "s8", name: "Pediatrics", year: "Core", notes: 18, difficulty: "Moderate" },
    { id: "s9", name: "Surgery", year: "Core", notes: 25, difficulty: "Moderate" },
  ],
  mnemonics: [
    { id: "m1", title: "Cranial Nerves", subject: "Anatomy", content: "Oh Oh Oh To Touch And Feel Very Good Velvet AH!" },
    { id: "m2", title: "Brachial Plexus Roots", subject: "Anatomy", content: "Robert Taylor Drinks Cold Beer" },
    { id: "m3", title: "Layers of the Scalp", subject: "Anatomy", content: "Skin, Connective tissue, Aponeurosis, Loose tissue, Periosteum" },
  ],
  contact: {
    email: "ankita@example.com",
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    youtube: "https://youtube.com/",
    linkedin: "https://linkedin.com/",
    collabText: "I'm always open to guest posts, collaborations, and connecting with fellow clinicians, researchers, and writers.",
    signoffQuote: "Whether you have a question, want to share your story, or just need someone to talk to about medicine — I'm here. Don't hesitate to reach out. 💛",
  },
  footer: { tagline: "Sharing my journey as a doctor — clinical insights, research, and reflections." },
};

export const getContent = (): SiteContent => {
  try {
    const stored = localStorage.getItem(CONTENT_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Deep-merge with empty defaults so missing fields don't break pages
      return { ...emptyContent, ...parsed,
        hero: { ...emptyContent.hero, ...(parsed.hero || {}) },
        about: { ...emptyContent.about, ...(parsed.about || {}), sections: parsed.about?.sections || [] },
        myStoryPreview: { ...emptyContent.myStoryPreview, ...(parsed.myStoryPreview || {}) },
        featuredBlog: { ...emptyContent.featuredBlog, ...(parsed.featuredBlog || {}) },
        contact: { ...emptyContent.contact, ...(parsed.contact || {}) },
        footer: { ...emptyContent.footer, ...(parsed.footer || {}) },
      };
    }
  } catch {}
  return emptyContent;
};

export const saveContent = (content: SiteContent) => {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
};

export const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
