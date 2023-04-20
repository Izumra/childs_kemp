# syntax=docker/dockerfile:1

FROM node:19-alpine

ENV NODENV='production'

WORKDIR /childs_kemp

COPY ["package.json","./"]

RUN npm i --production

COPY . . 

CMD ["node","index.js"]