# E-Padhai - Docker Deployment Guide

## Quick Deploy on Play with Docker

### Prerequisites
- Access to [Play with Docker](https://labs.play-with-docker.com/)
- GitHub repository URL

### Deployment Steps

1. **Clone the project from GitHub:**
   ```bash
   git clone https://github.com/Rajib3811/E-PADHAI-FRONT-END-FORMAT.git
   cd E-PADHAI-FRONT-END-FORMAT
   ```

2. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build -d
   ```

3. **Access your application:**
   - Click on the port `3000` that appears at the top of your Play with Docker session
   - Your React app will be available at the generated URL

### Alternative Docker Commands

If you prefer using Docker directly:

```bash
# Clone the repository first
git clone https://github.com/Rajib3811/E-PADHAI-FRONT-END-FORMAT.git
cd E-PADHAI-FRONT-END-FORMAT

# Build the image
docker build -t e-padhai-app .

# Run the container
docker run -d -p 3000:80 --name e-padhai-frontend e-padhai-app
```

### Files Created for Docker Deployment

- `Dockerfile` - Multi-stage build for production optimization
- `docker-compose.yml` - Container orchestration
- `nginx.conf` - Web server configuration with SPA routing support
- `.dockerignore` - Excludes unnecessary files from Docker context
- `DEPLOY.md` - This deployment guide

### Container Details

- **Base Image**: Node.js 18 Alpine (build stage) + Nginx Alpine (production)
- **Port**: 3000 (external) → 80 (internal)
- **Features**: 
  - Optimized production build
  - Client-side routing support
  - Static asset caching
  - Gzip compression

### Troubleshooting

If the container doesn't start:
```bash
# Check container logs
docker logs e-padhai-frontend

# Check if port is available
docker ps
```

### Environment Variables

To add environment variables, create a `.env` file in the project root or modify the `docker-compose.yml` file.
