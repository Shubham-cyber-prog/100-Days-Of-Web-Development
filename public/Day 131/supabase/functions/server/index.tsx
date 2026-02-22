import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
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
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Supabase client for admin operations
const getAdminClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );
};

// Initialize Supabase client for auth operations
const getClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );
};

// Middleware to verify authentication
const requireAuth = async (c: any, next: any) => {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return c.json({ error: 'Unauthorized - No token provided' }, 401);
  }

  const supabase = getAdminClient();
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  
  if (error || !user) {
    console.log('Authentication error:', error);
    return c.json({ error: 'Unauthorized - Invalid token' }, 401);
  }

  c.set('user', user);
  await next();
};

// Health check endpoint
app.get("/make-server-74f6a23f/health", (c) => {
  return c.json({ status: "ok" });
});

// Initialize default admin account (idempotent)
const initializeDefaultAdmin = async () => {
  try {
    const defaultEmail = 'admin@crm.com';
    const defaultPassword = 'admin123';
    
    const supabase = getAdminClient();
    const clientSupabase = getClient();
    
    // First, try to sign in with these credentials to see if user exists
    const { data: signInData, error: signInError } = await clientSupabase.auth.signInWithPassword({
      email: defaultEmail,
      password: defaultPassword,
    });

    if (signInData?.user && !signInError) {
      // User exists and credentials work - ensure KV store is updated
      console.log('✅ Default admin account verified and working');
      
      await kv.set(`user:${signInData.user.id}`, {
        id: signInData.user.id,
        email: defaultEmail,
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date().toISOString()
      });
      
      await kv.set('user:default-admin', { created: true, userId: signInData.user.id });
      return;
    }

    // If sign-in failed, try to create the user
    console.log('Creating default admin account...');
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: defaultEmail,
      password: defaultPassword,
      user_metadata: { name: 'Admin User', role: 'admin' },
      email_confirm: true
    });

    if (error) {
      console.log('⚠️  Default admin creation error:', error.message);
      
      // If user already exists but password is wrong, try to update password
      if (error.message.includes('already been registered')) {
        console.log('Attempting to update existing admin password...');
        
        // List all users and find the admin
        const { data: users } = await supabase.auth.admin.listUsers();
        const adminUser = users?.users?.find(u => u.email === defaultEmail);
        
        if (adminUser) {
          // Update the password
          const { error: updateError } = await supabase.auth.admin.updateUserById(
            adminUser.id,
            { password: defaultPassword }
          );
          
          if (!updateError) {
            console.log('✅ Default admin password updated successfully');
            
            await kv.set(`user:${adminUser.id}`, {
              id: adminUser.id,
              email: defaultEmail,
              name: 'Admin User',
              role: 'admin',
              createdAt: new Date().toISOString()
            });
            
            await kv.set('user:default-admin', { created: true, userId: adminUser.id });
            console.log('Email: admin@crm.com | Password: admin123');
            return;
          }
        }
      }
      return;
    }

    // Store admin user in KV store
    if (data?.user) {
      await kv.set(`user:${data.user.id}`, {
        id: data.user.id,
        email: defaultEmail,
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date().toISOString()
      });
      
      await kv.set('user:default-admin', { created: true, userId: data.user.id });
      
      console.log('✅ Default admin account created successfully');
      console.log('Email: admin@crm.com | Password: admin123');
    }
  } catch (error) {
    console.log('Error initializing default admin:', error);
  }
};

// Initialize on startup
initializeDefaultAdmin();

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================

// Sign up endpoint
app.post("/make-server-74f6a23f/auth/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, role = 'sales_rep' } = body;

    if (!email || !password || !name) {
      return c.json({ error: 'Missing required fields: email, password, name' }, 400);
    }

    const supabase = getAdminClient();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role },
      email_confirm: true // Auto-confirm email since no email server configured
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: `Signup failed: ${error.message}` }, 400);
    }

    // Store user in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      role,
      createdAt: new Date().toISOString()
    });

    return c.json({ 
      success: true, 
      user: {
        id: data.user.id,
        email,
        name,
        role
      }
    });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Sign in endpoint
