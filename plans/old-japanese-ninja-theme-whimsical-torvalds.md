# Tech Kurukshetra 2026 — "Shadow Protocol"
## Information Architecture, UX Flow & Wireframe Planning

---

## Context

Tech Kurukshetra is a flagship national-level technology festival. The 2026 edition uses the theme "Shadow Protocol" — ninjas, stealth, precision, and futuristic technology. The website must feel like users are entering a classified mission briefing rather than a conventional event site. This document covers full IA, UX flow, layout wireframes, responsive behavior, and developer notes for animation/3D integration before any high-fidelity implementation begins.

**Stack available:** React + Tailwind CSS v4, shadcn/ui, motion (Framer Motion API), react-router v7, lucide-react, @mui/material

---

## 1. Information Architecture

### 1.1 Sitemap

```
Root (/)
├── [Cinematic Intro Overlay] ← plays once per session, gates entry
│
├── #hero          — Branding, theme, date, venue, CTAs
├── #about         — Overview, vision, theme story, stats
├── #schedule      — Day-wise timeline, session cards
├── #events        — Event grid with expandable cards
├── #sponsors      — Tiered sponsor showcase
├── #venue         — Campus map, address, visitor info
└── #footer        — Quick links, contact, social, copyright
```

**Single-page application with smooth scroll anchors.**  
No hard page navigations except external links (registration, social).  
React Router is available but the experience should be anchor-scroll, not route-based, to preserve scroll continuity.

### 1.2 Content Hierarchy (Priority Order)

```
P0 — Hero + CTA (register now / learn more)
P1 — Events (the core product)
P2 — About + Theme narrative (context/trust builder)
P3 — Schedule (logistical clarity)
P4 — Sponsors (credibility)
P5 — Venue (logistical need)
P6 — Footer (exit / reference)
```

### 1.3 Navigation Item Order (matches scroll priority)

```
Logo | Home  About  Schedule  Events  Sponsors  Team  FAQ  Venue | [Register →]
```

- "Team" and "FAQ" are in nav but may be modal/drawer overlays rather than full sections (defer to implementation decision)
- "Register →" is a persistent CTA button with distinct red styling
- Logo click = smooth scroll to #hero

---

## 2. User Flow

### 2.1 Primary Journey (New Visitor → Registration)

```
Land on page
    ↓
Cinematic loading intro plays (~3s)
    ↓
Hero section revealed (slash animation splits screen)
    ↓
User reads: event name + theme + date + venue
    ↓
Clicks "Register Now" (P0 CTA) ─────────────────────→ External Registration Form
    OR
Clicks "Explore Events" (P1 CTA)
    ↓
Smooth scroll to #events
    ↓
Browses event cards (expandable)
    ↓
Scrolls to #schedule (contextual flow)
    ↓
Scrolls to #about (validation / trust)
    ↓
Scrolls through #sponsors → #venue → #footer
    ↓
Footer CTA: "Register Now" (re-engagement)
```

### 2.2 Returning Visitor Journey

```
Land on page
    ↓
Intro animation is skipped (sessionStorage flag)
    ↓
Hero visible immediately
    ↓
Uses sticky nav to jump directly to target section
```

### 2.3 Mobile Journey (Thumb-Friendly)

```
Hero → swipe down → About → swipe down → Events (tap cards)
→ Schedule → Sponsors → Venue → Footer
```

- Hamburger nav collapses all links
- Register CTA remains visible in nav at all viewport sizes
- Cards tap to expand (no hover-only states on mobile)

---

## 3. Section-by-Section Layout Planning

### 3.1 Cinematic Loading Intro

