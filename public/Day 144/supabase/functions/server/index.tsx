import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1a865b52/health", (c) => {
  return c.json({ status: "ok" });
});

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// Sign up new user
app.post("/make-server-1a865b52/auth/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || email.split('@')[0] },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Error during signup for ${email}: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.log(`Exception during signup: ${error}`);
    return c.json({ error: "Signup failed" }, 500);
  }
});

// ============================================
// SEO ANALYZER ROUTES
// ============================================

// Analyze website SEO
app.post("/make-server-1a865b52/seo/analyze", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { url } = body;

    if (!url) {
      return c.json({ error: "URL is required" }, 400);
    }

    // Fetch webpage content
    let htmlContent = '';
    try {
      const response = await fetch(url);
      htmlContent = await response.text();
    } catch (fetchError) {
      console.log(`Error fetching URL ${url}: ${fetchError}`);
      return c.json({ error: "Failed to fetch URL" }, 400);
    }

    // Basic SEO analysis
    const analysis = analyzeSEO(htmlContent, url);

    // Call OpenAI for AI-powered suggestions
    const aiSuggestions = await getAISuggestions(url, analysis);
    
    // Combine results
    const result = {
      ...analysis,
      aiSuggestions,
      analyzedAt: new Date().toISOString(),
      url
    };

    // Save to database
    const analysisId = `analysis:${user.id}:${Date.now()}`;
    await kv.set(analysisId, result);

    // Also save to user's history
    const userHistoryKey = `user:${user.id}:analyses`;
    const history = await kv.get(userHistoryKey) || [];
    history.unshift({ id: analysisId, url, score: result.score, date: result.analyzedAt });
    if (history.length > 50) history.length = 50; // Keep last 50
    await kv.set(userHistoryKey, history);

    return c.json(result);
  } catch (error) {
    console.log(`Error during SEO analysis: ${error}`);
    return c.json({ error: "Analysis failed" }, 500);
  }
});

// Get analysis history
app.get("/make-server-1a865b52/seo/history", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userHistoryKey = `user:${user.id}:analyses`;
    const history = await kv.get(userHistoryKey) || [];

    return c.json({ history });
  } catch (error) {
    console.log(`Error fetching analysis history: ${error}`);
    return c.json({ error: "Failed to fetch history" }, 500);
  }
});

// ============================================
// CONTENT OPTIMIZER ROUTES
// ============================================

// Optimize content with AI
app.post("/make-server-1a865b52/content/optimize", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { content, targetKeywords = [] } = body;

    if (!content) {
      return c.json({ error: "Content is required" }, 400);
    }

    // Analyze content
    const contentAnalysis = analyzeContent(content, targetKeywords);

    // Get AI optimization suggestions
    const aiOptimizations = await getContentOptimization(content, targetKeywords, contentAnalysis);

    const result = {
      ...contentAnalysis,
      ...aiOptimizations,
      analyzedAt: new Date().toISOString()
    };

    return c.json(result);
  } catch (error) {
    console.log(`Error during content optimization: ${error}`);
    return c.json({ error: "Content optimization failed" }, 500);
  }
});

// ============================================
// KEYWORD TRACKER ROUTES
// ============================================

// Add keyword to track
app.post("/make-server-1a865b52/keywords/add", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { keyword, url, targetLocation = 'Global' } = body;

    if (!keyword || !url) {
      return c.json({ error: "Keyword and URL are required" }, 400);
    }

    const keywordId = `keyword:${user.id}:${Date.now()}`;
    const keywordData = {
      id: keywordId,
      keyword,
      url,
      targetLocation,
      addedAt: new Date().toISOString(),
      currentRank: Math.floor(Math.random() * 100) + 1, // Simulated rank
      previousRank: null,
      history: []
    };

    await kv.set(keywordId, keywordData);

    // Add to user's keywords list
    const userKeywordsKey = `user:${user.id}:keywords`;
    const keywords = await kv.get(userKeywordsKey) || [];
    keywords.push(keywordId);
    await kv.set(userKeywordsKey, keywords);

    return c.json(keywordData);
  } catch (error) {
    console.log(`Error adding keyword: ${error}`);
    return c.json({ error: "Failed to add keyword" }, 500);
  }
});

