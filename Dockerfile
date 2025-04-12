# Dockerfile
FROM node:20

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port (must match Render port)
EXPOSE 8000

# Start app
CMD ["node", "dist/index.js"]