**Purpose:** Branded entry moment, sets tone, transitions directly into hero  
**Duration:** ~3–3.5 seconds, skippable after 1.5s

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    [BLACK SCREEN]                       │
│                                                         │
│              [SHINOBI SILHOUETTE appears]               │
│                       center                            │
│                                                         │
│          [Katana unsheathe — blade extends right]       │
│                                                         │
│        [SLASH — diagonal line crosses full screen]      │
│                                                         │
│       [Screen SPLITS along slash line — top-left        │
│        panel slides up-left, bottom-right slides        │
│        down-right revealing hero beneath]               │
│                                                         │
│                  [HERO FADES IN]                        │
└─────────────────────────────────────────────────────────┘
```

**Dev Notes:**
- Implemented as a fixed overlay `z-[9999]` that animates out
- Use `motion` library: `AnimatePresence` + `motion.div` for panel exits
- Shinobi silhouette: SVG or Canvas-drawn figure (NOT a raster image for crisp scaling)
- Slash line: SVG `<line>` with `pathLength` animation (stroke-dashoffset technique)
- Clip-path animation splits screen into two trapezoids
- `sessionStorage.getItem('introSeen')` — skip if already played this session
- **Future:** Replace shinobi with Three.js scene (React Three Fiber) for 3D depth

---

### 3.2 Navigation Bar

**Behavior:** Transparent on hero, solid dark on scroll past hero

```
DESKTOP (≥1024px)
┌─────────────────────────────────────────────────────────────┐
│ [TK Logo] Home  About  Schedule  Events  Sponsors  Venue   │
│                                           [Register →]     │
└─────────────────────────────────────────────────────────────┘
Height: 64px | bg: transparent → rgba(0,0,0,0.85) + blur(12px)

TABLET (768px–1023px)
┌─────────────────────────────────────────────────────────────┐
│ [TK Logo]              [Register →]  [≡ Menu]              │
└─────────────────────────────────────────────────────────────┘
Hamburger opens slide-in drawer from right

MOBILE (<768px)
┌─────────────────────────────────────────────────────────────┐
│ [TK Logo]                            [Register →] [≡]      │
└─────────────────────────────────────────────────────────────┘
Register CTA stays visible always
Hamburger drawer: full height, dark, nav links stacked vertically
```

**Interaction states:**
- Active section: nav link gets red underline indicator
- Hover: red text color transition (150ms ease)
- Register button: red fill, white text, subtle glow on hover
- Scroll progress: thin red line along bottom of nav bar

**Dev Notes:**
- Use IntersectionObserver to track active section
- `position: sticky; top: 0` + `backdrop-filter: blur(12px)`
- Drawer: shadcn `Sheet` component (already installed)
- Scroll progress bar: `motion` `useScroll` + `scaleX` transform

---

### 3.3 Hero Section

**Purpose:** Immediate brand impact, set theme, show key logistical info, drive CTA

```
DESKTOP
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                [3D/VIDEO BACKGROUND CANVAS]                 │
│         (smoky particles, geometric ninja stars,            │
│          or a fog-filled dojo environment)                  │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                                                     │  │
│   │   SHADOW PROTOCOL                    [tag: theme]   │  │
│   │                                                     │  │
│   │   TECH                                              │  │
│   │   KURUKSHETRA                                       │  │
│   │   2026             [display headline, 80–96px]      │  │
│   │                                                     │  │
│   │   "Enter the mission. Master the unknown."          │  │
│   │                    [subtitle, 18–20px]              │  │
│   │                                                     │  │
│   │   📅 March 14–16, 2026                              │  │
│   │   📍 NIT Kurukshetra, Haryana                       │  │
│   │                                                     │  │
│   │   [Register Now →]   [Explore Events ↓]            │  │
│   │                                                     │  │
│   └─────────────────────────────────────────────────────┘  │
│                                           [Scroll ↓ hint]  │
└─────────────────────────────────────────────────────────────┘
Height: 100vh | Content: left-aligned, vertically centered
```

```
MOBILE
┌─────────────────────────────────┐
│                                 │
│   [3D bg — particle layer]      │
│                                 │
│   SHADOW PROTOCOL               │
│                                 │
│   TECH                          │
│   KURUKSHETRA                   │
│   2026       [48–64px display]  │
│                                 │
│   "Enter the mission."          │
│                                 │
│   📅 Mar 14–16, 2026            │
│   📍 NIT Kurukshetra            │
│                                 │
│   [Register Now →]              │
│   [Explore Events ↓]            │
│                                 │
└─────────────────────────────────┘
Height: 100svh (safe viewport)
```

**Dev Notes:**
- Background canvas placeholder: `<div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black">` + particle overlay
- **Future Three.js:** Replace background div with `<Canvas>` (React Three Fiber) — fog, floating shuriken, light shafts
- **Future video:** `<video autoPlay muted loop playsInline>` behind content
- CTA buttons: `motion.button` with scale spring on tap
- Countdown timer component planned as sub-component of hero
- Scroll hint: animated chevron with `motion` infinite bounce

