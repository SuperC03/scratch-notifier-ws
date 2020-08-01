FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

# Copy Package Information
COPY package.json ./
COPY yarn.lock ./

USER node

RUN yarn
RUN yarn build:common
RUN yarn build:sever

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "yarn", "start" ]