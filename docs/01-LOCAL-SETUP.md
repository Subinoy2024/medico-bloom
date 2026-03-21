# Local Development Setup Guide

## Ankita Debnath — MBBS Personal Blog Portal

---

## Prerequisites

| Tool       | Version  | Install                                      |
|------------|----------|----------------------------------------------|
| Node.js    | ≥ 18.x   | https://nodejs.org                           |
| npm / bun  | latest   | Comes with Node.js / https://bun.sh          |
| Git        | ≥ 2.x    | https://git-scm.com                          |

---

## 1. Clone the Repository

```bash
git clone https://github.com/<your-org>/ankita-debnath-blog.git
cd ankita-debnath-blog
```

## 2. Install Dependencies

```bash
# Using npm
npm install

# OR using bun (faster)
bun install
```

## 3. Environment Variables

Create a `.env` file in the project root (if connecting to a backend later):

```env
# Frontend (Vite exposes VITE_ prefixed vars to the browser)
VITE_API_BASE_URL=http://localhost:3001/api
VITE_SITE_NAME="Ankita Debnath"

# Backend (if running separately)
DATABASE_URL=postgresql://postgres:password@localhost:5432/ankita_blog
JWT_SECRET=your-jwt-secret-here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=securepassword123
PORT=3001
```

> **Note:** `VITE_` prefixed variables are embedded at build time and visible in the browser. Never put secrets in `VITE_` variables.

## 4. Run Development Server

```bash
# Start the dev server
npm run dev

# OR
bun run dev
```

The app will be available at **http://localhost:8080**

## 5. Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder — ready to be served by any static file server (Nginx, Apache, Caddy, etc.).

## 6. Preview Production Build

```bash
npm run preview
```

## 7. Run Tests

```bash
npm run test          # single run
npm run test:watch    # watch mode
```

## 8. Lint

```bash
npm run lint
```

---

## Project Structure

```
├── docs/                    # Documentation
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, fonts
│   ├── components/          # Reusable UI components
│   │   └── ui/              # shadcn/ui components
│   ├── contexts/            # React contexts (AdminContext)
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilities & content store
│   ├── pages/               # Route pages
│   └── main.tsx             # App entry point
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind CSS config
├── tsconfig.json            # TypeScript config
└── package.json
```

---

## Serving with Nginx (Local Docker)

```bash
# Build the project
npm run build

# Run with Nginx
docker run --rm -p 80:80 \
  -v $(pwd)/dist:/usr/share/nginx/html:ro \
  nginx:alpine
```

Visit **http://localhost**

---

## Troubleshooting

| Issue                        | Solution                                        |
|------------------------------|------------------------------------------------|
| Port 8080 already in use     | Change port in `vite.config.ts` → `server.port`|
| Node version mismatch        | Use `nvm use 18` or install Node 18+           |
| Module not found errors      | Delete `node_modules` and reinstall            |
| Styles not loading           | Ensure `postcss.config.js` and `tailwind.config.ts` exist |
