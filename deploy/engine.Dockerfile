FROM node:22-alpine
WORKDIR /app
COPY --chown=node:node server ./server
USER node
CMD ["node","server/shared-engine.mjs"]
