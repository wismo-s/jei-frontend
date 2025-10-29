# Build stage
FROM node:18-alpine AS build

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy pnpm-lock.yaml file
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts

# Copy project files
COPY . .

# Build the project
# We'll pass build-time args here
ARG VITE_API_BASE_URL
ARG VITE_BUCKET_URL
# Add more build-time args as needed

RUN pnpm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]