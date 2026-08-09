# Notes App — Frontend

A React application for managing Markdown notes. It supports creating, editing, deleting, favoriting, and exporting notes while using the separate Notes App backend for persistence and authentication.

## Tech stack

- **UI:** React 19 + TypeScript 5.9
- **Build tooling:** Vite 7
- **Routing:** React Router 7 with nested routes and a data loader
- **State management:** Redux Toolkit + React Redux
- **API client:** Axios using its Fetch adapter
- **Styling:** Tailwind CSS 4
- **Markdown editor:** @uiw/react-md-editor
- **PDF export:** html2pdf.js

Redux is intentionally used as part of the project's educational scope to manage authentication and notification state.

## Features

- Registration, login, logout, and session restoration
- Protected and public-only routes
- Full notes CRUD
- Markdown editing with live preview
- Favorite notes displayed before regular notes
- Pagination stored in the URL as `?page=X`
- Confirmation dialogs for note deletion and unsaved changes
- Toast notifications with automatic dismissal
- Client-side form validation
- Responsive layout
- PDF export with rendered Markdown
- Loading indicator while the initial session is being verified

## Authentication

The current version uses a classic server-side session. The browser stores the opaque session identifier in an HTTP-only cookie set by the backend. The frontend neither reads nor stores the identifier and does not manage access or refresh tokens.

The Axios instance uses a relative `/api` base URL and enables credentials for every request. Redux stores only the authenticated user's public data and the UI state related to authentication.

### Application startup

1. The authentication state starts with session verification marked as pending.
2. `AuthProvider` requests `GET /users/me` when the application mounts.
3. The router is hidden behind a loading indicator until that request finishes.
4. A successful response restores the user in Redux.
5. A rejected response marks the user as unauthenticated and allows the public routes to render.

`ProtectedRoute` redirects unauthenticated users to `/login`. `UnprotectedRoute` redirects authenticated users away from the login and registration pages to `/notes`.

Logout asks the backend to revoke the session and then clears the local authentication state. The local state is also cleared if the request fails, so the user can leave the authenticated UI even during a network or server error. Because the cookie is HTTP-only, only a successful backend response can clear it in the browser and guarantee server-side session revocation.

## Why sessions instead of JWT

JWT authentication was implemented earlier as an educational exercise and remains available on the `feature/jwt-auth` branch. That version keeps the access token in memory, stores the refresh token in an HTTP-only cookie, rotates refresh tokens, and coordinates failed requests through Axios interceptors.

The implementation was useful for learning token refresh, rotation, reuse detection, and concurrent-request handling. It also introduced significantly more client-side state and coordination than an application of this scale needs. The current version therefore uses server-side sessions, leaving session lifecycle and revocation to the backend and keeping the frontend focused on application state and UI behavior.

## API communication

The Axios client is configured in [`src/config/api.ts`](src/config/api.ts):

```ts
export const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    },
    adapter: 'fetch',
    withCredentials: true
});
```

No frontend environment variables are required. Requests use the same origin as the application and are forwarded to the backend by the development or production proxy:

- **Development:** Vite rewrites `/api/*` and forwards it to `http://notes-app-backend:3000/*`.
- **Production:** Nginx forwards `/api/*` to the backend and serves the compiled single-page application.

This same-origin setup allows the browser to use the session cookie without exposing the backend directly or requiring frontend CORS configuration.

## Routes

| Path | Access | Description |
|---|---|---|
| `/` | Any | Redirect to `/notes` |
| `/login` | Unauthenticated | Login form |
| `/register` | Unauthenticated | Registration form |
| `/notes` | Authenticated | Paginated notes list |
| `/notes/new` | Authenticated | Create a note |
| `/notes/:id` | Authenticated | Edit a note; data loaded with React Router |
| Any unmatched path | Any | Not-found page |

## Project structure

```text
src/
  assets/fonts/                  # Self-hosted Reddit Sans fonts
  components/
    AuthForm.tsx                 # Shared login and registration form
    AuthProvider.tsx             # Initial session restoration
    ProtectedRoute.tsx           # Authenticated-route guard
    UnprotectedRoute.tsx         # Public-only route guard
    notes/                       # Notes list, form, and layout components
    ui/                          # Reusable dialogs, notifications, inputs, and icons
  config/
    api.ts                       # Credentialed Axios instance
  hooks/
    useInput.ts                  # Form-input state and validation
  loaders/
    noteLoader.ts                # React Router note loader
  pages/                         # Route-level page components
  store/
    slices/auth.ts               # Authentication state and async actions
    slices/notification.ts       # Notification state
    store.ts                     # Redux store configuration
  types/                         # API and note types
  utils/                         # Authentication and note helpers
  App.tsx                        # Root layout and router outlet
  main.tsx                       # React, Redux, auth, and router providers
  router.tsx                     # Route definitions
  index.css                      # Tailwind setup and global styles
```

## Running with Docker Compose

This repository is normally checked out as `notes-app-frontend/` inside the separate [notes-app-infra](../README.md) repository. From the infrastructure repository root, run:

```bash
# Development: Vite dev server with hot reload
docker compose up --build

# Production: static build served by Nginx
docker compose -f docker-compose.prod.yml up -d --build
```

The development application is exposed on port `5173`. The production image serves the application through Nginx on the port configured by the infrastructure repository. Its Nginx configuration also applies HTTP Basic Auth to the frontend while leaving the proxied `/api` location available to the application.

The public production deployment uses HTTPS terminated by the external hosting proxy. Communication between Nginx and the backend remains inside the Docker network.

## Running manually

The current Vite proxy target uses the Docker service name `notes-app-backend`, which resolves only inside the Compose network. To run the frontend directly on the host, first change the proxy target in `vite.config.ts` to `http://localhost:3000` or the address of your backend.

Then install dependencies and start Vite:

```bash
npm ci
npm run dev
```

Node.js 24 is recommended and matches the version used by the Docker image.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check the project with ESLint |
