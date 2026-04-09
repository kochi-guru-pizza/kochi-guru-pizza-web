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

# Build the Backend application (compiles TypeScript to JavaScript)
RUN npm run build

# Inform Docker that the container will listen on port 5000 at runtime
EXPOSE 5000

# Start the production server
CMD [ "npm", "run", "start" ]
