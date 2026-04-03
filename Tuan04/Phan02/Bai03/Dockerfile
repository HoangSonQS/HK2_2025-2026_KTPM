# Use node:18-alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json .

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Expose port 5173
EXPOSE 5173

# Run the application in dev mode for simplicity as requested "build and run"
CMD ["npm", "run", "dev"]
