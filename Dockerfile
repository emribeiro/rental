FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN npm install -g npm@7.7.1

RUN npm install --also=dev

COPY . . 

EXPOSE 3333

CMD ["npm", "run", "dev"]