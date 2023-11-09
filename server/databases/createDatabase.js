import database from "./connection.js";
import * as dotenv from "dotenv";
dotenv.config()

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if (isDeleteMode) {
    database.execute(`DROP TABLE IF EXISTS boards, posts, replies, moderators, banned`);
}

database.execute(`
    CREATE TABLE IF NOT EXISTS boards (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30) UNIQUE NOT NULL
    );
`);

database.execute(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(100),
        date_time DATETIME,
        bump_order INT,
        boards_id INTEGER,
        CONSTRAINT fk_boards FOREIGN KEY (boards_id) REFERENCES boards(id) ON DELETE CASCADE
    );
`);

database.execute(`
    CREATE TABLE IF NOT EXISTS replies (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        text VARCHAR(4000),
        image VARCHAR(255),
        ip VARCHAR(39),
        date_time DATETIME,
        posts_id INTEGER,
        CONSTRAINT fk_posts FOREIGN KEY (posts_id) REFERENCES posts(id) ON DELETE CASCADE
    );
`);

database.execute(`
    CREATE TABLE IF NOT EXISTS moderators (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );
`);

database.execute(`
    CREATE TABLE IF NOT EXISTS banned (
        ip VARCHAR(39)
    );
`);

database.execute(`INSERT INTO moderators(username, password)
  VALUES(?, ?)`, ["admin", "admin"]);