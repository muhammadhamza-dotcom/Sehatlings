# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Architecture Overview

This is a Next.js 15 application using the App Router with TypeScript. The project is structured as a healthcare-focused website for "Sehatlings" organization.

### Key Technologies
- **Next.js 15** with App Router and React 19
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** for styling with CSS variables
- **shadcn/ui** components (New York style variant)
- **Framer Motion** for animations
- **React Hook Form** with Zod validation
- **Radix UI** primitives for accessible components

### Project Structure
- `src/app/` - App Router pages following Next.js 13+ conventions
  - Route-based pages: `/team`, `/gendlr`, `/tech-house`, `/inspection-consultancy`, `/programs`, `/contact`
  - Uses dynamic imports for performance optimization
- `src/components/` - Reusable React components
  - `ui/` - shadcn/ui component library 
  - `home/` - Homepage-specific components
  - Root-level components like `Navbar.tsx` and `Hero.tsx`
- `src/lib/` - Utility functions (currently just `cn()` for className merging)

### Component Patterns
- Uses "use client" directive for client-side interactivity
- Dynamic imports with SSR enabled for page components
- Motion components from Framer Motion for page animations
- Consistent styling with Tailwind CSS classes and design tokens
- TypeScript interfaces for component props (e.g., `NavItem` type)

### Styling Approach
- Tailwind CSS v4 with CSS variables for theming
- Custom color scheme with primary colors and semantic tokens
- Responsive design with mobile-first approach
- shadcn/ui provides consistent component styling
- Uses `cn()` utility for conditional className merging

### Path Aliases
- `@/*` maps to `src/*`
- `@/components` for component imports
- `@/lib/utils` for utility functions

### Development Notes
- ESLint configured with Next.js and TypeScript rules
- Development server uses Turbopack for faster builds
- Image optimization with Next.js Image component
- Font optimization with next/font (Inter and Geist Mono)