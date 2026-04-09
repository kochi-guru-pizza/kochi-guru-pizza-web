# Use Node.js 24 Alpine as the base for a smaller, secure container image
FROM node:24-alpine

# Set the working directory inside the container for all subsequent commands
WORKDIR /app

# Copy dependency definitions first to optimize Docker layer rebuilds
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application source code into the container
COPY . .

# DECLARE BUILD ARGUMENTS: These are passed from docker-compose.yml during 'docker build'
# They are required for 'NEXT_PUBLIC_' variables to be baked into the browser-side code
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build the Next.js application for production
RUN npm run build

# Inform Docker that the container will listen on port 3000 at runtime
EXPOSE 3000

# Start the production server
CMD [ "npm", "run", "start" ]