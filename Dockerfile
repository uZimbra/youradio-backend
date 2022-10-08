FROM node:17-slim

RUN apt-get update \
 && apt-get install -y ffmpeg

WORKDIR /youradio/

COPY package.json package-lock.json /youradio/

RUN npm i --silent

COPY . .

USER node

CMD npm run dev