import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import 'dotenv/config';

const dbConfig = process.env.DATABASE_URL ? process.env.DATABASE_URL : {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const pool = mysql.createPool(dbConfig as any);

export const db = drizzle(pool, { schema, mode: 'default' });
