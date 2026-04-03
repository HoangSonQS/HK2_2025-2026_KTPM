# Use golang:1.21-alpine as base image
FROM golang:1.21-alpine

# Set working directory
WORKDIR /app

# Copy application source
COPY . .

# Build the application
RUN go build -o main .

# Expose port 8080
EXPOSE 8080

# Run the application
CMD ["./main"]
