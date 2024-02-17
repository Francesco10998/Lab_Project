#Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder


# Set the working directory to /frontend
WORKDIR /server-offer

# Copia i file del tuo progetto nel container
COPY package.json package-lock.json ./
# Copy the contents of the React-site directory into the container at /frontend
COPY . .

# Install any needed packages specified in package.json
RUN npm install
RUN npm install -g concurrently

# Make port 10000 available to the world outside this container
EXPOSE 10000

# Run npm start when the container launches
CMD ["npm", "start"]