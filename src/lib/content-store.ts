// Simple localStorage-based content store
const CONTENT_KEY = "ankita_site_content";

export interface SiteContent {
  heroHeading: string;
  heroSubtext: string;
  aboutIntro: string;
  blogPosts: BlogPost[];
  achievements: Achievement[];
  quotes: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  time: string;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  year: string;
}

export const defaultContent: SiteContent = {
  heroHeading: "Hi, I'm Ankita Debnath",
  heroSubtext: "An MBBS student sharing my journey, achievements, medical learning, study practices, and life experiences to inspire and support others.",
  aboutIntro: "I'm a medical student who believes in the power of sharing knowledge. Through this blog, I document my MBBS journey — the lessons, the struggles, the small victories, and everything in between.",
  blogPosts: [
    { id: "1", title: "How I Prepare for University Exams — My Complete Method", category: "Study Tips", time: "6 min", date: "Mar 15, 2026", excerpt: "A step-by-step breakdown of my exam preparation strategy that helped me stay consistent." },
    { id: "2", title: "The Day I Realized Why I Chose Medicine", category: "My Story", time: "4 min", date: "Mar 12, 2026", excerpt: "A personal reflection on a moment in the hospital that changed everything for me." },
    { id: "3", title: "Top 10 Anatomy Mnemonics That Actually Work", category: "Medical Learning", time: "5 min", date: "Mar 10, 2026", excerpt: "Battle-tested memory aids for cranial nerves, brachial plexus, and more." },
  ],
  achievements: [
    { id: "1", title: "Academic Excellence", desc: "Consistent top performer in university exams", year: "2024" },
    { id: "2", title: "NEET Qualified", desc: "Cleared NEET with a strong score and rank", year: "2023" },
    { id: "3", title: "Peer Mentor", desc: "Helped juniors with study guidance and notes", year: "2025" },
    { id: "4", title: "Content Creator", desc: "Building a knowledge-sharing platform for students", year: "2025" },
  ],
  quotes: [
    "Medicine is not just a career — it's a calling to serve with knowledge and compassion.",
    "Small daily progress leads to extraordinary results.",
    "Stay curious, stay humble, keep learning.",
  ],
};

export const getContent = (): SiteContent => {
  try {
    const stored = localStorage.getItem(CONTENT_KEY);
    if (stored) return { ...defaultContent, ...JSON.parse(stored) };
  } catch {}
  return defaultContent;
};

export const saveContent = (content: SiteContent) => {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
};
