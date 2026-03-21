# Azure Kubernetes Service (AKS) Deployment Guide

## Deploying to Microsoft Azure AKS

---

## Prerequisites

| Tool         | Install                                              |
|--------------|------------------------------------------------------|
| Azure CLI    | https://learn.microsoft.com/en-us/cli/azure/install  |
| kubectl      | `az aks install-cli`                                 |
| Docker       | https://docs.docker.com/get-docker/                  |
| Helm (opt.)  | https://helm.sh/docs/intro/install/                  |

---

## 1. Azure Setup

```bash
# Login to Azure
az login

# Set subscription
az account set --subscription "<subscription-id>"

# Create resource group
az group create \
  --name rg-ankita-blog \
  --location eastus

# Create Azure Container Registry (ACR)
az acr create \
  --resource-group rg-ankita-blog \
  --name ankitablogacr \
  --sku Basic

# Login to ACR
az acr login --name ankitablogacr
```

## 2. Build & Push Image to ACR

```bash
# Build image
docker build -t ankitablogacr.azurecr.io/ankita-blog:1.0.0 .

# Push to ACR
docker push ankitablogacr.azurecr.io/ankita-blog:1.0.0

# OR use ACR Build (no local Docker needed)
az acr build \
  --registry ankitablogacr \
  --image ankita-blog:1.0.0 .
```

## 3. Create AKS Cluster

```bash
# Create AKS cluster
az aks create \
  --resource-group rg-ankita-blog \
  --name aks-ankita-blog \
  --node-count 2 \
  --node-vm-size Standard_B2s \
  --enable-managed-identity \
  --attach-acr ankitablogacr \
  --generate-ssh-keys \
  --network-plugin azure \
  --enable-addons monitoring

# Get credentials
az aks get-credentials \
  --resource-group rg-ankita-blog \
  --name aks-ankita-blog

# Verify
kubectl get nodes
```

## 4. Install NGINX Ingress Controller

```bash
# Using Helm
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.replicaCount=2 \
  --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-load-balancer-health-probe-request-path"=/healthz
```

## 5. Install cert-manager (for TLS)

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set installCRDs=true
```

Create ClusterIssuer (`k8s/aks/cluster-issuer.yaml`):

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: ankita@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx
```

```bash
kubectl apply -f k8s/aks/cluster-issuer.yaml
```

## 6. Deploy Application

Update image references in `k8s/deployment.yaml` to use ACR:

```yaml
image: ankitablogacr.azurecr.io/ankita-blog:1.0.0
```

```bash
kubectl apply -f k8s/
```

## 7. Configure DNS

```bash
# Get the external IP of the ingress
kubectl get svc -n ingress-nginx

# Create a DNS A record pointing your domain to that IP
# e.g., blog.ankitadebnath.com → <EXTERNAL-IP>
```

## 8. Monitoring & Logging

```bash
# View pod logs
kubectl logs -f deployment/ankita-blog -n ankita-blog

# Open Azure Monitor
az aks browse --resource-group rg-ankita-blog --name aks-ankita-blog

# Check cluster health
kubectl top nodes
kubectl top pods -n ankita-blog
```

## 9. Scaling

```bash
# Manual scaling
kubectl scale deployment ankita-blog --replicas=3 -n ankita-blog

# Cluster autoscaler
az aks update \
  --resource-group rg-ankita-blog \
  --name aks-ankita-blog \
  --enable-cluster-autoscaler \
  --min-count 1 \
  --max-count 5
```

## 10. CI/CD with Azure DevOps or GitHub Actions

### GitHub Actions Example (`.github/workflows/deploy.yml`):

```yaml
name: Build & Deploy to AKS

on:
  push:
    branches: [main]

env:
  ACR_NAME: ankitablogacr
  AKS_CLUSTER: aks-ankita-blog
  RESOURCE_GROUP: rg-ankita-blog
  IMAGE_NAME: ankita-blog

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Azure Login
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Build & Push to ACR
        run: |
          az acr build \
            --registry $ACR_NAME \
            --image $IMAGE_NAME:${{ github.sha }} .

      - name: Set AKS context
        uses: azure/aks-set-context@v4
        with:
          resource-group: ${{ env.RESOURCE_GROUP }}
          cluster-name: ${{ env.AKS_CLUSTER }}

      - name: Deploy to AKS
        run: |
          kubectl set image deployment/ankita-blog \
            ankita-blog=$ACR_NAME.azurecr.io/$IMAGE_NAME:${{ github.sha }} \
            -n ankita-blog
```

---

## Cost Optimization Tips

- Use **Standard_B2s** or **Standard_B2ms** for dev/staging
- Enable **cluster autoscaler** with min 1 node
- Use **spot instances** for non-production workloads
- Stop the cluster when not in use: `az aks stop --resource-group rg-ankita-blog --name aks-ankita-blog`
