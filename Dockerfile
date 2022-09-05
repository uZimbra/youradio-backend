FROM node:17-slim

WORKDIR /youradio/

COPY package.json yarn.lock /youradio/

RUN yarn --silent

COPY . .

USER node

CMD yarn dev