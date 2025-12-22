# FinControl - Sistema de Controle Financeiro Empresarial

## Overview

FinControl is an enterprise financial management system built for Brazilian businesses. It provides comprehensive tools for managing accounts payable/receivable, cash flow analysis, income statements (DRE), and financial reporting. The application follows a client-server architecture with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack Query for server state, React hooks for local state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization

The frontend follows a page-based structure with reusable components. All pages are in Portuguese (Brazilian) to match the target market.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful JSON API with `/api` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Schema Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod

The backend uses an in-memory storage implementation (`MemStorage`) that can be swapped for PostgreSQL via the `IStorage` interface pattern.

### Data Storage
- **Primary Database**: PostgreSQL (configured via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with migrations in `/migrations` directory
- **Schema Location**: `shared/schema.ts` - contains all table definitions and Zod schemas

Key entities: Users, Suppliers, Clients, Categories, Cost Centers, Accounts Payable, Accounts Receivable, Mercado Pago Transactions

### Build System
- **Development**: Vite for frontend HMR, tsx for backend TypeScript execution
- **Production**: Custom build script using esbuild for server bundling, Vite for client
- **Output**: Combined into `dist/` directory with static files in `dist/public/`

### Design System
- Material Design principles adapted for financial data presentation
- Inter font family for professional typography
- Green primary color (HSL 142) for financial/money associations
- Responsive sidebar navigation with collapsible mobile support

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations and schema push (`npm run db:push`)

### UI Dependencies
- **Radix UI**: Complete primitive component set for accessibility
- **shadcn/ui**: Pre-built component library (configured in `components.json`)
- **Lucide React**: Icon library
- **Recharts**: Charting library for financial visualizations

### Development Tools
- **Vite**: Frontend build and development server
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner (development only)

### Session/Authentication (Partially Configured)
- **connect-pg-simple**: PostgreSQL session store (in dependencies)
- **express-session**: Session middleware (in dependencies)
- **passport/passport-local**: Authentication (in dependencies but not implemented)

### Payment Integration (Configured but Not Implemented)
- **Mercado Pago**: Transaction tracking schema exists, integration ready for implementation