// Get all tracked keywords
app.get("/make-server-1a865b52/keywords/list", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userKeywordsKey = `user:${user.id}:keywords`;
    const keywordIds = await kv.get(userKeywordsKey) || [];
    
    const keywords = await kv.mget(keywordIds);

    return c.json({ keywords: keywords.filter(k => k !== null) });
  } catch (error) {
    console.log(`Error fetching keywords: ${error}`);
    return c.json({ error: "Failed to fetch keywords" }, 500);
  }
});

// Delete keyword
app.delete("/make-server-1a865b52/keywords/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const keywordId = c.req.param('id');
    
    // Remove from user's keywords list
    const userKeywordsKey = `user:${user.id}:keywords`;
    const keywords = await kv.get(userKeywordsKey) || [];
    const updatedKeywords = keywords.filter((id: string) => id !== keywordId);
    await kv.set(userKeywordsKey, updatedKeywords);

    // Delete the keyword data
    await kv.del(keywordId);

    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting keyword: ${error}`);
    return c.json({ error: "Failed to delete keyword" }, 500);
  }
});

// ============================================
// COMPETITOR ANALYSIS ROUTES
// ============================================

app.post("/make-server-1a865b52/competitor/analyze", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { yourUrl, competitorUrl } = body;

    if (!yourUrl || !competitorUrl) {
      return c.json({ error: "Both URLs are required" }, 400);
    }

    // Fetch and analyze both sites
    const yourAnalysis = await fetchAndAnalyzeSite(yourUrl);
    const competitorAnalysis = await fetchAndAnalyzeSite(competitorUrl);

    // Create comparison data
    const radarData = [
      { metric: 'SEO Score', yourSite: yourAnalysis.score, competitor: competitorAnalysis.score },
      { metric: 'Content Quality', yourSite: yourAnalysis.contentScore, competitor: competitorAnalysis.contentScore },
      { metric: 'Technical SEO', yourSite: yourAnalysis.technicalScore, competitor: competitorAnalysis.technicalScore },
      { metric: 'Mobile Friendly', yourSite: yourAnalysis.mobileScore, competitor: competitorAnalysis.mobileScore },
      { metric: 'Page Speed', yourSite: yourAnalysis.speedScore, competitor: competitorAnalysis.speedScore }
    ];

    const detailedMetrics = [
      {
        name: 'Title Tag Optimization',
        yourScore: yourAnalysis.titleScore,
        competitorScore: competitorAnalysis.titleScore,
        yourValue: `${yourAnalysis.title?.length || 0} chars`,
        competitorValue: `${competitorAnalysis.title?.length || 0} chars`
      },
      {
        name: 'Meta Description',
        yourScore: yourAnalysis.metaScore,
        competitorScore: competitorAnalysis.metaScore,
        yourValue: `${yourAnalysis.metaDescription?.length || 0} chars`,
        competitorValue: `${competitorAnalysis.metaDescription?.length || 0} chars`
      },
      {
        name: 'Heading Structure',
        yourScore: yourAnalysis.headingScore,
        competitorScore: competitorAnalysis.headingScore,
        yourValue: `H1:${yourAnalysis.h1Count}, H2:${yourAnalysis.h2Count}`,
        competitorValue: `H1:${competitorAnalysis.h1Count}, H2:${competitorAnalysis.h2Count}`
      },
      {
        name: 'Image Optimization',
        yourScore: yourAnalysis.imageScore,
        competitorScore: competitorAnalysis.imageScore,
        yourValue: `${yourAnalysis.imagesWithAlt}/${yourAnalysis.totalImages} with alt`,
        competitorValue: `${competitorAnalysis.imagesWithAlt}/${competitorAnalysis.totalImages} with alt`
      }
    ];

    // Get AI recommendations
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    let recommendations = [
      'Improve your title tag length and keyword placement',
      'Add more descriptive meta descriptions',
      'Enhance heading structure with better keyword targeting',
      'Optimize images with descriptive alt text',
      'Increase content length and quality'
    ];

    if (openaiKey) {
      try {
        const prompt = `Compare these two websites:\n\nYour Site: Score ${yourAnalysis.score}\nCompetitor: Score ${competitorAnalysis.score}\n\nProvide 5 specific strategies to outrank the competitor. Format as JSON array.`;
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are an SEO competitor analysis expert.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 500
          })
        });

        if (response.ok) {
          const data = await response.json();
          try {
            recommendations = JSON.parse(data.choices[0].message.content);
          } catch {
            recommendations = data.choices[0].message.content.split('\n').filter((s: string) => s.trim().length > 0);
          }
        }
      } catch (error) {
        console.log(`Error getting AI recommendations: ${error}`);
      }
    }

    const result = {
      yourSite: yourAnalysis,
      competitorSite: competitorAnalysis,
      radarData,
      detailedMetrics,
      recommendations,
      analyzedAt: new Date().toISOString()
    };

    return c.json(result);
  } catch (error) {
    console.log(`Error during competitor analysis: ${error}`);
    return c.json({ error: "Competitor analysis failed" }, 500);
  }
});

// ============================================
// BACKLINK CHECKER ROUTES
// ============================================

app.post("/make-server-1a865b52/backlinks/analyze", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { url } = body;

    if (!url) {
      return c.json({ error: "URL is required" }, 400);
    }

    // Generate mock backlink data (in production, use a real backlink API)
    const totalBacklinks = Math.floor(Math.random() * 5000) + 500;
    const domainAuthority = Math.floor(Math.random() * 40) + 50;
    const referringDomains = Math.floor(totalBacklinks / 3);
    const trustFlow = Math.floor(Math.random() * 30) + 40;

    const topBacklinks = Array.from({ length: 10 }, (_, i) => ({
      sourceUrl: `https://example-${i}.com/article`,
      sourceDomain: `example-${i}.com`,
      anchorText: ['SEO tools', 'optimization guide', 'best practices', 'learn more', url][Math.floor(Math.random() * 5)],
      domainAuthority: Math.floor(Math.random() * 50) + 40,
      isDofollow: Math.random() > 0.3,
      quality: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
      date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));

    const growthData = Array.from({ length: 12 }, (_, i) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      backlinks: Math.floor((totalBacklinks / 12) * (i + 1) + Math.random() * 200)
    }));

    const qualityDistribution = [
      { name: 'High Quality', value: Math.floor(totalBacklinks * 0.3) },
      { name: 'Medium Quality', value: Math.floor(totalBacklinks * 0.5) },
      { name: 'Low Quality', value: Math.floor(totalBacklinks * 0.15) },
      { name: 'Toxic', value: Math.floor(totalBacklinks * 0.05) }
    ];

    const anchorTextData = [
      { text: 'Brand Name', count: Math.floor(totalBacklinks * 0.4) },
      { text: 'URL', count: Math.floor(totalBacklinks * 0.25) },
      { text: 'Generic', count: Math.floor(totalBacklinks * 0.2) },
      { text: 'Keywords', count: Math.floor(totalBacklinks * 0.15) }
    ];

    const recommendations = [
      'Focus on acquiring high-authority backlinks from DA 50+ domains',
      'Diversify your anchor text profile to avoid over-optimization',
      'Remove or disavow toxic backlinks to protect your domain authority',
      'Create linkable assets like original research and infographics',
      'Reach out to websites that link to your competitors'
    ];

    const result = {
      totalBacklinks,
      domainAuthority,
      referringDomains,
      trustFlow,
      topBacklinks,
      growthData,
      qualityDistribution,
      anchorTextData,
      recommendations,
      analyzedAt: new Date().toISOString()
    };

    // Save to database
    const analysisId = `backlink:${user.id}:${Date.now()}`;
    await kv.set(analysisId, { url, ...result });

    const userBacklinksKey = `user:${user.id}:backlinks`;
    const history = await kv.get(userBacklinksKey) || [];
    history.unshift({ id: analysisId, url, totalBacklinks, domainAuthority, date: result.analyzedAt });
    if (history.length > 20) history.length = 20;
    await kv.set(userBacklinksKey, history);

    return c.json(result);
  } catch (error) {
    console.log(`Error during backlink analysis: ${error}`);
    return c.json({ error: "Backlink analysis failed" }, 500);
  }
});

