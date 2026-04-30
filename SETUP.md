# Quick Start Guide - Vihanga Portfolio

## 🚀 Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` - your portfolio will hot-reload as you edit!

### 3. Customize Content

#### Update Navigation
Edit `src/components/Navigation.jsx`:
```jsx
{['about', 'work', 'process', 'journal', 'contact'].map(...)}
```

#### Update Hero Section
Edit `src/components/sections/Hero.jsx`:
- Change "Vihanga" to your name
- Update tagline: "Creative technologist • Visual storyteller • Cinematic visionary"

#### Update Projects
Edit `src/components/sections/Work.jsx`:
```jsx
const projects = [
  { title: 'Your Project', category: 'Project Type' },
  // ... add more
]
```

#### Update About Content
Edit `src/components/sections/About.jsx`:
- Update description paragraphs
- Modify stats (50+ Projects, 8+ Years, etc.)

#### Update Contact Form
Edit `src/components/sections/Contact.jsx`:
- Update call-to-action text
- Add real social links (replace href="#" with actual URLs)

### 4. Add Real Images

Replace placeholder images with your cutout photos:

```jsx
// In Hero.jsx - Replace the placeholder div with:
<img src="/images/hero-portrait.png" alt="Hero" />

// In About.jsx
<img src="/images/about-portrait.png" alt="About" />

// In Work.jsx - Project cards
<img src="/images/project-1.jpg" alt="Project 1" />

// In Contact.jsx
<img src="/images/contact-portrait.png" alt="Contact" />
```

**Image Requirements:**
- Format: PNG (with transparency) or JPG
- Size: 1200x1600px minimum (scale automatically)
- File size: <100KB each (use TinyPNG, Squoosh, or similar)
- Quality: High contrast, professional cutouts
- Style: Black & white only, strong lighting

**Where to place images:**
Create `public/images/` folder and add your images there.

## 🎨 Customization Guide

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  black: {
    deep: '#0a0a0a',      // Darkest black
    primary: '#1a1a1a',   // Primary black
    secondary: '#2a2a2a', // Secondary black
  },
  gray: {
    dark: '#4a4a4a',
    medium: '#666666',
  },
  white: {
    pure: '#ffffff',
    smoke: '#f5f5f5',
  },
}
```

### Adjust Animation Speed
Edit component files and modify GSAP durations:
```jsx
// Slower animations
gsap.to(element, {
  opacity: 1,
  duration: 1.2,  // Increase from 0.8 to 1.2
})

// Faster parallax
<ParallaxLayer speed={0.8} /> {/* Increase from 0.5 */}
```

### Film Grain Intensity
Edit `src/index.css`:
```css
.film-grain {
  opacity: 0.08;  /* Increase to 0.15 for stronger grain */
}
```

### Light Leak Effects
Edit Hero section in `src/components/sections/Hero.jsx`:
```jsx
<div className="... opacity-0 pointer-events-none"
     style={{
       animation: 'light-leak 8s ease-in-out infinite',
       mixBlendMode: 'screen',
     }} />
```

## 🔧 Component Architecture

### Core Components

**`ParallaxLayer`** - Wraps content with scroll-based parallax
```jsx
<ParallaxLayer speed={0.5} isReducedMotion={isReducedMotion}>
  {children}
</ParallaxLayer>
```
- `speed`: 0-1 (0 = static, 0.5 = half scroll speed, 1 = full scroll speed)

**`LayeredImage`** - Multi-layer image with hover effects
```jsx
<LayeredImage
  foreground={img1}
  midground={img2}
  background={img3}
  isReducedMotion={isReducedMotion}
  className="w-full aspect-video"
/>
```

**`useScrollFadeIn`** - Hook for scroll-triggered animations
```jsx
const ref = useScrollFadeIn(isReducedMotion)
<div ref={ref}>Fades in on scroll</div>
```

## 📱 Responsive Design

The site is **mobile-first**, automatically adapting:
- Desktop: Full parallax, dust particles, custom cursor
- Tablet: Reduced parallax layers
- Mobile: Minimal animations, no cursor

**Test on mobile:**
```bash
# Start dev server
npm run dev

