# Base image with Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --immutable

# Copy the rest of the code
COPY . .

# RUN yarn list --depth=0
# Build the Next.js app
RUN yarn build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the app in production mode
CMD ["yarn", "start"]