app.get("/make-server-1a865b52/backlinks/list", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userBacklinksKey = `user:${user.id}:backlinks`;
    const backlinks = await kv.get(userBacklinksKey) || [];

    return c.json({ backlinks });
  } catch (error) {
    console.log(`Error fetching backlinks: ${error}`);
    return c.json({ error: "Failed to fetch backlinks" }, 500);
  }
});

// ============================================
// SITE SPEED MONITOR ROUTES
// ============================================

app.post("/make-server-1a865b52/speed/analyze", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { url } = body;

    if (!url) {
      return c.json({ error: "URL is required" }, 400);
    }

    // Generate mock performance data
    const desktopScore = Math.floor(Math.random() * 40) + 60;
    const mobileScore = Math.floor(Math.random() * 35) + 45;

    const coreWebVitals = [
      {
        name: 'LCP (Largest Contentful Paint)',
        value: `${(Math.random() * 2 + 1.5).toFixed(1)}s`,
        description: 'Measures loading performance',
        status: Math.random() > 0.5 ? 'good' : 'needs-improvement',
        percentile: Math.floor(Math.random() * 40) + 60
      },
      {
        name: 'FID (First Input Delay)',
        value: `${Math.floor(Math.random() * 100 + 50)}ms`,
        description: 'Measures interactivity',
        status: Math.random() > 0.3 ? 'good' : 'needs-improvement',
        percentile: Math.floor(Math.random() * 40) + 60
      },
      {
        name: 'CLS (Cumulative Layout Shift)',
        value: (Math.random() * 0.2).toFixed(3),
        description: 'Measures visual stability',
        status: Math.random() > 0.4 ? 'good' : 'needs-improvement',
        percentile: Math.floor(Math.random() * 40) + 60
      }
    ];

    const loadTimeBreakdown = [
      { phase: 'DNS Lookup', desktop: Math.floor(Math.random() * 50) + 20, mobile: Math.floor(Math.random() * 100) + 50 },
      { phase: 'Connection', desktop: Math.floor(Math.random() * 100) + 50, mobile: Math.floor(Math.random() * 150) + 80 },
      { phase: 'Server Response', desktop: Math.floor(Math.random() * 200) + 100, mobile: Math.floor(Math.random() * 300) + 150 },
      { phase: 'Content Download', desktop: Math.floor(Math.random() * 300) + 200, mobile: Math.floor(Math.random() * 500) + 300 },
      { phase: 'DOM Processing', desktop: Math.floor(Math.random() * 400) + 300, mobile: Math.floor(Math.random() * 600) + 400 }
    ];

    const performanceTrend = Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      desktop: Math.floor(Math.random() * 20) + desktopScore - 10,
      mobile: Math.floor(Math.random() * 20) + mobileScore - 10
    }));

    const opportunities = [
      { 
        title: 'Eliminate render-blocking resources',
        description: 'Remove unused CSS and JavaScript that blocks initial render',
        impact: 'high',
        savings: '0.8s'
      },
      { 
        title: 'Properly size images',
        description: 'Serve appropriately sized images to save bandwidth',
        impact: 'high',
        savings: '1.2s'
      },
      { 
        title: 'Enable text compression',
        description: 'Compress text-based resources with gzip or brotli',
        impact: 'medium',
        savings: '0.4s'
      },
      { 
        title: 'Reduce server response time',
        description: 'Optimize backend processing and database queries',
        impact: 'medium',
        savings: '0.5s'
      },
      { 
        title: 'Minify CSS and JavaScript',
        description: 'Remove unnecessary characters from code files',
        impact: 'low',
        savings: '0.2s'
      }
    ];

    const diagnostics = [
      { name: 'Uses efficient cache policy', value: '12 resources', passed: false },
      { name: 'Avoid enormous network payloads', value: '2.4 MB', passed: false },
      { name: 'Serves images in next-gen formats', value: '0.8 MB savings', passed: false },
      { name: 'Minimize main-thread work', value: '3.2s', passed: false },
      { name: 'Reduce JavaScript execution time', value: '1.8s', passed: true }
    ];

    const result = {
      desktop: { score: desktopScore },
      mobile: { score: mobileScore },
      coreWebVitals,
      loadTimeBreakdown,
      performanceTrend,
      opportunities,
      diagnostics,
      analyzedAt: new Date().toISOString()
    };

    return c.json(result);
  } catch (error) {
    console.log(`Error during speed analysis: ${error}`);
    return c.json({ error: "Speed analysis failed" }, 500);
  }
});

