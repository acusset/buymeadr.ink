ARG NODE_VERSION
ARG NPM_VERSION
ARG HTTP_PORT

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

RUN npm install

EXPOSE ${HTTP_PORT}

CMD [ "npm", "run", "dev"]
