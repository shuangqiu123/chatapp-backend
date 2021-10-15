FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN npm i -g npm@latest

RUN npm install

CMD ["npm", "run", "prod"]
