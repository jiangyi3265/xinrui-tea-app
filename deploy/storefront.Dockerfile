FROM node:22-bookworm-slim AS build
WORKDIR /source
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Same-origin API is always backed by Java through Nginx, never static demo.
# This is a deployment build, not a claim of passing the production release gate.
RUN H5_API_BASE=/app npm run build

FROM nginx:1.28-alpine
COPY --from=build /source/dist /usr/share/nginx/html
COPY deploy/storefront.conf.template /etc/nginx/templates/default.conf.template
ENV API_UPSTREAM=http://backend:8080
