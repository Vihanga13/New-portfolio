# Image Integration Guide

## Adding Images to Your Portfolio

This guide shows you how to replace placeholder images with your actual photos.

## Step 1: Prepare Your Images

### Image Requirements
- **Format**: PNG (with transparency) or JPG
- **Dimensions**: 1200px × 1600px (for portraits), 1200px × 900px (for landscape)
- **File Size**: 50-100KB per image (use compression tools)
- **Quality**: High contrast, professional, black & white or easily convertible
- **Style**: Sharp cutouts, intentional lighting, cinematic feel

### Compression Tools
- **TinyPNG** (tinypng.com) - PNG/JPG compression
- **Squoosh** (squoosh.app) - Google's compression tool
- **ImageOptim** (imageoptim.com) - Mac only
- **Caesium** - Windows/Linux tool

## Step 2: Organize Images

Create this folder structure:
```
Portfolio/
└── public/
    └── images/
        ├── hero-portrait.png
        ├── about-portrait.png
        ├── project-1.jpg
        ├── project-2.jpg
        ├── project-3.jpg
        ├── project-4.jpg
        ├── project-5.jpg
        ├── project-6.jpg
        ├── process-1.jpg
        ├── process-2.jpg
        ├── process-3.jpg
        ├── process-4.jpg
        ├── journal-1.jpg
        ├── journal-2.jpg
        ├── journal-3.jpg
        └── contact-portrait.png
```

## Step 3: Update Components

### Hero Section
File: `src/components/sections/Hero.jsx`

**Before:**
```jsx
<div className="w-full h-full bg-gradient-to-b from-gray-dark to-black-deep flex items-center justify-center text-2xl opacity-0">
  Portrait Cutout
</div>
```

**After:**
```jsx
<img 
  src="/images/hero-portrait.png" 
  alt="Vihanga - Creative technologist" 
  className="w-full h-full object-cover"
/>
```

### About Section
File: `src/components/sections/About.jsx`

**Before:**
```jsx
<div className="w-full h-full flex items-center justify-center text-white/40">Cutout</div>
```

**After:**
```jsx
<img 
  src="/images/about-portrait.png" 
  alt="Vihanga - About" 
  className="w-full h-full object-cover"
/>
```

### Work/Projects Section
File: `src/components/sections/Work.jsx`

**Before:**
```jsx
<div className="project-image w-full h-full bg-gradient-to-br from-gray-dark to-black-primary flex items-center justify-center text-white/30">
  Project {index + 1}
</div>
```

**After:**
```jsx
const projectImages = [
  '/images/project-1.jpg',
  '/images/project-2.jpg',
  '/images/project-3.jpg',
  '/images/project-4.jpg',
  '/images/project-5.jpg',
  '/images/project-6.jpg',
]

// In the map function:
<img 
  src={projectImages[index]} 
  alt={project.title}
  className="project-image w-full h-full object-cover"
/>
```

### Process Section
File: `src/components/sections/Process.jsx`

**Before:**
```jsx
<div className="w-full h-full flex items-center justify-center text-white/30">Process {index + 1}</div>
```

**After:**
```jsx
const processImages = [
  '/images/process-1.jpg',
  '/images/process-2.jpg',
  '/images/process-3.jpg',
  '/images/process-4.jpg',
]

// In the map function:
<img 
  src={processImages[index]} 
  alt={`${step.title} - Process`}
  className="w-full h-full object-cover"
/>
```

### Journal Section
File: `src/components/sections/Journal.jsx`

**Before:**
```jsx
<div className="w-full h-full flex items-center justify-center text-white/30">Entry {index + 1}</div>
```

**After:**
```jsx
const journalImages = [
  '/images/journal-1.jpg',
  '/images/journal-2.jpg',
  '/images/journal-3.jpg',
]

// In the map function:
<img 
  src={journalImages[index]} 
  alt={entry.title}
  className="w-full h-full object-cover"
/>
```

### Contact Section
File: `src/components/sections/Contact.jsx`

**Before:**
```jsx
<div className="w-full h-full bg-gradient-to-br from-black to-black-primary shadow-2xl overflow-hidden flex items-center justify-center text-white/20">
  Contact Portrait
</div>
```

**After:**
```jsx
<img 
  src="/images/contact-portrait.png" 
  alt="Vihanga - Contact" 
  className="w-full h-full object-cover"
/>
```