app.post("/make-server-74f6a23f/auth/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ error: 'Missing email or password' }, 400);
    }

    const supabase = getClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Login error:', error);
      return c.json({ error: `Login failed: ${error.message}` }, 401);
    }

    // Get user metadata
    const userData = await kv.get(`user:${data.user.id}`);

    return c.json({
      success: true,
      accessToken: data.session.access_token,
      user: userData || {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || 'User',
        role: data.user.user_metadata?.role || 'sales_rep'
      }
    });
  } catch (error) {
    console.log('Login error:', error);
    return c.json({ error: 'Internal server error during login' }, 500);
  }
});

// Get current user
app.get("/make-server-74f6a23f/auth/me", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const userData = await kv.get(`user:${user.id}`);
    
    return c.json({
      user: userData || {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || 'User',
        role: user.user_metadata?.role || 'sales_rep'
      }
    });
  } catch (error) {
    console.log('Get user error:', error);
    return c.json({ error: 'Failed to fetch user data' }, 500);
  }
});

// ============================================
// LEAD ENDPOINTS
// ============================================

// Create lead
app.post("/make-server-74f6a23f/leads", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const body = await c.req.json();
    const { name, email, phone, status = 'new', source = 'website', notes = '' } = body;

    if (!name || !email) {
      return c.json({ error: 'Missing required fields: name, email' }, 400);
    }

    const leadId = crypto.randomUUID();
    const lead = {
      id: leadId,
      name,
      email,
      phone: phone || '',
      status,
      source,
      assignedTo: user.id,
      assignedToName: user.user_metadata?.name || 'User',
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`lead:${leadId}`, lead);

    return c.json({ success: true, lead });
  } catch (error) {
    console.log('Create lead error:', error);
    return c.json({ error: 'Failed to create lead' }, 500);
  }
});

// Get all leads
app.get("/make-server-74f6a23f/leads", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const userData = await kv.get(`user:${user.id}`);
    const role = userData?.role || user.user_metadata?.role || 'sales_rep';

    const allLeads = await kv.getByPrefix('lead:');
    
    // Filter based on role
    let leads = allLeads;
    if (role === 'sales_rep') {
      leads = allLeads.filter((lead: any) => lead.assignedTo === user.id);
    }

    return c.json({ leads });
  } catch (error) {
    console.log('Get leads error:', error);
    return c.json({ error: 'Failed to fetch leads' }, 500);
  }
});

// Update lead
app.patch("/make-server-74f6a23f/leads/:id", requireAuth, async (c) => {
  try {
    const leadId = c.req.param('id');
    const user = c.get('user');
    const body = await c.req.json();

    const existingLead = await kv.get(`lead:${leadId}`);
    if (!existingLead) {
      return c.json({ error: 'Lead not found' }, 404);
    }

    const userData = await kv.get(`user:${user.id}`);
    const role = userData?.role || user.user_metadata?.role || 'sales_rep';

    // Check permissions
    if (role === 'sales_rep' && existingLead.assignedTo !== user.id) {
      return c.json({ error: 'Forbidden - You can only update your own leads' }, 403);
    }

    const updatedLead = {
      ...existingLead,
      ...body,
      id: leadId, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    await kv.set(`lead:${leadId}`, updatedLead);

    return c.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.log('Update lead error:', error);
    return c.json({ error: 'Failed to update lead' }, 500);
  }
});

// Delete lead
app.delete("/make-server-74f6a23f/leads/:id", requireAuth, async (c) => {
  try {
    const leadId = c.req.param('id');
    const user = c.get('user');

    const existingLead = await kv.get(`lead:${leadId}`);
    if (!existingLead) {
      return c.json({ error: 'Lead not found' }, 404);
    }

    const userData = await kv.get(`user:${user.id}`);
    const role = userData?.role || user.user_metadata?.role || 'sales_rep';

    // Check permissions
    if (role === 'sales_rep' && existingLead.assignedTo !== user.id) {
      return c.json({ error: 'Forbidden - You can only delete your own leads' }, 403);
    }

    await kv.del(`lead:${leadId}`);

    return c.json({ success: true });
  } catch (error) {
    console.log('Delete lead error:', error);
    return c.json({ error: 'Failed to delete lead' }, 500);
  }
});

// ============================================
// CUSTOMER ENDPOINTS
// ============================================

// Create customer
app.post("/make-server-74f6a23f/customers", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const body = await c.req.json();
    const { name, company, email, phone, value = 0, stage = 'prospect' } = body;

    if (!name || !email) {
      return c.json({ error: 'Missing required fields: name, email' }, 400);
    }

    const customerId = crypto.randomUUID();
    const customer = {
      id: customerId,
      name,
      company: company || '',
      email,
      phone: phone || '',
      value,
      stage,
      ownerId: user.id,
      ownerName: user.user_metadata?.name || 'User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`customer:${customerId}`, customer);

    return c.json({ success: true, customer });
  } catch (error) {
    console.log('Create customer error:', error);
    return c.json({ error: 'Failed to create customer' }, 500);
  }
});

