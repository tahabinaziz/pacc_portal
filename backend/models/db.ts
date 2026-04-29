import postgres from "postgres";

// const sql = postgres({
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT,
//   database: process.env.DATABASE_NAME,
//   username: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   debug: true,
//   ssl: "require",
// }); // will use psql environment variables

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  debug: true,
  ssl: process.env.DB_SSL === "true",
});
export default sql;
