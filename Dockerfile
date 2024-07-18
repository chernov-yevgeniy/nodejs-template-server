FROM node:22.4-alpine

ENV TZ=Europe/Kiev

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

USER node

COPY --chown=node:node package*.json ./

COPY --chown=node:node . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]
