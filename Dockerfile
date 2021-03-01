ARG NODE_VERSION=15.10
ARG NPM_VERSION=7.6.0

FROM node:${NODE_VERSION}-alpine

RUN apk add --update --no-cache \
    curl \
    git \
    vim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN npm install -g nodemon

USER node

WORKDIR /home/node/app

COPY package*.json ./

COPY --chown=node:node . .

RUN npm install

EXPOSE 8080

CMD [ "nodemon" ]
