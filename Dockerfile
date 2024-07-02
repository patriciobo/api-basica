FROM node:20-alpine3.20 AS dev
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
CMD [ "yarn","start:dev" ]

FROM node:20-alpine3.20 AS dev-deps
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile

FROM node:20-alpine3.20 AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:20-alpine3.20 AS prod-deps
WORKDIR /app
COPY package.json ./
RUN yarn install --prod --frozen-lockfile

FROM node:20-alpine3.20 AS prod
WORKDIR /app
EXPOSE 3000
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD [ "node", "dist/main.js" ]