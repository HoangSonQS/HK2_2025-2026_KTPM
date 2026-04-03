# Use python:3.9-slim as base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Set environment variable
ENV APP_ENV=development

# Copy application source
COPY app.py .

# Run the application
CMD ["python", "app.py"]
