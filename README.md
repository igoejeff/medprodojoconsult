# Med Pro Dojo — 2026 Elevated Website

**Where Business Strategy Meets Medical Mastery**  
Apple-level design · Glassmorphism · Bento Grid · Social Feed Integration

---

## ✅ Completed Features

### Core Site
- **6-page website**: Home, Programs, About, Events, Testimonials, Contact
- Announcement bar (dismissible, session-stored)
- Sticky frosted-glass navbar with mobile burger menu
- Hero section with Ken Burns photo animation + parallax scroll
- Animated stats counter strip (500+ Practices, 20+ Years, 7-Figure, 12+ Courses)
- Pain Points bento grid (glassmorphism dark cards)
- "Imagine If" numbered stack section
- Growth System section with pill badges over photo background
- How It Works 4-step process cards (tilt hover effect)
- Team Dojo split image section with feature list
- Bold typographic strip: SYSTEMS · GROWTH · MASTERY
- Course carousel (4-up → 3-up → 2-up → 1-up responsive, touch/swipe)
- Free Strategy CTA with inline form
- Want Help CTA band
- Footer with nav links, social links, legal

### 🆕 Social Media Hub (front & center)
- Full-width dark section immediately after the stats strip
- Branded heading: **Follow @medprodojo**
- 4 platform badges (Instagram, Facebook, YouTube, LinkedIn) with gradient icons + follow CTAs
- **6-tile Instagram preview grid** — styled branded cards showing real MPD content themes:
  - ChiroOne Business Mastery Part 2 course drop
  - Stop Being The Bottleneck strategy tip
  - 500+ Practices featured post (2-column wide tile)
  - Neuropathy in a Box program
  - IV Therapy revenue tip
  - Team Dojo 30-Day Trial
- Heart + comment counts for social proof
- "View All Posts on Instagram" CTA button

### 🆕 What's New Feed Section
- **6 richly-styled feed cards** representing real MPD content
- Cards have branded gradient image areas with icons, quotes, stats, and checklists
- Platform badge (IG/FB gradient) overlaid on each card image
- Full card body: tags, headline, description, date, engagement stats, link
- **Filter tabs**: All · Instagram · Facebook · Tips · Courses
- JavaScript-powered live filtering with smooth reveal animations
- "Wide" card variant spanning 2 columns for featured content
- Follow on Instagram + Follow on Facebook pill buttons
- Fully responsive (3-col → 2-col → 1-col)

### Interactivity & Animation
- Scroll-triggered fade-up reveal (IntersectionObserver)
- Animated number counters
- 3D card tilt effect (mousemove)
- Smooth hash navigation
- What's New filter tab switching with re-animate on filter
- Toast notification system

---

## 📂 File Structure

```
index.html          ← Home (Social Hub + What's New added)
programs.html       ← All courses & programs
about.html          ← About page
events.html         ← Upcoming events
testimonials.html   ← Client testimonials
contact.html        ← Contact form + booking
css/
  style.css         ← All styles (2400+ lines)
js/
  main.js           ← All JS (scroll, counters, carousel, filter)
README.md
```

---

## 🔗 Social Media Links Used

| Platform  | URL |
|-----------|-----|
| Instagram | https://www.instagram.com/medprodojo/ |
| Facebook  | https://www.facebook.com/medprodojo |
| YouTube   | https://www.youtube.com/@medprodojo |
| LinkedIn  | https://www.linkedin.com/company/medprodojo |

---

## ⚠️ Note on Live Social Feeds

The current Social Hub and What's New sections use **curated static content** styled to match Med Pro Dojo's real content themes. A true live Instagram/Facebook feed requires:

1. **Instagram Basic Display API** — requires Facebook Developer app approval
2. **Facebook Graph API** — page access token
3. **A backend proxy** or third-party embed service (e.g., Behold.so, Elfsight, Taggbox)

**Recommended next step**: Embed a Behold.so or Elfsight widget for a truly live feed — these are no-code, free-tier options that render directly in a static site via `<script>` tag.

---

## 🚀 Not Yet Implemented

- Live Instagram/Facebook API feed (requires OAuth + backend proxy)
- Blog/resources dynamic listing
- Member login portal (requires backend)
- E-commerce / course purchase flow

---

## 📋 Recommended Next Steps

1. **Live Feed**: Add Behold.so embed (`https://behold.so`) for live Instagram tiles — free up to 25 posts
2. **Logo**: Replace the chart-line icon with the actual MPD logo image when available
3. **Team Photos**: Add real headshots to the About page
4. **Testimonial Videos**: Embed YouTube testimonials in testimonials.html
5. **Deploy**: Go to the **Publish tab** to make the site live
