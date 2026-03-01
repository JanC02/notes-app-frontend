# Notes App — Frontend

A web application for managing notes with a built-in Markdown editor. Allows creating, editing, deleting, and bookmarking notes as favorites. The frontend communicates with a REST API (separate backend service).

## Tech stack

- **React 19** + **TypeScript 5.9**
- **Vite 7** — bundler and dev server
- **React Router 7** — routing (with data loaders)
- **Redux Toolkit** + **React Redux** — state management (authentication, notifications)
- **Axios** — API communication (interceptors, automatic token refresh)
- **Tailwind CSS 4** — styling
- **@uiw/react-md-editor** — Markdown editor for note content

## Features

- **Authentication** — registration, login, logout with JWT support (access + refresh tokens)
- **Automatic token refresh** — Axios interceptor with a queue mechanism to prevent race conditions
- **Session verification** — token validity check on application startup
- **Protected routes** — unauthenticated users are redirected to the login page
- **Notes CRUD** — create, read, update, and delete notes
- **Markdown editor** — live preview while editing note content
- **Favorite notes** — star toggle, favorites displayed at the top of the list
- **Pagination** — page navigation with page number stored in the URL (`?page=X`)
- **Confirmation modals** — native `<dialog>` for note deletion and leaving the form with unsaved changes
- **Notification system** — toasts (success/error) with auto-dismiss after 3 seconds
- **Form validation** — email, password, title (5–255 chars), and note content (5–10,000 chars)
- **Responsive design** — layout adapts to mobile and desktop devices

## Requirements

- **Node.js** (>=18)
- **Backend API** running and accessible (defaults to `http://localhost:3000`)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JanC02/notes-app-frontend.git
   cd notes-app-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:
   ```
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project structure

```
src/
├── assets/fonts/        # Self-hosted font (Reddit Sans)
├── components/
│   ├── notes/           # Note-related components (list, form, layout)
│   └── ui/              # UI components (Modal, Spinner, Notifications, Pagination)
├── config/
│   └── api.ts           # Axios instance with interceptors
├── hooks/
│   └── useInput.ts      # Generic form field validation hook
├── loaders/
│   └── noteLoader.ts    # React Router loader (prefetches note data)
├── pages/               # Pages (Login, Register, Notes, NewNote, EditNote)
├── store/
│   └── slices/          # Redux slices (auth, notification)
├── types/               # TypeScript types (API responses, Note)
├── utils/               # Helper functions (validation, note filtering)
├── App.tsx              # Root component with Outlet and Notifications
├── router.tsx           # Route configuration
├── main.tsx             # Entry point (Provider, AuthProvider, RouterProvider)
└── index.css            # Tailwind, custom font, animations
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | TypeScript compilation + production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint the codebase (ESLint) |

## Planned features

- [ ] Export notes to PDF
