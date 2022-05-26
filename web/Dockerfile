FROM node:18-alpine

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm ci

RUN npx tsc

CMD ["npm", "run", "start"]
EXPOSE 3000