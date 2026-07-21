# Local PostgreSQL Database

Use Docker Compose to run PostgreSQL locally on the server, then apply Prisma migrations or restore a dump from the current external database.

## Quick Path: Empty Database

1. Copy `.env.production.example` to `.env.production` on the server.
2. Replace `POSTGRES_PASSWORD` with a long random password.
3. Make sure `DATABASE_URL` uses the same password and points to `db:5432`.
   The `migrate` service builds its own internal URL from `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD`, so those values must match the database you want the app to use.
4. Start PostgreSQL:

```bash
docker compose --env-file .env.production up -d db
```

5. Apply Prisma migrations:

```bash
docker compose --env-file .env.production run --rm migrate
```

## Quick Path: Existing External Data

1. Pause the old app so no new writes happen.
2. Create a custom-format dump from the external database:

```bash
pg_dump "$OLD_DATABASE_URL" -Fc -f ai-pdf-reader.dump
```

3. Start the local PostgreSQL service:

```bash
docker compose --env-file .env.production up -d db
```

4. Restore the dump into the local database:

```bash
docker compose --env-file .env.production exec -T db pg_restore \
  --clean \
  --if-exists \
  --no-owner \
  --no-privileges \
  -U ai_pdf_reader \
  -d ai_pdf_reader < ai-pdf-reader.dump
```

5. Apply any migrations that exist in code but were not present in the dump:

```bash
docker compose --env-file .env.production run --rm migrate
```

6. Refresh PostgreSQL planner statistics:

```bash
docker compose --env-file .env.production exec -T db psql \
  -U ai_pdf_reader \
  -d ai_pdf_reader \
  -c "ANALYZE;"
```

## Production Rules

| Rule | Why |
|------|-----|
| Do not publish port `5432` publicly | The app reaches PostgreSQL through the private Docker network. |
| Keep `.env.production` out of Git | It contains database and S3 credentials. |
| Use `--env-file .env.production` on the server | Docker Compose auto-loads `.env`; being explicit avoids accidentally pointing commands at the old external database. |
| Use `prisma migrate deploy` in production | It applies checked-in migrations without creating new ones. |
| Back up before restoring or migrating | Database operations are easy to repeat only when you have a known-good dump. |

## Useful Checks

Check that PostgreSQL is healthy:

```bash
docker compose --env-file .env.production ps db
```

List tables:

```bash
docker compose --env-file .env.production exec db psql \
  -U ai_pdf_reader \
  -d ai_pdf_reader \
  -c "\dt"
```