// ============================================
// AI CONTENT GENERATOR ROUTES
// ============================================

app.post("/make-server-1a865b52/content/generate", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { contentType, topic, keywords, tone, additionalInfo } = body;

    if (!topic) {
      return c.json({ error: "Topic is required" }, 400);
    }

    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    let content = '';

    if (openaiKey) {
      try {
        const contentTypeInstructions = {
          blog: 'Write a comprehensive blog post (800-1000 words)',
          product: 'Write a compelling product description (200-300 words)',
          meta: 'Write a meta description (150-160 characters)',
          social: 'Write an engaging social media post (100-150 words)',
          email: 'Write persuasive email copy (300-400 words)',
          landing: 'Write landing page copy (500-700 words)'
        };

        const instruction = contentTypeInstructions[contentType as keyof typeof contentTypeInstructions] || contentTypeInstructions.blog;
        
        const prompt = `${instruction} about: ${topic}
        
${keywords && keywords.length > 0 ? `Target Keywords: ${keywords.join(', ')}` : ''}
Tone: ${tone}
${additionalInfo ? `Additional Instructions: ${additionalInfo}` : ''}

Make it SEO-optimized, engaging, and valuable for readers.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: `You are an expert content writer specializing in SEO-optimized content.` },
              { role: 'user', content: prompt }
            ],
            temperature: 0.8,
            max_tokens: 1500
          })
        });

        if (!response.ok) {
          throw new Error('OpenAI API error');
        }

        const data = await response.json();
        content = data.choices[0].message.content;
      } catch (error) {
        console.log(`Error generating content with AI: ${error}`);
        content = `# ${topic}\n\n[AI content generation requires OpenAI API key]\n\nThis is a placeholder for your ${contentType} content. Configure your OpenAI API key to generate AI-powered content automatically.\n\nYour topic: ${topic}\nKeywords: ${keywords ? keywords.join(', ') : 'None'}\nTone: ${tone}`;
      }
    } else {
      content = `# ${topic}\n\n[AI content generation requires OpenAI API key]\n\nThis is a placeholder for your ${contentType} content. Configure your OpenAI API key to generate AI-powered content automatically.\n\nYour topic: ${topic}\nKeywords: ${keywords ? keywords.join(', ') : 'None'}\nTone: ${tone}`;
    }

    // Calculate metadata
    const wordCount = content.split(/\s+/).length;
    const readingTime = `${Math.ceil(wordCount / 200)} min`;
    const keywordDensity = keywords && keywords.length > 0 
      ? ((keywords.filter(k => content.toLowerCase().includes(k.toLowerCase())).length / wordCount) * 100).toFixed(1)
      : '0.0';
    const seoScore = Math.min(100, 50 + (keywords ? keywords.length * 10 : 0) + Math.min(30, wordCount / 30));

    const metadata = {
      wordCount,
      readingTime,
      seoScore: Math.floor(seoScore),
      keywordDensity,
      seoTips: [
        'Include target keywords naturally in the first paragraph',
        'Use heading tags (H2, H3) to structure your content',
        'Add internal and external links to boost SEO',
        'Optimize images with descriptive alt text',
        'Keep paragraphs short for better readability'
      ]
    };

    return c.json({ content, metadata });
  } catch (error) {
    console.log(`Error during content generation: ${error}`);
    return c.json({ error: "Content generation failed" }, 500);
  }
});

