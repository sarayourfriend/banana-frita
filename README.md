# Banana Frita

This is a simple bookmark management and search application. It runs on NextJS, Postgres, and Elastic Search.

## Development

To run the app locally, simply run `dc up -d`. The application will now be available at `localhost:3000`.

You can make changes and the app will reload with the new changes.

If you need to generate migrations, run:

```
dc run --rm nextjs npx prisma migrate dev --name <migration_name>
```

If you need to reset the database (this will wipe all data), run:

```
dc run --rm nextjs npx prisma migrate reset
```

If you need to regenerate the prisma client after a schema change, run:

```
dc run --rm nextjs npx prisma generate
```
