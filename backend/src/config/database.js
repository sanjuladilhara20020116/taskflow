import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create a reusable MySQL connection pool.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // Return date values as strings.
  // This makes due date validation easier.
  dateStrings: true,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Check whether the application can connect to MySQL.
export const testDatabaseConnection = async () => {
  const connection = await pool.getConnection();

  try {
    await connection.ping();
    console.log("MySQL database connected successfully");
  } finally {
    connection.release();
  }
};

export default pool;