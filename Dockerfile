FROM node:21

WORKDIR /src/app

COPY . .

RUN npm install

EXPOSE 3060

CMD ["npm", "run","start:dev"]