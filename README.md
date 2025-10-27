# CoSpend

A collaborative expense tracking application built with Node.js, Express, and Sequelize, connected to a PostgreSQL (Supabase) database.

## Setup

1. **Install dependencies**

```bash
npm install
```

2. **Create a .env file and add this things**

```bash
PORT= Port to run the app mainly its 5000
JWT_SECRET= Secret key you want for auth

DB_HOST= Supabase host 
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password fir db
DB_NAME=postgres
```
3. **Run this command to check if server starts in port 5000 and db is connected or not**

```bash
npm run dev
```