// Get all customers
app.get("/make-server-74f6a23f/customers", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const userData = await kv.get(`user:${user.id}`);
    const role = userData?.role || user.user_metadata?.role || 'sales_rep';

    const allCustomers = await kv.getByPrefix('customer:');
    
    // Filter based on role
    let customers = allCustomers;
    if (role === 'sales_rep') {
      customers = allCustomers.filter((customer: any) => customer.ownerId === user.id);
    }

    return c.json({ customers });
  } catch (error) {
    console.log('Get customers error:', error);
    return c.json({ error: 'Failed to fetch customers' }, 500);
  }
});

// Update customer
app.patch("/make-server-74f6a23f/customers/:id", requireAuth, async (c) => {
  try {
    const customerId = c.req.param('id');
    const body = await c.req.json();

    const existingCustomer = await kv.get(`customer:${customerId}`);
    if (!existingCustomer) {
      return c.json({ error: 'Customer not found' }, 404);
    }

    const updatedCustomer = {
      ...existingCustomer,
      ...body,
      id: customerId,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`customer:${customerId}`, updatedCustomer);

    return c.json({ success: true, customer: updatedCustomer });
  } catch (error) {
    console.log('Update customer error:', error);
    return c.json({ error: 'Failed to update customer' }, 500);
  }
});

// ============================================
// DEAL ENDPOINTS
// ============================================

// Create deal
app.post("/make-server-74f6a23f/deals", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const body = await c.req.json();
    const { title, value, stage = 'qualification', customerId, closeDate } = body;

    if (!title || !customerId) {
      return c.json({ error: 'Missing required fields: title, customerId' }, 400);
    }

    const dealId = crypto.randomUUID();
    const deal = {
      id: dealId,
      title,
      value: value || 0,
      stage,
      customerId,
      closeDate: closeDate || null,
      ownerId: user.id,
      ownerName: user.user_metadata?.name || 'User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`deal:${dealId}`, deal);

    return c.json({ success: true, deal });
  } catch (error) {
    console.log('Create deal error:', error);
    return c.json({ error: 'Failed to create deal' }, 500);
  }
});

// Get all deals
app.get("/make-server-74f6a23f/deals", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const userData = await kv.get(`user:${user.id}`);
    const role = userData?.role || user.user_metadata?.role || 'sales_rep';

    const allDeals = await kv.getByPrefix('deal:');
    
    // Filter based on role
    let deals = allDeals;
    if (role === 'sales_rep') {
      deals = allDeals.filter((deal: any) => deal.ownerId === user.id);
    }

    return c.json({ deals });
  } catch (error) {
    console.log('Get deals error:', error);
    return c.json({ error: 'Failed to fetch deals' }, 500);
  }
});