---

### 3.4 About Section

**Purpose:** Build trust, explain the event and theme, show scale with stats

```
DESKTOP (2-column grid)
┌─────────────────────────────────────────────────────────────┐
│ ABOUT                                                       │
│ ─────────────────────────────────────────────────────────── │
│                                                             │
│  ┌──────────────────────┐  ┌──────────────────────────┐   │
│  │                      │  │                          │   │
│  │  TECH KURUKSHETRA    │  │  SHADOW PROTOCOL         │   │
│  │                      │  │  Theme Narrative         │   │
│  │  Overview text       │  │                          │   │
│  │  Vision statement    │  │  "In a world of noise,   │   │
│  │                      │  │  the shadow prevails..."  │   │
│  │                      │  │                          │   │
│  └──────────────────────┘  └──────────────────────────┘   │
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │  5000+   │ │   50+    │ │   30+    │ │  ₹10L+   │     │
│  │ Students │ │  Events  │ │ Colleges │ │  Prizes  │     │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
│                [Stat cards — animated count-up]            │
└─────────────────────────────────────────────────────────────┘
```

```
MOBILE (single column)
┌─────────────────────────────────┐
│ ABOUT                           │
│ ──────────────────────────────  │
│                                 │
│  Overview text (full width)     │
│                                 │
│  Theme Narrative (full width)   │
│                                 │
│  ┌────────┐ ┌────────┐         │
│  │ 5000+  │ │  50+   │         │
│  │Students│ │ Events │         │
│  └────────┘ └────────┘         │
│  ┌────────┐ ┌────────┐         │
│  │  30+   │ │ ₹10L+  │         │
│  │Colleges│ │ Prizes │         │
│  └────────┘ └────────┘         │
└─────────────────────────────────┘
Stat cards: 2-column grid on mobile
```

**Scroll Animation Notes:**
- Section title: letter-by-letter stagger reveal (GSAP SplitText or motion stagger)
- Stat cards: count-up animation triggered by IntersectionObserver
- Theme narrative card: has a subtle red glow border on scroll-enter

---

### 3.5 Event Schedule

**Purpose:** Show timeline clarity, reduce "when is what" anxiety

```
DESKTOP (centered timeline)
┌─────────────────────────────────────────────────────────────┐
│ EVENT SCHEDULE                                              │
│ ─────────────────────────────────────────────────────────── │
│                                                             │
│   [DAY 1]        [DAY 2]        [DAY 3]                    │
│   Mar 14         Mar 15         Mar 16                      │
│   ─────────      ─────────      ─────────                   │
│                                                             │
│   ●── 09:00 Inauguration                                    │
│   │                                                         │
│   ●── 10:00 Technical Events Begin                          │
│   │                                                         │
│   ●── 12:00 Lunch Break                                     │
│   │                                                         │
│   ●── 14:00 Workshops                                       │
│   │                                                         │
│   ●── 17:00 Cultural + Games                                │
│   │                                                         │
│   ●── 19:00 Day Close                                       │
│                                                             │
│              [Tab selector: DAY 1 | DAY 2 | DAY 3]         │
└─────────────────────────────────────────────────────────────┘
```

```
MOBILE (vertical timeline, scrollable)
┌─────────────────────────────────┐
│ SCHEDULE                        │
│                                 │
│ [DAY 1] [DAY 2] [DAY 3]         │
│  ─── pill tab selector ───      │
│                                 │
│ │ 09:00  Inauguration           │
│ │        Auditorium             │
│ │                               │
│ │ 10:00  Events Begin           │
│ │        Multiple Venues        │
│ │                               │
│ │ ...                           │
└─────────────────────────────────┘
```

