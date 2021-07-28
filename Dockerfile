FROM node:lts-alpine

ENV PORT=3000

WORKDIR /code
COPY package.json package-lock.json /code/
RUN npm install

EXPOSE $PORT

COPY src /code/src/
COPY public /code/public/

CMD [ "npm", "start" ]
