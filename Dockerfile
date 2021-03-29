ARG NODE_VERSION=15.10
ARG NPM_VERSION=7.7.5

FROM node:${NODE_VERSION}-alpine

RUN apk add --update --no-cache \
    curl \
    git \
    vim

RUN mkdir -p /home/node/buymeadr.ink/node_modules && \
 chown -R node:node /home/node/buymeadr.ink

RUN npm install -g npm@${NPM_VERSION} nodemon express-generator

USER node

WORKDIR /home/node/buymeadr.ink

COPY --chown=node:node package*.json ./

# COPY --chown=node:node docker-entrypoint.sh ./

RUN npm install

EXPOSE 8080

CMD [ "npm", "run dev" ]
