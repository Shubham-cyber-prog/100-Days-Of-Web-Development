# IntelliCircle - Professional Networking Platform

## Overview

This is a location-based professional networking platform that connects users through AI-powered chat rooms organized by shared interests. The application features a modern full-stack architecture with real-time chat capabilities, built using React, Express, and PostgreSQL.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React + TypeScript**: Modern React application with strict TypeScript configuration
- **Vite**: Fast development server and build tool with hot module replacement
- **UI Framework**: Comprehensive component library built on Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with custom CSS variables for theming and design tokens
- **State Management**: TanStack Query for server state management and data fetching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Routing**: Wouter for lightweight client-side routing
- **Animation**: Framer Motion for smooth UI transitions and interactions

### Backend Architecture
- **Express.js**: RESTful API server with middleware for logging and error handling
- **WebSocket Integration**: Real-time chat functionality using native WebSocket server
- **Storage Strategy**: Dual storage approach with in-memory storage for development and PostgreSQL for production
- **Request Handling**: JSON parsing, URL encoding, and CORS support built-in
- **Development Tools**: Hot reload support and development-specific middleware

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Management**: Centralized schema definitions with TypeScript types
- **Development Mode**: In-memory storage implementation for rapid development
- **Session Management**: PostgreSQL-backed session storage using connect-pg-simple

### Authentication and Authorization
- **Session-based Authentication**: Express sessions with PostgreSQL backing store
- **Form Validation**: Zod schemas for runtime type checking and validation
- **Input Sanitization**: Built-in validation for email uniqueness and data integrity

### Chat System Architecture
- **Real-time Communication**: WebSocket server for instant messaging
- **Room Management**: Interest-based chat rooms with participant tracking
- **Message Storage**: In-memory message history with room persistence
- **User Management**: Client connection tracking with username association

### Build and Development
- **Development**: TypeScript execution with tsx for server-side development
- **Production Build**: esbuild for optimized server bundling and Vite for client assets
- **Type Safety**: Shared types between client and server using workspace paths
- **Code Quality**: Strict TypeScript configuration with comprehensive type checking

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle Kit**: Database migration and schema management tools

### UI and Styling
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Lucide Icons**: Modern icon library for consistent iconography

### Development Tools
- **Replit Integration**: Platform-specific plugins for development environment
- **Vite Plugins**: Runtime error overlays and development enhancements
- **TypeScript**: Full-stack type safety with strict configuration

### Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **Hookform Resolvers**: Integration layer between React Hook Form and Zod

### Real-time Features
- **WebSocket**: Native WebSocket implementation for chat functionality
- **TanStack Query**: Server state synchronization and caching

### Build Dependencies
- **ESBuild**: Fast JavaScript bundler for production builds
- **Vite**: Development server and frontend build tool
- **PostCSS**: CSS processing with Tailwind and Autoprefixer