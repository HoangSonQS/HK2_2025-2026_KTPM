# Use redis:latest as base image
FROM redis:latest

# Copy custom config file
COPY redis.conf /usr/local/etc/redis/redis.conf

# Start redis with the custom config
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
