# Backend & Database Configuration Guide

## Full-Stack Setup for Ankita Debnath Blog Portal

---

## Architecture Overview

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│  Backend API │────▶│  PostgreSQL   │
│  (React/Vite)│     │  (Node.js)   │     │   Database    │
│  Port: 8080  │     │  Port: 3001  │     │  Port: 5432   │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## Part A: Database Setup (PostgreSQL)

### 1. Install PostgreSQL

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install postgresql postgresql-contrib -y

# macOS (Homebrew)
brew install postgresql@16 && brew services start postgresql@16

# Docker (recommended)
docker run -d \
  --name ankita-blog-db \
  -e POSTGRES_DB=ankita_blog \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=securepassword \
  -p 5432:5432 \
  postgres:16-alpine
```

### 2. Database Schema

Create `backend/init.sql`:

```sql
-- ============================================
-- Ankita Debnath Blog — Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================
-- Admin Users Table
-- ==================
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL DEFAULT 'Admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================
-- Site Content Table (for editable sections)
-- ==================
CREATE TABLE site_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key VARCHAR(100) UNIQUE NOT NULL,
    title TEXT,
    subtitle TEXT,
    body TEXT,
    image_url TEXT,
    metadata JSONB DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES admin_users(id)
);

-- ==================
-- Blog Posts Table
-- ==================
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    category VARCHAR(100),
    tags TEXT[] DEFAULT '{}',
    read_time_minutes INT DEFAULT 5,
    is_published BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    author_id UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);

-- ==================
-- Study Notes Table
-- ==================
CREATE TABLE study_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject VARCHAR(100) NOT NULL,
    topic VARCHAR(300) NOT NULL,
    content TEXT,
    year VARCHAR(20),
    difficulty VARCHAR(20) DEFAULT 'medium',
    pdf_url TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================
-- Achievements Table
-- ==================
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(300) NOT NULL,
    description TEXT,
    date DATE,
    category VARCHAR(100),
    icon VARCHAR(50),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================
-- Journey Milestones Table
-- ==================
CREATE TABLE journey_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(300) NOT NULL,
    description TEXT,
    year VARCHAR(10),
    category VARCHAR(100),
    icon VARCHAR(50),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================
-- Contact Messages Table
-- ==================
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================
-- Newsletter Subscribers
-- ==================
CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- ==================
-- Media / Uploads Table
-- ==================
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(500) NOT NULL,
    url TEXT NOT NULL,
    mime_type VARCHAR(100),
    size_bytes BIGINT,
    alt_text TEXT,
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    uploaded_by UUID REFERENCES admin_users(id)
);

-- ==================
-- Seed: Default admin
-- ==================
-- Password: admin123 (bcrypt hash — change in production!)
INSERT INTO admin_users (email, password_hash, name) VALUES
('ankita@example.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Fp6dGH/v61.GE0xQMOmCi', 'Ankita Debnath');

-- ==================
-- Seed: Default site content
-- ==================
INSERT INTO site_content (section_key, title, subtitle, body) VALUES
('hero', 'Hi, I''m Ankita Debnath', 'An MBBS student sharing my journey, achievements, medical learning, study practices, and life experiences.', NULL),
('about_intro', 'About Me', NULL, 'I''m a passionate MBBS student documenting my medical journey...'),
('my_story', 'The Journey That Shaped Me', NULL, 'Every great journey begins with a single step...');
```

### 3. Run the Schema

```bash
# Using psql
psql -h localhost -U postgres -d ankita_blog -f backend/init.sql

