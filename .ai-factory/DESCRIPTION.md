# Project: LimboCRM

## Overview
LimboCRM is a CRM system for managing escape rooms (quest rooms). The application provides functionality for managing locations, quests, sessions, bookings, and user profiles.

## Core Features
- **Locations Management** — Create and manage physical locations where quests take place
- **Quests** — Manage escape room quests
- **Sessions** — Schedule and manage quest sessions
- **Bookings** — Handle customer booking requests
- **User Management** — User authentication and profile management
- **Dashboard** — Overview and analytics

## Tech Stack
- **Language:** TypeScript
- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite 7
- **State Management:** Pinia
- **Data Fetching:** TanStack Vue Query (v5)
- **Routing:** Vue Router 5
- **HTTP Client:** Axios
- **Date Library:** Day.js
- **UI Library:** @finzor-ui (custom component library)
- **Linting:** ESLint + Oxlint + Prettier
- **Package Manager:** pnpm

## Architecture Notes
- **Domain-Driven Design** — Business logic organized by domains (`domains/location/`, etc.)
- **Layered Architecture:**
  - Domain Models (`Model.ts`) — Business entities
  - DTOs (`Model.dto.ts`) — API data contracts
  - Mappers (`Model.mapper.ts`) — Conversion between layers
  - Drafts (`Model.draft.ts`) — Form data structures
  - API (`Model.api.ts`) — HTTP endpoints
  - Queries (`Model.query.ts`) — TanStack Query hooks
- **Component Structure:** Organized by feature (locations, users, etc.)
- **Routing:** Modular route definitions (`router/_locations.ts`, etc.)
- **Type Safety:** Strict TypeScript configuration with path aliases (`@/*`)

## Non-Functional Requirements
- **Logging:** Configurable via environment variables
- **Error Handling:** Structured error responses via @finzor-ui/feature-api
- **Security:** Authentication middleware via @finzor-ui/feature-auth
- **Performance:** Query caching and optimization via TanStack Query
- **Code Quality:** ESLint + Oxlint + Prettier for consistent code style

## Environment Variables
- `VITE_API_BASE_URL` — Backend API base URL

## Domain Structure Example
Each domain follows a consistent structure:
```
domains/
  location/
    Location.ts              # Domain model
    Location.dto.ts          # API types
    Location.mapper.ts       # DTO ↔ Model conversion
    Location.draft.ts        # Form data types
    Location.api.ts          # API endpoints
    Location.query.ts        # TanStack Query hooks
    index.ts                 # Barrel exports
```
