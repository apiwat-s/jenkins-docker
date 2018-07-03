FROM node:8-alpine

WORKDIR /usr/src/app
ADD . .

RUN npm install

CMD [ "node", "index.js" ]
EXPOSE 8080