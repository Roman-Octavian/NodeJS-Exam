import * as dotenv from 'dotenv';
import mysql from "mysql2/promise";

// RAW QUERIES (e.g. `node createDatabase.js`)
// dotenv.config({path: '../.env'});

// SERVER (e.g. `node app.js`)
dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

export default connection;
