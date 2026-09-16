# Casa Beauté — Cosmetics Boutique Website

A single-page marketing site for Casa Beauté (cosmetics & parfumerie,
Sidi Bel Abbès), styled after beautyinstem.com — colors and typography
were sampled directly from frames of a screen recording of that site, not
guessed — then adapted to an **all-light palette** per request (no dark
section backgrounds anywhere in the site).

## Palette

| Token       | Hex       | Used for                                    |
|-------------|-----------|-----------------------------------------------|
| `ink`       | `#111111` | Text only — headlines, body copy, icons       |
| `cream`     | `#FAFAF7` | Primary light section background              |
| `peach`     | `#FDEDDE` | Secondary light section background (alternates with cream) |
| `rose`      | `#C88480` | Accent — numerals, highlights                 |
| `rose-deep` | `#6B3A2A` | Logo, link-hover accent                       |

There are no full dark-background sections; `bg-ink` only appears on
small UI elements (buttons, the hamburger icon lines) for contrast, never
as a section backdrop.

Typography is a single grotesk family — **Archivo** (Google Fonts) — used
at extrabold weight for headlines and regular weight for body copy.

## The hero video

A real clip is wired in at `public/hero.mp4` (compressed from the
original 4K/19 MB upload down to ~2.5 MB, 1080px wide, no audio track,
`faststart` for fast playback start) with `public/hero-poster.jpg` as the
instant-paint poster frame shown before the video loads. `Hero.jsx`
references both directly — swap either file (keep the same filenames, or
update the two paths in `Hero.jsx`) to change the footage.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

Requires Node 18+.

## What's in here

```
src/
  components/
    Preloader.jsx    glass-blob "goo" loading screen (CSS/SVG filter, no WebGL)
    Nav.jsx            fixed light translucent bar, centered logo, uppercase links
    Hero.jsx            full-bleed video-background hero (real clip wired in)
    SectionWipe.jsx      organic wavy divider between alternating cream/peach sections
    GlassOrb.jsx         CSS glass-sphere decoration, fluidly sized
    Marquee.jsx          infinite-scroll text strip (brands / CTA line)
    Gallery.jsx           "The Shelf" placeholder product grid — staggered
                           reveal on scroll + smooth hover zoom/caption
    Story.jsx            centered "philosophy" statement section (peach)
    Services.jsx         "Collections" — alternating cream/peach numbered panels
    Testimonials.jsx      snap-scroll testimonial slider (peach)
    Contact.jsx           inquiry form + hours/directions/Instagram
    Footer.jsx             newsletter signup + nav/contact/hours columns
  hooks/
    useReducedMotion.js
  lib/
    lenis.js             Lenis inertia scroll, synced to GSAP's ticker
    content.js            ALL copy: brand name, collections, gallery
                           captions, story, testimonials, hours, brands
public/
  hero.mp4              compressed hero background video (~2.5 MB)
  hero-poster.jpg        poster frame shown while the video loads
```

## Swap in real content

Everything editorial lives in **`src/lib/content.js`**:

- `SALON_NAME`, `TAGLINE`
- `SERVICES` — the five "Collections" panels (Skincare, Haircare & Styling,
  Parfumerie, Makeup, Gift Sets)
- `BRANDS` — the marquee strip under the hero. Mixes confirmed brands
  (PRODERMA, Enzo, Remington, Nashi, Sense Laverne) with placeholder
  guesses (Loreal, Vichy, La Roche-Posay) — replace the guessed ones
- `GALLERY`, `STORY`, `TESTIMONIALS`, `CONTACT`

`CONTACT.phone` and `CONTACT.hours` are still placeholders.

### Images — still placeholders

- **Gallery** (`Gallery.jsx`): each product tile is a flat `bg-peach`
  block — swap for an `<img>`.
- **Story**: text-only by design, matching the reference's centered
  statement section (no image slot there).

### A fidelity note

Colors and type system are matched from directly-sampled pixels/frames of
your recording. The full-dark sections from the original reference were
converted to an all-light cream/peach system by request — the structure,
motion and accent color are kept, the black backgrounds are not. Two
other things are deliberately *not* literal copies:
- The reference's actual metaball/WebGL loader and glass-sphere renders
  are proprietary custom shader work — `Preloader.jsx` and `GlassOrb.jsx`
  approximate the same visual language (merging blurred circles via an
  SVG goo filter; a radial-gradient glass sphere) using plain CSS/SVG
  instead of WebGL, which keeps the bundle light and the effect robust
  across devices, at the cost of not being pixel-identical.
- Their exact licensed font file isn't reproduced; Archivo is used as a
  close, freely-licensed match for the same bold-grotesk/light-grotesk
  pairing.

## Motion & accessibility notes

- Every animated piece (Preloader, Lenis, Framer Motion reveals, the
  marquees) checks `prefers-reduced-motion` and either no-ops or falls
  back to a static equivalent.
- Focus-visible outlines are set globally; nav, form fields and links are
  all keyboard-reachable.
- Semantic structure: one `<h1>` in the hero, `<h2>` per section, a real
  `<form>` with labelled fields in Contact and the footer newsletter box.

## Responsiveness

Every section is mobile-first: the nav collapses to a full-screen menu
under `md`, the hero uses `100svh` so mobile browser chrome doesn't clip
it, the Collections/Services panels stack to a single column below `lg`,
the gallery grid drops from 4 to 2 columns, testimonials become a
horizontal snap-scroll, and the floating glass orb is sized with
`clamp()` so it scales fluidly instead of overflowing narrow screens.
Tested breakpoints: `sm` (640px), `lg` (1024px) — check any custom
copy you add at those two widths if you extend a section.
