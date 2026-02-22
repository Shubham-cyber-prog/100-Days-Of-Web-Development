import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

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
app.get("/make-server-c7b8121e/health", (c) => {
  return c.json({ status: "ok" });
});

// Generate email with OpenAI
app.post("/make-server-c7b8121e/generate-email", async (c) => {
  try {
    const { goal, tone, audience, keywords, cta } = await c.req.json();
    
    // Get OpenAI API key from environment
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    
    if (!openaiApiKey) {
      console.error("OpenAI API key not found in environment variables");
      return c.json({ 
        error: "OpenAI API key not configured. Please add your API key in Supabase Secrets.",
        instructions: "Run: supabase secrets set OPENAI_API_KEY=sk-your-key-here"
      }, 400);
    }

    // Validate API key format
    if (!openaiApiKey.startsWith('sk-') || openaiApiKey.length < 20) {
      console.error("Invalid OpenAI API key format detected");
      return c.json({ 
        error: "Invalid OpenAI API key format. API key should start with 'sk-' and be at least 20 characters long.",
        instructions: "Get your API key from https://platform.openai.com/account/api-keys"
      }, 400);
    }

    // Call OpenAI API
    const prompt = `Generate a professional marketing email with the following parameters:
    - Goal: ${goal}
    - Tone: ${tone}
    - Target Audience: ${audience}
    - Keywords: ${keywords || 'N/A'}
    - Call to Action: ${cta || 'N/A'}
    
    Please provide:
    1. A compelling subject line
    2. Email body (200-300 words)
    
    Format the response as JSON with "subject" and "body" fields.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert email marketing copywriter. Generate engaging, conversion-focused marketing emails.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      
      // Provide helpful error messages
      let errorMessage = errorData.error?.message || 'Unknown error';
      let instructions = '';
      
      if (errorData.error?.code === 'invalid_api_key') {
        errorMessage = 'Invalid OpenAI API key. Please check your API key and try again.';
        instructions = 'Get your API key from https://platform.openai.com/account/api-keys and set it with: supabase secrets set OPENAI_API_KEY=sk-your-key-here';
      }
      
      return c.json({ 
        error: `OpenAI API error: ${errorMessage}`,
        instructions: instructions
      }, response.status);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;
    
    // Try to parse as JSON, otherwise return as plain text
    let result;
    try {
      result = JSON.parse(generatedText);
    } catch {
      result = {
        subject: "AI-Generated Email Subject",
        body: generatedText,
      };
    }

    return c.json({
      subject: result.subject,
      body: result.body,
      confidenceScore: 92,
    });
  } catch (error) {
    console.error("Error generating email:", error);
    return c.json({ error: `Failed to generate email: ${error.message}` }, 500);
  }
});

// Save campaign
app.post("/make-server-c7b8121e/campaigns", async (c) => {
  try {
    const campaign = await c.req.json();
    const campaignId = `campaign_${Date.now()}`;
    
    await kv.set(campaignId, campaign);
    
    return c.json({ 
      success: true, 
      campaignId,
      message: "Campaign saved successfully" 
    });
  } catch (error) {
    console.error("Error saving campaign:", error);
    return c.json({ error: `Failed to save campaign: ${error.message}` }, 500);
  }
});

// Get all campaigns
app.get("/make-server-c7b8121e/campaigns", async (c) => {
  try {
    const campaigns = await kv.getByPrefix("campaign_");
    return c.json({ campaigns });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return c.json({ error: `Failed to fetch campaigns: ${error.message}` }, 500);
  }
});

// Save audience segment
app.post("/make-server-c7b8121e/segments", async (c) => {
  try {
    const segment = await c.req.json();
    const segmentId = `segment_${Date.now()}`;
    
    await kv.set(segmentId, segment);
    
    return c.json({ 
      success: true, 
      segmentId,
      message: "Segment saved successfully" 
    });
  } catch (error) {
    console.error("Error saving segment:", error);
    return c.json({ error: `Failed to save segment: ${error.message}` }, 500);
  }
});

// Get all segments
app.get("/make-server-c7b8121e/segments", async (c) => {
  try {
    const segments = await kv.getByPrefix("segment_");
    return c.json({ segments });
  } catch (error) {
    console.error("Error fetching segments:", error);
    return c.json({ error: `Failed to fetch segments: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);