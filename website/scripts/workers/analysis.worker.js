/**
 * Zenith Project Grader - Analysis Worker
 * Performs heavy static analysis on project source code without blocking the main UI thread.
 */

self.onmessage = function (e) {
    const { html, css, js } = e.data;
    const results = {
        semantics: [],
        accessibility: [],
        performance: [],
        bestPractices: [],
        score: 100
    };

    // 1. Analyze HTML Semantics
    analyzeHTML(html, results);

    // 2. Analyze CSS
    analyzeCSS(css, results);

    // 3. Analyze JS
    analyzeJS(js, results);

    // Calculate final score
    results.score = Math.max(0, results.score);

    self.postMessage(results);
};

function analyzeHTML(html, results) {
    if (!html) return;

    // Check for semantic elements
    const semanticElements = ['header', 'main', 'footer', 'nav', 'section', 'article'];
    semanticElements.forEach(el => {
        const regex = new RegExp(`<${el}[\\s>]`, 'i');
        if (!regex.test(html)) {
            results.semantics.push({
                type: 'warning',
                message: `Missing semantic <${el}> tag. Using semantic HTML improves SEO and accessibility.`,
                impact: 5
            });
            results.score -= 5;
        }
    });

    // Check for H1
    if (!/<h1[\s>]/.test(html)) {
        results.semantics.push({
            type: 'error',
            message: 'Missing <h1> tag. Every page should have one main heading.',
            impact: 10
        });
        results.score -= 10;
    }

    // Check for alt tags on images
    const imgMatches = html.match(/<img[^>]*>/gi) || [];
    imgMatches.forEach(img => {
        if (!/alt=["'][^"']*["']/i.test(img)) {
            results.accessibility.push({
                type: 'error',
                message: 'Image missing "alt" attribute.',
                snippet: img.substring(0, 50) + '...',
                impact: 8
            });
            results.score -= 8;
        }
    });

    // Check for title tag
    if (!/<title>/.test(html)) {
        results.semantics.push({
            type: 'warning',
            message: 'Missing <title> tag for SEO.',
            impact: 5
        });
        results.score -= 5;
    }
}

function analyzeCSS(css, results) {
    if (!css) return;

    // Check for high specificity or bad practices
    if (css.includes('!important')) {
        results.bestPractices.push({
            type: 'warning',
            message: 'Avoid using !important. It makes CSS difficult to maintain.',
            impact: 3
        });
        results.score -= 3;
    }

    // Check for responsiveness
    if (!css.includes('@media')) {
        results.performance.push({
            type: 'warning',
            message: 'No Media Queries found. Ensure your design is responsive.',
            impact: 10
        });
        results.score -= 10;
    }
}

function analyzeJS(js, results) {
    if (!js) return;

    // Check for eval()
    if (/eval\(/.test(js)) {
        results.performance.push({
            type: 'error',
            message: 'Usage of eval() detected. This is a security risk and poor for performance.',
            impact: 20
        });
        results.score -= 20;
    }

    // Check for console logs
    const logs = (js.match(/console\.log/g) || []).length;
    if (logs > 5) {
        results.bestPractices.push({
            type: 'warning',
            message: `Found ${logs} console.log statements. Clean up your code for production.`,
            impact: 2
        });
        results.score -= 2;
    }

    // Check for var instead of const/let
    if (/\bvar\b/.test(js)) {
        results.bestPractices.push({
            type: 'warning',
            message: 'Prefer "const" or "let" over "var" for better scoping.',
            impact: 5
        });
        results.score -= 5;
    }
}