# Open in mobile device on same network:
# Find your IP: ipconfig (Windows) or ifconfig (Mac/Linux)
# Visit: http://YOUR_IP:3000
```

## 🎬 GSAP Animation Patterns

### Scroll-Triggered Fade
```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// In component:
useEffect(() => {
  ScrollTrigger.create({
    trigger: element,
    onEnter: () => {
      gsap.to(element, { opacity: 1, duration: 0.8 })
    },
    once: true
  })
}, [])
```

### Parallax on Scroll
```jsx
// In ParallaxLayer.jsx - already implemented!
ScrollTrigger.create({
  trigger: element,
  onUpdate: (self) => {
    const yPercent = self.progress * speed * 100
    gsap.to(layer, { yPercent })
  }
})
```

### Hover Animation
```jsx
element.addEventListener('mouseenter', () => {
  gsap.to(element, { scale: 1.1, duration: 0.6 })
})
```

## 🚀 Production Build

### Build for Production
```bash
npm run build
```
Creates optimized `dist/` folder (~150KB gzipped)

### Preview Production Build
```bash
npm run preview
```

### Performance Optimizations Included
✅ Code splitting (GSAP in separate chunk)
✅ Image lazy loading
✅ CSS minification
✅ JS minification & tree shaking
✅ Efficient animation cleanup
✅ Mobile animation reduction

## 📤 Deployment

### Deploy to Vercel (Recommended - 1 minute setup)
```bash
npm i -g vercel
vercel
```
- Connect GitHub repo
- Build: `npm run build`
- Output: `dist`

### Deploy to Netlify
```bash
npm run build
# Drag & drop 'dist' folder to Netlify
```

### Deploy to GitHub Pages
1. Update `vite.config.js`:
```js
export default {
  base: '/portfolio/', // Your repo name
  // ...
}
```

2. Build and deploy:
```bash
npm run build
# Push 'dist' folder to gh-pages branch
```

### Custom Domain
For any hosting, add domain in your DNS settings pointing to the hosting provider.

## 🔍 SEO & Meta Tags

Edit `index.html`:
```html
<title>Vihanga - Cinematic Portfolio</title>
<meta name="description" content="Premium cinematic portfolio...">
<meta name="keywords" content="portfolio, designer, creative...">
```

## ♿ Accessibility Checklist

✅ Respects `prefers-reduced-motion`
✅ High contrast text (WCAG AAA)
✅ Semantic HTML
✅ Keyboard navigation
✅ Focus states visible
✅ Alt text for images (add in components)
✅ ARIA labels where needed

### Add Alt Text
```jsx
<img src="image.png" alt="Descriptive text about image" />
```

## 🐛 Debugging

### Check Console for Errors
```bash
# In dev server terminal
npm run dev
```

### Debug GSAP Animations
Add this to `App.jsx`:
```jsx
// Enable GSAP debug logging
gsap.registerPlugin(gsap.debug)
```

### Profile Performance
Use Chrome DevTools:
1. Open DevTools (F12)
2. Performance tab → Record
3. Interact with site
4. Stop recording → Analyze

## 💡 Tips & Tricks

### Add More Sections
1. Create `src/components/sections/NewSection.jsx`
2. Import in `App.jsx`
3. Add to main render
4. Add nav link in `Navigation.jsx`

### Change Fonts
Edit `tailwind.config.js`:
```js
fontFamily: {
  serif: ['Playfair Display', 'serif'],
  sans: ['Inter', 'sans-serif'],
}
```

### Add Smooth Scroll
Already implemented! Uses native `scroll-smooth` + GSAP

### Custom Animations
Create new files in `src/hooks/` following `useScrollFadeIn.js` pattern

## 📚 Resources

- **GSAP Docs**: https://gsap.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev

## 🆘 Common Issues

**Q: Animations not working**
A: Ensure `isReducedMotion` is `false` and GSAP plugins are registered

**Q: Images not loading**
A: Place images in `public/` folder and reference as `/images/name.jpg`

**Q: Parallax jittery**
A: Reduce number of parallax layers or check for JavaScript errors

**Q: Mobile looks wrong**
A: Open DevTools → Toggle device toolbar → Test viewport

**Q: Build fails**
A: Run `npm install` again, clear `node_modules`, restart dev server

## 🎬 Next Steps

1. ✅ Customize all text content
2. ✅ Add your own images
3. ✅ Update colors if desired
4. ✅ Test on mobile device
5. ✅ Deploy to production
6. ✅ Share your portfolio!

---

**Questions?** Check README.md or inspect component source code for detailed comments.

Happy building! 🚀✨
