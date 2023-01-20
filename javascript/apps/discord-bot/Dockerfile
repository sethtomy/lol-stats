FROM node:18-alpine3.16 as builder

WORKDIR /usr/app

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build:discord-bot

FROM node:18-alpine3.16

WORKDIR /usr/app

COPY package*.json .
RUN npm ci --omit=dev

COPY --from=builder /usr/app/dist dist
EXPOSE 3004
ENTRYPOINT [ "npm", "run", "start:discord-bot:prod" ]
