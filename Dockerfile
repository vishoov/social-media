# Base image of the container
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to app directory
COPY package-lock.json package-lock.json
COPY package.json package.json

# Copy all needed packages
COPY ./src ./src
COPY ./public ./public
COPY service-worker.js service-worker.js
COPY .env .env

# Install dependencies
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]