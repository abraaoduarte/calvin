FROM node:14-alpine

WORKDIR /usr/app

COPY . /usr/app

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 80