// ============================================
// BULK URL ANALYZER ROUTES
// ============================================

app.post("/make-server-1a865b52/bulk/analyze", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return c.json({ error: "URLs array is required" }, 400);
    }

    if (urls.length > 50) {
      return c.json({ error: "Maximum 50 URLs allowed" }, 400);
    }

    // Analyze each URL
    const urlResults = [];
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      
      try {
        const response = await fetch(url);
        const html = await response.text();
        const analysis = analyzeSEO(html, url);
        
        urlResults.push({
          url,
          score: analysis.score,
          status: analysis.score >= 80 ? 'good' : analysis.score >= 50 ? 'warning' : 'error',
          title: analysis.title,
          metaDescription: analysis.metaDescription,
          issueCount: analysis.issues.length,
          issues: analysis.issues
        });
      } catch (error) {
        urlResults.push({
          url,
          score: 0,
          status: 'error',
          title: 'Error',
          metaDescription: 'Failed to fetch',
          issueCount: 1,
          issues: [{ type: 'error', message: 'Failed to analyze URL', priority: 'high' }]
        });
      }
    }

    // Calculate aggregated data
    const totalAnalyzed = urlResults.length;
    const averageScore = Math.floor(urlResults.reduce((sum, r) => sum + r.score, 0) / totalAnalyzed);
    const passedCount = urlResults.filter(r => r.score >= 80).length;
    const failedCount = urlResults.filter(r => r.score < 50).length;

    const scoreDistribution = [
      { range: '0-20', count: urlResults.filter(r => r.score < 20).length },
      { range: '20-40', count: urlResults.filter(r => r.score >= 20 && r.score < 40).length },
      { range: '40-60', count: urlResults.filter(r => r.score >= 40 && r.score < 60).length },
      { range: '60-80', count: urlResults.filter(r => r.score >= 60 && r.score < 80).length },
      { range: '80-100', count: urlResults.filter(r => r.score >= 80).length }
    ];

    const statusOverview = [
      { name: 'Good', value: urlResults.filter(r => r.status === 'good').length },
      { name: 'Warning', value: urlResults.filter(r => r.status === 'warning').length },
      { name: 'Error', value: urlResults.filter(r => r.status === 'error').length }
    ];

    // Find common issues
    const issueMap = new Map();
    urlResults.forEach(result => {
      result.issues.forEach((issue: any) => {
        const key = issue.message;
        issueMap.set(key, (issueMap.get(key) || 0) + 1);
      });
    });

    const commonIssues = Array.from(issueMap.entries())
      .map(([description, count]) => ({ description, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const recommendations = [
      'Focus on fixing high-priority issues across all pages',
      'Standardize title tag format and length across your site',
      'Ensure all images have descriptive alt text',
      'Implement a consistent meta description strategy',
      'Improve heading structure on pages with low scores'
    ];

    const result = {
      totalAnalyzed,
      averageScore,
      passedCount,
      failedCount,
      scoreDistribution,
      statusOverview,
      commonIssues,
      urlResults,
      recommendations,
      analyzedAt: new Date().toISOString()
    };

    return c.json(result);
  } catch (error) {
    console.log(`Error during bulk analysis: ${error}`);
    return c.json({ error: "Bulk analysis failed" }, 500);
  }
});

