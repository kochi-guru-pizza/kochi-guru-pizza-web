# Stage 1: Build the app
# Use Node.js 24 Alpine as the base for a smaller, secure container image
FROM node:24-alpine as builder

# Set the working directory inside the container for all subsequent commands
WORKDIR /app

# Copy dependency definitions first to optimize Docker layer rebuilds
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application source code into the container
COPY . .

# Build the Backend application (compiles TypeScript to JavaScript)
RUN npm run build

# Stage 2: Copy the build to runner
FROM node:24-alpine as runner

WORKDIR /app

# Copy build output from builder
COPY --from=builder /app /app

# Inform Docker that the container will listen on port 5000 at runtime
EXPOSE 5000

# Start the production server
CMD [ "npm", "run", "start" ]