# OR via Docker
docker exec -i ankita-blog-db psql -U postgres -d ankita_blog < backend/init.sql
```

---

## Part B: Backend API (Node.js + Express)

### 1. Initialize Backend

```bash
mkdir backend && cd backend
npm init -y
npm install express cors bcryptjs jsonwebtoken pg dotenv multer helmet express-rate-limit
npm install -D typescript @types/node @types/express @types/cors @types/bcryptjs @types/jsonwebtoken @types/pg @types/multer ts-node nodemon
```

### 2. Backend Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts        # DB connection pool
│   ├── middleware/
│   │   └── auth.ts            # JWT authentication
│   ├── routes/
│   │   ├── auth.ts            # Login / register
│   │   ├── posts.ts           # Blog CRUD
│   │   ├── notes.ts           # Study notes CRUD
│   │   ├── content.ts         # Site content CRUD
│   │   ├── achievements.ts    # Achievements CRUD
│   │   ├── contact.ts         # Contact form
│   │   └── media.ts           # File uploads
│   ├── utils/
│   │   └── helpers.ts
│   └── index.ts               # Entry point
├── uploads/                    # Uploaded files
├── init.sql                    # Database schema
├── package.json
├── tsconfig.json
└── .env
```

### 3. Core Files

#### backend/src/config/database.ts

```typescript
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});

pool.on("connect", () => console.log("✅ Database connected"));
pool.on("error", (err) => console.error("❌ Database error:", err));

export default pool;
```

#### backend/src/middleware/auth.ts

```typescript
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string };
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
```

#### backend/src/routes/auth.ts

```typescript
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/database";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM admin_users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
```

#### backend/src/routes/posts.ts

