FROM node:lts-alpine3.9
WORKDIR /api
COPY package.json /api
RUN npm install -g pm2
RUN npm install -g nodemon
COPY . /api
