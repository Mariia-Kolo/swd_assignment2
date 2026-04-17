import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "appliance_inventory",
});
