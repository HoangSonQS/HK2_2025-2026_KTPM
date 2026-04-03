# Use postgres:15 as base image
FROM postgres:15

# Set environment variables for DB
ENV POSTGRES_DB=mydb
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword

# Copy initialization SQL to /docker-entrypoint-initdb.d/
# Files in this directory are executed when the container starts for the first time
COPY init.sql /docker-entrypoint-initdb.d/
