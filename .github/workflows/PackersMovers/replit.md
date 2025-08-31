# Swastik Packers and Movers Website

## Overview

This is a professional website for Swastik Packers and Movers, a moving and relocation services company. The application is built as a full-stack web application with a React frontend and Express.js backend, designed to showcase the company's services and handle customer inquiries through contact forms.

The website serves as both a marketing platform and a lead generation tool, allowing potential customers to learn about services, view the company's network coverage, and submit moving inquiries or general contact messages. The application includes email notification functionality to alert the business when new inquiries are received.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing instead of React Router
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **Form Handling**: React Hook Form with Zod validation for robust form management
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for REST API endpoints
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful endpoints for inquiry submission and contact message handling
- **Request Handling**: Express middleware for JSON parsing, URL encoding, and request logging
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle Kit for database migrations and schema synchronization
- **Fallback Storage**: In-memory storage implementation for development/testing scenarios
- **Data Models**: Three main entities - users, inquiries, and contact messages with proper relationships

### Email Integration
- **Service**: Nodemailer for SMTP email delivery
- **Configuration**: Environment-based SMTP settings supporting various email providers
- **Templates**: HTML email templates for inquiry notifications
- **Error Handling**: Graceful fallback when email delivery fails (continues with success response)

### Development and Production Setup
- **Development**: Vite dev server with HMR and Express API server running concurrently
- **Build Process**: Vite builds frontend assets, esbuild bundles backend for production
- **Static Assets**: Express serves built frontend files in production
- **Environment Configuration**: Environment variables for database connections and email settings

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Neon database driver for PostgreSQL connectivity
- **drizzle-orm**: Type-safe ORM for database operations and query building
- **express**: Web application framework for API server
- **react**: Frontend library for component-based UI development
- **@tanstack/react-query**: Server state management and data fetching

### UI and Component Libraries
- **@radix-ui/react-***: Comprehensive set of accessible UI primitives for components
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Utility for creating variant-based component APIs
- **lucide-react**: Icon library for consistent iconography

### Form and Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Integration layer for external validation libraries
- **zod**: Schema validation library for type-safe form validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod for schema validation

### Email and Communication
- **nodemailer**: Email sending library for SMTP integration
- **SMTP Services**: Configurable to work with Gmail, SendGrid, or other email providers

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Static type checking for better code quality
- **tsx**: TypeScript execution for Node.js development
- **esbuild**: Fast JavaScript bundler for production builds

### Utility Libraries
- **wouter**: Lightweight routing library for React applications
- **date-fns**: Date manipulation and formatting utilities
- **clsx/tailwind-merge**: Utility functions for conditional CSS classes