import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '@shared/schema';

// This line checks if you have set up your DATABASE_URL in your project's secrets/environment variables.
// If it's missing, the application will stop with an error to prevent it from running without a database.
if (!process.env.mysql://if0_39926056:Qwertyuiop3112@sql111.infinityfree.com:3306/if0_39926056_pbldatabase) {
  throw new Error("DATABASE_URL is not set. Please add it to your environment secrets.");
}

// This creates a reusable connection "pool" to your MySQL database using the URL from your secrets.
// A pool is much more efficient than creating a new connection for every database query.
const pool = mysql.createPool({
  uri: process.env.mysql://if0_39926056:Qwertyuiop3112@sql111.infinityfree.com:3306/if0_39926056_pbldatabase,
});

// This is the final step where Drizzle (your database tool) is initialized.
// It takes the MySQL connection pool and your database schema as input.
// The 'db' object is what you will import into other files (like storage.ts) to interact with your database.
export const db = drizzle(pool, { schema, mode: 'default' });