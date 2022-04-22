FROM node:17-alpine

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm ci

CMD ["npm", "run", "start"]
EXPOSE 3000