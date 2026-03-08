const fs = require('fs');
const path = require('path');

const PERFORMANCE_BUDGETS = {
  javascript: 100 * 1024,
  css: 50 * 1024,
  image: 200 * 1024,
  total: 500 * 1024
};

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (e) {
    return 0;
  }
}

function walkDir(dir, callback) {
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

function analyzePerformance() {
  const results = {
    violations: [],
    warnings: [],
    summary: {
      totalJS: 0,
      totalCSS: 0,
      totalImages: 0,
      totalHTML: 0,
      fileCount: { js: 0, css: 0, images: 0, html: 0 }
    }
  };

  walkDir('.', (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const size = getFileSize(filePath);

    if (ext === '.js') {
      results.summary.totalJS += size;
      results.summary.fileCount.js++;
      if (size > PERFORMANCE_BUDGETS.javascript) {
        results.violations.push({
          file: filePath,
          type: 'JavaScript',
          size: size,
          budget: PERFORMANCE_BUDGETS.javascript,
          message: `${filePath} (${formatBytes(size)}) exceeds ${formatBytes(PERFORMANCE_BUDGETS.javascript)} budget`
        });
      }
    } else if (ext === '.css') {
      results.summary.totalCSS += size;
      results.summary.fileCount.css++;
      if (size > PERFORMANCE_BUDGETS.css) {
        results.violations.push({
          file: filePath,
          type: 'CSS',
          size: size,
          budget: PERFORMANCE_BUDGETS.css,
          message: `${filePath} (${formatBytes(size)}) exceeds ${formatBytes(PERFORMANCE_BUDGETS.css)} budget`
        });
      }
    } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
      results.summary.totalImages += size;
      results.summary.fileCount.images++;
      if (size > PERFORMANCE_BUDGETS.image) {
        results.warnings.push({
          file: filePath,
          type: 'Image',
          size: size,
          budget: PERFORMANCE_BUDGETS.image,
          message: `${filePath} (${formatBytes(size)}) exceeds ${formatBytes(PERFORMANCE_BUDGETS.image)} budget. Consider optimization.`
        });
      }
    } else if (ext === '.html') {
      results.summary.totalHTML += size;
      results.summary.fileCount.html++;
    }
  });

  const totalSize = results.summary.totalJS + results.summary.totalCSS + 
                    results.summary.totalImages + results.summary.totalHTML;

  console.log('\n=== Performance Budget Analysis ===\n');
  console.log('Summary:');
  console.log(`  JavaScript: ${formatBytes(results.summary.totalJS)} (${results.summary.fileCount.js} files)`);
  console.log(`  CSS:        ${formatBytes(results.summary.totalCSS)} (${results.summary.fileCount.css} files)`);
  console.log(`  Images:     ${formatBytes(results.summary.totalImages)} (${results.summary.fileCount.images} files)`);
  console.log(`  HTML:       ${formatBytes(results.summary.totalHTML)} (${results.summary.fileCount.html} files)`);
  console.log(`  Total:      ${formatBytes(totalSize)}`);

  if (results.violations.length > 0) {
    console.log('\nViolations:');
    results.violations.forEach(v => console.log(`  [ERROR] ${v.message}`));
  }

  if (results.warnings.length > 0) {
    console.log('\nWarnings:');
    results.warnings.forEach(w => console.log(`  [WARN] ${w.message}`));
  }

  if (results.violations.length === 0 && results.warnings.length === 0) {
    console.log('\nAll files within performance budgets.');
  }

  return results;
}

const results = analyzePerformance();
process.exit(results.violations.length > 0 ? 1 : 0);
