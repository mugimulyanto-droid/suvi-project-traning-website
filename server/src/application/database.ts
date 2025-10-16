import mysql from "mysql2";

// interface dbConfig

interface DbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

const dbConfig: DbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "training",
};

// pool connection
const dbPool: mysql.Pool = mysql.createPool(dbConfig);

export default dbPool;
