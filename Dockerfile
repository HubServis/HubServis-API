FROM node:18-alpine as build

RUN corepack enable

RUN apk add --no-cache build-base python3

USER node

WORKDIR /app

COPY package.json ./

RUN pnpm install

COPY . .

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["pnpm", "run", "dev"]
