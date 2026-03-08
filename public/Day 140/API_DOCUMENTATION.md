# API Documentation

Complete API reference for the AI-Powered Email Marketing Tool backend.

## Base URL

All API endpoints are prefixed with:
```
https://{project-id}.supabase.co/functions/v1/make-server-c7b8121e
```

## Authentication

Most endpoints require authentication via the `Authorization` header:

```
Authorization: Bearer {access_token}
```

For protected endpoints, the access token is obtained from Supabase Auth after login.

For public endpoints, use the Supabase anon key:

```
Authorization: Bearer {anon_key}
```

## Endpoints

### Health Check

Check if the server is running.

**Endpoint:** `GET /health`

**Auth Required:** No

**Request:**
```bash
curl https://{project-id}.supabase.co/functions/v1/make-server-c7b8121e/health
```

**Response:**
```json
{
  "status": "ok"
}
```

---

### User Signup

Create a new user account.

**Endpoint:** `POST /signup`

**Auth Required:** No (uses anon key)

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Request Example:**
```bash
curl -X POST https://{project-id}.supabase.co/functions/v1/make-server-c7b8121e/signup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {anon_key}" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123",
    "name": "John Doe"
  }'
```

**Success Response (201):**
```json
{
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "user_metadata": {
      "name": "John Doe"
    }
  },
  "message": "User created successfully"
}
```

**Error Response (400):**
```json
{
  "error": "Email already exists"
}
```

---

### Generate Email

Generate AI-powered email content using OpenAI.

**Endpoint:** `POST /generate-email`

**Auth Required:** Yes

**Request Body:**
```json
{
  "goal": "Promote new product launch",
  "tone": "professional",
  "audience": "Tech professionals aged 25-40",
  "keywords": "innovation, cutting-edge, efficiency",
  "cta": "Shop Now"
}
```

**Field Descriptions:**
- `goal` (required): The purpose of the email
- `tone` (required): One of: "professional", "casual", "persuasive", "friendly"
- `audience` (required): Target audience description
- `keywords` (optional): Comma-separated keywords to include
- `cta` (optional): Call-to-action text

**Request Example:**
```bash
curl -X POST https://{project-id}.supabase.co/functions/v1/make-server-c7b8121e/generate-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {access_token}" \
  -d '{
    "goal": "Promote new product launch",
    "tone": "professional",
    "audience": "Tech professionals aged 25-40",
    "keywords": "innovation, cutting-edge",
    "cta": "Shop Now"
  }'
```

**Success Response (200):**
```json
{
  "subject": "Introducing Our Revolutionary New Product",
  "content": "Dear valued customer,\n\nWe're excited to announce...",
  "suggestions": [
    "Alternative subject: Discover Innovation That Works",
    "Consider adding personalization: {{firstName}}",
    "Optimal send time: Tuesday 10 AM"
  ]
}
```

**Error Response (400):**
```json
{
  "error": "OpenAI API key not configured"
}
```

**Error Response (401):**
```json
{
  "error": "Unauthorized"
}
```

---

### Get Campaigns

Retrieve all campaigns for the authenticated user.

**Endpoint:** `GET /campaigns`

**Auth Required:** Yes

**Query Parameters:**
- `status` (optional): Filter by status ("draft", "scheduled", "sent")
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Request Example:**
```bash
curl https://{project-id}.supabase.co/functions/v1/make-server-c7b8121e/campaigns?status=sent&limit=10 \
  -H "Authorization: Bearer {access_token}"
```

**Success Response (200):**
```json
{
  "campaigns": [
    {
      "id": "campaign-uuid-1",
      "name": "Spring Sale Announcement",
      "subject": "Don't Miss Our Spring Sale",
      "content": "Email content here...",
      "status": "sent",
      "scheduledFor": "2026-03-15T10:00:00Z",
      "sentAt": "2026-03-15T10:01:23Z",
      "recipients": 1250,
      "opens": 480,
      "clicks": 125,
      "conversions": 23,
      "createdAt": "2026-03-10T14:30:00Z",
      "updatedAt": "2026-03-15T10:01:23Z"
    }
  ],
  "total": 45,
  "limit": 10,
  "offset": 0
}
```

---

### Create Campaign

Create a new email campaign.

**Endpoint:** `POST /campaigns`

**Auth Required:** Yes