// ============================================
// HELPER FUNCTIONS
// ============================================

function analyzeSEO(html: string, url: string) {
  const issues: any[] = [];
  let score = 100;

  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : '';
  
  if (!title) {
    issues.push({ type: 'error', message: 'Missing page title', priority: 'high' });
    score -= 15;
  } else if (title.length < 30 || title.length > 60) {
    issues.push({ type: 'warning', message: `Title length is ${title.length} characters (optimal: 30-60)`, priority: 'medium' });
    score -= 5;
  }

  // Extract meta description
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const metaDescription = metaDescMatch ? metaDescMatch[1] : '';
  
  if (!metaDescription) {
    issues.push({ type: 'error', message: 'Missing meta description', priority: 'high' });
    score -= 15;
  } else if (metaDescription.length < 120 || metaDescription.length > 160) {
    issues.push({ type: 'warning', message: `Meta description length is ${metaDescription.length} characters (optimal: 120-160)`, priority: 'medium' });
    score -= 5;
  }

  // Check for h1 tags
  const h1Matches = html.match(/<h1[^>]*>/gi);
  if (!h1Matches || h1Matches.length === 0) {
    issues.push({ type: 'error', message: 'No H1 tag found', priority: 'high' });
    score -= 10;
  } else if (h1Matches.length > 1) {
    issues.push({ type: 'warning', message: `Multiple H1 tags found (${h1Matches.length})`, priority: 'low' });
    score -= 3;
  }

  // Check for images without alt text
  const imgMatches = html.match(/<img[^>]*>/gi) || [];
  const imgsWithoutAlt = imgMatches.filter(img => !img.includes('alt='));
  if (imgsWithoutAlt.length > 0) {
    issues.push({ type: 'warning', message: `${imgsWithoutAlt.length} images missing alt text`, priority: 'medium' });
    score -= Math.min(imgsWithoutAlt.length * 2, 10);
  }

  // Check for HTTPS
  if (!url.startsWith('https://')) {
    issues.push({ type: 'error', message: 'Site not using HTTPS', priority: 'high' });
    score -= 15;
  }

  // Check heading structure
  const h2Count = (html.match(/<h2[^>]*>/gi) || []).length;
  const h3Count = (html.match(/<h3[^>]*>/gi) || []).length;
  
  if (h2Count === 0 && h3Count === 0) {
    issues.push({ type: 'warning', message: 'Poor heading structure (no H2/H3 tags)', priority: 'medium' });
    score -= 8;
  }

  // Ensure score is within 0-100
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    issues,
    title,
    metaDescription,
    headingStructure: {
      h1: h1Matches?.length || 0,
      h2: h2Count,
      h3: h3Count
    },
    imageCount: imgMatches.length,
    imagesWithAlt: imgMatches.length - imgsWithoutAlt.length
  };
}

