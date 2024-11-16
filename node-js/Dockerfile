# Base stage with node modules installation
FROM node:16-alpine AS builder
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker cache
COPY package*.json ./
RUN npm install --only=production

# Copy application code to the container
COPY . .

# Set environment variable to production for optimized performance
ENV NODE_ENV=production

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