## Step 4: Image Best Practices

### Aspect Ratios
```css
/* Portrait (3:4) */
.portrait { aspect-ratio: 3 / 4; }

/* Square (1:1) */
.square { aspect-ratio: 1 / 1; }

/* Landscape (4:3) */
.landscape { aspect-ratio: 4 / 3; }

/* Widescreen (16:9) */
.widescreen { aspect-ratio: 16 / 9; }
```

### Object Fit Options
```jsx
// Cover - Image fills container, may crop
<img className="object-cover" />

// Contain - Image fits inside, may have space
<img className="object-contain" />

// Fill - Image stretches to fill
<img className="object-fill" />
```

### Responsive Images
```jsx
<img 
  src="/images/hero-portrait.png"
  alt="Hero portrait"
  className="w-full h-full object-cover"
  loading="lazy" {/* Native lazy loading */}
/>
```

## Step 5: Layered Images (Advanced)

For complex layered effects, use the `LayeredImage` component:

```jsx
import LayeredImage from '../LayeredImage'

<LayeredImage
  foreground="/images/foreground-element.png"
  midground="/images/main-image.jpg"
  background="/images/background-blur.jpg"
  className="w-full aspect-video"
  isReducedMotion={isReducedMotion}
  onHover={true}
/>
```

This creates:
- **Foreground**: Small, sharp element in front
- **Midground**: Main image (moves most on scroll)
- **Background**: Blurred element behind (moves least)
- Different parallax speeds for depth

## Step 6: Testing

1. **Local Testing**
   ```bash
   npm run dev
   # Check images load correctly
   # Verify no broken image links
   ```

2. **Mobile Testing**
   ```bash
   # Open on phone/tablet
   # Verify images responsive
   # Check parallax on mobile
   ```

3. **Production Build**
   ```bash
   npm run build
   # Check dist/images/ folder
   # Verify file sizes
   npm run preview
   ```

## Image Naming Convention

Use descriptive names:
```
✅ hero-portrait.png
✅ about-vihanga.jpg
✅ project-temporal-archives.jpg
✅ process-ideation.jpg
✅ journal-negative-space.jpg

❌ image1.png
❌ photo.jpg
❌ pic.png
```

## Troubleshooting

### Images Not Loading
- Check file exists in `public/images/`
- Verify file name spelling (case-sensitive)
- Check browser console for 404 errors
- Ensure correct path: `/images/filename.ext`

### Images Look Blurry
- Increase image resolution
- Use higher quality compression
- Check CSS `object-fit` property

### Parallax Not Working
- Ensure `ParallaxLayer` wraps the image
- Check `isReducedMotion` is false
- Verify ScrollTrigger is registered

### Performance Issues
- Reduce image file sizes (<100KB)
- Use JPG for photos, PNG for graphics
- Implement lazy loading
- Check DevTools Performance tab

## Advanced: Image Optimization Script

For batch compression, use ImageMagick:

```bash
# Convert to grayscale (if needed)
magick convert input.jpg -colorspace Gray output.jpg

# Compress with quality 85
magick convert input.jpg -quality 85 output.jpg

# Resize to max width 1200px
magick convert input.jpg -resize 1200x output.jpg
```

## Format Recommendations

| Use Case | Format | Quality | Size |
|----------|--------|---------|------|
| Portraits | PNG + JPG | 85-90% | 60-100KB |
| Projects | JPG | 85% | 80-120KB |
| Process | JPG | 80% | 70-100KB |
| Journal | JPG | 80% | 60-90KB |
| Backgrounds | JPG | 75% | 50-80KB |

## SEO & Accessibility

Always include alt text:

```jsx
<img 
  src="/images/project.jpg"
  alt="Temporal Archives - Interactive Experience Project"
  className="w-full h-full object-cover"
/>
```

Good alt text:
- Describes image content
- Includes relevant keywords
- Under 125 characters
- Not "image" or "photo"

## Summary

1. ✅ Prepare images (1200px, <100KB)
2. ✅ Place in `public/images/` folder
3. ✅ Update component imports
4. ✅ Replace placeholder divs with `<img>` tags
5. ✅ Test locally and in production
6. ✅ Verify responsive behavior

---

**Done!** Your portfolio now displays your actual images with cinematic styling.

Need more help? Check the component source code or refer to the main README.md
