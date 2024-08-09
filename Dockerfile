FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY ./prisma prisma

RUN npx prisma generate --schema=./prisma/schema.prisma

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# FROM node:18-alpine AS base

# # 1. Install dependencies only when needed
# FROM base AS dependencies
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

# WORKDIR /app

# COPY package.json ./
# COPY ./prisma prisma

# COPY . .
# RUN npm install

# RUN npx prisma generate --schema=./prisma/schema.prisma

# FROM base AS builder

# WORKDIR /app
# COPY --from=dependencies /app/node_modules ./node_modules
# COPY --from=dependencies /app/node_modules ./node_modules
# COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1
# ARG NODE_ENV
# ENV NODE_ENV=”${NODE_ENV}”
# RUN npm run build

# FROM mhart/alpine-node:slim-14 AS runner
# WORKDIR /app
# ENV NEXT_TELEMETRY_DISABLED 1
# COPY --from=builder /app/src ./src
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.env ./.env
# COPY --from=builder /app/.env.local ./.env.local
# COPY --from=builder /app/auth.ts ./auth.ts
# COPY --from=builder /app/next-config.mjs ./next-config.mjs
# COPY --from=builder /app/postcss.config.mjs ./postcss.config.mjs
# COPY --from=builder /app/tailwind.config.ts ./tailwind.config.ts
# COPY --from=builder /app/theme.ts ./theme.ts
# COPY --from=builder /app/tsconfig.json ./tsconfig.json