async function getAISuggestions(url: string, analysis: any) {
  try {
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiKey) {
      return {
        suggestions: [
          'Configure OpenAI API key to get AI-powered suggestions',
          'Improve title tag optimization',
          'Add more descriptive meta descriptions',
          'Optimize heading structure for better content hierarchy'
        ]
      };
    }

    const prompt = `Analyze this SEO audit for ${url}:
Score: ${analysis.score}/100
Issues: ${JSON.stringify(analysis.issues)}
Title: ${analysis.title || 'Missing'}
Meta Description: ${analysis.metaDescription || 'Missing'}

Provide 5 specific, actionable SEO improvement suggestions. Format as a JSON array of strings.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an SEO expert providing actionable optimization advice.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Try to parse JSON, fallback to splitting by lines
    try {
      const suggestions = JSON.parse(content);
      return { suggestions };
    } catch {
      const suggestions = content.split('\n').filter((s: string) => s.trim().length > 0);
      return { suggestions };
    }
  } catch (error) {
    console.log(`Error getting AI suggestions: ${error}`);
    return {
      suggestions: [
        'Optimize title tags with primary keywords',
        'Improve meta descriptions to increase click-through rates',
        'Add alt text to all images for better accessibility and SEO',
        'Create proper heading hierarchy (H1 > H2 > H3)',
        'Ensure fast page load times (< 3 seconds)'
      ]
    };
  }
}

function analyzeContent(content: string, targetKeywords: string[]) {
  const wordCount = content.split(/\s+/).length;
  const charCount = content.length;
  
  // Calculate keyword density
  const keywordDensities = targetKeywords.map(keyword => {
    const regex = new RegExp(keyword, 'gi');
    const matches = content.match(regex) || [];
    const density = (matches.length / wordCount) * 100;
    return { keyword, count: matches.length, density: density.toFixed(2) };
  });

  // Calculate readability score (simplified Flesch Reading Ease)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const syllables = wordCount * 1.5; // Rough approximation
  const readabilityScore = 206.835 - 1.015 * (wordCount / sentences) - 84.6 * (syllables / wordCount);

  return {
    wordCount,
    charCount,
    sentenceCount: sentences,
    readabilityScore: Math.max(0, Math.min(100, readabilityScore)).toFixed(1),
    keywordDensities,
    averageSentenceLength: (wordCount / sentences).toFixed(1)
  };
}

async function getContentOptimization(content: string, targetKeywords: string[], analysis: any) {
  try {
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiKey) {
      return {
        optimizationSuggestions: [
          'Configure OpenAI API key to get AI-powered content optimization',
          'Increase keyword density for target keywords',
          'Improve content readability',
          'Add more subheadings to break up content',
          'Include relevant internal and external links'
        ]
      };
    }

    const prompt = `Analyze this content for SEO optimization:
Word Count: ${analysis.wordCount}
Target Keywords: ${targetKeywords.join(', ')}
Readability Score: ${analysis.readabilityScore}

Content Preview: ${content.substring(0, 500)}...

Provide 5 specific content optimization suggestions to improve SEO. Format as a JSON array of strings.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an SEO content optimization expert.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const responseContent = data.choices[0].message.content;
    
    try {
      const optimizationSuggestions = JSON.parse(responseContent);
      return { optimizationSuggestions };
    } catch {
      const optimizationSuggestions = responseContent.split('\n').filter((s: string) => s.trim().length > 0);
      return { optimizationSuggestions };
    }
  } catch (error) {
    console.log(`Error getting content optimization: ${error}`);
    return {
      optimizationSuggestions: [
        'Optimize keyword placement in title and first paragraph',
        'Add more relevant subheadings (H2, H3) throughout content',
        'Increase content length to 1500+ words for better ranking',
        'Include more semantic keywords related to your main topic',
        'Add a clear call-to-action to improve engagement'
      ]
    };
  }
}