**Components:**
- Tab group: shadcn `Tabs` component
- Timeline: custom vertical timeline with CSS pseudo-elements (red line, red dot)
- Each slot: time + event name + venue tag chip
- **Future GSAP:** Timeline entries stagger in as day tab changes

---

### 3.6 Events Section

**Purpose:** Showcase event categories, drive interest and registration

```
DESKTOP (grid layout)
┌─────────────────────────────────────────────────────────────┐
│ EVENTS                                       [Filter: All ▾]│
│ ─────────────────────────────────────────────────────────── │
│                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │ ░░░░░░░░░░░  │ │ ░░░░░░░░░░░  │ │ ░░░░░░░░░░░  │       │
│  │ [Icon]       │ │ [Icon]       │ │ [Icon]       │       │
│  │              │ │              │ │              │       │
│  │ Hackathon    │ │ Code Wars    │ │ Robo Arena   │       │
│  │              │ │              │ │              │       │
│  │ Technical    │ │ Technical    │ │ Technical    │       │
│  │ Team: 2–4   │ │ Solo         │ │ Team: 3      │       │
│  │              │ │              │ │              │       │
│  │ [Register]   │ │ [Register]   │ │ [Register]   │       │
│  └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                             │
│  [+ 8 more events]      [View All Events →]                 │
└─────────────────────────────────────────────────────────────┘
Grid: 3-col desktop, 2-col tablet, 1-col mobile
```

**Event Card Anatomy:**
```
┌──────────────────────────────┐
│ [Category Tag: TECHNICAL]    │  ← colored chip
│                              │
│ [Icon / Illustration area]   │  ← 120px height zone
│                              │
│ Event Name (20px bold)       │
│ One-line description (14px)  │
│                              │
│ 👥 Team Size  📅 Date        │
│                              │
│ ──────────────────────────── │
│ [Details]      [Register →]  │
└──────────────────────────────┘
```

**Expand Behavior (planned):**
- On click: card expands with motion `layout` animation
- Expanded state reveals: full description, rules, prizes, contact
- Close: X button or click outside
- Mobile: expands to full-screen drawer (shadcn `Drawer`)

**Filter Categories:** All | Technical | Gaming | Cultural | Workshops

**Dev Notes:**
- Use shadcn `Card` as base
- Filter state: `useState` with derived list
- **Future:** Category-specific 3D icons via React Three Fiber miniature scenes

---

### 3.7 Sponsors Section

**Purpose:** Display credibility, recognize partners

```
DESKTOP
┌─────────────────────────────────────────────────────────────┐
│ OUR SPONSORS                                                │
│ ─────────────────────────────────────────────────────────── │
│                                                             │
│  TITLE SPONSOR                                              │
│  ┌─────────────────────────────────────────────────┐       │
│  │          [LARGE LOGO — centered, 200px]          │       │
│  └─────────────────────────────────────────────────┘       │
│                                                             │
│  PLATINUM                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                   │
│  │ [Logo]   │ │ [Logo]   │ │ [Logo]   │                   │
│  └──────────┘ └──────────┘ └──────────┘                   │
│                                                             │
│  GOLD                                                       │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐           │
│  │[Logo]│ │[Logo]│ │[Logo]│ │[Logo]│ │[Logo]│           │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘           │
│                                                             │
│  SILVER  [smaller logos, more per row]                      │
│                                                             │
│  MEDIA PARTNERS  |  COMMUNITY PARTNERS                      │
└─────────────────────────────────────────────────────────────┘
```

**Tiers:** Title → Platinum → Gold → Silver → Media Partners → Community Partners  
**Logo treatment:** Grayscale default → full color on hover (CSS filter transition)  
**Mobile:** All logos stack to 2-per-row regardless of tier; tier labels stay

