# Base image of the container
FROM node:18-alpine

WORKDIR /AI-USER-INTERFACE-REACT

# copy package.json and package-lock.json to app directory
COPY package-lock.json package-lock.json

COPY package.json package.json

# copy all needed packages
COPY ./src ./src
COPY ./public ./public
COPY service-worker.js service-worker.js
COPY .env .env

RUN npm install && npm install -g nodemon

EXPOSE 3000

CMD [ "npm" , "start"]


