# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /frontend
WORKDIR /frontend

COPY package.json package-lock.json ./
# Copy the contents of the React-site directory into the container at /frontend
COPY ./ ./

# Install any needed packages specified in package.json
RUN npm install
RUN npm run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run npm start when the container launches
CMD ["npm", "start"]