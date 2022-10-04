FROM node:18-alpine3.16 as builder

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY tsconfig.json .
COPY tsconfig.build.json .
COPY src src
RUN npm run build

FROM node:18-alpine3.16

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .
RUN npm ci --omit=dev

COPY --from=builder /usr/app/dist dist
EXPOSE 3002
ENTRYPOINT [ "npm", "run", "start:prod" ]
