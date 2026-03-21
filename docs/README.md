# 📚 Documentation Index

## Ankita Debnath — MBBS Personal Blog Portal

Welcome to the documentation for the Ankita Debnath blog portal. Below is a guide to all available documents.

---

| #  | Document                          | Description                                                     |
|----|-----------------------------------|-----------------------------------------------------------------|
| 01 | [Local Setup](./01-LOCAL-SETUP.md)                | Development environment, dependencies, project structure        |
| 02 | [Docker Setup](./02-DOCKER-SETUP.md)              | Dockerfile, docker-compose, Nginx config                       |
| 03 | [Kubernetes Deployment](./03-KUBERNETES-SETUP.md) | Vanilla K8s manifests, HPA, Ingress, rollouts                  |
| 04 | [AKS Deployment](./04-AKS-DEPLOYMENT.md)          | Azure Kubernetes Service — ACR, AKS cluster, CI/CD             |
| 05 | [OpenShift Deployment](./05-OPENSHIFT-DEPLOYMENT.md) | Red Hat OpenShift — S2I, Routes, BuildConfig                |
| 06 | [Backend & Database](./06-BACKEND-DATABASE.md)    | PostgreSQL schema, Node.js API, authentication, CRUD, K8s deploy |

---

## Quick Start

```bash
# Frontend only (no backend)
npm install && npm run dev
# → http://localhost:8080

# Full stack (with Docker Compose)
docker compose up -d --build
# → Frontend: http://localhost
# → Backend:  http://localhost:3001
# → Database: localhost:5432
```

## Tech Stack

| Layer      | Technology                                      |
|------------|------------------------------------------------|
| Frontend   | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Backend    | Node.js, Express, TypeScript                   |
| Database   | PostgreSQL 16                                  |
| Auth       | JWT (JSON Web Tokens)                          |
| Container  | Docker, Nginx                                  |
| Orchestration | Kubernetes, AKS, OpenShift                  |

## Support

Built and maintained by [dccloud.in.net](https://dccloud.in.net)
