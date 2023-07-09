# Stage 1 - the build process
FROM node:16-alpine AS builder
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.19.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
