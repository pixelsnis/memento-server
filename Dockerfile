FROM oven/bun:latest

RUN bun install -g wrangler

WORKDIR /app

COPY . .

EXPOSE 8787

CMD ["bunx", "wrangler", "dev", "--local", "--port", "8787", "--ip", "0.0.0.0"]
