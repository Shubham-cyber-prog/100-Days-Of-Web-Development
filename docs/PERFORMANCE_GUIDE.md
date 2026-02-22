# Performance Best Practices Guide

This guide covers performance optimization techniques for the 100 Days of Web Development project.

## Performance Budgets

| Resource | Budget | Description |
|----------|--------|-------------|
| JavaScript | < 100 KB | Per file, uncompressed |
| CSS | < 50 KB | Per file, uncompressed |
| Images | < 200 KB | Per image |
| Total Page Weight | < 500 KB | All resources combined |
| Time to Interactive | < 3 seconds | On 4G network |

## Image Optimization

### 1. Use WebP Format

WebP provides superior compression compared to JPEG and PNG.

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### 2. Lazy Loading

Implement lazy loading for images below the fold:

```html
<img src="image.jpg" loading="lazy" alt="Description">
```

### 3. Responsive Images

Use srcset for responsive images:

```html
<img
  src="image-800.jpg"
  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  alt="Description">
```

### 4. Image Compression Tools

- **Squoosh**: Online image optimizer (https://squoosh.app)
- **ImageMagick**: Command-line tool
- **sharp**: Node.js image processing library

```bash
# Convert to WebP
cwebp -q 80 input.jpg -o output.webp

# Resize image
convert input.jpg -resize 800x600 output.jpg
```

## JavaScript Optimization

### 1. Minification

Always minify JavaScript for production:

```bash
# Using terser
terser input.js -o output.min.js -c -m
```

### 2. Code Splitting

Split large JavaScript files into smaller chunks:

```javascript
// Dynamic imports for code splitting
const module = await import('./module.js');
```

### 3. Defer Non-Critical Scripts

```html
<script src="analytics.js" defer></script>
<script src="non-critical.js" async></script>
```

### 4. Remove Unused Code

Use tree-shaking to eliminate dead code:

```javascript
// Import only what you need
import { specificFunction } from 'library';
```

## CSS Optimization

### 1. Minification

Minify CSS for production:

```bash
# Using cssnano
cssnano input.css output.min.css
```

### 2. Critical CSS

Extract and inline critical CSS:

```html
<head>
  <style>
    /* Critical CSS here */
    .hero { ... }
    .nav { ... }
  </style>
  <link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
</head>
```

### 3. Remove Unused CSS

Use PurgeCSS to remove unused styles:

```bash
purgecss --css styles.css --content index.html -o output/
```

## Font Loading

### 1. Use font-display

```css
@font-face {
  font-family: 'Inter';
  src: url('inter.woff2') format('woff2');
  font-display: swap;
}
```

### 2. Preload Critical Fonts

```html
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

### 3. Limit Font Weights

Only include font weights you actually use:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">
```

## Caching Strategies

### 1. Browser Caching

Configure appropriate cache headers:

```
# Static assets - long cache
Cache-Control: max-age=31536000, immutable

# HTML - short cache
Cache-Control: max-age=3600
```

### 2. Service Worker Caching

Implement cache-first strategy for static assets:

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

## Performance Testing

### 1. Lighthouse

Run Lighthouse audits regularly:

```bash
lighthouse https://your-site.com --view
```

### 2. Web Vitals

Monitor Core Web Vitals:

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### 3. Bundle Analysis

Analyze bundle sizes:

```bash
# Analyze JavaScript bundle
npx source-map-explorer bundle.js
```

## Checklist for New Projects

- [ ] Images compressed and converted to WebP
- [ ] Lazy loading implemented for offscreen images
- [ ] JavaScript minified and code-split
- [ ] CSS minified and unused styles removed
- [ ] Critical CSS inlined
- [ ] Fonts preloaded with font-display: swap
- [ ] Service worker caching implemented
- [ ] Lighthouse score > 90 for performance
- [ ] Core Web Vitals passing

## Tools

| Tool | Purpose |
|------|---------|
| Lighthouse | Performance auditing |
| WebPageTest | Detailed performance analysis |
| Chrome DevTools | Real-time performance profiling |
| Bundlephobia | NPM package size analysis |
| Squoosh | Image compression |
| cssnano | CSS minification |
| terser | JavaScript minification |
