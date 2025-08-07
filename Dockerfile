FROM node:20-alpine AS base

RUN corepack enable pnpm
 
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app


COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm exec prisma generate
RUN pnpm run build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./.env
RUN apk add --no-cache openssl
RUN AUTH_SECRET=$(openssl rand -base64 32) && \
    sed -i '$a\' .env && \
    echo "AUTH_SECRET=\"$AUTH_SECRET\"" >> .env


RUN mkdir -p /app/uploads/images
RUN mkdir -p /app/.next/cache/images

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["sh", "-c", " pnpm exec prisma migrate dev --name init && pnpm start"]
