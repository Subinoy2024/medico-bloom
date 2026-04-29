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
  hero: { badge: "", headingPrefix: "Hi, I'm", headingName: "Ankita Debnath", subtext: "", ctaPrimary: "Read My Story", ctaSecondary: "Explore My Blog" },
  aboutIntro: "",
  about: { tagline: "About", subtitle: "The person behind the words, the notes, and the journey.", role: "MBBS Student • Aspiring Doctor • Content Creator", bio1: "", bio2: "", sections: [] },
  myStoryPreview: { tagline: "My Story", heading: "The Journey That Shaped Me", paragraph1: "", paragraph2: "" },
  whatIShare: [],
  blogPosts: [],
  blogCategories: [],
  featuredBlog: { title: "", excerpt: "" },
  quotes: [],
  achievements: [],
  personalWins: [],
  journeyTimeline: [],
  journeyLessons: [],
  studyPracticesGrid: [],
  knowledgeCorner: [],
  routineBlocks: [],
  practices: [],
  subjects: [],
  mnemonics: [],
  contact: { email: "", instagram: "", twitter: "", youtube: "", linkedin: "", collabText: "", signoffQuote: "" },
  footer: { tagline: "Sharing my MBBS journey, one story at a time." },
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
