# OpenShift Deployment Guide

## Deploying to Red Hat OpenShift

---

## Prerequisites

| Tool     | Install                                              |
|----------|------------------------------------------------------|
| oc CLI   | https://docs.openshift.com/container-platform/latest/cli_reference/openshift_cli/getting-started-cli.html |
| Docker   | https://docs.docker.com/get-docker/                  |
| Podman   | Alternative to Docker on RHEL/Fedora                 |

---

## 1. Login to OpenShift

```bash
# Login via CLI
oc login https://<openshift-cluster-url> --token=<your-token>

# OR with username/password
oc login -u <username> -p <password> https://<openshift-cluster-url>
```

## 2. Create Project (Namespace)

```bash
oc new-project ankita-blog \
  --display-name="Ankita Debnath Blog" \
  --description="Personal MBBS blog portal"
```

## 3. Build & Deploy (Source-to-Image)

OpenShift can build from source using S2I:

```bash
# Direct from Git repository
oc new-app \
  --name=ankita-blog \
  --strategy=docker \
  https://github.com/<your-org>/ankita-debnath-blog.git

# Watch the build
oc logs -f buildconfig/ankita-blog
```

## 4. OR Deploy Pre-built Image

### Push to OpenShift Internal Registry

```bash
# Get registry URL
oc registry info

# Login to internal registry
docker login -u $(oc whoami) -p $(oc whoami -t) $(oc registry info)

# Tag and push
docker tag ankita-blog:latest $(oc registry info)/ankita-blog/ankita-blog:latest
docker push $(oc registry info)/ankita-blog/ankita-blog:latest
```

### Deploy from image

```bash
oc new-app --image-stream=ankita-blog:latest --name=ankita-blog
```

## 5. OpenShift Manifests

### openshift/deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ankita-blog
  labels:
    app: ankita-blog
    app.kubernetes.io/part-of: ankita-blog-portal
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ankita-blog
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
  template:
    metadata:
      labels:
        app: ankita-blog
    spec:
      containers:
        - name: ankita-blog
          image: image-registry.openshift-image-registry.svc:5000/ankita-blog/ankita-blog:latest
          ports:
            - containerPort: 8080
              protocol: TCP
          resources:
            requests:
              cpu: 50m
              memory: 64Mi
            limits:
              cpu: 200m
              memory: 128Mi
          livenessProbe:
            httpGet:
              path: /
              port: 8080
            initialDelaySeconds: 10
            periodSeconds: 30
          readinessProbe:
            httpGet:
              path: /
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 10
          securityContext:
            allowPrivilegeEscalation: false
            runAsNonRoot: true
            seccompProfile:
              type: RuntimeDefault
            capabilities:
              drop: ["ALL"]
```

> **Note:** OpenShift enforces non-root by default. Use port 8080 instead of 80.

### Nginx Config for OpenShift (non-root, port 8080)

Update `docker/nginx-openshift.conf`:

```nginx
server {
    listen 8080;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Dockerfile for OpenShift

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --silent
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY docker/nginx-openshift.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

### openshift/service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: ankita-blog-svc
spec:
  selector:
    app: ankita-blog
  ports:
    - port: 8080
      targetPort: 8080
```

### openshift/route.yaml

```yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: ankita-blog
  annotations:
    haproxy.router.openshift.io/timeout: 30s
spec:
  host: blog.ankitadebnath.com
  to:
    kind: Service
    name: ankita-blog-svc
    weight: 100
  port:
    targetPort: 8080
  tls:
    termination: edge
    insecureEdgeTerminationPolicy: Redirect
```

## 6. Apply Manifests

```bash
oc apply -f openshift/

# Verify
oc get all
oc get routes
```

## 7. Build Automation (BuildConfig)

```yaml
apiVersion: build.openshift.io/v1
kind: BuildConfig
metadata:
  name: ankita-blog
spec:
  source:
    type: Git
    git:
      uri: https://github.com/<your-org>/ankita-debnath-blog.git
      ref: main
  strategy:
    type: Docker
    dockerStrategy:
      dockerfilePath: Dockerfile
  output:
    to:
      kind: ImageStreamTag
      name: ankita-blog:latest
  triggers:
    - type: GitHub
      github:
        secret: webhook-secret
    - type: ConfigChange
```

```bash
# Start a build manually
oc start-build ankita-blog --follow

# Set up webhook in GitHub for automatic builds
oc describe buildconfig ankita-blog | grep -A5 "Webhook"
```

## 8. Monitoring

```bash
# Pod status
oc get pods -w

# Logs
oc logs -f deployment/ankita-blog

# Events
oc get events --sort-by='.lastTimestamp'

# Resource usage
oc adm top pods
```
