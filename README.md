# Portfolio Application

## Overview

This is a modern full-stack portfolio application built with React, Express, and TypeScript. It features a personal portfolio website with sections for about me, experience, projects, skills, and contact information. The application uses a clean, modern design with dark/light theme support and smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with three main directories:
- **client/**: React frontend application with TypeScript
- **server/**: Express.js backend API
- **shared/**: Common schema definitions and types

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, shadcn/ui components
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM (recently migrated from in-memory storage)
- **UI Framework**: Radix UI primitives with custom styling
- **State Management**: TanStack Query for server state
- **Animations**: Framer Motion
- **Routing**: Wouter (lightweight React router)

## Key Components

### Frontend Architecture
- **Component-based structure** using React functional components
- **shadcn/ui design system** with Radix UI primitives for accessible components
- **TailwindCSS** for utility-first styling with custom CSS variables for theming
- **Theme system** supporting light/dark mode with smooth transitions
- **Responsive design** with mobile-first approach
- **Animation system** using Framer Motion for smooth page transitions and scroll-triggered animations

### Backend Architecture
- **RESTful API** built with Express.js
- **Type-safe routing** with TypeScript interfaces
- **Database storage layer** using PostgreSQL with Drizzle ORM for persistent data
- **Request logging middleware** for API monitoring
- **Error handling middleware** for consistent error responses

### Database Schema
The application uses Drizzle ORM with PostgreSQL and includes tables for:
- **users**: User authentication (basic setup)
- **contact_messages**: Contact form submissions
- **projects**: Portfolio projects with featured flag
- **experiences**: Work experience entries
- **skills**: Technical skills with categories and proficiency levels

## Data Flow

1. **Client requests** are handled by React components using TanStack Query
2. **API calls** go through a centralized query client with error handling
3. **Server routes** validate input using Zod schemas and interact with storage layer
4. **Database operations** are abstracted through the storage interface
5. **Responses** are type-safe and consistent across the application

### Contact Form Flow
- Form validation using react-hook-form with Zod resolver
- Optimistic updates with automatic cache invalidation
- Toast notifications for success/error feedback

### Portfolio Data Flow
- Lazy loading of projects, skills, and experience data
- Caching strategy to minimize API calls
- Featured projects are fetched separately for homepage display

## External Dependencies

### UI and Styling
- **@radix-ui/***: Accessible UI primitives for complex components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for component styling
- **framer-motion**: Animation library for smooth interactions

### Data Management
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form state management with validation
- **@hookform/resolvers**: Zod integration for form validation
- **zod**: Schema validation library

### Database and Backend
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **express**: Web framework for Node.js

## Deployment Strategy

### Development Environment
- **Vite dev server** for fast frontend development with HMR
- **Express server** runs in development mode with TypeScript compilation via tsx
- **Database migrations** handled by Drizzle Kit
- **Replit integration** with development banner and cartographer plugin

### Production Build
- **Frontend**: Built with Vite and output to `dist/public`
- **Backend**: Bundled with esbuild for Node.js ESM format
- **Single deployment artifact** serving both static files and API
- **Environment variables** for database configuration

### Build Process
1. Frontend assets are built and optimized by Vite
2. Backend is bundled with external dependencies excluded
3. Production server serves static files and handles API routes
4. Database schema is pushed using Drizzle migrations

The application is designed to be deployment-ready for platforms like Vercel, Netlify, or traditional hosting with minimal configuration changes.