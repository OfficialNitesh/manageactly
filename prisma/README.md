# Prisma + Docker

This project uses Prisma with PostgreSQL. The repository includes a Docker Compose setup to run Postgres locally for development.

Quick start

1. Start Postgres + Adminer:

```bash
docker compose up -d
```

2. Verify DB is reachable (Adminer available at http://localhost:8080).

3. Run Prisma generate and migrate:

```bash
npm run db:generate
npx prisma migrate dev --name init
```

Notes
- The repository `.env` sets `DATABASE_URL` to connect to `localhost:5432` (the Docker-exposed port).
- If you prefer connecting to the container network hostname, change `DATABASE_URL` to use `db:5432` and run migration from a container with network access.
