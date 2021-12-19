FROM node:16-alpine as dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

FROM dev as prod

ENV NODE_PATH=./build

RUN npm run build
