# Day 92 - Hackathon Registration Website

A full-stack hackathon registration platform built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **PostgreSQL**. This project demonstrates advanced web development skills including database integration, API routes, form validation, and modern UI design.

## 🚀 Features

- **Dynamic Registration Form** with real-time validation
- **Team Management** - Add up to 5 team members
- **PostgreSQL Database** integration for data persistence
- **Admin Dashboard** to view all registrations
- **Search & Filter** functionality
- **Responsive Design** with glassmorphism effects
- **Type-Safe** with TypeScript and Zod validation
- **Modern UI** with Tailwind CSS and gradient themes

## 📸 Screenshots

![Home Page](./screenshots/home.png)
![Registration Form](./screenshots/form.png)
![Admin Dashboard](./screenshots/admin.png)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **Validation**: Zod
- **ORM**: pg (node-postgres)

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- PostgreSQL installed locally OR access to a cloud PostgreSQL database (Supabase, Neon, etc.)
- npm or yarn package manager

## 🔧 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd "public/Day 92"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

#### Option A: Local PostgreSQL

1. Make sure PostgreSQL is running on your machine
2. Create a new database:

```bash
createdb hackathon_db
```

3. Run the schema file to create tables:

```bash
psql hackathon_db < schema.sql
```

#### Option B: Cloud Database (Supabase/Neon)

1. Create a new project on [Supabase](https://supabase.com) or [Neon](https://neon.tech)
2. Copy the connection string
3. Run the SQL from `schema.sql` in the SQL editor

### 4. Configure environment variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your database connection string:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/hackathon_db
```

For cloud databases, use the connection string provided by your service:

```env
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
Day 92/
├── app/
│   ├── api/
│   │   ├── register/
│   │   │   └── route.ts          # Registration API endpoint
│   │   └── registrations/
│   │       └── route.ts          # Get all registrations
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   └── RegistrationForm.tsx      # Main registration form
├── lib/
│   ├── db.ts                     # Database connection
│   └── validation.ts             # Zod schemas
├── types/
│   └── index.ts                  # TypeScript types
├── public/
│   └── assets/                   # Images and assets
├── schema.sql                    # Database schema
├── .env.example                  # Environment variables template
├── package.json
├── next.config.js
├── tailwind.config.ts
└── README.md
```

## 🎯 Usage

### Registering a Team

1. Navigate to the home page
2. Fill in the team information:
   - Team name
   - Leader details (name, email, phone)
   - Team size (1-5 members)
3. Optionally add team members with their details
4. Provide project idea (minimum 50 characters)
5. Specify tech stack
6. Select experience level
7. Click "Register Team 🚀"

### Viewing Registrations (Admin)

1. Navigate to `/admin`
2. View all registered teams
3. Use the search bar to filter by team name, leader name, or email
4. Each card shows:
   - Team information
   - Project details
   - Team members
   - Registration timestamp

## 🔒 Database Schema

```sql
CREATE TABLE registrations (
  id SERIAL PRIMARY KEY,
  team_name VARCHAR(100) NOT NULL,
  leader_name VARCHAR(100) NOT NULL,
  leader_email VARCHAR(255) UNIQUE NOT NULL,
  leader_phone VARCHAR(20) NOT NULL,
  team_size INTEGER NOT NULL CHECK (team_size BETWEEN 1 AND 5),
  members JSONB,
  project_idea TEXT NOT NULL,
  tech_stack VARCHAR(255) NOT NULL,
  experience_level VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🌐 API Endpoints

### POST `/api/register`

Register a new team.

**Request Body:**
```json
{
  "teamName": "Team Awesome",
  "leaderName": "John Doe",
  "leaderEmail": "john@example.com",
  "leaderPhone": "+1234567890",
  "teamSize": 3,
  "members": [
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "Developer"
    }
  ],
  "projectIdea": "An innovative solution for...",
  "techStack": "React, Node.js, PostgreSQL",
  "experienceLevel": "Intermediate"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful!",
  "data": { ... }
}
```

### GET `/api/registrations`

Get all registrations (for admin dashboard).

**Response:**
```json
{
  "success": true,
  "data": [...]
}
```

## 🎨 Customization

### Changing Colors

Edit `app/globals.css` and `tailwind.config.ts` to customize the color scheme.

### Modifying Form Fields

Update `lib/validation.ts` to add/remove validation rules and `components/RegistrationForm.tsx` to modify the form fields.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Node.js.

## 🐛 Troubleshooting

### Database Connection Issues

- Verify your `DATABASE_URL` is correct
- Check if PostgreSQL is running
- For cloud databases, ensure SSL mode is enabled

### Build Errors

- Make sure all dependencies are installed: `npm install`
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`

## 📝 License

This project is part of the 100 Days of Web Development challenge.

## 👨‍💻 Author

Created as part of Day 92 of the 100 Days of Web Development challenge.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- PostgreSQL for the robust database system
