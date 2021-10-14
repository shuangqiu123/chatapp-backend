FROM node:12
WORKDIR /usr/src/app

COPY . .

COPY .env.production .env.production

RUN npm i -g npm@latest

RUN npm install

CMD ["npm", "run", "prod"]
