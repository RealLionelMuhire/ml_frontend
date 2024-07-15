# Use Node.js version 18
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Set Node.js memory limit to 4GB
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install the dependencies with retry logic
RUN set -eux; \
    for i in $(seq 1 5); do \
        yarn install && break || sleep 5; \
    done

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
