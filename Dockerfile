ARG NODE_VERSION
ARG NPM_VERSION
ARG PORT

FROM node:${NODE_VERSION}-alpine

RUN apk add --update --no-cache \
    curl \
    git \
    vim

RUN mkdir -p /home/node/buymeadr.ink/node_modules && \
 chown -R node:node /home/node/buymeadr.ink

RUN npm install -g npm@${NPM_VERSION} @nestjs/cli

USER node

WORKDIR /home/node/buymeadr.ink

COPY --chown=node:node package*.json ./

RUN npm install

EXPOSE ${PORT}

CMD [ "npm", "run", "start:prod"]
