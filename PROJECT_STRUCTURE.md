# Project Structure - Vihanga Cinematic Portfolio

## Complete Directory Structure

```
Portfolio/
├── public/
│   └── images/                    # Add your images here
│       ├── hero-portrait.png
│       ├── about-portrait.png
│       ├── project-1.jpg
│       ├── project-2.jpg
│       └── ... (more images)
│
├── src/
│   ├── components/
│   │   ├── Navigation.jsx         # Fixed navigation with smooth scroll
│   │   ├── CustomCursor.jsx       # Cinematic cursor (desktop only)
│   │   ├── FilmCountdown.jsx      # 3-2-1 film countdown intro
│   │   ├── CinematicEffects.jsx   # Dust particles & film grain
│   │   ├── ParallaxLayer.jsx      # Reusable parallax wrapper
│   │   ├── LayeredImage.jsx       # Multi-layer image component
│   │   ├── Footer.jsx             # Site footer
│   │   └── sections/
│   │       ├── Hero.jsx           # Hero/landing section
│   │       ├── About.jsx          # About/identity section
│   │       ├── Work.jsx           # Projects grid
│   │       ├── Process.jsx        # Workflow timeline
│   │       ├── Journal.jsx        # Thoughts/blog entries
│   │       └── Contact.jsx        # Contact form & CTA
│   │
│   ├── hooks/
│   │   └── useScrollFadeIn.js     # Custom scroll animation hook
│   │
│   ├── utils/
│   │   └── animations.js          # Common animation utilities
│   │
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles & Tailwind
│
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS config
├── postcss.config.js              # PostCSS configuration
├── .eslintrc.json                 # ESLint configuration
├── package.json                   # Dependencies & scripts
├── .gitignore                     # Git ignore rules
├── README.md                      # Project documentation
├── SETUP.md                       # Quick start & setup guide
└── PROJECT_STRUCTURE.md           # This file
```

## File Descriptions

### Core Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts, and project metadata |
| `vite.config.js` | Vite build and dev server configuration |
| `tailwind.config.js` | Tailwind CSS theme and extensions |
| `postcss.config.js` | PostCSS plugins (Tailwind, Autoprefixer) |
| `.eslintrc.json` | ESLint rules for code quality |
| `index.html` | HTML entry point |

### Component Hierarchy

```
App.jsx
├── FilmCountdown
├── Navigation
│   ├── Logo
│   ├── Nav Links (smooth scroll)
│   └── Cinema Toggle
├── Main
│   ├── Hero
│   │   ├── ParallaxLayer (image)
│   │   ├── ParallaxLayer (text)
│   │   └── Light Leaks / Film Grain
│   │
│   ├── About
│   │   ├── ParallaxLayer (image stack)
│   │   ├── ParallaxLayer (artifacts)
│   │   ├── Text Content
│   │   └── Stats
│   │
│   ├── Work
│   │   └── Project Cards (grid)
│   │       ├── Project Image
│   │       ├── Project Overlay
│   │       └── Project Info
│   │
│   ├── Process
│   │   └── Timeline Steps (alternating)
│   │       ├── ParallaxLayer (image)
│   │       └── Process Info
│   │
│   ├── Journal
│   │   └── Journal Entries (grid)
│   │       ├── Entry Image
│   │       └── Entry Content
│   │
│   └── Contact
│       ├── ParallaxLayer (portrait)
│       ├── Contact Form
│       │   ├── Name Input
│       │   ├── Email Input
│       │   ├── Message Textarea
│       │   └── Submit Button
│       └── Social Links
│
├── Footer
├── CustomCursor
└── CinematicEffects (dust particles)
```

## Component APIs

### ParallaxLayer
```jsx
<ParallaxLayer speed={0.5} isReducedMotion={false}>
  {children}
</ParallaxLayer>
```
- **speed**: 0-1 (0 = no parallax, 0.5 = half scroll speed)
- **isReducedMotion**: boolean (disables animations if true)

### LayeredImage
```jsx
<LayeredImage
  foreground="image1.jpg"
  midground="image2.jpg"
  background="image3.jpg"
  className="w-full aspect-video"
  isReducedMotion={false}
  onHover={true}
/>
```

### useScrollFadeIn Hook
```jsx
const ref = useScrollFadeIn(isReducedMotion)
<div ref={ref}>Content fades in on scroll</div>
```

