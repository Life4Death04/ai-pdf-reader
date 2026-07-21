# Docker Compose Stack

This Compose stack runs the app and its private services on one server.

## Services

| Service | Purpose | Public? |
|---------|---------|---------|
| `app` | Next.js production server | Bound to `APP_HOST:APP_PORT`, default `127.0.0.1:3000` |
| `db` | Local PostgreSQL database | No |
| `migrate` | One-shot Prisma migration runner | No; run manually |
| `tts` | Piper TTS HTTP server | No |
| `ollama` | Local LLM API | No |

## First Run

Create the production env file on the server:

```bash
cp .env.production.example .env.production
```

Edit `.env.production` and replace at least:

```env
POSTGRES_PASSWORD="replace-with-a-long-random-password"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
S3_BUCKET_NAME="..."
```

Keep `DATABASE_URL` matching the same database credentials for manual Prisma commands. The Compose `app` and `migrate` services intentionally build their internal database URL from `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD` so they cannot accidentally point to the old external database.

Start the private services and database:

```bash
docker compose --env-file .env.production up -d db tts ollama
```

Apply database migrations:

```bash
docker compose --env-file .env.production run --rm migrate
```

Start the app:

```bash
docker compose --env-file .env.production up -d app
```

## Pull Ollama Model

The Ollama container starts without downloading `phi3`. Pull it once on the server:

```bash
docker compose --env-file .env.production exec ollama ollama pull phi3
```

## Verify

Check service status:

```bash
docker compose --env-file .env.production ps
```

Check the app health endpoint from the server:

```bash
curl http://127.0.0.1:3000/api/monitoring/health
```

Check Ollama models:

```bash
docker compose --env-file .env.production exec ollama ollama list
```

## Security Notes

Only `app` publishes a host port, and it binds to `127.0.0.1` by default. Keep `db`, `tts`, and `ollama` private on the Docker network. Put Caddy, Nginx, Tailscale, or Cloudflare Tunnel in front of the app instead of exposing internal service ports.
