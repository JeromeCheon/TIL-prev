FROM node:lts-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
COPY app.js ./

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]