**Request Body:**
```json
{
  "name": "Summer Sale 2026",
  "subject": "Exclusive Summer Deals Inside",
  "content": "Hi {{firstName}},\n\nCheck out our summer collection...",
  "status": "draft",
  "scheduledFor": "2026-06-15T10:00:00Z",
  "audienceSegment": "segment-uuid",
  "metadata": {
    "category": "promotional",
    "tags": ["sale", "summer"]
  }
}
```

**Field Descriptions:**
- `name` (required): Campaign name
- `subject` (required): Email subject line
- `content` (required): Email body (supports {{variables}})
- `status` (optional): "draft" | "scheduled" (default: "draft")
- `scheduledFor` (optional): ISO 8601 datetime for scheduled campaigns
- `audienceSegment` (optional): UUID of audience segment
- `metadata` (optional): Additional campaign data

**Request Example:**
```bash
curl -X POST https://{project-id}.supabase.co/functions/v1/make-server-c7b8121e/campaigns \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {access_token}" \
  -d '{
    "name": "Summer Sale 2026",
    "subject": "Exclusive Summer Deals",
    "content": "Email content...",
    "status": "draft"
  }'
```

**Success Response (201):**
```json
{
  "campaign": {
    "id": "new-campaign-uuid",
    "name": "Summer Sale 2026",
    "subject": "Exclusive Summer Deals",
    "status": "draft",
    "createdAt": "2026-02-20T15:30:00Z"
  }
}
```

---

### Update Campaign

Update an existing campaign.

**Endpoint:** `PUT /campaigns/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Campaign UUID

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Campaign Name",
  "subject": "New Subject Line",
  "content": "Updated content...",
  "status": "scheduled",
  "scheduledFor": "2026-06-20T10:00:00Z"
}
```

**Request Example:**
```bash
curl -X PUT https://{project-id}.supabase.co/functions/v1/make-server-c7b8121e/campaigns/campaign-uuid \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {access_token}" \
  -d '{
    "status": "scheduled",
    "scheduledFor": "2026-06-20T10:00:00Z"
  }'
```

**Success Response (200):**
```json
{
  "campaign": {
    "id": "campaign-uuid",
    "name": "Updated Campaign Name",
    "status": "scheduled",
    "updatedAt": "2026-02-20T15:35:00Z"
  }
}
```

---

### Delete Campaign

Delete a campaign.

**Endpoint:** `DELETE /campaigns/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id`: Campaign UUID

**Request Example:**
```bash
curl -X DELETE https://{project-id}.supabase.co/functions/v1/make-server-c7b8121e/campaigns/campaign-uuid \
  -H "Authorization: Bearer {access_token}"
```

**Success Response (200):**
```json
{
  "message": "Campaign deleted successfully",
  "id": "campaign-uuid"
}
```

---

### Get Audience Segments

Retrieve all audience segments.

**Endpoint:** `GET /audiences`

**Auth Required:** Yes

**Query Parameters:**
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Request Example:**
```bash
curl https://{project-id}.supabase.co/functions/v1/make-server-c7b8121e/audiences \
  -H "Authorization: Bearer {access_token}"
```

**Success Response (200):**
```json
{
  "segments": [
    {
      "id": "segment-uuid-1",
      "name": "Active Customers",
      "description": "Customers who purchased in last 30 days",
      "filters": {
        "purchaseDate": { "gte": "2026-01-20" },
        "status": "active"
      },
      "count": 1250,
      "createdAt": "2026-01-15T10:00:00Z"
    }
  ],
  "total": 12
}
```

---

### Create Audience Segment

Create a new audience segment.

**Endpoint:** `POST /audiences`

**Auth Required:** Yes

**Request Body:**
```json
{
  "name": "High-Value Customers",
  "description": "Customers with lifetime value > $1000",
  "filters": {
    "lifetimeValue": { "gte": 1000 },
    "status": "active"
  }
}
```

**Request Example:**
```bash
curl -X POST https://{project-id}.supabase.co/functions/v1/make-server-c7b8121e/audiences \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {access_token}" \
  -d '{
    "name": "High-Value Customers",
    "description": "Customers with lifetime value > $1000",
    "filters": {
      "lifetimeValue": { "gte": 1000 }
    }
  }'
```

**Success Response (201):**
```json
{
  "segment": {
    "id": "new-segment-uuid",
    "name": "High-Value Customers",
    "count": 342,
    "createdAt": "2026-02-20T15:40:00Z"
  }
}
```

---

### Get Email Templates

