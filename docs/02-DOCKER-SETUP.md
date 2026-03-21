# Docker Setup Guide

## Containerizing the Portal

---

## Dockerfile (Multi-stage Build)

Create a `Dockerfile` in the project root:

```dockerfile
# ============ Stage 1: Build ============
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json* bun.lockb* ./
RUN npm ci --silent
COPY . .
RUN npm run build

# ============ Stage 2: Serve ============
FROM nginx:1.27-alpine AS production

# Copy custom nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Nginx Configuration

Create `docker/nginx.conf`:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback — all routes serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

## .dockerignore

Create `.dockerignore`:

```
node_modules
dist
.git
.gitignore
docs
*.md
.env*
```

## Build & Run

```bash
# Build image
docker build -t ankita-blog:latest .

# Run container
docker run -d --name ankita-blog -p 80:80 ankita-blog:latest

# View logs
docker logs -f ankita-blog

# Stop
docker stop ankita-blog && docker rm ankita-blog
```

## Docker Compose

Create `docker-compose.yml`:

```yaml
version: "3.9"

services:
  frontend:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 3s
      retries: 3

  # Optional: Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://postgres:password@db:5432/ankita_blog
      JWT_SECRET: ${JWT_SECRET:-change-me-in-production}
      ADMIN_EMAIL: ${ADMIN_EMAIL:-admin@example.com}
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  # Optional: PostgreSQL Database
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ankita_blog
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./backend/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
```

```bash
# Start all services
docker compose up -d --build

# Stop all
docker compose down

# Stop and remove volumes
docker compose down -v
```
