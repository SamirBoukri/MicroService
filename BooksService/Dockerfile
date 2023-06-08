FROM node:lts-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY books-service.js books-service.js
CMD npm run start-books