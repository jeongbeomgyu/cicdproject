FROM node:20-alpine AS builder
WORKDIR /app

# 빌드 시점에 외부에서 NEXT_PUBLIC_API_URL을 받겠다는 선언
ARG NEXT_PUBLIC_API_URL
# 받은 값을 환경 변수로 설정 (Next.js 빌드 시 이 값을 참조)
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
CMD ["node", "server.js"]