// Update deal
app.patch("/make-server-74f6a23f/deals/:id", requireAuth, async (c) => {
  try {
    const dealId = c.req.param('id');
    const body = await c.req.json();

    const existingDeal = await kv.get(`deal:${dealId}`);
    if (!existingDeal) {
      return c.json({ error: 'Deal not found' }, 404);
    }

    const updatedDeal = {
      ...existingDeal,
      ...body,
      id: dealId,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`deal:${dealId}`, updatedDeal);

    return c.json({ success: true, deal: updatedDeal });
  } catch (error) {
    console.log('Update deal error:', error);
    return c.json({ error: 'Failed to update deal' }, 500);
  }
});

// ============================================
// INTERACTION ENDPOINTS
// ============================================

// Create interaction
app.post("/make-server-74f6a23f/interactions", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const body = await c.req.json();
    const { type, notes, customerId, date } = body;

    if (!type || !customerId || !notes) {
      return c.json({ error: 'Missing required fields: type, customerId, notes' }, 400);
    }

    const interactionId = crypto.randomUUID();
    const interaction = {
      id: interactionId,
      type,
      notes,
      customerId,
      date: date || new Date().toISOString(),
      userId: user.id,
      userName: user.user_metadata?.name || 'User',
      createdAt: new Date().toISOString()
    };

    await kv.set(`interaction:${interactionId}`, interaction);

    return c.json({ success: true, interaction });
  } catch (error) {
    console.log('Create interaction error:', error);
    return c.json({ error: 'Failed to create interaction' }, 500);
  }
});

// Get interactions for a customer
app.get("/make-server-74f6a23f/interactions/:customerId", requireAuth, async (c) => {
  try {
    const customerId = c.req.param('customerId');
    const allInteractions = await kv.getByPrefix('interaction:');
    
    const interactions = allInteractions.filter(
      (interaction: any) => interaction.customerId === customerId
    );

    return c.json({ interactions });
  } catch (error) {
    console.log('Get interactions error:', error);
    return c.json({ error: 'Failed to fetch interactions' }, 500);
  }
});

// ============================================
// ANALYTICS ENDPOINTS
// ============================================

// Get dashboard stats
app.get("/make-server-74f6a23f/analytics/dashboard", requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const userData = await kv.get(`user:${user.id}`);
    const role = userData?.role || user.user_metadata?.role || 'sales_rep';

    const allLeads = await kv.getByPrefix('lead:');
    const allCustomers = await kv.getByPrefix('customer:');
    const allDeals = await kv.getByPrefix('deal:');

    // Filter based on role
    const leads = role === 'sales_rep' 
      ? allLeads.filter((l: any) => l.assignedTo === user.id)
      : allLeads;
    
    const customers = role === 'sales_rep'
      ? allCustomers.filter((c: any) => c.ownerId === user.id)
      : allCustomers;
    
    const deals = role === 'sales_rep'
      ? allDeals.filter((d: any) => d.ownerId === user.id)
      : allDeals;

    const totalLeads = leads.length;
    const convertedLeads = customers.length;
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads * 100).toFixed(1) : '0.0';
    
    const totalRevenue = deals.reduce((sum: number, deal: any) => {
      return sum + (deal.stage === 'closed_won' ? deal.value : 0);
    }, 0);

    const pipelineValue = deals.reduce((sum: number, deal: any) => {
      return sum + (deal.stage !== 'closed_lost' ? deal.value : 0);
    }, 0);

    return c.json({
      totalLeads,
      totalCustomers: customers.length,
      conversionRate: parseFloat(conversionRate),
      totalRevenue,
      pipelineValue,
      activeDeals: deals.filter((d: any) => 
        d.stage !== 'closed_won' && d.stage !== 'closed_lost'
      ).length
    });
  } catch (error) {
    console.log('Get analytics error:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

Deno.serve(app.fetch);