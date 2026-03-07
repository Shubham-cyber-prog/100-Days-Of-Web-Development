const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.gif'];

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.git')) {
        walkDir(filePath, callback);
      }
    } else {
      callback(filePath);
    }
  });
}

function optimizeImages(sourceDir = '.', options = {}) {
  const { convertToWebP = false, quality = 80, maxSize = 200 * 1024 } = options;
  const images = [];

  walkDir(sourceDir, (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (SUPPORTED_FORMATS.includes(ext)) {
      const stat = fs.statSync(filePath);
      if (stat.size > maxSize) {
        images.push({
          path: filePath,
          size: stat.size
        });
      }
    }
  });

  console.log(`\nFound ${images.length} images exceeding ${Math.round(maxSize / 1024)}KB threshold.\n`);

  images.forEach(img => {
    console.log(`Processing: ${img.path}`);
    
    if (convertToWebP) {
      const webpPath = img.path.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
      try {
        console.log(`  Recommendation: Convert to WebP using:`);
        console.log(`    cwebp -q ${quality} "${img.path}" -o "${webpPath}"`);
      } catch (e) {
        console.log(`  Error: ${e.message}`);
      }
    }

    console.log(`  Current size: ${Math.round(img.size / 1024)}KB`);
    console.log(`  Suggested optimizations:`);
    console.log(`    1. Use image compression tools (imagemin, squoosh)`);
    console.log(`    2. Convert to WebP format`);
    console.log(`    3. Use responsive images with srcset`);
    console.log(`    4. Implement lazy loading`);
    console.log('');
  });

  if (images.length === 0) {
    console.log('All images are within size limits.');
  }

  return images;
}

function generateReport(outputFile = 'image-optimization-report.md') {
  const images = [];
  
  walkDir('.', (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
      const stat = fs.statSync(filePath);
      images.push({
        path: filePath,
        size: stat.size,
        format: ext.substring(1).toUpperCase()
      });
    }
  });

  let report = `# Image Optimization Report\n\n`;
  report += `Generated: ${new Date().toISOString()}\n\n`;
  report += `## Summary\n\n`;
  report += `Total images: ${images.length}\n`;
  report += `Total size: ${Math.round(images.reduce((a, b) => a + b.size, 0) / 1024)}KB\n\n`;
  report += `## Images by Format\n\n`;
  
  const byFormat = {};
  images.forEach(img => {
    byFormat[img.format] = byFormat[img.format] || { count: 0, size: 0 };
    byFormat[img.format].count++;
    byFormat[img.format].size += img.size;
  });

  Object.entries(byFormat).forEach(([format, data]) => {
    report += `- ${format}: ${data.count} files, ${Math.round(data.size / 1024)}KB\n`;
  });

  report += `\n## Large Images (> 200KB)\n\n`;
  const largeImages = images.filter(img => img.size > 200 * 1024);
  if (largeImages.length > 0) {
    largeImages.forEach(img => {
      report += `- ${img.path}: ${Math.round(img.size / 1024)}KB\n`;
    });
  } else {
    report += `None found.\n`;
  }

  report += `\n## Recommendations\n\n`;
  report += `1. Convert PNG/JPG images to WebP for better compression\n`;
  report += `2. Use responsive images with srcset attribute\n`;
  report += `3. Implement lazy loading for images below the fold\n`;
  report += `4. Consider using SVG for icons and simple graphics\n`;

  fs.writeFileSync(outputFile, report);
  console.log(`\nReport saved to: ${outputFile}`);
}

const args = process.argv.slice(2);
const command = args[0];

if (command === 'report') {
  generateReport();
} else {
  optimizeImages(args[0] || '.', { convertToWebP: true });
}
