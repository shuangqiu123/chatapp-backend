FROM node:12

WORKDIR /usr/src/app

RUN --mount=type=secret,id=.env.production,target=/usr/src/app/ cat /usr/src/app/.env.production

COPY . .

RUN npm i -g npm@latest

RUN npm install

CMD ["npm", "run", "prod"]
