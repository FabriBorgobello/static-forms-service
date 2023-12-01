# Static Form Service

## 📃 Introduction

This backend service handles forms submitted from static pages, developed in TypeScript and built with ESBuild, leveraging Node.js and Express for robust server-side operations.

## 🛠️ Technologies

- Language and Frameworks: [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/) and [TypeScript](https://www.typescriptlang.org/).
- Build Tool: [ESBuild](https://esbuild.github.io/)
- Query Builder: [Kysely.dev](https://kysely.dev/)
- Database: [PostgreSQL](https://www.postgresql.org/)
- Deployment: [fl0](https://www.fl0.com/)

## 🐳 Running Locally

Follow these steps to set up and run the service locally:

1. Start Local Database: `docker-compose up -d` (Launches the PostgreSQL database using Docker).

2. Run Migrations: `npm run db:migrate`

3. Generate Types from Database Schema: `npm run db:generate-types`

4. Seed Database (populate with sample data): `npm run db:seed`

5. Run development server: `npm run dev`

## Environment Variables

Check out the `.env.example` file for a list of required environment variables. These can be set in a `.env` file in the root directory of the project.

## 🚀 Deployment

For deployment, ensure you've completed the build process with `npm run build` and then use `npm run start` to launch the server in production mode.
