# VendorVerse

VendorVerse is a multivendor e-commerce project built with React, TypeScript, Tailwind CSS, Neon Postgres, and Vercel serverless functions.

## Local setup

1. Copy [.env.example](.env.example) to `.env.local`.
2. Set `DATABASE_URL` to your Neon connection string.
3. Set `JWT_SECRET` to a long random value.
4. Run `npm install` and `npm run dev`.

## Vercel deployment

1. Push the repo to GitHub.
2. Import the project into Vercel.
3. Add `DATABASE_URL` and `JWT_SECRET` in Vercel project settings.
4. Run the SQL in [db/schema.sql](db/schema.sql) in Neon once.
5. Deploy the app.

## Database notes

- The app uses Neon through the `@neondatabase/serverless` driver in serverless routes under [api/](api).
- Auth, contact form submissions, and seeded marketplace data are stored in Postgres tables.
- Do not commit real secrets to the repository.
- The Neon password shared in chat should be rotated in Neon after this setup.

## Project structure

- [src/](src) contains the React frontend.
- [api/](api) contains Vercel serverless routes.
- [db/schema.sql](db/schema.sql) contains the Postgres schema and seed data.
