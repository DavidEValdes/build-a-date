import pg from "pg";
import "./dotenv.js";

const isProduction = process.env.NODE_ENV === "production";

// Prefer Heroku database URL if available, fall back to Railway configuration
const getConnectionConfig = () => {
  if (process.env.DATABASE_URL) {
    // Heroku database
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    };
  } else {
    // Railway database
    return {
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
      ssl: isProduction ? {
        rejectUnauthorized: false
      } : false
    };
  }
};

export const pool = new pg.Pool(getConnectionConfig());

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});