async function fetchAndAnalyzeSite(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const analysis = analyzeSEO(html, url);
    
    return {
      url,
      score: analysis.score,
      title: analysis.title,
      metaDescription: analysis.metaDescription,
      h1Count: analysis.headingStructure.h1,
      h2Count: analysis.headingStructure.h2,
      totalImages: analysis.imageCount,
      imagesWithAlt: analysis.imagesWithAlt,
      contentScore: Math.floor(Math.random() * 30) + 70,
      technicalScore: Math.floor(Math.random() * 30) + 70,
      mobileScore: Math.floor(Math.random() * 30) + 70,
      speedScore: Math.floor(Math.random() * 30) + 70,
      titleScore: analysis.title && analysis.title.length >= 30 && analysis.title.length <= 60 ? 100 : 60,
      metaScore: analysis.metaDescription && analysis.metaDescription.length >= 120 && analysis.metaDescription.length <= 160 ? 100 : 60,
      headingScore: analysis.headingStructure.h1 === 1 && analysis.headingStructure.h2 > 0 ? 100 : 70,
      imageScore: analysis.imageCount > 0 ? (analysis.imagesWithAlt / analysis.imageCount) * 100 : 0
    };
  } catch (error) {
    return {
      url,
      score: 0,
      title: '',
      metaDescription: '',
      h1Count: 0,
      h2Count: 0,
      totalImages: 0,
      imagesWithAlt: 0,
      contentScore: 0,
      technicalScore: 0,
      mobileScore: 0,
      speedScore: 0,
      titleScore: 0,
      metaScore: 0,
      headingScore: 0,
      imageScore: 0
    };
  }
}

Deno.serve(app.fetch);