**Dev Notes:**
- Logo images: `ImageWithFallback` component (already exists at `src/app/components/figma/ImageWithFallback.tsx`)
- Tier labels: styled dividers with red accent lines
- **Placeholder:** Use client initials in styled boxes until real logos provided
- Future: Auto-scrolling marquee for Silver/Community tiers (CSS animation)

---

### 3.8 University / Venue Section

**Purpose:** Answer "where do I go?" — reduces friction for out-of-town attendees

```
DESKTOP (2-column)
┌─────────────────────────────────────────────────────────────┐
│ VENUE                                                       │
│ ─────────────────────────────────────────────────────────── │
│                                                             │
│  ┌───────────────────────────┐  ┌───────────────────────┐  │
│  │                           │  │                       │  │
│  │   [MAP PLACEHOLDER]       │  │  NIT Kurukshetra      │  │
│  │                           │  │  Haryana — 136119     │  │
│  │   Interactive embed or    │  │                       │  │
│  │   static map image        │  │  📍 Address block     │  │
│  │                           │  │                       │  │
│  │                           │  │  🚂 Nearest Railway   │  │
│  │                           │  │  ✈️ Nearest Airport   │  │
│  │                           │  │                       │  │
│  └───────────────────────────┘  │  📞 Contact           │  │
│                                 │  ✉️ Email             │  │
│                                 │                       │  │
│                                 │  [Get Directions →]   │  │
│                                 └───────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

```
MOBILE (stacked)
┌─────────────────────────────────┐
│ VENUE                           │
│                                 │
│ [MAP — full width, 250px tall]  │
│                                 │
│ NIT Kurukshetra                 │
│ Haryana — 136119                │
│                                 │
│ 📍 Address                      │
│ 🚂 Railway info                 │
│ ✈️ Airport info                 │
│                                 │
│ 📞 Contact  ✉️ Email            │
│                                 │
│ [Get Directions →]              │
└─────────────────────────────────┘
```

**Dev Notes:**
- Map: `<iframe>` Google Maps embed OR `<div>` placeholder with static image fallback
- Contact details: Click-to-call on mobile (`href="tel:..."`)
- Google Maps link opens in new tab

---

### 3.9 Footer

```
DESKTOP (4-column)
┌─────────────────────────────────────────────────────────────┐
│  [TK Logo + tagline]  Quick Links   Events    Contact       │
│                                                             │
│                       Home          Hackathon  📧 Email     │
│                       About         Code Wars  📞 Phone     │
│                       Schedule      Robo Arena 📍 Address   │
│                       Sponsors                              │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  [Social Icons: Instagram, Twitter/X, LinkedIn, YouTube]    │
│                                                             │
│  © 2026 Tech Kurukshetra, NIT Kurukshetra. All rights       │
│  reserved. | Privacy Policy | Terms                         │
└─────────────────────────────────────────────────────────────┘
```

```
MOBILE
┌─────────────────────────────────┐
│  [TK Logo]                      │
│  "Enter the mission."           │
│                                 │
│  Quick Links ▾    Events ▾      │
│  (accordion collapsible)        │
│                                 │
│  [Instagram] [Twitter] [LinkedIn]│
│                                 │
│  © 2026 Tech Kurukshetra        │
└─────────────────────────────────┘
Footer links on mobile: shadcn Accordion
```

---

## 4. Color & Typography Tokens

> ⚠️ These are planning tokens — do NOT implement in theme.css until the build phase.

### Color System
```
--color-bg-primary:     #0A0A0A    /* Deep black — main bg */
--color-bg-secondary:   #111111    /* Card surfaces */
--color-bg-elevated:    #1A1A1A    /* Hover / elevated cards */
--color-accent-red:     #C41E3A    /* Primary red — CTAs, highlights */
--color-accent-red-glow:#FF0000    /* Glow/neon variant */
--color-text-primary:   #F5F5F5    /* Main text */
--color-text-secondary: #999999    /* Muted text, metadata */
--color-border:         #2A2A2A    /* Subtle borders */
--color-border-accent:  #C41E3A    /* Focused/active borders */
```

### Typography Scale
```
Display XL:  80–96px  — "TECH KURUKSHETRA" hero headline
Display L:   56–64px  — Section titles
Heading:     32–40px  — Card titles, sub-sections
Body L:      18–20px  — Hero subtitle, lead text
Body:        15–16px  — General content
Small:       12–13px  — Tags, metadata, captions
```

**Planned font choices (to be imported in /src/styles/fonts.css):**
- Display: `Bebas Neue` or `Anton` (Google Fonts) — condensed, high-impact
- Heading: `Outfit` or `Space Grotesk` — modern, clean
- Body: `Inter` — readable, neutral
- Accent: `Rajdhani` — slightly technical feel for tags and labels

---

## 5. Component Hierarchy

```
App
├── IntroOverlay (motion AnimatePresence)
│   ├── ShinobiSilhouette (SVG)
│   ├── SlashLine (SVG animated)
│   └── ScreenSplitPanels (motion.div × 2)
│
├── Navigation
│   ├── Logo
│   ├── NavLinks (desktop)
│   ├── RegisterCTA
│   ├── MobileMenuButton
│   ├── MobileDrawer (shadcn Sheet)
│   └── ScrollProgressBar
│
├── HeroSection
│   ├── ThreeBackground (placeholder div → future Canvas)
│   ├── HeroContent
│   │   ├── ThemeTag
│   │   ├── EventTitle (animated reveal)
│   │   ├── Tagline
│   │   ├── EventMeta (date + venue)
│   │   ├── CountdownTimer
│   │   └── HeroCTAs (Register + Explore)
│   └── ScrollHint
│
├── AboutSection
│   ├── SectionTitle
│   ├── OverviewCard
│   ├── ThemeNarrativeCard
│   └── StatsGrid
│       └── StatCard × 4
│
├── ScheduleSection
│   ├── SectionTitle
│   ├── DaySelector (shadcn Tabs)
│   └── Timeline
│       └── TimelineEntry × N
│
├── EventsSection
│   ├── SectionTitle
│   ├── CategoryFilter (shadcn Toggle Group)
│   ├── EventGrid
│   │   └── EventCard × N
│   │       └── EventDetailDrawer (shadcn Drawer — mobile)
│   └── ViewAllCTA
│
├── SponsorsSection
│   ├── SectionTitle
│   └── SponsorTier × 6
│       └── SponsorLogo × N (ImageWithFallback)
│
├── VenueSection
│   ├── SectionTitle
│   ├── MapEmbed
│   └── VenueInfo
│
└── Footer
    ├── FooterBrand
    ├── FooterLinks × 3 columns
    ├── SocialLinks
    └── Copyright
