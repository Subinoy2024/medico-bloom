# Kubernetes Deployment Guide

## Deploying to Vanilla Kubernetes

---

## Prerequisites

- `kubectl` CLI configured with cluster access
- Container registry (Docker Hub, GitHub Container Registry, or private)
- Kubernetes cluster (v1.26+)

---

## 1. Push Docker Image

```bash
# Build
docker build -t <registry>/ankita-blog:1.0.0 .

# Push
docker push <registry>/ankita-blog:1.0.0
```

---

## 2. Kubernetes Manifests

Create `k8s/` directory with the following files:

### k8s/namespace.yaml

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ankita-blog
  labels:
    app: ankita-blog
```

### k8s/deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ankita-blog
  namespace: ankita-blog
  labels:
    app: ankita-blog
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ankita-blog
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: ankita-blog
    spec:
      containers:
        - name: ankita-blog
          image: <registry>/ankita-blog:1.0.0
          ports:
            - containerPort: 80
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
              port: 80
            initialDelaySeconds: 10
            periodSeconds: 30
          readinessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 10
```

### k8s/service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: ankita-blog-svc
  namespace: ankita-blog
spec:
  type: ClusterIP
  selector:
    app: ankita-blog
  ports:
    - port: 80
      targetPort: 80
      protocol: TCP
```

### k8s/ingress.yaml

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ankita-blog-ingress
  namespace: ankita-blog
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - blog.ankitadebnath.com
      secretName: ankita-blog-tls
  rules:
    - host: blog.ankitadebnath.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: ankita-blog-svc
                port:
                  number: 80
```

### k8s/hpa.yaml (Horizontal Pod Autoscaler)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ankita-blog-hpa
  namespace: ankita-blog
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ankita-blog
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

---

## 3. Deploy

```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Deploy all resources
kubectl apply -f k8s/

# Verify
kubectl get all -n ankita-blog

# Check pods
kubectl get pods -n ankita-blog -w

# View logs
kubectl logs -f deployment/ankita-blog -n ankita-blog
```

## 4. Update Deployment

```bash
# Build new version
docker build -t <registry>/ankita-blog:1.1.0 .
docker push <registry>/ankita-blog:1.1.0

# Update image
kubectl set image deployment/ankita-blog \
  ankita-blog=<registry>/ankita-blog:1.1.0 \
  -n ankita-blog

# Watch rollout
kubectl rollout status deployment/ankita-blog -n ankita-blog

# Rollback if needed
kubectl rollout undo deployment/ankita-blog -n ankita-blog
```

## 5. ConfigMap for Runtime Config (Optional)

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: ankita-blog-config
  namespace: ankita-blog
data:
  API_BASE_URL: "https://api.ankitadebnath.com"
  SITE_NAME: "Ankita Debnath"
```

Mount as environment variables in the deployment spec:

```yaml
envFrom:
  - configMapRef:
      name: ankita-blog-config
```