Retrieve all email templates.

**Endpoint:** `GET /templates`

**Auth Required:** Yes

**Query Parameters:**
- `category` (optional): Filter by category
- `limit` (optional): Number of results (default: 50)

**Request Example:**
```bash
curl https://{project-id}.supabase.co/functions/v1/make-server-c7b8121e/templates?category=promotional \
  -H "Authorization: Bearer {access_token}"
```

**Success Response (200):**
```json
{
  "templates": [
    {
      "id": "template-uuid-1",
      "name": "Product Launch",
      "category": "promotional",
      "subject": "Introducing {{productName}}",
      "content": "Template content with {{variables}}...",
      "thumbnail": "https://...",
      "tags": ["product", "launch"],
      "createdAt": "2026-01-10T12:00:00Z"
    }
  ],
  "total": 24
}
```

---

### Get Analytics

Retrieve analytics data for campaigns.

**Endpoint:** `GET /analytics`

**Auth Required:** Yes

**Query Parameters:**
- `startDate` (optional): Start date (ISO 8601)
- `endDate` (optional): End date (ISO 8601)
- `campaignId` (optional): Specific campaign UUID
- `metric` (optional): Specific metric to retrieve

**Request Example:**
```bash
curl "https://{project-id}.supabase.co/functions/v1/make-server-c7b8121e/analytics?startDate=2026-01-01&endDate=2026-02-20" \
  -H "Authorization: Bearer {access_token}"
```

**Success Response (200):**
```json
{
  "overview": {
    "totalCampaigns": 45,
    "totalSent": 125000,
    "averageOpenRate": 24.5,
    "averageClickRate": 3.2,
    "totalConversions": 1250,
    "conversionRate": 1.0
  },
  "campaigns": [
    {
      "id": "campaign-uuid",
      "name": "Spring Sale",
      "sent": 5000,
      "opens": 1250,
      "clicks": 200,
      "conversions": 45,
      "revenue": 4500.00
    }
  ],
  "trends": {
    "daily": [
      {
        "date": "2026-02-01",
        "sent": 1200,
        "opens": 300,
        "clicks": 45
      }
    ]
  },
  "topPerforming": [
    {
      "campaignId": "uuid",
      "name": "Best Campaign",
      "openRate": 35.2,
      "clickRate": 5.8
    }
  ]
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid request parameters",
  "details": "Missing required field: email"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Campaign not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

Currently, there are no rate limits enforced. In production, consider implementing:

- 100 requests per minute per user
- 1000 requests per hour per user
- 10 email generations per minute (OpenAI cost control)

## Data Types

### Campaign Status
- `draft`: Not yet scheduled
- `scheduled`: Scheduled for future send
- `sending`: Currently being sent
- `sent`: Successfully sent
- `failed`: Send failed

### Email Tone
- `professional`: Formal business tone
- `casual`: Friendly, conversational tone
- `persuasive`: Sales-focused, compelling
- `friendly`: Warm and approachable

### Date Format
All dates use ISO 8601 format:
```
2026-02-20T15:30:00Z
```

## Pagination

Endpoints that return lists support pagination:

**Request:**
```
GET /campaigns?limit=20&offset=40
```

**Response includes:**
```json
{
  "data": [...],
  "total": 145,
  "limit": 20,
  "offset": 40
}
```

## Webhooks (Future Feature)

Planned webhook events:
- `campaign.sent` - Campaign successfully sent
- `campaign.failed` - Campaign send failed
- `email.opened` - Email opened by recipient
- `email.clicked` - Link clicked in email
- `email.bounced` - Email bounced
- `email.unsubscribed` - User unsubscribed

## SDKs and Client Libraries

### JavaScript/TypeScript

Use the provided API client in `/src/app/utils/api.ts`:

```typescript
import { generateEmail, getCampaigns, createCampaign } from './utils/api';

// Generate email
const result = await generateEmail({
  goal: 'Product launch',
  tone: 'professional',
  audience: 'Tech professionals'
});

// Get campaigns
const campaigns = await getCampaigns();

// Create campaign
const newCampaign = await createCampaign({
  name: 'My Campaign',
  subject: 'Subject',
  content: 'Content'
});
```

## Support

For API support:
- Check the server logs: `supabase functions logs server`
- Open an issue on GitHub
- Review the Edge Function code in `/supabase/functions/server/index.tsx`

---

Last updated: February 20, 2026