## Key Animations

### Global Film Grain
- Subtle noise overlay on all sections
- Opacity: 0.08 (customizable in `index.css`)

### Parallax on Scroll
- Multiple layers at different speeds
- Smooth GSAP easing (cubic-bezier)
- Mobile-optimized (reduced parallax)

### Scroll-Triggered Reveals
- Elements fade in as they scroll into view
- Staggered delays for visual interest
- Respects `prefers-reduced-motion`

### Hover Effects
- Project cards scale on hover
- Contact form inputs highlight on focus
- Social links lift up on hover

### Hero Countdown
- 3-2-1 film countdown at page start
- Fades out automatically after 3.5s
- Custom animations in CSS

## Customization Hotspots

Quick places to customize:

| What | Where |
|------|-------|
| Site colors | `tailwind.config.js` |
| Hero text | `src/components/sections/Hero.jsx` |
| About content | `src/components/sections/About.jsx` |
| Projects | `src/components/sections/Work.jsx` |
| Stats | `src/components/sections/About.jsx` |
| Contact form | `src/components/sections/Contact.jsx` |
| Animation speed | Any GSAP `duration` prop |
| Parallax intensity | `speed` prop on `ParallaxLayer` |
| Film grain effect | `src/index.css` `.film-grain` opacity |

## Performance Optimizations

✅ **Code Splitting**
- GSAP split into separate chunk
- Lazy loaded on demand

✅ **Image Optimization**
- Place images in `public/images/`
- Use compressed formats (<100KB each)
- Browser caches automatically

✅ **Animation Efficiency**
- GSAP timelines cleaned up on unmount
- ScrollTrigger instances properly destroyed
- GPU acceleration via `transform` and `opacity`

✅ **Mobile Optimization**
- Reduced parallax on smaller screens
- No custom cursor on mobile
- Fewer dust particles
- Simplified animations

✅ **Bundle Size**
- ~150KB gzipped with all dependencies
- Tree-shaking removes unused code
- Minified CSS and JavaScript

## Development Workflow

### Hot Module Replacement (HMR)
- Edit any file and see changes instantly
- State preserved during edits
- Works with Tailwind utilities

### Debugging
```bash
# Open DevTools console
F12

# Check for errors
# Use Network tab to verify image loading
# Use Performance tab to check animations
```

### Testing Responsive
```bash
# Desktop: Full features
# Tablet: Reduced parallax
# Mobile: Minimal animations
```

## Production Checklist

- [ ] Update all text content
- [ ] Add your images in `public/images/`
- [ ] Test on mobile device
- [ ] Check form submission works
- [ ] Verify social links are correct
- [ ] Update meta tags in `index.html`
- [ ] Run production build: `npm run build`
- [ ] Test preview: `npm run preview`
- [ ] Deploy to hosting

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Mobile Chrome | Latest | ✅ Full |
| Mobile Safari | Latest | ✅ Full |

## File Sizes (Approximate)

| Item | Size |
|------|------|
| Bundle (gzipped) | ~150KB |
| HTML | ~8KB |
| CSS (Tailwind) | ~45KB |
| JavaScript | ~95KB |
| Images (per image) | <100KB recommended |

## Technology Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18.3 |
| Build Tool | Vite 5.1 |
| Styling | Tailwind CSS 3.4 |
| Animations | GSAP 3.12 |
| CSS Processing | PostCSS 8.4 |
| Linting | ESLint 8+ |
| Package Manager | npm/yarn |

## Folder Organization Philosophy

- **components/**: Reusable React components (lowercase filenames)
- **components/sections/**: Page sections (PascalCase)
- **hooks/**: Custom React hooks for logic
- **utils/**: Utility functions and helpers
- **public/**: Static assets (images, fonts)
- **src/**: All source code

## Next Steps

1. Read `SETUP.md` for quick start
2. Review `README.md` for full documentation
3. Customize components in `src/components/`
4. Add images to `public/images/`
5. Test locally with `npm run dev`
6. Deploy with `npm run build`

## Questions?

- Check component source code for inline comments
- Review `SETUP.md` for common customizations
- Refer to `README.md` for troubleshooting
- Check GSAP docs: https://gsap.com
- Check Tailwind docs: https://tailwindcss.com

---

**Happy building!** 🚀✨
