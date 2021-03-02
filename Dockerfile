ARG NODE_VERSION=15.10
ARG NPM_VERSION=7.6.0

FROM node:${NODE_VERSION}-alpine

RUN apk add --update --no-cache \
    curl \
    git \
    vim

RUN mkdir -p /home/node/buymeadr.ink/app/node_modules && \
 chown -R node:node /home/node/buymeadr.ink/app

RUN npm install -g nodemon express-generator

USER node

WORKDIR /home/node/buymeadr.ink/app

COPY --chown=node:node app/package*.json ./

RUN npm install

EXPOSE 8080

CMD [ "nodemon", "app/" ]
