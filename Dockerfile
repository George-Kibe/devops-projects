FROM node:22.19.0-alpine AS base
WORKDIR /app

# Install dependencies seperately for caching
COPY package.json package.json
#RUN npm ci --omit=dev || cat /root/.npm/_logs/*-debug-*.log

RUN npm install

# Copy application source
 COPY . .

 # Run as non-root (alpine node image includes user 'node')
USER node
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "npm", "start" ]