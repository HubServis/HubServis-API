FROM node:18-alpine as build

RUN apk add --no-cache curl \
    && curl -fsSL 'https://github.com/pnpm/pnpm/releases/download/v8.6.12/pnpm-linuxstatic-x64' -o /bin/pnpm \
    && chmod +x /bin/pnpm

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["pnpm", "run", "dev"]