```

---

## 6. Responsive Behavior Summary

| Breakpoint | Layout behavior |
|---|---|
| `<640px` (mobile) | Single column, full-width cards, hamburger nav, accordion footer |
| `640px–767px` (sm) | 2-col event grid, 2-col stats |
| `768px–1023px` (md/tablet) | 2-col about, 2-col venue, hamburger nav still active |
| `1024px–1279px` (lg) | Full desktop nav appears, 3-col events |
| `≥1280px` (xl) | Max-width container (1280px), generous padding |

**Tailwind breakpoints used:** `sm:` `md:` `lg:` `xl:` (default Tailwind v4 scale)  
**Container max-width:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

---

## 7. Scroll Flow & Animation Sequence

```
USER SCROLLS:

[HERO] → [ABOUT] → [SCHEDULE] → [EVENTS] → [SPONSORS] → [VENUE] → [FOOTER]
  ↓           ↓          ↓           ↓           ↓           ↓
fade-up    count-up   stagger    card       logo       map
title      stats      entries    hover      hover      reveal
           in view    by day     glow       grayscale→
                                            color
```

**IntersectionObserver thresholds:**
- `threshold: 0.15` for section entry animations
- `threshold: 0.5` for stat counter triggers
- `rootMargin: "0px 0px -100px 0px"` for pre-trigger slightly before center

**Motion preferences:** Respect `prefers-reduced-motion` — skip all transitions, show final state immediately

---

## 8. Future Development Placeholders

### 8.1 Three.js / React Three Fiber
- [ ] Hero background: `<Canvas>` with fog, floating shuriken geometry, point lights
- [ ] Intro overlay: 3D shinobi model replacing SVG silhouette
- [ ] Events section: Category cards with 3D icon miniatures

### 8.2 GSAP Animations
- [ ] Hero title: `gsap.fromTo` letter stagger with `SplitText`
- [ ] Schedule timeline: entries animate in on day tab change
- [ ] Scroll-linked parallax on hero background

### 8.3 Performance Optimization
- [ ] Lazy load all sections below fold with React `Suspense`
- [ ] Dynamic import Three.js canvas only after intro completes
- [ ] `loading="lazy"` on all sponsor logos
- [ ] Preconnect fonts in `<head>`: `<link rel="preconnect" href="https://fonts.googleapis.com">`
- [ ] Reduce motion fallback for all animation components

### 8.4 Accessibility
- [ ] `aria-label` on all icon-only buttons
- [ ] `role="navigation"` + `aria-current="page"` on active nav link
- [ ] Focus trap in mobile drawer
- [ ] Skip-to-main link at top of page
- [ ] Sufficient color contrast on red-over-dark surfaces (min 4.5:1)

---

## 9. Implementation Sequence (for Development Phase)

When implementation begins, follow this order to maintain a shippable state at each step:

1. **Theme tokens** — update `theme.css` with dark palette, red accent
2. **Font imports** — add to `fonts.css`
3. **Navigation** — sticky nav with scroll behavior and mobile drawer
4. **Hero section** — layout, CTAs, placeholder background
5. **Intro overlay** — SVG slash animation, session skip logic
6. **About section** — copy + stats
7. **Events section** — grid, filter, card expand
8. **Schedule section** — tabs + timeline
9. **Sponsors section** — tier grid with placeholder logos
10. **Venue section** — map embed + info
11. **Footer** — links, social, copyright
12. **Polish pass** — scroll animations, hover states, motion refinements
13. **Three.js integration** — hero canvas background
14. **Performance audit** — lazy loading, bundle splitting

---

## 10. Key Files to Create/Modify

| File | Action | Purpose |
|---|---|---|
| `src/styles/theme.css` | Modify | Dark palette, red accent tokens |
| `src/styles/fonts.css` | Modify | Add Google Font imports |
| `src/app/App.tsx` | Modify | Root: compose all sections |
| `src/app/components/IntroOverlay.tsx` | Create | Cinematic loading sequence |
| `src/app/components/Navigation.tsx` | Create | Sticky nav + mobile drawer |
| `src/app/components/HeroSection.tsx` | Create | Hero layout + CTAs |
| `src/app/components/AboutSection.tsx` | Create | Overview + stats |
| `src/app/components/ScheduleSection.tsx` | Create | Day tabs + timeline |
| `src/app/components/EventsSection.tsx` | Create | Event grid + filters |
| `src/app/components/EventCard.tsx` | Create | Reusable event card |
| `src/app/components/SponsorsSection.tsx` | Create | Sponsor tier grid |
| `src/app/components/VenueSection.tsx` | Create | Map + venue info |
| `src/app/components/Footer.tsx` | Create | Footer with links |
| `src/app/components/CountdownTimer.tsx` | Create | Live countdown to event |

**Reusable components to use (already installed):**
- `src/app/components/ui/sheet.tsx` → Mobile nav drawer
- `src/app/components/ui/tabs.tsx` → Schedule day selector
- `src/app/components/ui/drawer.tsx` → Event detail mobile expand
- `src/app/components/ui/badge.tsx` → Category tags, tier labels
- `src/app/components/ui/card.tsx` → Event cards, stat cards
- `src/app/components/ui/button.tsx` → All CTA buttons
- `src/app/components/ui/accordion.tsx` → Footer mobile links
- `src/app/components/figma/ImageWithFallback.tsx` → Sponsor logos
