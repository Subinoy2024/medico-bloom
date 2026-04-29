## Goal

Remove all hardcoded mock content from the site and route every page through a single editable content store, then expand the Admin Dashboard so the owner can edit every section from one place. Default content seed = empty (or minimal placeholders), so the live site only shows what the admin enters.

## Approach

Keep the existing localStorage-based content store (`src/lib/content-store.ts`) and admin auth (already built). No backend changes — the user said they will wire up the backend separately using the docs already generated.

### 1. Expand `content-store.ts` with all editable data

New `SiteContent` shape (replaces current minimal one):

```text
- hero: { badge, headingPrefix, headingName, subtext, ctaPrimary, ctaSecondary }
- aboutIntro (home preview)
- about: { tagline, subtitle, bio1, bio2, sections[] (icon key, title, content) }
- myStoryPreview: { tagline, heading, paragraph1, paragraph2 }
- whatIShare[]: { iconKey, title, desc }
- blogPosts[]: { id, title, category, date, time, excerpt, body, featured }
- blogCategories[]
- featuredBlog: { title, excerpt }
- testimonials[]: { id, name, year, text }
- quotes[]
- achievements[]: { id, iconKey, title, desc, year }
- personalWins[]
- journeyTimeline[]: { id, year, iconKey, title, desc }
- journeyLessons[]
- studyPractices[]: { id, iconKey, title, desc } (homepage grid)
- knowledgeCorner[]: { id, iconKey, title, desc }
- routineBlocks[]: { id, time, activity, iconKey }
- practices[]: { id, iconKey, title, points[] }
- subjects[]: { id, name, year, notes, difficulty }
- mnemonics[]: { id, title, content, subject }
- contact: { email, instagram, twitter, youtube, linkedin, collabText, signoffQuote }
- footer: { tagline }
```

Default seed = empty arrays + empty strings (so the site is truly clean). An "Empty state" placeholder shows on each section when nothing is entered yet (e.g. "No blog posts yet — add one in the admin dashboard").

A small `iconMap.ts` maps string keys ("heart", "award", "book", …) to lucide-react icon components so the admin can pick an icon from a dropdown without storing JSX.

### 2. Refactor every page to consume the store

Pages updated to read from `getContent()`:
- `Index.tsx` — hero, about intro, my-story preview, achievements preview (first 4), what I share, featured blog posts (first 3), study practices, knowledge corner
- `About.tsx` — profile + sections
- `Journey.tsx` — timeline + lessons
- `Achievements.tsx` — achievements grid + personal wins
- `Blog.tsx` — articles + categories + featured
- `StudyNotes.tsx` — subjects + mnemonics
- `Practices.tsx` — routine + practices
- `Contact.tsx` — email + socials + collab text
- `Footer.tsx` — tagline (keep dccloud credit static)

Each section gets a small `EmptyState` fallback when its array is empty.

### 3. Expand `AdminDashboard.tsx` with all sections

New left-side tab navigation (vertical sidebar on desktop, horizontal scroll on mobile):

```text
Home / Hero
About Page
My Journey
Achievements
Blog
Study Notes
Practices & Routine
Contact
Quotes
```

Each tab is a self-contained editor panel:
- Text fields → `<input>` / `<textarea>`
- Lists → repeating cards with Add / Delete / collapse
- Icon picker → `<select>` of icon keys with a tiny preview
- Reorder via simple ▲ ▼ buttons (no drag lib)
- Single global "Save Changes" button writes the whole content blob to localStorage; toast on success
- Unsaved-changes indicator in the header

### 4. Files to change

```text
src/lib/content-store.ts             rewrite: full schema + empty defaults
src/lib/icon-map.ts                  new: icon key → component
src/components/EmptyState.tsx        new: tiny reusable empty placeholder
src/pages/Index.tsx                  rewrite: data from store
src/pages/About.tsx                  rewrite: data from store
src/pages/Journey.tsx                rewrite: data from store
src/pages/Achievements.tsx           rewrite: data from store
src/pages/Blog.tsx                   rewrite: data from store
src/pages/StudyNotes.tsx             rewrite: data from store
src/pages/Practices.tsx              rewrite: data from store
src/pages/Contact.tsx                rewrite: data from store
src/components/Footer.tsx            small edit: tagline from store
src/pages/AdminDashboard.tsx         rewrite: all editor panels
```

No new routes, no backend, no schema migration. Admin auth (`/admin` → `/admin/dashboard`) and password (`ankita2026`) stay as-is.

### Notes / decisions

- Existing photo (`ankita-photo.jpg`) stays as the default hero/about image. Image upload is out of scope (no backend yet) — admin can swap later when backend is wired.
- All icons throughout the site come from a fixed lucide-react set so the admin can pick from a controlled list.
- The dccloud footer credit remains hardcoded (not user-editable).
