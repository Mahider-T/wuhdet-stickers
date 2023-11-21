# Use an official Node.js runtime as a base image
# FROM node:alpine
FROM node:18.16.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port on which your app runs
EXPOSE 8080

# Define the command to run your application
CMD ["npm", "start"]
