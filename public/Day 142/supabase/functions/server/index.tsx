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

Deno.serve(app.fetch);