```typescript
import { Router } from "express";
import pool from "../config/database";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// Public: Get published posts
router.get("/", async (req, res) => {
  try {
    const { category, search, limit = 10, offset = 0 } = req.query;
    let query = "SELECT * FROM blog_posts WHERE is_published = true";
    const params: any[] = [];

    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }
    if (search) {
      params.push(`%${search}%`);
      query += ` AND (title ILIKE $${params.length} OR content ILIKE $${params.length})`;
    }

    query += " ORDER BY published_at DESC";
    params.push(limit);
    query += ` LIMIT $${params.length}`;
    params.push(offset);
    query += ` OFFSET $${params.length}`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Public: Get single post by slug
router.get("/:slug", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM blog_posts WHERE slug = $1 AND is_published = true",
      [req.params.slug]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// Admin: Create post
router.post("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const { title, slug, excerpt, content, featured_image, category, tags, read_time_minutes, is_published, is_featured } = req.body;
    const result = await pool.query(
      `INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, category, tags, read_time_minutes, is_published, is_featured, published_at, author_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [title, slug, excerpt, content, featured_image, category, tags || [], read_time_minutes || 5, is_published || false, is_featured || false, is_published ? new Date() : null, req.user!.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Admin: Update post
router.put("/:id", authenticate, async (req: AuthRequest, res) => {
  try {
    const { title, slug, excerpt, content, featured_image, category, tags, read_time_minutes, is_published, is_featured } = req.body;
    const result = await pool.query(
      `UPDATE blog_posts SET title=$1, slug=$2, excerpt=$3, content=$4, featured_image=$5, category=$6, tags=$7, read_time_minutes=$8, is_published=$9, is_featured=$10, updated_at=NOW(), published_at=CASE WHEN $9 AND published_at IS NULL THEN NOW() ELSE published_at END
       WHERE id=$11 RETURNING *`,
      [title, slug, excerpt, content, featured_image, category, tags, read_time_minutes, is_published, is_featured, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

// Admin: Delete post
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await pool.query("DELETE FROM blog_posts WHERE id = $1", [req.params.id]);
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

export default router;
```

#### backend/src/routes/content.ts

```typescript
import { Router } from "express";
import pool from "../config/database";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// Public: Get all content
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM site_content ORDER BY section_key");
    const contentMap: Record<string, any> = {};
    result.rows.forEach((row) => {
      contentMap[row.section_key] = row;
    });
    res.json(contentMap);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

// Admin: Update section content
router.put("/:sectionKey", authenticate, async (req: AuthRequest, res) => {
  try {
    const { title, subtitle, body, image_url, metadata } = req.body;
    const result = await pool.query(
      `INSERT INTO site_content (section_key, title, subtitle, body, image_url, metadata, updated_by, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       ON CONFLICT (section_key) DO UPDATE SET
         title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, body = EXCLUDED.body,
         image_url = EXCLUDED.image_url, metadata = EXCLUDED.metadata,
         updated_by = EXCLUDED.updated_by, updated_at = NOW()
       RETURNING *`,
      [req.params.sectionKey, title, subtitle, body, image_url, metadata || {}, req.user!.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update content" });
  }
});

export default router;
```

#### backend/src/index.ts

```typescript
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import postRoutes from "./routes/posts";
import contentRoutes from "./routes/content";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:8080",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));

// Rate limiting
app.use("/api/auth", rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Too many login attempts" },
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/content", contentRoutes);

// Uploaded files
app.use("/uploads", express.static("uploads"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
```

#### backend/.env

```env
DATABASE_URL=postgresql://postgres:securepassword@localhost:5432/ankita_blog
JWT_SECRET=your-super-secret-jwt-key-change-in-production
ADMIN_EMAIL=ankita@example.com
PORT=3001
FRONTEND_URL=http://localhost:8080
NODE_ENV=development
```

#### backend/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```

#### backend/package.json (scripts)

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:init": "psql $DATABASE_URL -f init.sql"
  }
}
```

### 4. Run Backend

```bash
cd backend

# Start in development
npm run dev

# Build for production
npm run build
npm start
```

---

## Part C: Frontend-Backend Integration

Update the frontend to connect to the backend API by setting the environment variable:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

Create a simple API client in the frontend (`src/lib/api.ts`):

```typescript
const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function apiFetch(path: string, options?: RequestInit) {
  const token = localStorage.getItem("admin_token");
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

  // Blog posts
  getPosts: (params?: Record<string, string>) =>
    apiFetch(`/posts?${new URLSearchParams(params)}`),
  getPost: (slug: string) => apiFetch(`/posts/${slug}`),
  createPost: (data: any) =>
    apiFetch("/posts", { method: "POST", body: JSON.stringify(data) }),
  updatePost: (id: string, data: any) =>
    apiFetch(`/posts/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deletePost: (id: string) =>
    apiFetch(`/posts/${id}`, { method: "DELETE" }),

  // Site content
  getContent: () => apiFetch("/content"),
  updateContent: (key: string, data: any) =>
    apiFetch(`/content/${key}`, { method: "PUT", body: JSON.stringify(data) }),
};
```

---

## Part D: Deploying Backend on Kubernetes

### Backend Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3001
CMD ["node", "dist/index.js"]
```

### k8s/backend-deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ankita-blog-api
  namespace: ankita-blog
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ankita-blog-api
  template:
    metadata:
      labels:
        app: ankita-blog-api
    spec:
      containers:
        - name: api
          image: <registry>/ankita-blog-api:1.0.0
          ports:
            - containerPort: 3001
          envFrom:
            - secretRef:
                name: ankita-blog-secrets
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 256Mi
---
apiVersion: v1
kind: Service
metadata:
  name: ankita-blog-api-svc
  namespace: ankita-blog
spec:
  selector:
    app: ankita-blog-api
  ports:
    - port: 3001
      targetPort: 3001
```

### k8s/database-secret.yaml

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: ankita-blog-secrets
  namespace: ankita-blog
type: Opaque
stringData:
  DATABASE_URL: "postgresql://postgres:password@db-svc:5432/ankita_blog"
  JWT_SECRET: "your-production-jwt-secret"
  FRONTEND_URL: "https://blog.ankitadebnath.com"
  NODE_ENV: "production"
```

---

## Quick Start Commands

```bash
# 1. Start database
docker run -d --name db -e POSTGRES_DB=ankita_blog -e POSTGRES_PASSWORD=password -p 5432:5432 postgres:16-alpine

# 2. Initialize schema
psql postgresql://postgres:password@localhost:5432/ankita_blog -f backend/init.sql

# 3. Start backend
cd backend && npm run dev

# 4. Start frontend
cd .. && npm run dev

# 5. Open browser
# Frontend: http://localhost:8080
# Backend:  http://localhost:3001/api/health
# Admin:    http://localhost:8080/admin
```
