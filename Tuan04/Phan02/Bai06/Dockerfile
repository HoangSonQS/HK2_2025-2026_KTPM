# Stage 1: Build stage
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Stage 2: Runtime stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app .

# Expose port 3000
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
